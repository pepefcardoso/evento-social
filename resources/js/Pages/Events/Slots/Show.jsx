import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ event, eventSlot }) {
    const formatStatus = (status) => {
        const statuses = {
            open: { text: "Aberta", color: "green" },
            closed: { text: "Fechada", color: "red" },
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
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detalhes da Vaga
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route("events.slots.index", event.id)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar para Vagas
                        </Link>
                        <Link
                            href={route("events.slots.edit", {
                                event: event.id,
                                slot: eventSlot.id,
                            })}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Editar Vaga
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Vaga: ${eventSlot.role.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Função: {eventSlot.role.name}
                                </h1>
                                <p className="mt-1 text-md text-gray-600">
                                    Para o evento:{" "}
                                    <Link
                                        href={route("events.show", event.id)}
                                        className="text-indigo-600 hover:underline"
                                    >
                                        {event.title}
                                    </Link>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Status
                                    </dt>
                                    <dd className="mt-1">
                                        {formatStatus(eventSlot.status)}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Quantidade de Vagas
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {eventSlot.amount}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Hora de Início
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {eventSlot.start_time.slice(0, 5)}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Hora de Fim
                                    </dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                                        {eventSlot.end_time.slice(0, 5)}
                                    </dd>
                                </div>
                            </div>

                            {eventSlot.details && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Detalhes Adicionais
                                    </h3>
                                    <div className="mt-2 prose max-w-none text-sm text-gray-800 bg-gray-50 p-4 rounded-lg">
                                        <p>{eventSlot.details}</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 border-t border-gray-200 pt-4 text-sm text-gray-500">
                                <span>
                                    Criado em:{" "}
                                    {new Date(
                                        eventSlot.created_at
                                    ).toLocaleString("pt-BR")}
                                </span>
                                <span className="mx-2">|</span>
                                <span>
                                    Última atualização:{" "}
                                    {new Date(
                                        eventSlot.updated_at
                                    ).toLocaleString("pt-BR")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
