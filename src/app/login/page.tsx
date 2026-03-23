import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { githubSignIn } from "../actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import { FaGithub } from "react-icons/fa";

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) redirect("/");

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={githubSignIn}>
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full gap-2 hover:cursor-pointer "
                        >
                            <FaGithub className="size-4 " />
                            Sign in with GitHub
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
