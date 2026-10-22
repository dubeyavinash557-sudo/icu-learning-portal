export default function CourseDetailsLoading() {
  return (
    <main
      className="min-h-screen bg-slate-50"
      aria-label="Loading course details"
      aria-busy="true"
    >
      {/* Navigation skeleton */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200" />
          <div className="ml-auto h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </header>

      {/* Course hero */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div className="space-y-5">
              <div className="h-6 w-36 animate-pulse rounded-full bg-slate-800" />
              <div className="h-5 w-52 max-w-full animate-pulse rounded-lg bg-slate-800" />

              <div className="space-y-3">
                <div className="h-9 w-full max-w-3xl animate-pulse rounded-xl bg-slate-800 sm:h-12" />
                <div className="h-9 w-4/5 max-w-2xl animate-pulse rounded-xl bg-slate-800 sm:h-12" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-4/5 max-w-xl animate-pulse rounded bg-slate-800" />
              </div>

              <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="h-5 w-12 animate-pulse rounded bg-slate-800" />
                    <div className="mt-3 h-3 w-20 max-w-full animate-pulse rounded bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment / purchase card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="aspect-[16/9] animate-pulse bg-slate-200" />

              <div className="space-y-5 p-6">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="h-9 w-36 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />

                <div className="border-t border-slate-100 pt-4">
                  <div className="space-y-3">
                    {Array.from({ length: 3 }, (_, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-pulse rounded-md bg-slate-200" />
                        <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course statistics */}
      <section className="relative px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="border-b border-slate-100 p-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-28 max-w-full animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main course content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-6">
            <LoadingSection variant="description" />
            <LoadingSection variant="grid" />
            <LoadingSection variant="description" />
            <LoadingSection variant="curriculum" />
          </div>

          <aside className="space-y-6">
            <LoadingSidebar />
            <LoadingSidebar />
          </aside>
        </div>
      </div>

      <span className="sr-only" role="status">
        Course details are loading. Please wait.
      </span>
    </main>
  );
}

function LoadingSection({
  variant,
}: {
  variant: "description" | "grid" | "curriculum";
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-blue-50" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-52 max-w-full animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>

      {variant === "description" && (
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-4/5 max-w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-5 h-24 animate-pulse rounded-xl bg-slate-100" />
        </div>
      )}

      {variant === "grid" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div className="h-5 w-32 max-w-full animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {variant === "curriculum" && (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"
            >
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-100" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
              </div>
              <div className="h-5 w-5 animate-pulse rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function LoadingSidebar() {
  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-2 animate-pulse bg-blue-100" />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-3 border-t border-slate-100 pt-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
              <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </aside>
  );
}
