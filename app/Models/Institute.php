<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Institute extends Model
{
    use HasFactory;

    protected $fillable = [
        'razao_social',
        'cnpj',
        'email',
        'telefone',
        'sobre',
        'website',
        'address_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function verifiedDoc(): HasOne
    {
        return $this->hasOne(VerifiedDoc::class);
    }
}
