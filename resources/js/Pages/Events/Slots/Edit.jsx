import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ event, roles, eventSlot }) {
    const { data, setData, put, processing, errors } = useForm({
        role_id: eventSlot.role_id || "",
        amount: eventSlot.amount || 1,
        start_time: eventSlot.start_time?.slice(0, 5) || "",
        end_time: eventSlot.end_time?.slice(0, 5) || "",
        status: eventSlot.status || "open",
        details: eventSlot.details || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(
            route("events.slots.update", {
                event: event.id,
                slot: eventSlot.id,
            })
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Vaga para: {event.title}
                </h2>
            }
        >
            <Head title="Editar Vaga" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="role_id"
                                        value="Função"
                                    />
                                    <select
                                        id="role_id"
                                        name="role_id"
                                        value={data.role_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("role_id", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Selecione uma função
                                        </option>
                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.role_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="amount"
                                        value="Quantidade de Vagas"
                                    />
                                    <TextInput
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={data.amount}
                                        className="mt-1 block w-full"
                                        min="1"
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="start_time"
                                            value="Hora de Início"
                                        />
                                        <TextInput
                                            id="start_time"
                                            type="time"
                                            name="start_time"
                                            value={data.start_time}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "start_time",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.start_time}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="end_time"
                                            value="Hora de Fim"
                                        />
                                        <TextInput
                                            id="end_time"
                                            type="time"
                                            name="end_time"
                                            value={data.end_time}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "end_time",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.end_time}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
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
                                    >
                                        <option value="open">Aberta</option>
                                        <option value="closed">Fechada</option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="details"
                                        value="Detalhes (Opcional)"
                                    />
                                    <textarea
                                        id="details"
                                        name="details"
                                        value={data.details}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("details", e.target.value)
                                        }
                                        rows="3"
                                    ></textarea>
                                    <InputError
                                        message={errors.details}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <Link
                                        href={route("events.show", event.id)}
                                        className="text-gray-600 hover:text-gray-900 mr-4"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing
                                            ? "Atualizando..."
                                            : "Atualizar Vaga"}
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
