<?php

namespace App\Http\Controllers;

use App\Models\Institute;
use App\Http\Requests\StoreInstituteRequest;
use App\Http\Requests\UpdateInstituteRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InstituteController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Institute::class, 'institute');
    }

    public function index()
    {
        $institutes = Institute::latest()->paginate(10);

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
        $validated = $request->validated();

        Institute::create($validated);

        return Redirect::route('institutes.index')->with('message', 'Instituição criada com sucesso!');
    }

    public function show(Institute $institute)
    {
        return Inertia::render('Institutes/Show', [
            'institute' => $institute,
        ]);
    }

    public function edit(Institute $institute)
    {
        return Inertia::render('Institutes/Edit', [
            'institute' => $institute,
        ]);
    }

    public function update(UpdateInstituteRequest $request, Institute $institute)
    {
        $validated = $request->validated();

        $institute->update($validated);

        return Redirect::route('institutes.index')->with('message', 'Instituição atualizada com sucesso!');
    }

    public function destroy(Institute $institute)
    {
        $institute->delete();

        return Redirect::route('institutes.index')->with('message', 'Instituição removida com sucesso!');
    }
}
