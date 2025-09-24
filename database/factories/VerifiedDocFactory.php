<?php

namespace Database\Factories;

use App\Models\VerifiedDoc;
use Illuminate\Database\Eloquent\Factories\Factory;

class VerifiedDocFactory extends Factory
{
    protected $model = VerifiedDoc::class;

    public function definition(): array
    {
        $status = $this->faker->randomElement(VerifiedDoc::statuses());

        return [
            'type' => $this->faker->randomElement(['Contrato Social', 'Cartão CNPJ']),
            'link' => 'verified_docs/fake_document.pdf',
            'status' => $status,
            'verification_date' => $status !== VerifiedDoc::STATUS_PENDING ? $this->faker->dateTimeThisYear() : null,
        ];
    }
}
