export default function SearchDeepNestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <a
        href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts"
        target="_blank"
      >
        Deep Nest: Layout
      </a>
      {children}
    </section>
  );
}
