<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryProfile extends Model
{
    use HasFactory;

    protected $table = "historyprofile";

    protected $fillable = [
        "id",
        "historyDate",
        "typeH",
        "lastEdit",
        "active"
    ];

    protected $hidden = [
        "active",
        "lastEdit"
    ];

    public $timestamps = false;

    protected $casts = [
        "active" => "boolean"
    ];
}
