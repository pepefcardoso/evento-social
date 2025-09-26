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

export default function Show({ auth, institute }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (
            confirm(
                `Tem certeza que deseja deletar a instituição "${institute.name}"?`
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
            user={auth.user}
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
            <Head title={`Instituição: ${institute.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                            Informações Básicas
                                        </h3>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Razão Social
                                            </dt>
                                            <dd className="mt-1 text-lg font-semibold">
                                                {institute.name}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                CNPJ
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {institute.cnpj}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                E-mail
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {institute.email}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Telefone
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {institute.phone ||
                                                    "Não informado"}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Website
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {institute.website ? (
                                                    <a
                                                        href={institute.website}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {institute.website}
                                                    </a>
                                                ) : (
                                                    "Não informado"
                                                )}
                                            </dd>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                            Endereço
                                        </h3>
                                        <address className="mt-1 text-sm not-italic">
                                            {`${institute.address.street}, ${institute.address.number}`}
                                            <br />
                                            {`${
                                                institute.address.neighborhood
                                            }, ${
                                                institute.address.city
                                            } - ${institute.address.state.toUpperCase()}`}
                                            <br />
                                            {`CEP: ${institute.address.postal_code}`}
                                        </address>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                            Documento de Verificação
                                        </h3>
                                        {institute.verified_doc ? (
                                            <>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Status
                                                    </dt>
                                                    <dd className="mt-1">
                                                        <StatusBadge
                                                            status={
                                                                institute
                                                                    .verified_doc
                                                                    .status
                                                            }
                                                        />
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Tipo de Documento
                                                    </dt>
                                                    <dd className="mt-1 text-sm">
                                                        {
                                                            institute
                                                                .verified_doc
                                                                .type
                                                        }
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Data da Verificação
                                                    </dt>
                                                    <dd className="mt-1 text-sm">
                                                        {institute.verified_doc
                                                            .verification_date
                                                            ? new Date(
                                                                  institute.verified_doc.verification_date
                                                              ).toLocaleDateString(
                                                                  "pt-BR"
                                                              )
                                                            : "Aguardando verificação"}
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Arquivo Enviado
                                                    </dt>
                                                    <dd className="mt-1 text-sm">
                                                        <a
                                                            href={`/storage/${institute.verified_doc.link}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Clique para ver o
                                                            documento
                                                        </a>
                                                    </dd>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="mt-1 text-sm text-gray-600 bg-gray-50 p-4 rounded-md border text-center">
                                                Nenhum documento de verificação
                                                foi enviado.
                                                <Link
                                                    href={route(
                                                        "institutes.edit",
                                                        institute.id
                                                    )}
                                                    className="text-blue-600 hover:underline font-semibold ml-1"
                                                >
                                                    Enviar agora
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                            Datas
                                        </h3>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Data de Criação
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {new Date(
                                                    institute.created_at
                                                ).toLocaleString("pt-BR")}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Última Atualização
                                            </dt>
                                            <dd className="mt-1 text-sm">
                                                {new Date(
                                                    institute.updated_at
                                                ).toLocaleString("pt-BR")}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {institute.sobre && (
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Sobre a Instituição
                                    </h3>
                                    <div className="mt-2 prose max-w-none text-sm">
                                        <p>{institute.sobre}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
