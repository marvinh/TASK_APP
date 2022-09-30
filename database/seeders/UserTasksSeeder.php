<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\UserTasks::factory()->create([
            'task_name' => 'Walk in the park',
            'task_priority' => 5,
        ]);
        \App\Models\UserTasks::factory()->create([
            'task_name' => 'Clean room',
            'task_priority' => 4,
        ]);
        \App\Models\UserTasks::factory()->create([
            'task_name' => 'Do Laundry',
            'task_priority' => 2,
        ]);
        \App\Models\UserTasks::factory()->create([
            'task_name' => 'Lorem Ipsum',
            'task_priority' => 1,
        ]);
        \App\Models\UserTasks::factory()->create([
            'task_name' => 'Lorem Ipsum 2',
            'task_priority' => 4,
        ]);

    }
}
