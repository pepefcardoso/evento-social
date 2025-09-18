<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SkillController extends Controller
{
public function __construct()
    {
        $this->authorizeResource(Skill::class, 'skill');
    }

    public function index()
    {
        $skills = Skill::latest()->paginate(10);

        return Inertia::render('Skills/Index', [
            'skills' => $skills,
        ]);
    }

    public function create()
    {
        return Inertia::render('Skills/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Skill::create($validated);

        return Redirect::route('skills.index')->with('message', 'Skill criada com sucesso!');
    }

    public function show(Skill $skill)
    {
        return Inertia::render('Skills/Show', [
            'skill' => $skill,
        ]);
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $skill->update($validated);

        return Redirect::route('skills.index')->with('message', 'Skill atualizada com sucesso!');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return Redirect::route('skills.index')->with('message', 'Skill removida com sucesso!');
    }
}
