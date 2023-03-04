<?php

namespace App\Models;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'employee_id', 'shift', 'occupation', 'time', 'order', 'from_checkin'];
    public $timestamps = true;

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
