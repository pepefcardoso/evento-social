<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Enums\InstituteStatus;

class Institute extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cnpj',
        'phone',
        'description',
        'website',
        'address_id',
        'user_id',
        'status',
        'approved_by_user_id',
        'approved_at',
        'rejection_reason',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'approved_at' => 'datetime',
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    public function isPending(): bool
    {
        return $this->status === InstituteStatus::PENDING->value;
    }

    public function isApproved(): bool
    {
        return $this->status === InstituteStatus::APPROVED->value;
    }

    public function isRejected(): bool
    {
        return $this->status === InstituteStatus::REJECTED->value;
    }
}
