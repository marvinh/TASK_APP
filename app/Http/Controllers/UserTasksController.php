<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserTasksRequest;
use App\Http\Requests\UpdateUserTasksRequest;
use App\Models\UserTasks;
use Illuminate\Http\Request;
use DB;
class UserTasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('tasks');
    }

    public function all()
    {
        return UserTasks::orderBy('priority')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserTasksRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $task = UserTasks::create([
            'name' => $request->name,
            'priority' => $request->priority,
        ]);
        
        return $task;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserTasks  $userTasks
     * @return \Illuminate\Http\Response
     */
    public function show(UserTasks $userTasks)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserTasks  $userTasks
     * @return \Illuminate\Http\Response
     */
    public function edit(UserTasks $userTasks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserTasksRequest  $request
     * @param  \App\Models\UserTasks  $userTasks
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        
        $task = UserTasks::find($request->task['id']);
        $task->name = $request->task['name'];
        $task->save();
        return $task;
    }

    public function priority(Request $request)
    {
    
        $task = UserTasks::find($request->id);
        $task->priority = $request->newPriority;
        $task->save();
        //$task->save();
        return $task;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserTasks  $userTasks
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
    

        UserTasks::destroy($request->task['id']);

        //$tasks = UserTasks::orderBy('priority')->get();

        return $request->task;
    }
}
