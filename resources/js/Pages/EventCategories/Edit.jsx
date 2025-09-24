import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ eventCategory }) {
    const { data, setData, put, processing, errors } = useForm({
        name: eventCategory.name || "",
        description: eventCategory.description || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("event-categories.update", eventCategory.id));
    };

    const hasChanges =
        data.name !== eventCategory.name ||
        data.description !== eventCategory.description;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Categoria: {eventCategory.name}
                </h2>
            }
        >
            <Head title={`Editar: ${eventCategory.name}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nome da Categoria"
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Descrição (Opcional)"
                                    />
                                    <TextareaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows="4"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                {hasChanges && (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
                                        <h4 className="text-sm font-medium text-yellow-800">
                                            Preview das alterações:
                                        </h4>
                                        {data.name !== eventCategory.name && (
                                            <div className="text-sm">
                                                <span className="font-semibold">
                                                    Nome:
                                                </span>
                                                <span className="text-red-600 line-through ml-2">
                                                    {eventCategory.name}
                                                </span>
                                                <span className="mx-2">→</span>
                                                <span className="text-green-600 font-medium">
                                                    {data.name}
                                                </span>
                                            </div>
                                        )}
                                        {data.description !==
                                            eventCategory.description && (
                                            <div className="text-sm">
                                                <span className="font-semibold">
                                                    Descrição:
                                                </span>
                                                <span className="text-red-600 line-through ml-2">
                                                    {eventCategory.description ||
                                                        "Vazio"}
                                                </span>
                                                <span className="mx-2">→</span>
                                                <span className="text-green-600 font-medium">
                                                    {data.description ||
                                                        "Vazio"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-end space-x-4 pt-4">
                                    <Link
                                        href={route("event-categories.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={!hasChanges || processing}
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
