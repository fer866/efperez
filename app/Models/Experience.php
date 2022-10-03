<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $table = "experience";

    protected $fillable = [
        "ID",
        "Percentage",
        "LastEdit",
        "Active"
    ];

    public $timestamps = false;

    protected $casts = [
        "Active" => "boolean"
    ];
}
