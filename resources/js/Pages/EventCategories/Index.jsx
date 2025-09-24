import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ eventCategories }) {
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = (eventCategory) => {
        if (
            confirm(
                `Tem certeza que deseja deletar a categoria "${eventCategory.name}"?`
            )
        ) {
            setIsDeleting(eventCategory.id);
            router.delete(route("event-categories.destroy", eventCategory.id), {
                onFinish: () => setIsDeleting(null),
            });
        }
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Categorias de Eventos
                    </h2>
                    <Link
                        href={route("event-categories.create")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Nova Categoria
                    </Link>
                </div>
            }
        >
            <Head title="Categorias de Eventos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {eventCategories.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        Nenhuma categoria de evento encontrada.
                                    </p>
                                    <Link
                                        href={route("event-categories.create")}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Criar primeira categoria
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
                                                    Nome
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Descrição
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Data de Criação
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {eventCategories.data.map(
                                                (category) => (
                                                    <tr
                                                        key={category.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {category.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {category.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {truncate(
                                                                category.description,
                                                                40
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(
                                                                category.created_at
                                                            ).toLocaleDateString(
                                                                "pt-BR"
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link
                                                                    href={route(
                                                                        "event-categories.show",
                                                                        category.id
                                                                    )}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Ver
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "event-categories.edit",
                                                                        category.id
                                                                    )}
                                                                    className="text-yellow-600 hover:text-yellow-900"
                                                                >
                                                                    Editar
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            category
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isDeleting ===
                                                                        category.id
                                                                    }
                                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                                >
                                                                    {isDeleting ===
                                                                    category.id
                                                                        ? "Deletando..."
                                                                        : "Deletar"}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {eventCategories.links &&
                                eventCategories.links.length > 3 && (
                                    <div className="mt-6 flex justify-center">
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {eventCategories.links.map(
                                                (link, index) => (
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
                                                            eventCategories
                                                                .links.length -
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
