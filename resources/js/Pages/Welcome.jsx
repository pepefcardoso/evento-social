import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, events, institutes }) {
    return (
        <>
            <Head title="Bem-vindo" />
            <div className="bg-gray-100 text-gray-800">
                <div className="relative min-h-screen flex flex-col">
                    <header className="bg-white shadow-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    <h1 className="text-2xl font-bold text-blue-600">
                                        Voluntariado
                                    </h1>
                                </div>
                                <nav>
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="text-sm font-semibold text-gray-600 hover:text-gray-900 mr-4"
                                            >
                                                Entrar
                                            </Link>
                                            <Link
                                                href={route("register")}
                                                className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                                            >
                                                Registrar
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow">
                        <section className="bg-blue-600 text-white text-center py-20">
                            <div className="max-w-4xl mx-auto px-4">
                                <h2 className="text-4xl font-extrabold mb-4">
                                    Encontre Oportunidades de Voluntariado
                                </h2>
                                <p className="text-lg opacity-90 mb-8">
                                    Conecte-se com causas que importam e faça a
                                    diferença na sua comunidade.
                                </p>
                                <Link
                                    href={
                                        auth.user
                                            ? route("events.index")
                                            : route("register")
                                    }
                                    className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300"
                                >
                                    Comece Agora
                                </Link>
                            </div>
                        </section>

                        <section id="events" className="py-16 sm:py-24">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                                        Eventos Recentes
                                    </h3>
                                    <p className="mt-2 text-lg text-gray-600">
                                        Participe de uma ação e ajude a
                                        transformar vidas.
                                    </p>
                                </div>
                                {events.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {events.map((event) => (
                                            <div
                                                key={event.id}
                                                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                                            >
                                                <div className="p-6">
                                                    <p className="text-sm text-gray-500 mb-1">
                                                        {
                                                            event.institute
                                                                .razao_social
                                                        }
                                                    </p>
                                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                                        {event.title}
                                                    </h4>
                                                    <p className="text-gray-600 mb-4 h-16 overflow-hidden">
                                                        {event.description}
                                                    </p>
                                                    <div className="text-sm text-gray-500 mb-4">
                                                        <span>
                                                            Início em:{" "}
                                                            {new Date(
                                                                event.start_date
                                                            ).toLocaleDateString(
                                                                "pt-BR"
                                                            )}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "events.show",
                                                            event.id
                                                        )}
                                                        className="block w-full text-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                                                    >
                                                        Ver Vagas
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">
                                        Nenhum evento publicado no momento.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section
                            id="institutes"
                            className="bg-gray-200 py-16 sm:py-24"
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                                        Instituições Parceiras
                                    </h3>
                                    <p className="mt-2 text-lg text-gray-600">
                                        Conheça as organizações que fazem a
                                        diferença.
                                    </p>
                                </div>
                                {institutes.length > 0 ? (
                                    <div className="flex flex-wrap justify-center items-center gap-8">
                                        {institutes.map((institute) => (
                                            <div
                                                key={institute.id}
                                                className="p-4 bg-white rounded-lg shadow-md"
                                            >
                                                <p className="text-lg font-semibold text-gray-700">
                                                    {institute.razao_social}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">
                                        Nenhuma instituição cadastrada.
                                    </p>
                                )}
                            </div>
                        </section>
                    </main>

                    <footer className="bg-gray-800 text-white py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <p>
                                &copy; {new Date().getFullYear()} Plataforma de
                                Voluntariado. Todos os direitos reservados.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
