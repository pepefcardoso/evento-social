<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:draft,published,cancelled'],
            'institute_id' => ['required', 'exists:institutes,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'title.max' => 'O título não pode ter mais de 255 caracteres.',
            'start_date.required' => 'A data de início é obrigatória.',
            'end_date.required' => 'A data de fim é obrigatória.',
            'end_date.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'Status inválido.',
            'institute_id.required' => 'A instituição é obrigatória.',
            'institute_id.exists' => 'Instituição não encontrada.',
        ];
    }
}
