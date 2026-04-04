import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-80" />
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Skeleton className="h-9 w-full sm:w-72" />
                    <Skeleton className="h-9 w-36" />
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
            </div>

            <div className="rounded-xl border bg-background p-4">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>

            <div className="flex justify-center">
                <Skeleton className="h-11 w-72 rounded-2xl" />
            </div>
        </div>
    )
}
