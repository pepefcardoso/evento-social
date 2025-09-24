<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateInstituteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $instituteId = $this->route('institute')?->id;

        return [
            'razao_social' => ['sometimes', 'required', 'string', 'max:255'],
            'cnpj' => [
                'sometimes',
                'required',
                'string',
                'size:14',
                Rule::unique('institutes', 'cnpj')->ignore($instituteId),
            ],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('institutes', 'email')->ignore($instituteId),
            ],
            'telefone' => ['nullable', 'string', 'max:20'],
            'sobre' => ['nullable', 'string'],
            'website' => ['nullable', 'url', 'max:255'],
            'street' => ['sometimes', 'required', 'string', 'max:255'],
            'number' => ['sometimes', 'required', 'string', 'max:20'],
            'complement' => ['nullable', 'string', 'max:100'],
            'neighborhood' => ['sometimes', 'required', 'string', 'max:100'],
            'city' => ['sometimes', 'required', 'string', 'max:100'],
            'state' => ['sometimes', 'required', 'string', 'size:2'],
            'postal_code' => ['sometimes', 'required', 'string', 'size:8'],
            'verified_doc.type' => ['sometimes', 'required', 'string', 'max:255'],
            'verified_doc.file' => [
                'sometimes',
                'required',
                File::types(['pdf', 'jpg', 'png'])->max(2 * 1024),
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'razao_social.required' => 'A razão social é obrigatória.',
            'razao_social.max' => 'A razão social não pode ter mais de 255 caracteres.',
            'cnpj.required' => 'O CNPJ é obrigatório.',
            'cnpj.size' => 'O CNPJ deve ter 14 dígitos.',
            'cnpj.unique' => 'Este CNPJ já está em uso.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Forneça um e-mail válido.',
            'email.max' => 'O e-mail não pode ter mais de 255 caracteres.',
            'email.unique' => 'Este e-mail já está em uso.',
            'website.url' => 'A URL do website é inválida.',
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
