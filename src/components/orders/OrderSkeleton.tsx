export default function OrderSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="rounded-2xl border border-light bg-white p-6">
        <div className="h-3 w-20 bg-light rounded mb-3" />
        <div className="h-6 w-56 bg-light rounded mb-4" />
        <div className="h-3 w-72 bg-light rounded mb-6" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-1 h-8 bg-light rounded" />
          ))}
        </div>
      </div>

      {/* Two info panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[0, 1].map((c) => (
          <div key={c} className="rounded-2xl border border-light bg-white p-6">
            <div className="h-4 w-32 bg-light rounded mb-5" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="h-2 w-16 bg-light rounded mb-2" />
                  <div className="h-4 w-28 bg-light rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Attachments */}
      <div className="rounded-2xl border border-light bg-white p-6">
        <div className="h-4 w-24 bg-light rounded mb-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 bg-light/60 rounded-xl mb-3" />
        ))}
      </div>
    </div>
  );
}
