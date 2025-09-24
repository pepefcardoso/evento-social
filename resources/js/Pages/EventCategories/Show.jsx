import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ eventCategory }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (
            confirm(
                `Tem certeza que deseja deletar a categoria "${eventCategory.name}"?`
            )
        ) {
            setIsDeleting(true);
            router.delete(route("event-categories.destroy", eventCategory.id), {
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detalhes da Categoria
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route("event-categories.index")}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </Link>
                        <Link
                            href={route(
                                "event-categories.edit",
                                eventCategory.id
                            )}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        >
                            {isDeleting ? "Deletando..." : "Deletar"}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Categoria: ${eventCategory.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 text-gray-900 space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Informações da Categoria
                                </h3>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            ID
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            #{eventCategory.id}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Nome
                                        </dt>
                                        <dd className="mt-1 text-xl font-semibold text-gray-900">
                                            {eventCategory.name}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Slug
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                                            {eventCategory.slug}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Descrição
                                        </dt>
                                        <dd className="mt-1 text-base text-gray-800">
                                            {eventCategory.description ||
                                                "Nenhuma descrição fornecida."}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Datas de Registro
                                </h3>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Data de Criação
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                eventCategory.created_at
                                            ).toLocaleString("pt-BR")}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Última Atualização
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                eventCategory.updated_at
                                            ).toLocaleString("pt-BR")}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
