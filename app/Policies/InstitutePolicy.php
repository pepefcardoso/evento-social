<?php

namespace App\Policies;

use App\Models\Institute;
use App\Models\User;

class InstitutePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Institute $institute): bool
    {
        return $user->isAdmin() ||
               ($user->isInstituteManager() && $user->managedInstitute?->id === $institute->id);
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isVolunteer();
    }

    public function update(User $user, Institute $institute): bool
    {
        return $user->isAdmin() ||
               ($user->isInstituteManager() && $user->managedInstitute?->id === $institute->id);
    }

    public function delete(User $user, Institute $institute): bool
    {
        return $user->isAdmin();
    }

    public function approve(User $user, Institute $institute): bool
    {
        return $user->isAdmin() && $institute->isPending();
    }

    public function reject(User $user, Institute $institute): bool
    {
        return $user->isAdmin() && $institute->isPending();
    }
}
