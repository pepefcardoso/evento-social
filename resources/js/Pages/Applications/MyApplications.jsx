import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function MyApplications({ applications }) {
    const [withdrawingId, setWithdrawingId] = useState(null);

    const handleWithdraw = (application) => {
        if (
            confirm(
                "Tem certeza que deseja retirar sua candidatura para esta vaga?"
            )
        ) {
            setWithdrawingId(application.id);
            router.delete(route("applications.withdraw", application.id), {
                preserveScroll: true,
                onFinish: () => setWithdrawingId(null),
            });
        }
    };

    const formatStatus = (status) => {
        const statuses = {
            pending: { text: "Pendente", color: "yellow" },
            approved: { text: "Aprovada", color: "green" },
            rejected: { text: "Rejeitada", color: "red" },
            cancelled: { text: "Cancelada", color: "gray" },
        };
        const s = statuses[status] || { text: status, color: "gray" };
        return (
            <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${s.color}-100 text-${s.color}-800`}
            >
                {s.text}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Minhas Candidaturas
                </h2>
            }
        >
            <Head title="Minhas Candidaturas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {applications.data.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">
                                        Você ainda não se candidatou a nenhuma
                                        vaga.
                                    </p>
                                    <Link
                                        href={route("events.index")}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Ver eventos disponíveis
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Evento
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vaga
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Data da Candidatura
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {applications.data.map((app) => (
                                                <tr
                                                    key={app.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <Link
                                                            href={route(
                                                                "events.show",
                                                                app.event_slot
                                                                    .event.id
                                                            )}
                                                            className="hover:underline"
                                                        >
                                                            {
                                                                app.event_slot
                                                                    .event.title
                                                            }
                                                        </Link>
                                                        <div className="text-xs text-gray-500">
                                                            {
                                                                app.event_slot
                                                                    .event
                                                                    .institute
                                                                    .razao_social
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {
                                                            app.event_slot.role
                                                                .name
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            app.created_at
                                                        ).toLocaleDateString(
                                                            "pt-BR"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatStatus(
                                                            app.status
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {app.status ===
                                                            "pending" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleWithdraw(
                                                                        app
                                                                    )
                                                                }
                                                                disabled={
                                                                    withdrawingId ===
                                                                    app.id
                                                                }
                                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                            >
                                                                {withdrawingId ===
                                                                app.id
                                                                    ? "Retirando..."
                                                                    : "Retirar Candidatura"}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
