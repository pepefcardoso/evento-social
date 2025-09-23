import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ institute }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        razao_social: institute.razao_social || "",
        cnpj: institute.cnpj || "",
        email: institute.email || "",
        telefone: institute.telefone || "",
        sobre: institute.sobre || "",
        website: institute.website || "",
        postal_code: institute.address?.postal_code || "",
        street: institute.address?.street || "",
        number: institute.address?.number || "",
        complement: institute.address?.complement || "",
        neighborhood: institute.address?.neighborhood || "",
        city: institute.address?.city || "",
        state: institute.address?.state || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("institutes.update", institute.id), {
            onFinish: () => {
                if (Object.keys(errors).length > 0) {
                    reset([
                        "razao_social",
                        "cnpj",
                        "email",
                        "telefone",
                        "sobre",
                        "website",
                        "postal_code",
                        "street",
                        "number",
                        "complement",
                        "neighborhood",
                        "city",
                        "state",
                    ]);
                }
            },
        });
    };

    const changed = () =>
        data.razao_social !== institute.razao_social ||
        data.cnpj !== institute.cnpj ||
        data.email !== institute.email ||
        data.telefone !== (institute.telefone || "") ||
        data.sobre !== (institute.sobre || "") ||
        data.website !== (institute.website || "") ||
        data.postal_code !== (institute.address?.postal_code || "") ||
        data.street !== (institute.address?.street || "") ||
        data.number !== (institute.address?.number || "") ||
        data.complement !== (institute.address?.complement || "") ||
        data.neighborhood !== (institute.address?.neighborhood || "") ||
        data.city !== (institute.address?.city || "") ||
        data.state !== (institute.address?.state || "");

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

                            <form onSubmit={submit} className="space-y-6">
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
                                                htmlFor="postal_code"
                                                value="CEP"
                                            />
                                            <TextInput
                                                id="postal_code"
                                                name="postal_code"
                                                value={data.postal_code}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "postal_code",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.postal_code}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="street"
                                                    value="Rua"
                                                />
                                                <TextInput
                                                    id="street"
                                                    name="street"
                                                    value={data.street}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "street",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.street}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="number"
                                                    value="Número"
                                                />
                                                <TextInput
                                                    id="number"
                                                    name="number"
                                                    value={data.number}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "number",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.number}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="neighborhood"
                                                    value="Bairro"
                                                />
                                                <TextInput
                                                    id="neighborhood"
                                                    name="neighborhood"
                                                    value={data.neighborhood}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "neighborhood",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.neighborhood
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="complement"
                                                    value="Complemento"
                                                />
                                                <TextInput
                                                    id="complement"
                                                    name="complement"
                                                    value={data.complement}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "complement",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.complement}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <InputLabel
                                                    htmlFor="city"
                                                    value="Cidade"
                                                />
                                                <TextInput
                                                    id="city"
                                                    name="city"
                                                    value={data.city}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "city",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={errors.city}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="state"
                                                    value="Estado (UF)"
                                                />
                                                <TextInput
                                                    id="state"
                                                    name="state"
                                                    value={data.state}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "state",
                                                            e.target.value
                                                        )
                                                    }
                                                    maxLength="2"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.state}
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

                                {changed() && (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <h4 className="text-sm font-medium text-yellow-800 mb-2">
                                            Preview das alterações:
                                        </h4>
                                        <div className="text-sm space-y-1">
                                            <div>
                                                <span className="font-medium">
                                                    Razão Social:
                                                </span>{" "}
                                                <span className="text-red-600 line-through">
                                                    {institute.razao_social}
                                                </span>
                                                <span className="mx-2">→</span>
                                                <span className="text-green-600 font-medium">
                                                    {data.razao_social}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    CNPJ:
                                                </span>{" "}
                                                <span className="text-red-600 line-through">
                                                    {institute.cnpj}
                                                </span>
                                                <span className="mx-2">→</span>
                                                <span className="text-green-600 font-medium">
                                                    {data.cnpj}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    E-mail:
                                                </span>{" "}
                                                <span className="text-red-600 line-through">
                                                    {institute.email}
                                                </span>
                                                <span className="mx-2">→</span>
                                                <span className="text-green-600 font-medium">
                                                    {data.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                                        disabled={processing || !changed()}
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
