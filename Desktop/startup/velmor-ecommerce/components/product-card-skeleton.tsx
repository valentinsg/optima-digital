import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}
