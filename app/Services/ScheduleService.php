<?php
namespace App\Services;

use Carbon\Carbon;

class ScheduleService
{
  protected $months;
  protected $schedules;
  protected $startDate;
  protected $endDate;
  protected $diffInDays;

  public function setPeriod($months = 2)
  {
    $this->months = $months;
    $this->startDate = Carbon::now()->subMonths($this->months / 2);
    $this->endDate = Carbon::now()->addMonths($this->months / 2);
    $this->diffInDays =  $this->endDate->diffInDays($this->startDate);
    return $this;
  }

  public function setSchedules($schedules)
  {
    $this->schedules = $schedules;
    return $this;
  }

  public function parseDays()
  {
    $days = array();
    for($i = 0; $i < $this->diffInDays; $i++) {
      $date = Carbon::parse($this->startDate)->addDays($i);
      $schedules = $this->schedules->filter(function ($value) use ($date) {
        return $value->date === $date->toDateString();
      })->values();

      array_push($days, [
        'date' => $date->toDateString(),
        'date_formatted' => $date->format('d. M'),
        'schedules' => $schedules
      ]);
    }
    return collect($days)->sortBy('date');
  }
}
