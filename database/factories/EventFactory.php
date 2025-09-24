<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Institute;
use App\Models\Address;
use App\Models\EventCategory;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('now', '+1 month');
        $end = (clone $start)->modify('+' . rand(1, 7) . ' days');

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'start_date' => $start,
            'end_date' => $end,
            'status' => $this->faker->randomElement(['draft', 'published', 'cancelled']),
            'institute_id' => Institute::factory(),
            'address_id' => Address::factory(),
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function configure()
    {
        return $this->afterCreating(function (Event $event) {
            $categoryIds = EventCategory::all()->pluck('id');

            if ($categoryIds->isNotEmpty()) {
                $categoriesToAttach = $categoryIds->random(rand(1, 3))->toArray();
                $event->categories()->attach($categoriesToAttach);
            }
        });
    }
}
