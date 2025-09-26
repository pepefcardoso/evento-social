import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        cnpj: "",
        email: "",
        telefone: "",
        sobre: "",
        website: "",
        address: {
            postal_code: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
        },
        verified_doc: {
            type: "",
            file: null,
        },
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("institutes.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Criar Nova Instituição
                    </h2>
                    <Link
                        href={route("institutes.index")}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </div>
            }
        >
            <Head title="Criar Instituição" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Razão Social"
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nome / Razão social..."
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
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
                                        placeholder="Somente números"
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
                                        placeholder="contato@exemplo.com"
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
                                        placeholder="(48) 99999-9999"
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
                                        placeholder="https://exemplo.com"
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
                                                placeholder="Somente números"
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
                                        placeholder="Descrição breve sobre a instituição..."
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
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="verified_doc.type"
                                                value="Tipo de Documento"
                                            />
                                            <TextInput
                                                id="verified_doc.type"
                                                name="verified_doc.type"
                                                value={data.verified_doc.type}
                                                className="mt-1 block w-full"
                                                placeholder="Ex: Contrato Social, CNPJ..."
                                                onChange={(e) =>
                                                    setData(
                                                        "verified_doc.type",
                                                        e.target.value
                                                    )
                                                }
                                                required
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
                                                value="Arquivo do Documento"
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
                                                required
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
                                        href={route("institutes.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </Link>

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Criando..."
                                            : "Criar Instituição"}
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
