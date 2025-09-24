<?php

namespace App\Http\Controllers;

use App\Models\EventCategory;
use App\Http\Requests\StoreEventCategoryRequest;
use App\Http\Requests\UpdateEventCategoryRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventCategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(EventCategory::class, 'event_category');
    }

    public function index()
    {
       $eventCategories = EventCategory::withCount('events')->latest()->paginate(10);

        return Inertia::render('EventCategories/Index', [
            'eventCategories' => $eventCategories,
        ]);
    }

    public function create()
    {
        return Inertia::render('EventCategories/Create');
    }

    public function store(StoreEventCategoryRequest $request)
    {
        EventCategory::create($request->validated());

        return Redirect::route('event-categories.index')->with('message', 'Categoria criada com sucesso!');
    }

    public function show(EventCategory $eventCategory)
    {
        return Inertia::render('EventCategories/Show', [
            'eventCategory' => $eventCategory,
        ]);
    }

    public function edit(EventCategory $eventCategory)
    {
        return Inertia::render('EventCategories/Edit', [
            'eventCategory' => $eventCategory,
        ]);
    }

    public function update(UpdateEventCategoryRequest $request, EventCategory $eventCategory)
    {
        $eventCategory->update($request->validated());

        return Redirect::route('event-categories.index')->with('message', 'Categoria atualizada com sucesso!');
    }

    public function destroy(EventCategory $eventCategory)
    {
        if ($eventCategory->events()->exists()) {
            return Redirect::route('event-categories.index')
                ->with('error', 'Esta categoria não pode ser removida pois está associada a um ou mais eventos.');
        }

        $eventCategory->delete();

        return Redirect::route('event-categories.index')->with('message', 'Categoria removida com sucesso!');
    }
}
