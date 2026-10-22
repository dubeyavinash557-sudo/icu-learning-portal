export default function CoursesLoading() {
  return (
    <main
      className="min-h-screen bg-slate-50"
      aria-label="Loading course catalogue"
      aria-busy="true"
    >
      {/* Hero */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-center">
            <div className="space-y-5">
              <div className="h-6 w-44 animate-pulse rounded-full bg-white/10" />

              <div className="space-y-3">
                <div className="h-9 w-full max-w-3xl animate-pulse rounded-xl bg-white/10 sm:h-12" />
                <div className="h-9 w-4/5 max-w-2xl animate-pulse rounded-xl bg-white/10 sm:h-12" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
                <div className="h-4 w-4/5 max-w-xl animate-pulse rounded bg-white/10" />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="h-11 w-40 animate-pulse rounded-xl bg-white/10" />
                <div className="h-11 w-32 animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>

            {/* Catalogue overview */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="h-5 w-44 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-white/10" />

              <div className="mt-6 grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <HeroStatSkeleton key={index} />
                ))}
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-cyan-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course catalogue */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* Section heading */}
        <div className="mb-7 space-y-3">
          <div className="h-3 w-32 animate-pulse rounded bg-blue-100" />
          <div className="h-7 w-72 max-w-full animate-pulse rounded-lg bg-slate-200 sm:h-9" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
        </div>

        {/* Search and filters */}
        <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-100" />
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 sm:w-32" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100 sm:w-36" />
          </div>
        </div>

        {/* Result summary */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Course cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className={`h-10 w-10 animate-pulse rounded-xl ${
                index === 0 ? "bg-blue-100" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </section>

      <span className="sr-only" role="status">
        Loading available courses. Please wait.
      </span>
    </main>
  );
}

function HeroStatSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="h-7 w-14 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-24 max-w-full animate-pulse rounded bg-white/10" />
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Course image */}
      <div className="relative aspect-[16/9] animate-pulse bg-slate-200">
        <div className="absolute left-4 top-4 h-6 w-20 rounded-full bg-white/50" />
      </div>

      {/* Course information */}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
          <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="h-11 w-full animate-pulse rounded-xl bg-blue-100" />
        </div>
      </div>
    </article>
  );
}
