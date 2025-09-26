import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ institutes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "draft",
        institute_id: "",
        postal_code: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        categories: [],
    });

    const handleCategoryChange = (categoryId) => {
        const currentCategories = data.categories;
        const newCategories = currentCategories.includes(categoryId)
            ? currentCategories.filter((id) => id !== categoryId)
            : [...currentCategories, categoryId];

        setData("categories", newCategories);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("events.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Criar Novo Evento
                    </h2>
                    <Link
                        href={route("events.index")}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Voltar
                    </Link>
                </div>
            }
        >
            <Head title="Criar Evento" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value="Título do Evento"
                                    />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="institute_id"
                                        value="Instituição"
                                    />
                                    <select
                                        id="institute_id"
                                        name="institute_id"
                                        value={data.institute_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "institute_id",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Selecione uma instituição
                                        </option>
                                        {institutes.map((institute) => (
                                            <option
                                                key={institute.id}
                                                value={institute.id}
                                            >
                                                {institute.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.institute_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel value="Categorias" />
                                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {allCategories.map((category) => (
                                            <label
                                                key={category.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    value={category.id}
                                                    checked={data.categories.includes(
                                                        category.id
                                                    )}
                                                    onChange={() =>
                                                        handleCategoryChange(
                                                            category.id
                                                        )
                                                    }
                                                />
                                                <span className="ms-2 text-sm text-gray-600">
                                                    {category.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError
                                        message={errors.categories}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="start_date"
                                            value="Data de Início"
                                        />
                                        <TextInput
                                            id="start_date"
                                            type="date"
                                            name="start_date"
                                            value={data.start_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.start_date}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="end_date"
                                            value="Data de Fim"
                                        />
                                        <TextInput
                                            id="end_date"
                                            type="date"
                                            name="end_date"
                                            value={data.end_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.end_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="draft">Rascunho</option>
                                        <option value="published">
                                            Publicado
                                        </option>
                                        <option value="cancelled">
                                            Cancelado
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="pt-4 border-t mt-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                        Endereço do Evento
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
                                    <InputLabel
                                        htmlFor="description"
                                        value="Descrição"
                                    />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        rows={4}
                                        placeholder="Detalhes sobre o evento..."
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href={route("events.index")}
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
                                            : "Criar Evento"}
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
