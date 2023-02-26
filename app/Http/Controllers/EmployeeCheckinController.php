<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;

use App\Services\Pusher;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\EmployeeCheckin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\ArrivalResource;
use App\Http\Resources\EmployeeCheckinResource;

class EmployeeCheckinController extends Controller
{
    public function checkin(Request $request)
    {
        $employeeId = $request->get('employee');
        $checkinId = $request->get('checkin');

        if (!$request->has('employee')) {
            return response('Wrong request!', 422);
        }

        if ($checkinId) {
            $checkin = EmployeeCheckin::find($checkinId);
            if ($checkin && $checkin->check_out === null) {
                $checkin->check_out = Carbon::now();
                $checkin->save();
                try {
                    app(Pusher::class)->trigger('broadcasting', 'employee-checkin', []);
                } catch(Exception $e) {
                    Log::error($e->getMessage());
                }
                return EmployeeCheckinResource::collection(Employee::where('active', 1)->get());
            }
        }
        EmployeeCheckin::create([
          'employee_id' => $employeeId,
          'check_in' => Carbon::now()
        ]);

        try {
            app(Pusher::class)->trigger('broadcasting', 'employee-checkin', []);
        } catch(Exception $e) {
            Log::error($e->getMessage());
        }

        return EmployeeCheckinResource::collection(Employee::where('active', 1)->get());
    }

    public function arrivals(Request $request)
    {
        $arrivals = EmployeeCheckin::selectRaw('employee_checkins.*');
        $arrivals
          ->leftJoin('employees', 'employees.id', '=', 'employee_checkins.employee_id')
          ->where('employees.active', 1);
        if ($request->has('occupation')) {
            $arrivals->where('employees.occupation', $request->get('occupation'));
        }
        if ($request->has('from') && $request->has('to')) {
            $arrivals->whereBetween('employee_checkins.created_at', [Carbon::parse($request->get('from'))->startOfDay(), Carbon::parse($request->get('to'))->endOfDay()]);
        } else {
            $arrivals->whereBetween('employee_checkins.created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
        }
        $arrivals = ArrivalResource::collection($arrivals->get());
        $arrivals = $arrivals->groupBy(function ($date) {
            return Carbon::parse($date->created_at)->format('Y-m-d');
        });
        $arrivalsCollection = $arrivals->map(function ($item) {
            $itemArray = json_decode($item->toJson(), true);
            return collect($itemArray)->mapToGroups(function (array $item) {
                return [$item['employee_name'] => $item];
            });
        });
        return [
          'data' => $arrivalsCollection,
          'employees' => Employee::where('occupation', $request->get('occupation'))->where('active', 1)->get('name')
        ];
    }

    public function checkinsToday()
    {
        // wip
        $checkins = EmployeeCheckin::whereDate('employee_checkins.created_at', Carbon::now()->format('Y-m-d'))->pluck('employee_id');
        $checkedInEmployees = Employee::whereIn('id', $checkins)->get();
        return EmployeeCheckinResource::collection($checkedInEmployees);
    }
}
