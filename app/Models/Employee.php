<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'occupation', 'color', 'vacation', 'active'];
    public $timestamps = true;
    protected $casts = [
      'vacation' => 'json',
    ];

    public function lastCheckin()
    {
      return $this->hasMany(EmployeeCheckin::class)->whereDate('created_at', Carbon::today())->get()->last();
    }

    public function checkins()
    {
      return $this->hasMany(EmployeeCheckin::class)->get();
    }
}
