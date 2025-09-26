<?php

namespace Database\Factories;

use App\Enums\InstituteStatus;
use App\Models\Address;
use App\Models\Institute;
use App\Models\User;
use App\Models\VerifiedDoc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Institute>
 */
class InstituteFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'cnpj' => $this->faker->unique()->numerify('##############'),
            'phone' => preg_replace('/\D+/', '', $this->faker->phoneNumber()),
            'description' => $this->faker->paragraph(),
            'website' => $this->faker->url(),
            'address_id' => Address::factory(),
            'user_id' => User::factory()->instituteManager(),
            'status' => InstituteStatus::PENDING,
            'approved_by_user_id' => null,
            'approved_at' => null,
            'rejection_reason' => null,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => InstituteStatus::APPROVED,
            'approved_at' => now(),
            'approved_by_user_id' => User::factory()->admin(),
            'rejection_reason' => null,
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => InstituteStatus::REJECTED,
            'approved_at' => null,
            'approved_by_user_id' => User::factory()->admin(),
            'rejection_reason' => $this->faker->sentence(),
        ]);
    }

    /**
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Institute $institute) {
            VerifiedDoc::factory()->create([
                'institute_id' => $institute->id,
            ]);
        });
    }
}
