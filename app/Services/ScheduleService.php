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
        $this->startDate = $dates[0];
        $this->endDate = $dates[1];
        $this->diffInDays =  Carbon::parse($dates[1])->diffInDays(Carbon::parse($dates[0]));
        return $this;
    }

    public function setSchedules()
    {
        $this->schedules = ScheduleResource::collection(Schedule::whereBetween('date', [$this->startDate, $this->endDate])->get());
        return $this;
    }

    public function parseDays()
    {
        $days = [];
        $startDate = Carbon::parse($this->startDate);

        // Pre-process schedules and group them by date
        $groupedSchedules = $this->schedules->groupBy(function ($value) {
            return Carbon::parse($value->date)->toDateString();
        });

        for ($i = 0; $i <= $this->diffInDays; $i++) {
            $date = $startDate->copy()->addDays($i);
            $dateString = $date->toDateString();

            $schedules = $groupedSchedules->get($dateString, collect([]));

            $days[] = [
                'date' => $dateString,
                'date_formatted' => $date->format('d. M'),
                'schedules' => $schedules,
            ];
        }

        return collect($days)->sortBy('date');
    }
}
