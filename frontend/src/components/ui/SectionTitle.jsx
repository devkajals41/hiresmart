function SectionTitle({
  badge,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      {badge && (
        <div className="mb-5">
          {badge}
        </div>
      )}

      <h2 className="text-5xl font-bold tracking-tight text-[var(--heading)]">

        {title}

      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--body)]">

        {description}

      </p>

    </div>
  );
}

export default SectionTitle;