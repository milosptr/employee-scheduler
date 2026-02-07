<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PinController extends Controller
{
    public function check(Request $request)
    {
        $valid = (int) $request->pin === config('services.pos.pin');

        return response()->json(['status' => $valid]);
    }
}
