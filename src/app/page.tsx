import NewestProject from "@/components/NewestProject";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Template & Icon</h1>
        <p className="text-base font-normal lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%]">
          DMarketUI stands out as the premier marketplace for all things related
          to tailwindcss, offering an unparalleled platform for both sellers and
          buyers alike.
        </p>
      </div>
      <NewestProject />
    </main>
  );
}
