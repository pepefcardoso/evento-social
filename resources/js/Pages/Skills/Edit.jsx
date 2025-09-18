import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ skill }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: skill.name || "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("skills.update", skill.id), {
            onFinish: () => {
                if (Object.keys(errors).length > 0) {
                    reset("name");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Skill: {skill.name}
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route("skills.show", skill.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Ver Detalhes
                        </Link>
                        <Link
                            href={route("skills.index")}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Voltar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Editar: ${skill.name}`} />

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
                                        #{skill.id}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Criado em:
                                        </span>{" "}
                                        {new Date(
                                            skill.created_at
                                        ).toLocaleDateString("pt-BR")}
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nome da Skill"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Digite o nome da skill..."
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />

                                    <p className="mt-2 text-sm text-gray-500">
                                        Digite um nome único para esta skill.
                                    </p>
                                </div>

                                {data.name !== skill.name && (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <h4 className="text-sm font-medium text-yellow-800 mb-2">
                                            Preview das alterações:
                                        </h4>
                                        <div className="text-sm">
                                            <span className="text-red-600 line-through">
                                                {skill.name}
                                            </span>
                                            <span className="mx-2">→</span>
                                            <span className="text-green-600 font-medium">
                                                {data.name}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-end space-x-4">
                                    <Link
                                        href={route("skills.show", skill.id)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </Link>

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={
                                            processing ||
                                            data.name === skill.name
                                        }
                                    >
                                        {processing
                                            ? "Salvando..."
                                            : "Salvar Alterações"}
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-blue-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-blue-800">
                                            Dica
                                        </h3>
                                        <div className="mt-2 text-sm text-blue-700">
                                            <p>
                                                Certifique-se de que o nome da
                                                skill seja descritivo e único.
                                                Isso facilitará a identificação
                                                e organização.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
