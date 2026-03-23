export default function MenuLoading() {
  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="py-10 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <div className="h-4 w-20 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-10 w-48 bg-white/10 rounded mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-72 bg-white/10 rounded mx-auto animate-pulse" />
      </div>
      <div className="sticky top-16 md:top-20 z-30 bg-dark-bg border-b border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-white/10 rounded-full animate-pulse shrink-0" />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {Array.from({ length: 3 }).map((_, si) => (
          <div key={si} className="py-10">
            <div className="h-8 w-40 bg-white/10 rounded mb-6 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card-bg rounded-2xl overflow-hidden border border-white/5 animate-pulse">
                  <div className="aspect-video bg-white/5" />
                  <div className="p-4">
                    <div className="h-4 bg-white/10 rounded mb-2" />
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
