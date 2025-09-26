<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'birth_date' => fake()->dateTimeBetween('-40 years', '-18 years')->format('Y-m-d'),
            'phone' => preg_replace('/\D+/', '', fake()->phoneNumber()),
            'role' => Role::VOLUNTEER,
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => Role::ADMIN,
        ]);
    }

    public function instituteManager(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => Role::INSTITUTE_MANAGER,
        ]);
    }

    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            if ($user->isVolunteer()) {
                $skillIds = Skill::query()->inRandomOrder()->limit(rand(1, 5))->pluck('id');
                $user->skills()->attach($skillIds);
            }
        });
    }
}
