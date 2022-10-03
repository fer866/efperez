<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCollection extends Model
{
    use HasFactory;

    protected $table = "collection";

    protected $fillable = [
        'ID',
        'IdCol',
        'IdName',
        'Icon',
        'Likes',
        'LastEdit',
        'Active'
    ];

    protected $attributes = [
        'Likes' => 0
    ];

    public $timestamps = false;

    protected $hidden = [
        'IdCol',
        'LastEdit',
        'Active'
    ];

    protected $casts = [
        'Activo' => 'boolean'
    ];
}
