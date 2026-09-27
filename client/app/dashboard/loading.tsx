export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="h-7 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="h-10 w-80 max-w-full animate-pulse rounded-xl bg-slate-200" />
            <div className="h-5 w-[520px] max-w-full animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-11 w-28 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-11 w-24 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>

        {/* Hero */}
        <section className="mb-7 overflow-hidden rounded-[30px] bg-slate-200 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-5">
              <div className="h-8 w-48 animate-pulse rounded-full bg-white/70" />
              <div className="h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-white/70" />
              <div className="h-12 w-4/5 max-w-xl animate-pulse rounded-2xl bg-white/70" />
              <div className="h-5 w-full max-w-2xl animate-pulse rounded-lg bg-white/70" />
              <div className="h-5 w-3/4 max-w-xl animate-pulse rounded-lg bg-white/70" />

              <div className="flex gap-3 pt-3">
                <div className="h-12 w-40 animate-pulse rounded-xl bg-white/70" />
                <div className="h-12 w-36 animate-pulse rounded-xl bg-white/70" />
              </div>
            </div>

            <div className="rounded-3xl bg-white/60 p-5">
              <div className="h-20 animate-pulse rounded-2xl bg-white/80" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
                <SkeletonStat />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>

        {/* Main content */}
        <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">

          <div className="space-y-7">

            {/* Continue learning */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-64 animate-pulse rounded-lg bg-slate-200" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SkeletonCourse />
                <SkeletonCourse />
              </div>
            </div>

            {/* Recent courses */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 h-7 w-48 animate-pulse rounded-lg bg-slate-200" />

              <div className="space-y-4">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SkeletonPanel />
            <SkeletonPanel />
            <SkeletonPanel />
          </aside>

        </section>
      </div>
    </main>
  );
}

function SkeletonStat() {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <div className="h-8 w-14 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-200" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-5 h-8 w-20 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-2 h-4 w-28 animate-pulse rounded bg-slate-200" />
    </div>
  );
}

function SkeletonCourse() {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />

      <div className="mt-6 h-2 animate-pulse rounded-full bg-slate-200" />

      <div className="mt-5 h-10 w-36 animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200" />

      <div className="min-w-0 flex-1">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-slate-200 sm:block" />
    </div>
  );
}

function SkeletonPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />

      <div className="mt-5 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}