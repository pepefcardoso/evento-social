<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Institute;
use App\Models\VerifiedDoc;
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
            'sobre' => $this->faker->paragraph(),
            'website' => $this->faker->url(),
            'address_id' => Address::factory(),
        ];
    }
    public function configure(): static
    {
        return $this->afterCreating(function (Institute $institute) {
            VerifiedDoc::factory()->create([
                'institute_id' => $institute->id,
            ]);
        });
    }
}
