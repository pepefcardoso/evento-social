<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rules\Password;

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
        if ($this->has('phone')) {
            $this->merge(['phone' => preg_replace('/\D+/', '', $this->input('phone'))]);
        }
        if ($this->has('postal_code')) {
            $this->merge(['postal_code' => preg_replace('/\D+/', '', $this->input('postal_code'))]);
        }
        if ($this->has('manager.phone')) {
            $this->merge(['manager.phone' => preg_replace('/\D+/', '', $this->input('manager.phone'))]);
        }
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'cnpj' => ['required', 'string', 'size:14', 'unique:institutes,cnpj'],
            'phone' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'website' => ['nullable', 'url', 'max:255'],

            'manager.name' => ['required', 'string', 'max:255'],
            'manager.email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'manager.password' => ['required', 'confirmed', Password::defaults()],
            'manager.birth_date' => ['required', 'date', 'before:today'],
            'manager.phone' => ['nullable', 'string', 'max:20'],

            'address.street' => ['required', 'string', 'max:255'],
            'address.number' => ['required', 'string', 'max:20'],
            'address.complement' => ['nullable', 'string', 'max:100'],
            'address.neighborhood' => ['required', 'string', 'max:100'],
            'address.city' => ['required', 'string', 'max:100'],
            'address.state' => ['required', 'string', 'size:2'],
            'address.postal_code' => ['required', 'string', 'size:8'],

            'verified_doc.type' => ['required', 'string', 'max:255'],
            'verified_doc.file' => ['required', File::types(['pdf', 'jpg', 'png'])->max(2 * 1024)],
        ];
    }
}
