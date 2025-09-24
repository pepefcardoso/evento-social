import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ event }) {
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
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detalhes do Evento
                    </h2>
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
                            Editar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Evento: ${event.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="border-b border-gray-200 pb-4 mb-6">
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
                                            {event.institute.razao_social}
                                        </Link>
                                    </span>
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
                                            <p className="text-sm text-gray-600">
                                                {`${
                                                    event.address.neighborhood
                                                }, ${
                                                    event.address.city
                                                } - ${event.address.state.toUpperCase()}`}
                                            </p>
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

                            <div className="mt-8 border-t border-gray-200 pt-4 text-sm text-gray-500">
                                <span>
                                    Criado em:{" "}
                                    {new Date(event.created_at).toLocaleString(
                                        "pt-BR"
                                    )}
                                </span>
                                <span className="mx-2">|</span>
                                <span>
                                    Última atualização:{" "}
                                    {new Date(event.updated_at).toLocaleString(
                                        "pt-BR"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
