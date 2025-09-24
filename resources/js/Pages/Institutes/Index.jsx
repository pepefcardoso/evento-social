import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const StatusBadge = ({ status }) => {
    const statusInfo = {
        approved: { class: "bg-green-100 text-green-800", label: "Aprovado" },
        pending: { class: "bg-yellow-100 text-yellow-800", label: "Pendente" },
        rejected: { class: "bg-red-100 text-red-800", label: "Reprovado" },
    };

    const info = status ? statusInfo[status] : null;
    const className = info ? info.class : "bg-gray-100 text-gray-800";
    const label = info ? info.label : "Não enviado";

    return (
        <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}
        >
            {label}
        </span>
    );
};

export default function Index({ institutes }) {
    const [isDeleting, setIsDeleting] = useState(null);

    const handleDelete = (institute) => {
        if (
            confirm(
                `Tem certeza que deseja deletar a instituição "${institute.razao_social}"?`
            )
        ) {
            setIsDeleting(institute.id);
            router.delete(route("institutes.destroy", institute.id), {
                onFinish: () => setIsDeleting(null),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Instituições
                    </h2>
                    <Link
                        href={route("institutes.create")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Nova Instituição
                    </Link>
                </div>
            }
        >
            <Head title="Instituições" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {institutes.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        Nenhuma instituição encontrada.
                                    </p>
                                    <Link
                                        href={route("institutes.create")}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Criar primeira instituição
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
                                                    Razão Social
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    CNPJ
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    E-mail
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status Verificação
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
                                            {institutes.data.map((inst) => (
                                                <tr
                                                    key={inst.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {inst.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {inst.razao_social}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {inst.cnpj}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {inst.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <StatusBadge
                                                            status={
                                                                inst
                                                                    .verified_doc
                                                                    ?.status
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            inst.created_at
                                                        ).toLocaleDateString(
                                                            "pt-BR"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "institutes.show",
                                                                    inst.id
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Ver
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "institutes.edit",
                                                                    inst.id
                                                                )}
                                                                className="text-yellow-600 hover:text-yellow-900"
                                                            >
                                                                Editar
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        inst
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDeleting ===
                                                                    inst.id
                                                                }
                                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                            >
                                                                {isDeleting ===
                                                                inst.id
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

                            {institutes.links &&
                                institutes.links.length > 3 && (
                                    <div className="mt-6 flex justify-center">
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {institutes.links.map(
                                                (link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || "#"}
                                                        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${
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
                                                            institutes.links
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
