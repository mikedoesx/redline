export const HomeSectionHeader = ({
  className,
  sectionTitle,
  subtitle,
  titleClass,
  subtitleClass,
}: {
  className?: string;
  sectionTitle: string;
  titleClass?: string;
  subtitle: string;
  subtitleClass?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 mb-8 text-center ${
        className ?? ""
      }`}
    >
      <h2 className={`text-3xl font-bold tracking-tighter ${titleClass ?? ""}`}>
        {sectionTitle}
      </h2>
      <h3
        className={`max-w-[900px] ${subtitleClass ?? "text-muted-foreground"}`}
      >
        {subtitle}
      </h3>
    </div>
  );
};
