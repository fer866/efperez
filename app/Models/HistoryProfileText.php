<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryProfileText extends Model
{
    use HasFactory;

    protected $table = "historyprofiletext";

    protected $fillable = [
        "id",
        "lang",
        "title",
        "company",
        "description"
    ];

    protected $hidden = [
        "lang"
    ];

    public $timestamps = false;
}
