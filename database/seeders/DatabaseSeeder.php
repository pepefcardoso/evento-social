<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SkillSeeder;
use Database\Seeders\InstituteSeeder;
use Database\Seeders\EventSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->call(SkillSeeder::class);
        $this->call(InstituteSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(EventCategorySeeder::class);
    }
}
