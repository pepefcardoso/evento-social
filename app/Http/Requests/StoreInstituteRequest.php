<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstituteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('cnpj')) {
            $this->merge(['cnpj' => preg_replace('/\D+/', '', $this->input('cnpj'))]);
        }
        if ($this->has('telefone')) {
            $this->merge(['telefone' => preg_replace('/\D+/', '', $this->input('telefone'))]);
        }
        if ($this->has('postal_code')) {
            $this->merge(['postal_code' => preg_replace('/\D+/', '', $this->input('postal_code'))]);
        }
    }

    public function rules(): array
    {
        return [
            'razao_social' => ['required', 'string', 'max:255'],
            'cnpj' => ['required', 'string', 'size:14', 'unique:institutes,cnpj'],
            'email' => ['required', 'email', 'max:255', 'unique:institutes,email'],
            'telefone' => ['nullable', 'string', 'max:20'],
            'sobre' => ['nullable', 'string'],
            'website' => ['nullable', 'url', 'max:255'],
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
