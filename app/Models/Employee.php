<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'occupation', 'color', 'vacation', 'active'];
    public $timestamps = true;
    protected $casts = [
      'vacation' => 'json',
    ];
}
