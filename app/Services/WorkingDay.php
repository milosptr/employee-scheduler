<?php

namespace App\Services;

use Carbon\Carbon;

class WorkingDay
{
    public static function getWorkingDay(Carbon $date = null, $day = null)
    {
        if (!$date) {
            $date = Carbon::now();
        }

        if ($date->between("00:00:00", "03:59:59", true)) {
            $date = $date->yesterday();
        }

        if ($day === 'yesterday') {
            $date = $date->subDays(1);
        }

        return [$date->startOfDay()->addHours(4)->toDateTimeString(), $date->endOfDay()->addHours(4)->toDateTimeString()];
    }

    public static function getWorkingDayForRange($date = null)
    {
        if (!$date) {
            $date = Carbon::now()->subYears(100)->format('Y-m-d') . ' to ' . Carbon::now()->format('Y-m-d');
        }
        $date = explode(' to ', $date);
        $from = self::getWorkingDay(Carbon::parse($date[0] . '04:00:00'));
        $to = self::getWorkingDay(Carbon::parse($date[1] . '04:00:00'));

        return [$from[0], $to[1]];
    }

    public static function getCurrentShift()
    {
        $hour = Carbon::now()->hour;
        if ($hour >= 4 && $hour < 10) {
            return 1;
        } elseif ($hour >= 10 && $hour < 15) {
            return 2;
        } else {
            return 3;
        }
    }
}
