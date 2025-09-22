<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Institute>
 */
class InstituteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'razao_social' => $this->faker->company(),
            'cnpj' => $this->faker->unique()->numerify('##############'),
            'email' => $this->faker->unique()->companyEmail(),
            'telefone' => preg_replace('/\D+/', '', $this->faker->phoneNumber()),
            'sobre' => $this->faker->optional()->paragraph(),
            'website' => $this->faker->optional()->url(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
