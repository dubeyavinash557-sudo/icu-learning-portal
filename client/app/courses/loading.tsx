export default function CoursesLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero skeleton */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

            <div className="space-y-5">
              <div className="h-8 w-52 animate-pulse rounded-full bg-white/10" />
              <div className="h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-white/10" />
              <div className="h-14 w-4/5 max-w-2xl animate-pulse rounded-2xl bg-white/10" />
              <div className="h-5 w-full max-w-2xl animate-pulse rounded-lg bg-white/10" />
              <div className="h-5 w-3/4 max-w-xl animate-pulse rounded-lg bg-white/10" />

              <div className="flex gap-3 pt-4">
                <div className="h-12 w-44 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-12 w-36 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-5">
              <div className="h-20 animate-pulse rounded-2xl bg-white/10" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <HeroStatSkeleton />
                <HeroStatSkeleton />
                <HeroStatSkeleton />
                <HeroStatSkeleton />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">

        <div className="mb-8 space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-9 w-80 max-w-full animate-pulse rounded-xl bg-slate-200" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
        </div>
      </section>
    </main>
  );
}

function HeroStatSkeleton() {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="h-7 w-14 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-20 animate-pulse rounded bg-white/10" />
    </div>
  );
}

function CourseSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[16/9] animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="flex gap-2">
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </article>
  );
}