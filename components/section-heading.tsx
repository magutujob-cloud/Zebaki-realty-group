type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, body, center = false }: Props) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-7 text-slate-700">{body}</p> : null}
    </div>
  );
}
