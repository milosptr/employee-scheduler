<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeCheckin extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'check_in', 'check_out', 'auto_checkout'];
    public $timestamps = true;

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function lastCheckin()
    {
        return $this->whereDate('created_at', Carbon::today())->get()->last();
    }
}
