<?php

namespace App\Services;

use App\Models\Address;
use Illuminate\Support\Arr;

class AddressService
{
    /**
     * @param array $addressData Dados do endereço validados.
     * @return Address O modelo de endereço encontrado ou recém-criado.
     */
    public function findOrCreate(array $addressData): Address
    {
        $searchableData = Arr::except($addressData, ['complement']);

        return Address::firstOrCreate($searchableData, $addressData);
    }
}
