<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Schedule;
use App\Http\Resources\ScheduleResource;

class ScheduleService
{
    protected $schedules;
    protected $startDate;
    protected $endDate;
    protected $diffInDays;

    public function setPeriod($range)
    {
        $dates = explode(' to ', $range);
        $this->startDate = Carbon::parse($dates[0]);
        $this->endDate = Carbon::parse($dates[1]);
        $this->diffInDays = $this->endDate->diffInDays($this->startDate);
        return $this;
    }

    public function setSchedules()
    {
        $this->schedules = Schedule::with('employee')
            ->whereBetween('date', [$this->startDate->toDateString(), $this->endDate->toDateString()])
            ->get()
            ->groupBy('date');
        return $this;
    }

    public function parseDays()
    {
        $days = [];

        for ($i = 0; $i <= $this->diffInDays; $i++) {
            $date = $this->startDate->copy()->addDays($i);
            $dateString = $date->toDateString();

            $schedules = $this->schedules->get($dateString, collect([]));
            $schedules = ScheduleResource::collection($schedules);

            $days[] = [
                'date' => $dateString,
                'date_formatted' => $date->format('d. M'),
                'schedules' => $schedules,
            ];
        }

        return collect($days)->sortBy('date');
    }
}
