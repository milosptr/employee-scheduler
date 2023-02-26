<?php

namespace App\Console\Commands;

use App\Models\EmployeeCheckin;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EndOfTheDayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'finish:day';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'End of the day command';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // checkout all employees
        $checkins = EmployeeCheckin::whereNull('check_out')->get();
        foreach ($checkins as $checkin) {
            $checkin->check_out = Carbon::now();
            $checkin->save();
        }
        return 0;
    }
}
