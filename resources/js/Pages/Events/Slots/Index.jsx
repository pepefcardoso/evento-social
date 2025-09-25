import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ event, eventSlots }) {
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Vagas para o Evento: {event.title}
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route("events.show", event.id)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar ao Evento
                        </Link>
                        <Link
                            href={route("events.slots.create", event.id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Adicionar Nova Vaga
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Vagas de ${event.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {eventSlots.data.length > 0 ? (
                                <>
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
                                                {eventSlots.data.map((slot) => (
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

                                    {eventSlots.links &&
                                        eventSlots.links.length > 3 && (
                                            <div className="mt-6 flex justify-center">
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                    {eventSlots.links.map(
                                                        (link, index) => (
                                                            <Link
                                                                key={index}
                                                                href={
                                                                    link.url ||
                                                                    "#"
                                                                }
                                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                                    link.active
                                                                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                                        : link.url
                                                                        ? "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                                        : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                                                                } ${
                                                                    index === 0
                                                                        ? "rounded-l-md"
                                                                        : ""
                                                                } ${
                                                                    index ===
                                                                    eventSlots
                                                                        .links
                                                                        .length -
                                                                        1
                                                                        ? "rounded-r-md"
                                                                        : ""
                                                                } border`}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </nav>
                                            </div>
                                        )}
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        Nenhuma vaga cadastrada para este evento
                                        ainda.
                                    </p>
                                    <Link
                                        href={route(
                                            "events.slots.create",
                                            event.id
                                        )}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Criar Primeira Vaga
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
