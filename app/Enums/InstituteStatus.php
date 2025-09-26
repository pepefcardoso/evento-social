<?php

namespace App\Enums;

enum InstituteStatus: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';

    public function label(): string
    {
        return match($this) {
            self::PENDING => 'Pendente',
            self::APPROVED => 'Aprovado',
            self::REJECTED => 'Reprovado',
        };
    }

    public static function values(): array
    {
        return array_map(fn(InstituteStatus $r) => $r->value, self::cases());
    }
}
