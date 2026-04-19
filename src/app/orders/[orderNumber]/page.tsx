import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  maskDigits,
  type OrderDTO,
  type OrderStatus,
  type AttachmentStatus,
} from "@/lib/orders";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import TrackForm from "@/components/orders/TrackForm";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

// Private-by-obscurity: linkable only if the customer has the full order number.
// noindex so crawlers don't surface customer records.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderNumber } = await params;
  return {
    title: `طلب ${orderNumber} | متابعة الطلب`,
    description: `تفاصيل وحالة طلب الاستقدام رقم ${orderNumber}.`,
    robots: { index: false, follow: false },
  };
}

async function loadOrder(orderNumber: string): Promise<OrderDTO | null> {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      attachments: { orderBy: { createdAt: "asc" } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) return null;

  const hasMissingDocs = order.attachments.some((a) => a.status === "missing");

  return {
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
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = await loadOrder(orderNumber);
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-light/40 pt-[88px] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-4 text-xs text-gray">
          <Link href="/" className="hover:text-blue">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/track-order" className="hover:text-blue">متابعة الطلب</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">{order.orderNumber}</span>
        </nav>

        {/* Compact lookup on top for quick re-search */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-4 mb-6">
          <TrackForm initialValue={order.orderNumber} compact />
        </div>

        <OrderDetailsCard order={order} />
      </div>
    </div>
  );
}
