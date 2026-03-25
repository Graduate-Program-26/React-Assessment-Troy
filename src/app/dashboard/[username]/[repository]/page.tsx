import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/shadcn/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/avatar";
import { Star, GitFork, Eye, CircleDot, ArrowLeft } from "lucide-react";
import { getCommits } from "@/src/app/lib/github/get-commits";
import { getContributors } from "@/src/app/lib/github/get-contributors";
import { getReadme } from "@/src/app/lib/github/get-readme";
import { getRepository } from "@/src/app/lib/github/get-repository";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";

const RAW_BASE = "https://raw.githubusercontent.com";
export default async function RepositoryPage({
    params,
}: {
    params: Promise<{ username: string; repository: string }>;
}) {
    const { username, repository } = await params;

    const [repo, commits, contributors, readme] = await Promise.allSettled([
        getRepository(username, repository),
        getCommits(username, repository),
        getContributors(username, repository),
        getReadme(username, repository),
    ]);

    if (repo.status === "rejected") {
        notFound();
    }

    const repoData = repo.value;
    const commitsData = commits.status === "fulfilled" ? commits.value : [];
    const contributorsData =
        contributors.status === "fulfilled" ? contributors.value : [];
    const readmeData = readme.status === "fulfilled" ? readme.value : null;

    return (
        <div className="mx-auto max-w-5xl space-y-8 p-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/dashboard/${username}`}>
                                {username}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{repoData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold">{repoData.name}</h1>
                    <Badge variant="outline">{repoData.visibility}</Badge>
                    {repoData.fork && <Badge variant="secondary">Fork</Badge>}
                </div>
                {repoData.description && (
                    <p className="text-muted-foreground">
                        {repoData.description}
                    </p>
                )}
                {repoData.homepage && (
                    <a
                        href={repoData.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        {repoData.homepage}
                    </a>
                )}
                {repoData.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {repoData.topics.map((topic) => (
                            <Badge key={topic} variant="secondary">
                                {topic}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <Star className="size-4" />
                    {repoData.stargazers_count.toLocaleString()} stars
                </span>
                <span className="flex items-center gap-1.5">
                    <GitFork className="size-4" />
                    {repoData.forks_count.toLocaleString()} forks
                </span>
                <span className="flex items-center gap-1.5">
                    <Eye className="size-4" />
                    {repoData.watchers_count.toLocaleString()} watching
                </span>
                <span className="flex items-center gap-1.5">
                    <CircleDot className="size-4" />
                    {repoData.open_issues_count.toLocaleString()} issues
                </span>
                {repoData.language && (
                    <span className="flex items-center gap-1.5">
                        <span className="size-3 rounded-full bg-primary" />
                        {repoData.language}
                    </span>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {readmeData && (
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    README
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <article className="prose prose-sm dark:prose-invert max-w-none">
                                    {/* also incredibly hacky but it is what it is at this point the problem is that the images in the md are located in a file in the repo
                                        but i dont have working filetree here. So replace their srcs with the url of the repo and GET the files that way
                                    */}
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            img({ src, alt, ...props }) {
                                                const isRelative =
                                                    typeof src === "string" &&
                                                    !src.startsWith("http");
                                                const resolvedSrc = isRelative
                                                    ? `${RAW_BASE}/${username}/${repository}/HEAD/${src.replace(/^\.?\//, "")}`
                                                    : src;
                                                return (
                                                    <img
                                                        src={resolvedSrc}
                                                        alt={alt ?? ""}
                                                        {...props}
                                                    />
                                                );
                                            },
                                        }}
                                    >
                                        {readmeData}
                                    </ReactMarkdown>
                                </article>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    {commitsData.length > 0 && (
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    Recent Commits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {commitsData.map((commit) => (
                                    <a
                                        key={commit.sha}
                                        href={commit.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block space-y-0.5 rounded-md p-2 hover:bg-muted"
                                    >
                                        <p className="line-clamp-1 text-sm font-medium">
                                            {
                                                commit.commit.message.split(
                                                    "\n",
                                                )[0]
                                            }
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {commit.commit.author.name} &middot;{" "}
                                            {new Date(
                                                commit.commit.author.date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </a>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {contributorsData.length > 0 && (
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    Contributors
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {contributorsData.map((contributor) => (
                                    <a
                                        key={contributor.login}
                                        href={contributor.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                                    >
                                        <Avatar className="size-7">
                                            <AvatarImage
                                                src={contributor.avatar_url}
                                                alt={contributor.login}
                                            />
                                            <AvatarFallback>
                                                {contributor.login
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="flex-1 text-sm font-medium">
                                            {contributor.login}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {contributor.contributions.toLocaleString()}
                                        </span>
                                    </a>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
