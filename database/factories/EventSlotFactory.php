<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventSlot>
 */
class EventSlotFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = $this->faker->dateTimeThisMonth();
        $endTime = (clone $startTime)->modify('+' . rand(2, 8) . ' hours');

        return [
            'event_id' => Event::factory(),
            'role_id' => Role::factory(),
            'amount' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['open', 'closed', 'full']),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'details' => $this->faker->sentence(),
        ];
    }
}
