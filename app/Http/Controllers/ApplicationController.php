<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplyToEventSlotRequest;
use App\Http\Requests\RejectApplicationRequest;
use App\Models\Application;
use App\Models\Event;
use App\Models\EventSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    public function myApplications(Request $request): Response
    {
        $applications = Application::where('user_id', Auth::id())
            ->with(['eventSlot.event.institute', 'eventSlot.role'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Applications/MyApplications', [
            'applications' => $applications,
        ]);
    }

    public function apply(ApplyToEventSlotRequest $request, EventSlot $eventSlot)
    {
        Application::create([
            'user_id' => $request->user()->id,
            'event_slot_id' => $eventSlot->id,
        ]);

        return redirect()->back()->with('success', 'Candidatura enviada com sucesso!');
    }

    public function withdraw(Application $application)
    {
        $this->authorize('delete', $application);

        $application->delete();

        return redirect()->back()->with('success', 'Candidatura retirada com sucesso.');
    }

    public function eventApplications(Request $request, Event $event): Response
    {
        $this->authorize('viewAny', [Application::class, $event]);

        $slotIds = $event->eventSlots()->pluck('id');

        $applications = Application::whereIn('event_slot_id', $slotIds)
            ->with(['user', 'eventSlot.role'])
            ->paginate(15);

        return Inertia::render('Applications/EventApplications', [
            'event' => $event,
            'applications' => $applications,
        ]);
    }

    public function approve(Application $application)
    {
        $this->authorize('update', $application);

        $application->update(['status' => 'approved']);

        return redirect()->back()->with('success', 'Candidatura aprovada.');
    }

    public function reject(RejectApplicationRequest $request, Application $application)
    {
        $application->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Candidatura rejeitada.');
    }
}
