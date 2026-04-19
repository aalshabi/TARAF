import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  maskDigits,
  normalizeQuery,
  validateQuery,
  type OrderDTO,
  type OrderStatus,
  type AttachmentStatus,
} from "@/lib/orders";

// Public lookup: GET /api/orders/track?q=TRF-2026-0001  OR  ?q=1012345678
// Returns a single order (partially masked) or 404. We intentionally do not expose
// a list endpoint here — tracking is a point-lookup only.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("q") ?? "";

    const v = validateQuery(raw);
    if (!v.ok) {
      return NextResponse.json({ error: v.message }, { status: 400 });
    }

    const q = normalizeQuery(raw);
    const isOrderNumber = /^TRF-/.test(q);

    const order = await prisma.order.findFirst({
      where: isOrderNumber ? { orderNumber: q } : { nationalId: q },
      include: {
        attachments: { orderBy: { createdAt: "asc" } },
        events: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "لم نعثر على طلب مطابق. تحقق من الرقم وحاول مرة أخرى." },
        { status: 404 }
      );
    }

    const hasMissingDocs = order.attachments.some((a) => a.status === "missing");

    const dto: OrderDTO = {
      orderNumber: order.orderNumber,
      status: order.status as OrderStatus,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),

      customerName: order.customerName,
      nationalIdMasked: maskDigits(order.nationalId, 4),
      phoneMasked: maskDigits(order.phone, 3),
      email: order.email,
      city: order.city,
      region: order.region,

      profession: order.profession,
      nationality: order.nationality,
      gender: order.gender,
      ageFrom: order.ageFrom,
      ageTo: order.ageTo,
      expectedSalary: order.expectedSalary,
      experienceYears: order.experienceYears,
      language: order.language,
      contractMonths: order.contractMonths,

      attachments: order.attachments.map((a) => ({
        id: a.id,
        kind: a.kind,
        label: a.label,
        status: a.status as AttachmentStatus,
        url: a.url,
        createdAt: a.createdAt.toISOString(),
      })),
      events: order.events.map((e) => ({
        id: e.id,
        status: e.status as OrderStatus,
        note: e.note,
        createdAt: e.createdAt.toISOString(),
      })),

      hasMissingDocs,
    };

    return NextResponse.json(dto);
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع. حاول لاحقاً." },
      { status: 500 }
    );
  }
}
