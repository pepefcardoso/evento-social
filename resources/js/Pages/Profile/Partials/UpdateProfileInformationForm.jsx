import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            birth_date: user.birth_date || "",
            phone: user.phone || "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length <= 11) {
            if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, "($1");
            }
        }

        setData("phone", value);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informações do Perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Atualize as informações do seu perfil e endereço de email.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="birth_date"
                        value="Data de Nascimento"
                    />

                    <TextInput
                        id="birth_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.birth_date} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Telefone" />

                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.phone}
                        placeholder="(11) 99999-9999"
                        onChange={handlePhoneChange}
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Seu endereço de email não foi verificado.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-1"
                            >
                                Clique aqui para reenviar o email de
                                verificação.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Um novo link de verificação foi enviado para seu
                                endereço de email.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Salvar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Salvo.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
