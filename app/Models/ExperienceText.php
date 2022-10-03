<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExperienceText extends Model
{
    use HasFactory;

    protected $table = "experiencetext";

    protected $fillable = [
        "ID",
        "Lang",
        "Category",
        "ExpName"
    ];

    public $timestamps = false;
}
