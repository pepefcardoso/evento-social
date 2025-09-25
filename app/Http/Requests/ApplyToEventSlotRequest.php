<?php

namespace App\Http\Requests;

use App\Models\EventSlot;
use Illuminate\Foundation\Http\FormRequest;

class ApplyToEventSlotRequest extends FormRequest
{
    public function authorize(): bool
    {
        $eventSlot = $this->route('eventSlot');

        $alreadyApplied = $this->user()->applications()->where('event_slot_id', $eventSlot->id)->exists();

        return $eventSlot->status === 'open' && !$alreadyApplied;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
