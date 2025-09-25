import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function EventApplications({ event, applications }) {
    const handleAction = (application, action) => {
        const routeName =
            action === "approve"
                ? "applications.approve"
                : "applications.reject";
        const message =
            action === "approve"
                ? `Tem certeza que deseja aprovar a candidatura de ${application.user.name}?`
                : `Tem certeza que deseja rejeitar a candidatura de ${application.user.name}?`;

        if (confirm(message)) {
            router.patch(
                route(routeName, application.id),
                {},
                {
                    preserveScroll: true,
                }
            );
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
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Candidaturas para: {event.title}
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
            <Head title={`Candidaturas de ${event.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {applications.data.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Nenhuma candidatura recebida para este
                                    evento ainda.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Candidato
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vaga
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Data
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
                                                        {app.user.name}
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
                                                        "pending" ? (
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() =>
                                                                        handleAction(
                                                                            app,
                                                                            "approve"
                                                                        )
                                                                    }
                                                                    className="text-green-600 hover:text-green-900"
                                                                >
                                                                    Aprovar
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleAction(
                                                                            app,
                                                                            "reject"
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Rejeitar
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-500">
                                                                Ação concluída
                                                            </span>
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
