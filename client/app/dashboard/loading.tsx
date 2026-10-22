export default function DashboardLoading() {
  return (
    <main
      className="min-h-screen bg-slate-50"
      aria-label="Loading student dashboard"
      aria-busy="true"
    >
      <div className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* Dashboard header */}
        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-blue-100" />
            <div className="h-8 w-80 max-w-full animate-pulse rounded-xl bg-slate-200 sm:h-10" />
            <div className="h-4 w-full max-w-lg animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </header>

        {/* Learning overview */}
        <section className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center lg:p-10">
            <div className="space-y-5">
              <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />

              <div className="space-y-3">
                <div className="h-9 w-full max-w-2xl animate-pulse rounded-xl bg-white/10 sm:h-11" />
                <div className="h-9 w-4/5 max-w-xl animate-pulse rounded-xl bg-white/10 sm:h-11" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white/10" />
                <div className="h-4 w-3/4 max-w-lg animate-pulse rounded bg-white/10" />
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <div className="h-11 w-36 animate-pulse rounded-xl bg-white/10" />
                <div className="h-11 w-32 animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="h-5 w-36 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-4 w-48 max-w-full animate-pulse rounded bg-white/10" />

              <div className="mt-6 grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <HeroStat key={index} />
                ))}
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-300/40" />
              </div>
            </div>
          </div>
        </section>

        {/* Student statistics */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <StatisticCard key={index} />
          ))}
        </section>

        {/* Main dashboard grid */}
        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-7">
            {/* Continue learning */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading />

              <div className="grid gap-4 md:grid-cols-2">
                <CourseCard />
                <CourseCard />
              </div>
            </section>

            {/* My courses */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
              </div>

              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <CourseRow key={index} />
                ))}
              </div>
            </section>

            {/* Learning activity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 space-y-2">
                <div className="h-3 w-28 animate-pulse rounded bg-blue-100" />
                <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
                    <div className="mt-4 h-5 w-28 max-w-full animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SidebarPanel />
            <SidebarPanel />
            <SidebarPanel />
          </aside>
        </div>
      </div>

      <span className="sr-only" role="status">
        Loading your learning dashboard. Please wait.
      </span>
    </main>
  );
}

function HeroStat() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="h-7 w-12 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-20 max-w-full animate-pulse rounded bg-white/10" />
    </div>
  );
}

function StatisticCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-blue-50" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="mt-5 h-8 w-20 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-2 h-4 w-28 max-w-full animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function SectionHeading() {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <div className="space-y-2">
        <div className="h-3 w-28 animate-pulse rounded bg-blue-100" />
        <div className="h-6 w-48 max-w-full animate-pulse rounded-lg bg-slate-200" />
      </div>
      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

function CourseCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="aspect-[16/7] animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="h-2 animate-pulse rounded-full bg-slate-100" />
        <div className="h-10 w-full animate-pulse rounded-xl bg-blue-100" />
      </div>
    </article>
  );
}

function CourseRow() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 sm:gap-4 sm:p-4">
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200 sm:h-14 sm:w-14" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
      </div>

      <div className="hidden h-9 w-24 shrink-0 animate-pulse rounded-lg bg-slate-100 sm:block" />
    </div>
  );
}

function SidebarPanel() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1.5 animate-pulse bg-blue-100" />

      <div className="p-5 sm:p-6">
        <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />

        <div className="mt-5 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    </section>
  );
}
