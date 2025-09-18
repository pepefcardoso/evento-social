import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ skill }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (
            confirm(`Tem certeza que deseja deletar a skill "${skill.name}"?`)
        ) {
            setIsDeleting(true);
            router.delete(route("skills.destroy", skill.id), {
                onSuccess: () => {},
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detalhes da Skill
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route("skills.index")}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </Link>
                        <Link
                            href={route("skills.edit", skill.id)}
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
            <Head title={`Skill: ${skill.name}`} />

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
                                            #{skill.id}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Nome
                                        </dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {skill.name}
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
                                                skill.created_at
                                            ).toLocaleString("pt-BR")}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Última Atualização
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(
                                                skill.updated_at
                                            ).toLocaleString("pt-BR")}
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
                                                Skill: {skill.name}
                                            </h4>
                                            <p className="text-blue-700">
                                                Esta skill foi criada em{" "}
                                                {new Date(
                                                    skill.created_at
                                                ).toLocaleDateString("pt-BR")}
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center space-x-4">
                                <Link
                                    href={route("skills.edit", skill.id)}
                                    className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    Editar Skill
                                </Link>

                                <Link
                                    href={route("skills.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
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
