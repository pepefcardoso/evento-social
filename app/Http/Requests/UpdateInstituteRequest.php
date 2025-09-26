<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateInstituteRequest extends FormRequest
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
        if ($this->has('phone')) {
            $this->merge(['phone' => preg_replace('/\D+/', '', $this->input('phone'))]);
        }
        if ($this->has('address.postal_code')) {
            $this->merge(['address.postal_code' => preg_replace('/\D+/', '', $this->input('address.postal_code'))]);
        }
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $instituteId = $this->route('institute')?->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'cnpj' => [
                'sometimes',
                'required',
                'string',
                'size:14',
                Rule::unique('institutes', 'cnpj')->ignore($instituteId),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'website' => ['nullable', 'url', 'max:255'],

            'address.street' => ['sometimes', 'required', 'string', 'max:255'],
            'address.number' => ['sometimes', 'required', 'string', 'max:20'],
            'address.complement' => ['nullable', 'string', 'max:100'],
            'address.neighborhood' => ['sometimes', 'required', 'string', 'max:100'],
            'address.city' => ['sometimes', 'required', 'string', 'max:100'],
            'address.state' => ['sometimes', 'required', 'string', 'size:2'],
            'address.postal_code' => ['sometimes', 'required', 'string', 'size:8'],

            'verified_doc.type' => ['sometimes', 'required', 'string', 'max:255'],
            'verified_doc.file' => [
                'sometimes',
                'required',
                File::types(['pdf', 'jpg', 'png'])->max(2 * 1024),
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A razão social é obrigatória.',
            'name.max' => 'A razão social não pode ter mais de 255 caracteres.',
            'cnpj.required' => 'O CNPJ é obrigatório.',
            'cnpj.size' => 'O CNPJ deve ter 14 dígitos.',
            'cnpj.unique' => 'Este CNPJ já está em uso.',
            'website.url' => 'A URL do website é inválida.',

            'address.street.required' => 'A rua é obrigatória.',
            'address.street.max' => 'A rua não pode ter mais de 255 caracteres.',
            'address.number.required' => 'O número é obrigatório.',
            'address.number.max' => 'O número não pode ter mais de 20 caracteres.',
            'address.complement.max' => 'O complemento não pode ter mais de 100 caracteres.',
            'address.neighborhood.required' => 'O bairro é obrigatório.',
            'address.neighborhood.max' => 'O bairro não pode ter mais de 100 caracteres.',
            'address.city.required' => 'A cidade é obrigatória.',
            'address.city.max' => 'A cidade não pode ter mais de 100 caracteres.',
            'address.state.required' => 'O estado é obrigatório.',
            'address.state.size' => 'O estado deve ter exatamente 2 caracteres.',
            'address.postal_code.required' => 'O CEP é obrigatório.',
            'address.postal_code.size' => 'O CEP deve ter 8 dígitos.',

            'verified_doc.type.required' => 'O tipo de documento é obrigatório.',
            'verified_doc.file.required' => 'O arquivo do documento é obrigatório.',
            'verified_doc.file.types' => 'O documento deve ser dos tipos: PDF, JPG ou PNG.',
            'verified_doc.file.max' => 'O tamanho do documento não pode exceder 2MB.',
        ];
    }
}
