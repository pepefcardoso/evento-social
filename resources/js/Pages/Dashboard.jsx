import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, stats, recentApplications }) {
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

    const StatCard = ({ title, value, color }) => (
        <div
            className={`bg-white overflow-hidden shadow-sm rounded-lg border-l-4 ${color}`}
        >
            <div className="p-6">
                <p className="text-sm font-medium text-gray-500 truncate">
                    {title}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Olá, {auth.user.name}!
                        </h3>
                        <p className="text-gray-600">
                            Aqui está um resumo de suas atividades de
                            voluntariado.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total de Candidaturas"
                            value={stats.total}
                            color="border-blue-500"
                        />
                        <StatCard
                            title="Aprovadas"
                            value={stats.approved}
                            color="border-green-500"
                        />
                        <StatCard
                            title="Pendentes"
                            value={stats.pending}
                            color="border-yellow-500"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Link
                            href={route("events.index")}
                            className="block p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            <h4 className="font-bold text-lg">
                                Procurar Novos Eventos
                            </h4>
                            <p>
                                Encontre novas oportunidades para voluntariar.
                            </p>
                        </Link>
                        <Link
                            href={route("applications.my")}
                            className="block p-6 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
                        >
                            <h4 className="font-bold text-lg">
                                Minhas Candidaturas
                            </h4>
                            <p>
                                Acompanhe o status de todas as suas
                                candidaturas.
                            </p>
                        </Link>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h4 className="text-lg font-semibold mb-4">
                                Suas Candidaturas Recentes
                            </h4>
                            {recentApplications.length > 0 ? (
                                <ul className="space-y-4">
                                    {recentApplications.map((app) => (
                                        <li
                                            key={app.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                        >
                                            <div>
                                                <p className="font-semibold text-blue-700">
                                                    {app.event_slot.event.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Vaga:{" "}
                                                    {app.event_slot.role.name}
                                                </p>
                                            </div>
                                            {formatStatus(app.status)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    Você ainda não possui candidaturas.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
