<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventSlotRequest;
use App\Http\Requests\UpdateEventSlotRequest;
use App\Models\Event;
use App\Models\EventSlot;
use App\Models\Role;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventSlotController extends Controller
{
    public function index(Event $event)
    {
        $slots = $event->eventSlots()
            ->with('role')
            ->latest()
            ->paginate(10);

        return Inertia::render('Events/Slots/Index', [
            'event' => $event,
            'eventSlots' => $slots,
        ]);
    }

    public function create(Event $event)
    {
        $roles = Role::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Events/Slots/Create', [
            'event' => $event,
            'roles' => $roles,
        ]);
    }

    public function store(StoreEventSlotRequest $request, Event $event)
    {
        $event->eventSlots()->create($request->validated());

        return Redirect::route('events.slots.index', $event)->with('message', 'Vaga criada com sucesso!');
    }

    public function show(Event $event, EventSlot $slot)
    {
        $slot->load('role');

        return Inertia::render('Events/Slots/Show', [
            'event' => $event,
            'eventSlot' => $slot,
        ]);
    }

    public function edit(Event $event, EventSlot $slot)
    {
        $roles = Role::orderBy('name')->get(['id', 'name']);
        $slot->load('role');

        return Inertia::render('Events/Slots/Edit', [
            'event' => $event,
            'eventSlot' => $slot,
            'roles' => $roles,
        ]);
    }

    public function update(UpdateEventSlotRequest $request, Event $event, EventSlot $slot)
    {
        $slot->update($request->validated());

        return Redirect::route('events.slots.index', $event)->with('message', 'Vaga atualizada com sucesso!');
    }

    public function destroy(Event $event, EventSlot $slot)
    {
        $slot->delete();

        return Redirect::route('events.slots.index', $event)->with('message', 'Vaga removida com sucesso!');
    }
}
