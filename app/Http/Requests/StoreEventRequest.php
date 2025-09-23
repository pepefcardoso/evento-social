<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('postal_code')) {
            $this->merge(['postal_code' => preg_replace('/\D+/', '', $this->input('postal_code'))]);
        }
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:draft,published,cancelled'],
            'institute_id' => ['required', 'exists:institutes,id'],
            'street' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:100'],
            'neighborhood' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'size:2'],
            'postal_code' => ['required', 'string', 'size:8']
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'title.max' => 'O título não pode ter mais de 255 caracteres.',
            'start_date.required' => 'A data de início é obrigatória.',
            'start_date.after_or_equal' => 'A data de início deve ser hoje ou posterior.',
            'end_date.required' => 'A data de fim é obrigatória.',
            'end_date.after_or_equal' => 'A data de fim deve ser igual ou posterior à data de início.',
            'status.required' => 'O status é obrigatório.',
            'status.in' => 'Status inválido.',
            'institute_id.required' => 'A instituição é obrigatória.',
            'institute_id.exists' => 'Instituição não encontrada.',
            'street.required' => 'A rua é obrigatória.',
            'street.max' => 'A rua não pode ter mais de 255 caracteres.',
            'number.required' => 'O número é obrigatório.',
            'number.max' => 'O número não pode ter mais de 20 caracteres.',
            'complement.max' => 'O complemento não pode ter mais de 100 caracteres.',
            'neighborhood.required' => 'O bairro é obrigatório.',
            'neighborhood.max' => 'O bairro não pode ter mais de 100 caracteres.',
            'city.required' => 'A cidade é obrigatória.',
            'city.max' => 'A cidade não pode ter mais de 100 caracteres.',
            'state.required' => 'O estado é obrigatório.',
            'state.size' => 'O estado deve ter exatamente 2 caracteres.',
            'postal_code.required' => 'O CEP é obrigatório.',
            'postal_code.size' => 'O CEP deve ter 8 dígitos.',
        ];
    }
}
