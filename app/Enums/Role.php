<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case INSTITUTE_MANAGER = 'institute_manager';
    case VOLUNTEER = 'volunteer';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Admin',
            self::INSTITUTE_MANAGER => 'Gerente do Instituto',
            self::VOLUNTEER => 'Voluntário',
        };
    }

    public static function values(): array
    {
        return array_map(fn(Role $r) => $r->value, self::cases());
    }
}
