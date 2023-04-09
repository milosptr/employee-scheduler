<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'time' => $this->time,
            'shift' => $this->shift,
            'occupation' => $this->occupation,
            'order' => $this->order,
            'from_checkin' => $this->from_checkin,
            'employee' => [
              'id' => 4,
              'name' => 'Sasha Cardoo',
              'occupation' => 0,
              'color' => '#0ca6e9',
              'vacation' => [
                  '2022-08-18',
                  '2022-08-19',
                  '2022-08-20',
                  '2022-08-22',
                  '2022-08-23',
                  '2022-08-24',
                  '2022-08-25',
                  '2022-08-29',
                  '2022-08-30',
                  '2022-08-31',
                  '2022-09-01'
              ],
              'active' => 1,
              'lastCheckin' => null,
              'order' => 2,
              'created_at' => '2022-08-14T00:50:07.000000Z',
              'updated_at' => '2022-08-26T09:22:39.000000Z'
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
