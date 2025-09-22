import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ institute }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (
            confirm(
                `Tem certeza que deseja deletar a instituição "${institute.razao_social}"?`
            )
        ) {
            setIsDeleting(true);
            router.delete(route("institutes.destroy", institute.id), {
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detalhes da Instituição
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route("institutes.index")}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </Link>
                        <Link
                            href={route("institutes.edit", institute.id)}
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
            <Head title={`Instituição: ${institute.razao_social}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                                        Informações Básicas
                                    </h3>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            ID
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            #{institute.id}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Razão Social
                                        </dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {institute.razao_social}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            CNPJ
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {institute.cnpj}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            E-mail
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {institute.email}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Telefone
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {institute.telefone || "-"}
                                        </dd>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                                        Informações de Data
                                    </h3>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Data de Criação
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                institute.created_at
                                            ).toLocaleString("pt-BR")}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Última Atualização
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                institute.updated_at
                                            ).toLocaleString("pt-BR")}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Website
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {institute.website ? (
                                                <a
                                                    href={institute.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    {institute.website}
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </dd>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-8 w-8 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-blue-900">
                                                Instituição:{" "}
                                                {institute.razao_social}
                                            </h4>
                                            <p className="text-blue-700">
                                                Criada em{" "}
                                                {new Date(
                                                    institute.created_at
                                                ).toLocaleDateString("pt-BR")}
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Sobre
                                </h3>
                                <div className="prose max-w-none text-sm text-gray-800">
                                    {institute.sobre || "—"}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center space-x-4">
                                <Link
                                    href={route(
                                        "institutes.edit",
                                        institute.id
                                    )}
                                    className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700"
                                >
                                    Editar Instituição
                                </Link>

                                <Link
                                    href={route("institutes.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                >
                                    Voltar para Lista
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
