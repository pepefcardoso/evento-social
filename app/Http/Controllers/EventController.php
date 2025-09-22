<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Institute;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Event::class, 'event');
    }

    public function index()
    {
        $events = Event::with('institute')
            ->latest()
            ->paginate(10);

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        $institutes = Institute::orderBy('razao_social')->get();

        return Inertia::render('Events/Create', [
            'institutes' => $institutes,
        ]);
    }

    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();

        Event::create($validated);

        return Redirect::route('events.index')->with('message', 'Evento criado com sucesso!');
    }

    public function show(Event $event)
    {
        $event->load('institute');

        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event)
    {
        $event->load('institute');
        $institutes = Institute::orderBy('razao_social')->get();

        return Inertia::render('Events/Edit', [
            'event' => $event,
            'institutes' => $institutes,
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $validated = $request->validated();

        $event->update($validated);

        return Redirect::route('events.index')->with('message', 'Evento atualizado com sucesso!');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return Redirect::route('events.index')->with('message', 'Evento removido com sucesso!');
    }
}
