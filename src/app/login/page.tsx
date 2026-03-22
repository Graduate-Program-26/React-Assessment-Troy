import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { githubSignIn } from "../actions/auth.actions";

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) redirect("/");

    return (
        <form action={githubSignIn}>
            <button type="submit">Sign in with GitHub</button>
        </form>
    );
}
