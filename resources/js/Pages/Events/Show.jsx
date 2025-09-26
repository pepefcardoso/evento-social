import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ event }) {
    const [isDeletingSlot, setIsDeletingSlot] = useState(null);

    const handleSlotDelete = (slot) => {
        if (
            confirm(
                `Tem certeza que deseja deletar a vaga para "${slot.role.name}"?`
            )
        ) {
            setIsDeletingSlot(slot.id);
            router.delete(
                route("events.slots.destroy", {
                    event: event.id,
                    slot: slot.id,
                }),
                {
                    onFinish: () => setIsDeletingSlot(null),
                    preserveScroll: true,
                }
            );
        }
    };

    const formatStatus = (status) => {
        const statuses = {
            draft: { text: "Rascunho", color: "gray" },
            published: { text: "Publicado", color: "green" },
            cancelled: { text: "Cancelado", color: "red" },
        };
        const s = statuses[status] || { text: status, color: "gray" };
        return (
            <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-${s.color}-100 text-${s.color}-800`}
            >
                {s.text}
            </span>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Evento: ${event.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {event.title}
                                    </h1>
                                    <div className="mt-2 flex items-center space-x-4">
                                        {formatStatus(event.status)}
                                        <span className="text-sm text-gray-500">
                                            Organizado por:
                                            <Link
                                                href={route(
                                                    "institutes.show",
                                                    event.institute.id
                                                )}
                                                className="ml-1 text-indigo-600 hover:underline"
                                            >
                                                {event.institute.name}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route("events.index")}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Voltar
                                    </Link>
                                    <Link
                                        href={route("events.edit", event.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Editar Evento
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Data de Início
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {new Date(
                                            event.start_date
                                        ).toLocaleString("pt-BR")}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Data de Fim
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {new Date(
                                            event.end_date
                                        ).toLocaleString("pt-BR")}
                                    </dd>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    🏷️ Categorias
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {event.categories &&
                                    event.categories.length > 0 ? (
                                        event.categories.map((category) => (
                                            <span
                                                key={category.id}
                                                className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800"
                                            >
                                                {category.name}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Nenhuma categoria associada a este
                                            evento.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    📍 Localização
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                                    {event.address ? (
                                        <>
                                            <p className="font-semibold">
                                                {`${event.address.street}, ${event.address.number}`}
                                                {event.address.complement &&
                                                    ` - ${event.address.complement}`}
                                            </p>
                                            <p className="text-sm text-gray-600">{`${
                                                event.address.neighborhood
                                            }, ${
                                                event.address.city
                                            } - ${event.address.state.toUpperCase()}`}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                CEP: {event.address.postal_code}
                                            </p>
                                        </>
                                    ) : (
                                        <p>Endereço não informado.</p>
                                    )}
                                </div>
                            </div>

                            {event.description && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Sobre o Evento
                                    </h3>
                                    <div className="prose max-w-none text-sm text-gray-800 bg-gray-50 p-4 rounded-lg">
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Quadro de Vagas
                                </h3>
                                <Link
                                    href={route(
                                        "events.slots.create",
                                        event.id
                                    )}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Adicionar Nova Vaga
                                </Link>
                            </div>

                            {event.event_slots &&
                            event.event_slots.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Função
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vagas
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Horário
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {event.event_slots.map((slot) => (
                                                <tr
                                                    key={slot.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {slot.role.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {slot.amount}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${slot.start_time.slice(
                                                        0,
                                                        5
                                                    )} - ${slot.end_time.slice(
                                                        0,
                                                        5
                                                    )}`}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "events.slots.edit",
                                                                    {
                                                                        event: event.id,
                                                                        slot: slot.id,
                                                                    }
                                                                )}
                                                                className="text-yellow-600 hover:text-yellow-900"
                                                            >
                                                                Editar
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleSlotDelete(
                                                                        slot
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDeletingSlot ===
                                                                    slot.id
                                                                }
                                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                            >
                                                                {isDeletingSlot ===
                                                                slot.id
                                                                    ? "Excluindo..."
                                                                    : "Excluir"}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">
                                        Nenhuma vaga cadastrada para este evento
                                        ainda.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
