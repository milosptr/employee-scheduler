<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ArrivalResource extends JsonResource
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
            'employee_name' => $this->employee->name,
            'employee_active' => $this->employee->active,
            'total' => Carbon::parse($this->check_out)->diff(Carbon::parse($this->check_in))->format('%H:%I'),
            'check_in' => Carbon::parse($this->check_in)->format('H:i:s'),
            'check_out' => $this->check_out ? Carbon::parse($this->check_out)->format('H:i:s') : null,
            'created_at' => $this->created_at,
            'created_date' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'updated_at' => $this->updated_at,
        ];
    }
}
