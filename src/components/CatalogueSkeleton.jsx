export default function CatalogueSkeleton() {
  return (
    <section className="bg-[#FAF5EE] px-5 pb-20 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mx-auto h-3 w-32 rounded-full bg-[#F0DFD8]" />
        <div className="mx-auto mt-4 h-9 w-72 max-w-full rounded-full bg-[#F0DFD8]" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[.88] rounded-2xl bg-[#F0DFD8]" />)}
        </div>
        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-[#F0DFD8] bg-white">
              <div className="aspect-[.86] bg-[#F0DFD8]" />
              <div className="space-y-2 p-5">
                <div className="h-4 w-3/4 rounded bg-[#F0DFD8]" />
                <div className="h-3 w-1/2 rounded bg-[#F0DFD8]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
