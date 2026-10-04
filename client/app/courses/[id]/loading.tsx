export default function CourseDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      {/* Navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="h-9 w-36 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Hero */}
      <section className="overflow-hidden bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-5">
              <div className="h-8 w-40 animate-pulse rounded-full bg-slate-800" />

              <div className="h-5 w-72 animate-pulse rounded-lg bg-slate-800" />

              <div className="h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-slate-800" />

              <div className="h-14 w-4/5 max-w-2xl animate-pulse rounded-2xl bg-slate-800" />

              <div className="h-6 w-full max-w-2xl animate-pulse rounded-lg bg-slate-800" />

              <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                <SkeletonHeroMetric />
                <SkeletonHeroMetric />
                <SkeletonHeroMetric />
                <SkeletonHeroMetric />
              </div>
            </div>

            {/* Purchase card */}
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="h-52 animate-pulse bg-slate-200" />

              <div className="space-y-5 p-6 sm:p-7">
                <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

                <div className="h-10 w-40 animate-pulse rounded-xl bg-slate-200" />

                <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-200" />

                <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-8">
            <SkeletonSection large />

            <SkeletonSection />

            <SkeletonSection />

            <SkeletonSection large />
          </div>

          <aside className="space-y-8">
            <SkeletonSidebar />

            <SkeletonSidebar />

            <SkeletonSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}

function SkeletonHeroMetric() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
      <div className="h-4 w-20 animate-pulse rounded bg-slate-800" />

      <div className="mt-2 h-3 w-16 animate-pulse rounded bg-slate-800" />
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="border-b border-slate-200 p-5 sm:p-6 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

        <div className="space-y-2">
          <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function SkeletonSection({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />

        <div className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

          <div className="h-7 w-56 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>

      {large ? (
        <div className="mt-7 space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-slate-200" />

          <div className="h-5 w-11/12 animate-pulse rounded bg-slate-200" />

          <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />

          <div className="mt-6 h-24 w-full animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
      ) : (
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      )}
    </section>
  );
}

function SkeletonSidebar() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="h-32 animate-pulse bg-slate-200" />

      <div className="space-y-4 p-6">
        <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />

        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />

        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}