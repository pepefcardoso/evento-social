<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventSlot;
use App\Models\Role;
use Illuminate\Database\Seeder;

class EventSlotSeeder extends Seeder
{
    public function run(): void
    {
        $events = Event::all();
        $roles = Role::all();

        if ($events->isEmpty() || $roles->isEmpty()) {
            return;
        }

        $events->each(function (Event $event) use ($roles) {
            for ($i = 0; $i < rand(2, 5); $i++) {
                EventSlot::factory()->create([
                    'event_id' => $event->id,
                    'role_id' => $roles->random()->id,
                ]);
            }
        });
    }
}
