<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

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
            'street' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:100'],
            'neighborhood' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'size:2'],
            'postal_code' => ['required', 'string', 'size:8'],
            'verified_doc.type' => ['required', 'string', 'max:255'],
            'verified_doc.file' => [
                'required',
                File::types(['pdf', 'jpg', 'png'])->max(2 * 1024),
            ],
        ];
    }

    public function messages(): array
    {
        return [
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
            'verified_doc.type.required' => 'O tipo de documento é obrigatório.',
            'verified_doc.file.required' => 'O arquivo do documento é obrigatório.',
            'verified_doc.file.types' => 'O documento deve ser dos tipos: PDF, JPG ou PNG.',
            'verified_doc.file.max' => 'O tamanho do documento não pode exceder 2MB.',
        ];
    }
}
