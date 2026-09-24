export function PageRouteSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl xl:max-w-7xl px-4 py-12 sm:px-6" aria-busy>
      <div className="studio-skeleton h-4 w-32" />
      <div className="studio-skeleton mt-6 h-12 w-3/4 max-w-xl" />
      <div className="studio-skeleton mt-4 h-20 w-full max-w-2xl" />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="studio-skeleton h-56 rounded-2xl" />
        <div className="studio-skeleton h-56 rounded-2xl" />
      </div>
    </div>
  );
}
