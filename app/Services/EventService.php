<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class EventService
{
    protected AddressService $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    /**
     * @param array $validatedData Dados validados do StoreEventRequest.
     * @return Event O evento recém-criado.
     */
    public function createEvent(array $validatedData): Event
    {
        $addressData = Arr::only($validatedData, ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postal_code']);
        $categoryIds = Arr::pull($validatedData, 'categories');
        $eventData = Arr::except($validatedData, array_keys($addressData));

        return DB::transaction(function () use ($eventData, $addressData, $categoryIds) {
            $address = $this->addressService->findOrCreate($addressData);
            $eventData['address_id'] = $address->id;

            $event = Event::create($eventData);

            if (!empty($categoryIds)) {
                $event->categories()->attach($categoryIds);
            }

            return $event;
        });
    }

    /**
     * @param Event $event O evento a ser atualizado.
     * @param array $validatedData Dados validados do UpdateEventRequest.
     * @return void
     */
    public function updateEvent(Event $event, array $validatedData): void
    {
        $addressData = Arr::only($validatedData, ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postal_code']);
        $categoryIds = Arr::pull($validatedData, 'categories');
        $eventData = Arr::except($validatedData, array_keys($addressData));

        DB::transaction(function () use ($event, $eventData, $addressData, $categoryIds) {
            if (!empty($addressData)) {
                $address = $this->addressService->findOrCreate($addressData);
                $eventData['address_id'] = $address->id;
            }

            $event->update($eventData);

            if (!is_null($categoryIds)) {
                $event->categories()->sync($categoryIds);
            }
        });
    }
}
