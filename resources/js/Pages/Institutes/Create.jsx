import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        razao_social: "",
        cnpj: "",
        email: "",
        telefone: "",
        sobre: "",
        website: "",
        postal_code: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
    });

    post(route("institutes.store"), {
        onFinish: () =>
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
            ]),
    });

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
                                        placeholder="Nome / Razão social..."
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
                                                placeholder="Somente números"
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
                                        placeholder="Descrição breve sobre a instituição..."
                                    />
                                    <InputError
                                        message={errors.sobre}
                                        className="mt-2"
                                    />
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
