import axios from "axios"


export const getTasks = async () => {
    try {
        let { data } = await axios.get("/tasks/all");
        return data;
    } catch (e) {
        console.log(e)
        return e;
    }
}

export const taskPrioritize = async (id, newPriority) => {
    try {
        let { data } = await axios.post("/tasks/priority", {
            id: id,
            newPriority: newPriority,
        })
        return data;
    } catch (e) {
        console.log(e)
    }

}

export const deleteTask =  async (task) => {
    try {
        let {data} = await axios.delete(`/tasks/${task.id}`,{
            data: {
                task
            }
        })

        return data;
    } catch (e) {
        console.log(e)
    }
}

export const addTask = async (newName, newPriority) => {
    try {
        let {data} = await axios.post(`/tasks`,{
            name: newName,
            priority: newPriority,
        })

        return data;
    } catch (e) {
        console.log(e)
    }
}

export const editName =  async (task) => {
    try{

        let {data} =  await axios.put(`/tasks/${task.id}`, {
            task,
        })
        return data;
    }catch(e) {
        console.log(e)
    }
}