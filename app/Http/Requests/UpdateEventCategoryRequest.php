<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateEventCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        $category = $this->route('event_category');
        if ($category && $category->events()->exists()) {
            return false;
        }
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('name')) {
            $this->merge([
                'slug' => Str::slug($this->input('name'))
            ]);
        }
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categoryId = $this->route('event_category')->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:event_categories,slug,' . $categoryId],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome da categoria é obrigatório.',
            'name.max' => 'O nome não pode ter mais de 255 caracteres.',
            'slug.required' => 'O slug é obrigatório.',
            'slug.unique' => 'Esta categoria já existe.',
            'description.max' => 'A descrição não pode ter mais de 1000 caracteres.',
        ];
    }
}
