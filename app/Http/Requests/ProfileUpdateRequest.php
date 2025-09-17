<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $minDate = Carbon::now()->subYears(18)->toDateString();

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'birth_date' => ['required', 'date', 'before_or_equal:' . $minDate],
            'phone' => ['nullable', 'string', 'max:20', 'regex:/^[\d\s\(\)\-\+]+$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'birth_date.before_or_equal' => 'O usuário deve ter no mínimo 18 anos.',
            'birth_date.required' => 'A data de nascimento é obrigatória.',
            'phone.regex' => 'O telefone deve conter apenas números.',
        ];
    }
}
