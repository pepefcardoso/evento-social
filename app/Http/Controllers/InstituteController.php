<?php

namespace App\Http\Controllers;

use App\Models\Institute;
use App\Http\Requests\StoreInstituteRequest;
use App\Http\Requests\UpdateInstituteRequest;
use App\Services\InstituteService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InstituteController extends Controller
{
    protected InstituteService $instituteService;

    public function __construct(InstituteService $instituteService)
    {
        $this->authorizeResource(Institute::class, 'institute');
        $this->instituteService = $instituteService;
    }

    public function index()
    {
        $institutes = Institute::with(['address', 'verifiedDoc'])->latest()->paginate(10);

        return Inertia::render('Institutes/Index', [
            'institutes' => $institutes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Institutes/Create');
    }

    public function store(StoreInstituteRequest $request)
    {
        $this->instituteService->createInstitute($request->validated());

        return Redirect::route('institutes.index')->with('message', 'Instituição criada com sucesso!');
    }

    public function show(Institute $institute)
    {
        $institute->load(['address', 'verifiedDoc']);

        return Inertia::render('Institutes/Show', [
            'institute' => $institute,
        ]);
    }

    public function edit(Institute $institute)
    {
        $institute->load(['address', 'verifiedDoc']);

        return Inertia::render('Institutes/Edit', [
            'institute' => $institute,
        ]);
    }

    public function update(UpdateInstituteRequest $request, Institute $institute)
    {
        $this->instituteService->updateInstitute($institute, $request->validated());

        return Redirect::route('institutes.index')->with('message', 'Instituição atualizada com sucesso!');
    }

    public function destroy(Institute $institute)
    {
        $institute->delete();

        return Redirect::route('institutes.index')->with('message', 'Instituição removida com sucesso!');
    }
}
