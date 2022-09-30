import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { deleteTask, getTasks, taskPrioritize, addTask, editName } from '../services/TaskService';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#tasks');


function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (

        <span className='list-group-item' ref={setNodeRef} style={style}>
            <span {...listeners} {...attributes} className="m-2 h4 bg-info">Drag</span>
            <span className='m-2'>Task: {props.name} , Priority: {props.idx+1} </span>
            <span className='m-2 float-end'>
                <button onClick={() => props.handleSetEditTask(props.id)} className='btn btn-sm btn-secondary m-2'> Edit </button>
                <button onClick={() => props.handleDelete(props.id)} className=' btn-sm btn btn-danger'> Delete </button>
            </span>
        </span>

    );
}

function Tasks() {

    const [tasks, setTasks] = useState(null);

    const [newName, setNewName] = useState('');

    const [editModal, setEditModal] = useState(false);

    const [editTask, setEditTask] = useState(null);

    useEffect(async () => {
        let data = await getTasks();
        setTasks(p => data);
    }, [])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleSetEditTask = (id) => {
        const t = tasks.filter(ele => ele.id == id)[0];
        console.log(t);
        setEditTask(p => t);
        setEditModal(true);
    }



    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {

            const oldIndex = tasks.findIndex(ele => ele.id == active.id);
            const newIndex = tasks.findIndex(ele => ele.id == over.id);

            console.log(oldIndex);
            console.log(newIndex);

            var priority = 0.0;
            if (newIndex - 1 < 0) {
                priority = tasks.length < 1 ? 1 : tasks[newIndex].priority / 2.0;
            } else if (newIndex + 1 >= tasks.length) {
                priority = tasks[newIndex].priority + 1;
            } else {
                priority = (tasks[newIndex].priority + tasks[newIndex + 1].priority) / 2.0;
            }

            console.log("priority", priority);

            let data = await taskPrioritize(active.id, priority);

            console.log(data);

            setTasks((items) => {
                const oldIndex = items.findIndex(ele => ele.id == active.id);
                const newIndex = items.findIndex(ele => ele.id == over.id);
                const move = arrayMove(items, oldIndex, newIndex);
                const array = move.map((ele) => {
                    if (ele.id == active.id) {
                        return data;
                    } else {
                        return ele;
                    }
                })
                return array;
            });

        }
    }

    const handleDelete = async (id) => {
        let data = await deleteTask(tasks.find(ele => ele.id == id));
        setTasks((items) => {
            return items.filter(ele => ele.id != id);
        })
    }



    const addNewTask = async (event) => {
        event.preventDefault();

        let priority = tasks.length < 1 ? 1 : tasks[0].priority / 2.0;;
        console.log(newName);

        let data = await addTask(newName, priority);

        setTasks(p => {
            return [data, ...p];
        })

        setNewName(p => '');
    }

    const newTaskChange = (event) => {
        setNewName(p => event.target.value);
    }

    const editNameChange = (event) => {
        setEditTask(p => {
            return { ...p, name: event.target.value }
        });
    }

    const editNameForTask = async (event) => {
        event.preventDefault();

        let data = await editName(editTask);

        setTasks(p => {
            return p.map((ele) => {
                if(ele.id == editTask.id)
                {
                    return data;
                }else{
                    return ele;
                }
            })
        })

        setEditModal(p=>false);
        setEditTask(p=>null);

    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form onSubmit={addNewTask}>
                    <input value={newName} onChange={newTaskChange} type="text" className="form-control m-2" placeholder='Add New Task' />
                    <button type="submit" disabled={newName == ''} className='btn btn-primary m-2' > Add New Task </button>
                </form>
            </div>
            <div className="row justify-content-center">
                {
                    tasks && tasks.length > 0 ?
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={tasks}
                                strategy={verticalListSortingStrategy}

                            >
                                <div className='list-group m-2'>
                                    {tasks.map((ele, idx) => <SortableItem
                                        handleSetEditTask={handleSetEditTask}
                                        key={ele.id}
                                        idx={idx}
                                        id={ele.id}
                                        name={ele.name}
                                        priority={ele.priority}
                                        handleDelete={handleDelete}
                                    />)}
                                </div>
                            </SortableContext>
                        </DndContext>
                        :
                        <>
                        </>

                }
            </div>

            {
                editTask && (
                    <Modal
                        isOpen={editModal}
                        //onAfterOpen={afterOpenModal}
                        onRequestClose={() => setEditModal(false)}
                        style={customStyles}
                        contentLabel="Edit Task"
                    >
                        <form onSubmit={editNameForTask}>
                            <input value={editTask.name} onChange={editNameChange} type="text" className="form-control m-2" placeholder='Edit Task' />
                            <button type="submit" disabled={editTask.name == ''} className='btn btn-primary m-2' > Save </button>
                        </form>
                    </Modal>
                )
            }

        </div>
    );
}

export default Tasks;

if (document.getElementById('tasks')) {
    ReactDOM.render(<Tasks />, document.getElementById('tasks'));
}