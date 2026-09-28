<?php

namespace App\Http\Controllers;

use App\Models\LegalEntity;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function legalEntities()
    {
        $legalEntities = LegalEntity::latest()->get();

        return Inertia::render('Tenants/Organization/LegalEntities', [
            'legalEntities' => $legalEntities,
        ]);
    }
}