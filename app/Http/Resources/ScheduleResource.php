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
        $data = [
          'id' => $this->id,
          'date' => $this->date,
          'time' => $this->time,
          'shift' => $this->shift,
          'occupation' => $this->occupation,
          'order' => $this->order,
          'from_checkin' => $this->from_checkin,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
        ];

        if ($this->relationLoaded('employee')) {
            $data['employee'] = $this->employee->toArray();
        }

        return $data;
    }
}
