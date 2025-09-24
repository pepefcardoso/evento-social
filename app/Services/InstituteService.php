<?php

namespace App\Services;

use App\Models\Institute;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class InstituteService
{
    protected AddressService $addressService;
    protected VerifiedDocService $verifiedDocService;

    public function __construct(AddressService $addressService, VerifiedDocService $verifiedDocService)
    {
        $this->addressService = $addressService;
        $this->verifiedDocService = $verifiedDocService;
    }

    public function createInstitute(array $validatedData): Institute
    {
        $addressData = $validatedData['address'];
        $verifiedDocData = $validatedData['verified_doc'];
        $instituteData = Arr::except($validatedData, ['address', 'verified_doc']);

        return DB::transaction(function () use ($addressData, $verifiedDocData, $instituteData) {
            $address = $this->addressService->findOrCreate($addressData);
            $instituteData['address_id'] = $address->id;

            $institute = Institute::create($instituteData);

            $this->verifiedDocService->handleUploadAndCreateOrUpdate($institute, $verifiedDocData);

            return $institute;
        });
    }

    public function updateInstitute(Institute $institute, array $validatedData): void
    {
        $addressData = $validatedData['address'] ?? [];
        $verifiedDocData = $validatedData['verified_doc'] ?? [];
        $instituteData = Arr::except($validatedData, ['address', 'verified_doc']);

        DB::transaction(function () use ($institute, $addressData, $verifiedDocData, $instituteData) {
            if (!empty($addressData)) {
                $address = $this->addressService->findOrCreate($addressData);
                $instituteData['address_id'] = $address->id;
            }

            $institute->update($instituteData);

            if (!empty($verifiedDocData)) {
                $this->verifiedDocService->handleUploadAndCreateOrUpdate($institute, $verifiedDocData);
            }
        });
    }
}
