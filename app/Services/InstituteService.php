<?php

namespace App\Services;

use App\Models\Institute;
use Illuminate\Support\Arr;

class InstituteService
{
    protected AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    /**
     * @param array $validatedData Dados validados do StoreInstituteRequest.
     * @return Institute A instituição recém-criada.
     */
    public function createInstitute(array $validatedData): Institute
    {
        $addressData = Arr::only($validatedData, ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postal_code']);
        $instituteData = Arr::except($validatedData, array_keys($addressData));

        $address = $this->addressService->findOrCreate($addressData);

        $instituteData['address_id'] = $address->id;

        return Institute::create($instituteData);
    }

    /**
     * @param Institute $institute A instituição a ser atualizada.
     * @param array $validatedData Dados validados do UpdateInstituteRequest.
     * @return void
     */
    public function updateInstitute(Institute $institute, array $validatedData): void
    {
        $addressData = Arr::only($validatedData, ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postal_code']);
        $instituteData = Arr::except($validatedData, array_keys($addressData));

        if (!empty($addressData)) {
            $address = $this->addressService->findOrCreate($addressData);
            $instituteData['address_id'] = $address->id;
        }

        $institute->update($instituteData);
    }
}
