<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SkillSeeder::class,
            InstituteSeeder::class,
            EventCategorySeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            EventSeeder::class,
            EventSlotSeeder::class,
        ]);
    }
}
