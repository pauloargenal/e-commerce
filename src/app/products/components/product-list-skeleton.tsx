export function ProductListSkeleton() {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-6 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="bg-white/80 rounded-2xl shadow-lg border border-slate-200/60 p-5">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 h-12 bg-slate-200 rounded-xl" />
          <div className="w-14 h-12 bg-slate-200 rounded-xl" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-slate-200 rounded-lg" />
          <div className="flex-1 h-10 bg-slate-200 rounded-lg" />
          <div className="w-12 h-10 bg-slate-200 rounded-lg" />
        </div>
      </div>

      {/* Results Count Skeleton */}
      <div className="h-6 w-32 bg-slate-200 rounded" />

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletonItems.map((item) => (
          <div
            key={`skeleton-${item}`}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="aspect-square bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-slate-200 rounded w-20" />
                <div className="h-8 bg-slate-200 rounded-lg w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
