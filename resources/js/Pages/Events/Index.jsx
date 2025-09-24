import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ events }) {
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = (event) => {
        if (
            confirm(`Tem certeza que deseja deletar o evento "${event.title}"?`)
        ) {
            setIsDeleting(event.id);
            router.delete(route("events.destroy", event.id), {
                onFinish: () => setIsDeleting(null),
            });
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
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${s.color}-100 text-${s.color}-800`}
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
                        Eventos
                    </h2>
                    <Link
                        href={route("events.create")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Novo Evento
                    </Link>
                </div>
            }
        >
            <Head title="Eventos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {events.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        Nenhum evento encontrado.
                                    </p>
                                    <Link
                                        href={route("events.create")}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Criar primeiro evento
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Título
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Instituição
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Início
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fim
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Categorias
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {events.data.map((event) => (
                                                <tr
                                                    key={event.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {event.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {event.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {
                                                            event.institute
                                                                .razao_social
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            event.start_date
                                                        ).toLocaleDateString(
                                                            "pt-BR"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            event.end_date
                                                        ).toLocaleDateString(
                                                            "pt-BR"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatStatus(
                                                            event.status
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex flex-wrap gap-1">
                                                            {event.categories.map(
                                                                (category) => (
                                                                    <span
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                                                                    >
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "events.show",
                                                                    event.id
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Ver
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "events.edit",
                                                                    event.id
                                                                )}
                                                                className="text-yellow-600 hover:text-yellow-900"
                                                            >
                                                                Editar
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        event
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDeleting ===
                                                                    event.id
                                                                }
                                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                            >
                                                                {isDeleting ===
                                                                event.id
                                                                    ? "Deletando..."
                                                                    : "Deletar"}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {events.links && events.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {events.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || "#"}
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
                                                    events.links.length - 1
                                                        ? "rounded-r-md"
                                                        : ""
                                                } border`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
