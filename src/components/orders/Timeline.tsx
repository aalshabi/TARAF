import { STATUS_LABELS_AR, type StatusEventDTO } from "@/lib/orders";
import { formatArDateTime } from "@/lib/format";

interface Props {
  events: StatusEventDTO[];
}

export default function Timeline({ events }: Props) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray">لا توجد تحديثات بعد على هذا الطلب.</p>
    );
  }

  // Show newest first — customers care about the latest update.
  const items = [...events].reverse();

  return (
    <ol className="relative border-s-2 border-light ps-5 space-y-5">
      {items.map((e, idx) => (
        <li key={e.id} className="relative">
          <span
            aria-hidden
            className={`absolute -start-[27px] top-1 w-3 h-3 rounded-full ring-4 ring-white ${
              idx === 0 ? "bg-blue" : "bg-light border border-gray/40"
            }`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-navy">
              {STATUS_LABELS_AR[e.status]}
            </span>
            <span className="text-xs text-gray">{formatArDateTime(e.createdAt)}</span>
          </div>
          {e.note && <p className="mt-1 text-sm text-charcoal/80">{e.note}</p>}
        </li>
      ))}
    </ol>
  );
}
