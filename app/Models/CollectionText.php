<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionText extends Model
{
    use HasFactory;

    protected $table = "collectiontext";

    protected $fillable = [
        "ID",
        "Lang",
        "ColName",
        "Description"
    ];

    public $timestamps = false;
}
