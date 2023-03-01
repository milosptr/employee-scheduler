<?php

namespace App\Models;

use App\Services\WorkingDay;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'occupation', 'color', 'vacation', 'active', 'order'];
    public $timestamps = true;
    protected $casts = [
      'vacation' => 'json',
    ];

    public function lastCheckin()
    {
        return $this->hasMany(EmployeeCheckin::class)->whereBetween('created_at', WorkingDay::getWorkingDay())->get()->last();
    }

    public function checkins()
    {
        return $this->hasMany(EmployeeCheckin::class)->get();
    }
}
