<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikesByIP extends Model
{
    use HasFactory;

    protected $table = "likesbyip";

    protected $fillable = [
        "IP",
        "ID",
        "Created"
    ];

    public $timestamps = false;
}
