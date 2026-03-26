import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { GitBranch } from "lucide-react";

export default function Page() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
            <div className="max-w-xl w-full flex flex-col items-center gap-8 text-center">
                <div className="flex items-center gap-3">
                    <GitBranch
                        className="w-8 h-8 text-emerald-400"
                        strokeWidth={1.5}
                    />
                    <span className="text-sm text-zinc-500 uppercase">
                        Troy's Github Dash Viewer
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-zinc-400 text-base">
                        Search Github to find any user, view the public repos
                        and activity.
                    </p>
                </div>

                <Button
                    asChild
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium rounded-xl h-11"
                >
                    <Link href="/login">Proceed</Link>
                </Button>

                <p className="text-xs text-zinc-600">
                    You can login securely with Github oAuth, I see none of your
                    private details :)
                </p>
            </div>
        </main>
    );
}
