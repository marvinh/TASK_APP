<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        \App\Models\UserTasks::factory()->create([
            'name' => 'Walk in the park',
            'priority' => 1,
        ]);
        \App\Models\UserTasks::factory()->create([
            'name' => 'Clean room',
            'priority' => 2,
        ]);
        \App\Models\UserTasks::factory()->create([
            'name' => 'Do Laundry',
            'priority' => 3,
        ]);
        \App\Models\UserTasks::factory()->create([
            'name' => 'Lorem Ipsum',
            'priority' => 4,
        ]);
        \App\Models\UserTasks::factory()->create([
            'name' => 'Lorem Ipsum 2',
            'priority' => 5,
        ]);
        
    }
}
