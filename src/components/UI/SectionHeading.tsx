type SectionHeadingProps = {
  title: string | undefined;
  highlighted?: string;
  pargraph: string | undefined;
};

export default function SectionHeading({
  title,
  highlighted,
  pargraph,
}: SectionHeadingProps) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl text-primary-tx font-semibold">
        {title} <span className="text-accent">{highlighted}</span>
      </h1>
      <p className="text-muted mt-1 mb-6">{pargraph}</p>
    </>
  );
}
