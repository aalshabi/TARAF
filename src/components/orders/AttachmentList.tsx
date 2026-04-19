import type { AttachmentDTO, AttachmentStatus } from "@/lib/orders";

const STATUS_STYLES: Record<AttachmentStatus, { label: string; badge: string; dot: string }> = {
  approved: {
    label: "معتمد",
    badge: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  uploaded: {
    label: "مرفوع — قيد المراجعة",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue",
  },
  missing: {
    label: "ناقص",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  rejected: {
    label: "مرفوض — يحتاج إعادة رفع",
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
};

interface Props {
  attachments: AttachmentDTO[];
}

export default function AttachmentList({ attachments }: Props) {
  if (attachments.length === 0) {
    return (
      <div className="rounded-xl border border-light bg-light/50 p-6 text-center">
        <p className="text-sm text-gray">لا توجد مستندات مرفقة حتى الآن.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {attachments.map((a) => {
        const s = STATUS_STYLES[a.status];
        const canDownload = a.url && (a.status === "approved" || a.status === "uploaded");
        return (
          <li
            key={a.id}
            className="flex items-center justify-between gap-3 p-4 rounded-xl border border-light bg-white hover:border-blue/30 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy truncate">{a.label}</p>
                <span
                  className={`inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.badge}`}
                >
                  {s.label}
                </span>
              </div>
            </div>

            {canDownload ? (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue hover:underline shrink-0"
              >
                عرض / تنزيل
              </a>
            ) : (
              <span className="text-xs text-gray shrink-0">—</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
