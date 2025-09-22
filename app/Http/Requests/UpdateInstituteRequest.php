<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        if ($this->has('telefone')) {
            $this->merge(['telefone' => preg_replace('/\D+/', '', $this->input('telefone'))]);
        }
    }

    public function rules(): array
    {
        $instituteId = $this->route('institute')?->id;

        return [
            'razao_social' => ['required', 'string', 'max:255'],
            'cnpj' => [
                'required',
                'string',
                'size:14',
                Rule::unique('institutes', 'cnpj')->ignore($instituteId),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('institutes', 'email')->ignore($instituteId),
            ],
            'telefone' => ['nullable', 'string', 'max:20'],
            'sobre' => ['nullable', 'string'],
            'website' => ['nullable', 'url', 'max:255'],
        ];
    }
}
