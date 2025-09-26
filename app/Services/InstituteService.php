<?php

namespace App\Services;

use App\Models\Institute;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InstituteService
{
    protected AddressService $addressService;
    protected VerifiedDocService $verifiedDocService;

    public function __construct(AddressService $addressService, VerifiedDocService $verifiedDocService)
    {
        $this->addressService = $addressService;
        $this->verifiedDocService = $verifiedDocService;
    }

    public function createInstituteWithManager(array $validatedData): Institute
    {
        $addressData = $validatedData['address'];
        $verifiedDocData = $validatedData['verified_doc'];
        $managerData = $validatedData['manager'];
        $instituteData = Arr::except($validatedData, ['address', 'verified_doc', 'manager']);

        return DB::transaction(function () use ($addressData, $verifiedDocData, $managerData, $instituteData) {
            $manager = User::create([
                'name' => $managerData['name'],
                'email' => $managerData['email'],
                'password' => Hash::make($managerData['password']),
                'birth_date' => $managerData['birth_date'],
                'phone' => $managerData['phone'],
                'role' => Role::INSTITUTE_MANAGER,
            ]);

            $address = $this->addressService->findOrCreate($addressData);

            $instituteData['address_id'] = $address->id;
            $instituteData['user_id'] = $manager->id;
            $instituteData['status'] = 'pending';

            $institute = Institute::create($instituteData);

            $this->verifiedDocService->handleUploadAndCreateOrUpdate($institute, $verifiedDocData);

            return $institute;
        });
    }

    public function approveInstitute(Institute $institute, User $approver): void
    {
        $institute->update([
            'status' => 'approved',
            'approved_by_user_id' => $approver->id,
            'approved_at' => now(),
            'rejection_reason' => null,
        ]);
    }

    public function rejectInstitute(Institute $institute, User $rejector, string $reason): void
    {
        $institute->update([
            'status' => 'rejected',
            'approved_by_user_id' => $rejector->id,
            'approved_at' => now(),
            'rejection_reason' => $reason,
        ]);
    }
}
