<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventSlotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event_id' => ['required', 'exists:events,id'],
            'role_id' => ['required', 'exists:roles,id'],
            'amount' => ['required', 'numeric', 'min:1'],
            'status' => ['required', 'in:open,closed'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after_or_equal:start_time'],
            'details' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'event_id.required' => 'O evento é obrigatório.',
            'event_id.exists' => 'O evento selecionado é inválido.',
            'role_id.required' => 'A função é obrigatória.',
            'role_id.exists' => 'A função selecionada é inválida.',
            'amount.required' => 'A quantidade de vagas é obrigatória.',
            'amount.numeric' => 'A quantidade deve ser um número.',
            'amount.min' => 'A quantidade deve ser de no mínimo 1.',
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'O status selecionado é inválido (opções: open, closed).',
            'start_time.required' => 'A hora de início é obrigatória.',
            'start_time.date_format' => 'O formato da hora de início é inválido (use HH:MM).',
            'end_time.required' => 'A hora de término é obrigatória.',
            'end_time.date_format' => 'O formato da hora de término é inválido (use HH:MM).',
            'end_time.after_or_equal' => 'A hora de término deve ser igual ou posterior à hora de início.',
        ];
    }
}
