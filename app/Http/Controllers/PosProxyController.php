<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class PosProxyController extends Controller
{
    public function invoices()
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => config('services.pos.api_key'),
            ])->get(config('services.pos.url') . '/api/third-party-invoices/today');

            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'POS system unreachable'], 502);
        }
    }

    public function markOnTheHouse($id)
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => config('services.pos.api_key'),
            ])->post(config('services.pos.url') . '/api/third-party-invoices/' . $id . '/on-the-house');

            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'POS system unreachable'], 502);
        }
    }

    public function storno($id)
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => config('services.pos.api_key'),
            ])->post(config('services.pos.url') . '/api/third-party-invoices/' . $id . '/storno');

            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'POS system unreachable'], 502);
        }
    }

    public function transactions()
    {
        try {
            $response = Http::withHeaders([
                'X-API-Key' => config('services.pos.api_key'),
            ])->get(config('services.pos.url') . '/api/third-party-invoices/today-transactions');

            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => 'POS system unreachable'], 502);
        }
    }
}
