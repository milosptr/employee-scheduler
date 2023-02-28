<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use App\Services\ScheduleService;
use App\Services\WorkingDay;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ScheduleResource::collection(Schedule::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function timeline(Request $request, $months = 2)
    {
        $scheduleService = new ScheduleService();
        return $scheduleService
          ->setPeriod($request->get('range'))
          ->setSchedules()
          ->parseDays();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $schedule = Schedule::create($request->all());
        return new ScheduleResource($schedule);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);
        return $schedule->update($request->all());
    }

    public function reorder(Request $request)
    {
        foreach ($request->all() as $s) {
            if (!isset($s['id'])) {
                continue;
            }
            $schedule = Schedule::find($s['id']);
            $schedule->update([ 'order' => $s['order'] ]);
        }
        return response('Successfully reordered!', 200);
    }

    public function today()
    {
        $date = Carbon::parse(WorkingDay::getWorkingDay()[0])->format('Y-m-d');
        return ScheduleResource::collection(Schedule::where('date', $date)->get());
    }

    public function pdf(Request $request)
    {
        $filename = 'schedule-'.Carbon::now()->format('Y-m-d-H-i-s').'.pdf';
        $search = array('Č', 'č', 'Ć', 'ć');
        $replace = array('C', 'c', 'C', 'c');
        $body = str_replace($search, $replace, $request->get('body'));
        Pdf::loadView('pdf.schedule', ['body' => $body])->setPaper('a4')->save('pdf/'.$filename);
        return response(['file' => $filename]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        return $schedule->delete();
    }
}
