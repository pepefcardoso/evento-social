<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Institute;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Services\EventService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventController extends Controller
{
    protected EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->authorizeResource(Event::class, 'event');
        $this->eventService = $eventService;
    }

    public function index()
    {
        $events = Event::with('institute', 'address', 'categories')
            ->latest()
            ->paginate(10);

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        $institutes = Institute::orderBy('name')->get();
        $allCategories = EventCategory::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Events/Create', [
            'institutes' => $institutes,
            'allCategories' => $allCategories,
        ]);
    }

    public function store(StoreEventRequest $request)
    {
        $this->eventService->createEvent($request->validated());
        return Redirect::route('events.index')->with('message', 'Evento criado com sucesso!');
    }

    public function show(Event $event)
    {
        $event->load('institute', 'address', 'categories', 'eventSlots.role');

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event)
    {
        $event->load('institute', 'address', 'categories');

        $institutes = Institute::orderBy('name')->get();
        $allCategories = EventCategory::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Events/Edit', [
            'event' => $event,
            'institutes' => $institutes,
            'allCategories' => $allCategories,
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $this->eventService->updateEvent($event, $request->validated());
        return Redirect::route('events.index')->with('message', 'Evento atualizado com sucesso!');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return Redirect::route('events.index')->with('message', 'Evento removido com sucesso!');
    }
}
