interface Row {
  label: string;
  value: string | number | null | undefined;
}

interface Props {
  title: string;
  rows: Row[];
}

export default function InfoGrid({ title, rows }: Props) {
  const visible = rows.filter((r) => r.value !== "" && r.value !== null && r.value !== undefined);

  return (
    <section className="rounded-2xl border border-light bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-navy mb-4">{title}</h3>
      {visible.length === 0 ? (
        <p className="text-sm text-gray">لا توجد بيانات متوفرة.</p>
      ) : (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {visible.map((r) => (
            <div key={r.label} className="flex flex-col">
              <dt className="text-xs text-gray mb-1">{r.label}</dt>
              <dd className="text-sm font-medium text-navy break-words">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
