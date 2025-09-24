import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

const statusInfo = {
    pending: { class: "bg-yellow-100 text-yellow-800", label: "Pendente" },
    approved: { class: "bg-green-100 text-green-800", label: "Aprovado" },
    rejected: { class: "bg-red-100 text-red-800", label: "Reprovado" },
};

export default function Edit({ institute }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        razao_social: institute.razao_social || "",
        cnpj: institute.cnpj || "",
        email: institute.email || "",
        telefone: institute.telefone || "",
        sobre: institute.sobre || "",
        website: institute.website || "",
        address: {
            postal_code: institute.address?.postal_code || "",
            street: institute.address?.street || "",
            number: institute.address?.number || "",
            complement: institute.address?.complement || "",
            neighborhood: institute.address?.neighborhood || "",
            city: institute.address?.city || "",
            state: institute.address?.state || "",
        },
        verified_doc: {
            type: institute.verified_doc?.type || "",
            file: null,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("institutes.update", institute.id), {
            onSuccess: () => reset("verified_doc.file"),
        });
    };

    const renderStatusBadge = (status) => {
        const info = status ? statusInfo[status] : null;
        const className = info ? info.class : "bg-gray-100 text-gray-800";
        const label = info ? info.label : "Não enviado";
        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}
            >
                {label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Instituição: {institute.razao_social}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route("institutes.show", institute.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Ver Detalhes
                        </Link>
                        <Link
                            href={route("institutes.index")}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Editar: ${institute.razao_social}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                    Informações Atuais
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">ID:</span>{" "}
                                        #{institute.id}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Criado em:
                                        </span>{" "}
                                        {new Date(
                                            institute.created_at
                                        ).toLocaleDateString("pt-BR")}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            CNPJ:
                                        </span>{" "}
                                        {institute.cnpj}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            E-mail:
                                        </span>{" "}
                                        {institute.email}
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={submit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="razao_social"
                                        value="Razão Social"
                                    />
                                    <TextInput
                                        id="razao_social"
                                        name="razao_social"
                                        value={data.razao_social}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "razao_social",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.razao_social}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cnpj" value="CNPJ" />
                                    <TextInput
                                        id="cnpj"
                                        name="cnpj"
                                        value={data.cnpj}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData("cnpj", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.cnpj}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="E-mail"
                                    />
                                    <TextInput
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="telefone"
                                        value="Telefone"
                                    />
                                    <TextInput
                                        id="telefone"
                                        name="telefone"
                                        value={data.telefone}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData("telefone", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.telefone}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="website"
                                        value="Website"
                                    />
                                    <TextInput
                                        id="website"
                                        name="website"
                                        value={data.website}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData("website", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.website}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="pt-4 border-t mt-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                        Endereço da Instituição
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="address.postal_code"
                                                value="CEP"
                                            />
                                            <TextInput
                                                id="address.postal_code"
                                                name="address.postal_code"
                                                value={data.address.postal_code}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "address.postal_code",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        "address.postal_code"
                                                    ]
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="address.street"
                                                    value="Rua"
                                                />
                                                <TextInput
                                                    id="address.street"
                                                    name="address.street"
                                                    value={data.address.street}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.street",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors["address.street"]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="address.number"
                                                    value="Número"
                                                />
                                                <TextInput
                                                    id="address.number"
                                                    name="address.number"
                                                    value={data.address.number}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.number",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors["address.number"]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="address.neighborhood"
                                                    value="Bairro"
                                                />
                                                <TextInput
                                                    id="address.neighborhood"
                                                    name="address.neighborhood"
                                                    value={
                                                        data.address
                                                            .neighborhood
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.neighborhood",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            "address.neighborhood"
                                                        ]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="address.complement"
                                                    value="Complemento"
                                                />
                                                <TextInput
                                                    id="address.complement"
                                                    name="address.complement"
                                                    value={
                                                        data.address.complement
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.complement",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            "address.complement"
                                                        ]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="address.city"
                                                    value="Cidade"
                                                />
                                                <TextInput
                                                    id="address.city"
                                                    name="address.city"
                                                    value={data.address.city}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.city",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors["address.city"]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="address.state"
                                                    value="Estado (UF)"
                                                />
                                                <TextInput
                                                    id="address.state"
                                                    name="address.state"
                                                    value={data.address.state}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "address.state",
                                                            e.target.value
                                                        )
                                                    }
                                                    maxLength="2"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors["address.state"]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="sobre" value="Sobre" />
                                    <textarea
                                        id="sobre"
                                        name="sobre"
                                        value={data.sobre}
                                        onChange={(e) =>
                                            setData("sobre", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        rows={4}
                                    />
                                    <InputError
                                        message={errors.sobre}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="pt-4 border-t mt-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                        Documento de Verificação
                                    </h3>

                                    {institute.verified_doc ? (
                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                                <div className="col-span-2">
                                                    <span className="font-medium">
                                                        Status Atual:{" "}
                                                    </span>
                                                    {renderStatusBadge(
                                                        institute.verified_doc
                                                            .status
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Tipo:
                                                    </span>{" "}
                                                    {
                                                        institute.verified_doc
                                                            .type
                                                    }
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Arquivo:{" "}
                                                    </span>
                                                    <a
                                                        href={`/storage/${institute.verified_doc.link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Ver Documento Atual
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg border">
                                            Nenhum documento de verificação foi
                                            enviado.
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="verified_doc.type"
                                                value="Alterar Tipo de Documento"
                                            />
                                            <TextInput
                                                id="verified_doc.type"
                                                name="verified_doc.type"
                                                value={data.verified_doc.type}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "verified_doc.type",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors["verified_doc.type"]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                htmlFor="verified_doc.file"
                                                value="Enviar Novo Documento (Opcional)"
                                            />
                                            <input
                                                id="verified_doc.file"
                                                name="verified_doc.file"
                                                type="file"
                                                className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                accept=".pdf,image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "verified_doc.file",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors["verified_doc.file"]
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href={route(
                                            "institutes.show",
                                            institute.id
                                        )}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </Link>

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Salvando..."
                                            : "Salvar Alterações"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
