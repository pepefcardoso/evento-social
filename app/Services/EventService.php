<?php

namespace App\Services;

use App\Models\Event;
use Illuminate\Support\Arr;

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
        $eventData = Arr::except($validatedData, array_keys($addressData));

        $address = $this->addressService->findOrCreate($addressData);

        $eventData['address_id'] = $address->id;

        return Event::create($eventData);
    }

    /**
     * @param Event $event O evento a ser atualizado.
     * @param array $validatedData Dados validados do UpdateEventRequest.
     * @return void
     */
    public function updateEvent(Event $event, array $validatedData): void
    {
        $addressData = Arr::only($validatedData, ['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postal_code']);
        $eventData = Arr::except($validatedData, array_keys($addressData));

        if (!empty($addressData)) {
            $address = $this->addressService->findOrCreate($addressData);
            $eventData['address_id'] = $address->id;
        }

        $event->update($eventData);
    }
}
