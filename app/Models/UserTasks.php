<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTasks extends Model
{
    use HasFactory;
    protected $table = 'user_tasks';
    protected $fillable = [
        'name',
        'priority',
    ];


}
