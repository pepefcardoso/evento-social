<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
        'postal_code',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function institutes(): HasMany
    {
        return $this->hasMany(Institute::class);
    }

    public static function findSimilar(array $addressData, ?int $excludeId = null): ?self
    {
        $query = self::where('street', $addressData['street'])
            ->where('number', $addressData['number'])
            ->where('neighborhood', $addressData['neighborhood'])
            ->where('city', $addressData['city'])
            ->where('state', $addressData['state'])
            ->where('postal_code', $addressData['postal_code']);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->first();
    }
}
