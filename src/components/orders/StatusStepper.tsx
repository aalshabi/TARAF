import { STATUS_FLOW, STATUS_LABELS_AR, type OrderStatus } from "@/lib/orders";

interface Props {
  current: OrderStatus;
}

export default function StatusStepper({ current }: Props) {
  const rejected = current === "rejected";
  const currentIndex = rejected ? -1 : STATUS_FLOW.indexOf(current);

  return (
    <div className="w-full">
      {/* Mobile: vertical list. Desktop: horizontal stepper. */}
      <ol className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        {STATUS_FLOW.map((s, i) => {
          const done = !rejected && i < currentIndex;
          const active = !rejected && i === currentIndex;
          const idle = rejected || i > currentIndex;

          return (
            <li
              key={s}
              className="flex md:flex-col items-center gap-3 md:gap-2 md:flex-1 relative"
            >
              {/* Connector (desktop only) */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={`hidden md:block absolute top-4 end-1/2 w-full h-0.5 -z-0 ${
                    done || active ? "bg-blue" : "bg-light"
                  }`}
                />
              )}

              <span
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${
                  done
                    ? "bg-blue text-white"
                    : active
                    ? "bg-blue text-white ring-4 ring-blue/20"
                    : "bg-light text-gray"
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>

              <span
                className={`text-sm font-medium ${
                  active ? "text-navy" : idle ? "text-gray" : "text-navy"
                }`}
              >
                {STATUS_LABELS_AR[s]}
              </span>
            </li>
          );
        })}
      </ol>

      {rejected && (
        <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {STATUS_LABELS_AR.rejected} — {`الرجاء التواصل مع فريق خدمة العملاء لمعرفة التفاصيل.`}
        </p>
      )}
    </div>
  );
}
