import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mock orders covering the main status states so the tracking page can be exercised end-to-end.
const seedOrders = [
  {
    orderNumber: "TRF-2026-0001",
    status: "in_progress",
    customerName: "عبدالله الشبي",
    nationalId: "1012345678",
    phone: "0550001122",
    email: "abdullah@example.com",
    city: "الرياض",
    region: "الرياض",
    nationalAddress: "حي النخيل، 12345",
    profession: "عاملة منزلية",
    nationality: "فلبينية",
    gender: "female",
    ageFrom: 25,
    ageTo: 40,
    expectedSalary: 1500,
    experienceYears: 3,
    language: "إنجليزية",
    contractMonths: 24,
    attachments: [
      { kind: "national_id", label: "صورة الهوية الوطنية", status: "approved" },
      { kind: "financial_proof", label: "إثبات القدرة المالية", status: "approved" },
      { kind: "national_address", label: "العنوان الوطني", status: "uploaded" },
      { kind: "visa", label: "صورة التأشيرة", status: "missing" },
    ],
    events: [
      { status: "new", note: "تم إنشاء الطلب" },
      { status: "under_review", note: "استلمنا مستنداتك وتحت المراجعة" },
      { status: "approved", note: "تم اعتماد الطلب من الفريق" },
      { status: "in_progress", note: "تم إرسال طلب التأشيرة" },
    ],
  },
  {
    orderNumber: "TRF-2026-0002",
    status: "under_review",
    customerName: "نورة القحطاني",
    nationalId: "1098765432",
    phone: "0559988776",
    email: "",
    city: "جدة",
    region: "مكة المكرمة",
    nationalAddress: "",
    profession: "سائق خاص",
    nationality: "فلبيني",
    gender: "male",
    ageFrom: 28,
    ageTo: 45,
    expectedSalary: 2000,
    experienceYears: 5,
    language: "إنجليزية",
    contractMonths: 24,
    attachments: [
      { kind: "national_id", label: "صورة الهوية الوطنية", status: "approved" },
      { kind: "financial_proof", label: "إثبات القدرة المالية", status: "missing" },
      { kind: "national_address", label: "العنوان الوطني", status: "missing" },
    ],
    events: [
      { status: "new", note: "تم إنشاء الطلب" },
      { status: "under_review", note: "بعض المستندات ناقصة — الرجاء إكمالها" },
    ],
  },
  {
    orderNumber: "TRF-2026-0003",
    status: "completed",
    customerName: "شركة الترف للتجارة",
    nationalId: "4030123456", // Commercial register
    phone: "0533322211",
    email: "biz@example.com",
    city: "الدمام",
    region: "الشرقية",
    nationalAddress: "حي الشاطئ، 34567",
    profession: "استقدام منشآت — مجموعة 10 عاملات",
    nationality: "كينية",
    gender: "female",
    ageFrom: 25,
    ageTo: 40,
    expectedSalary: 1100,
    experienceYears: 2,
    language: "إنجليزية",
    contractMonths: 24,
    attachments: [
      { kind: "commercial_register", label: "السجل التجاري", status: "approved" },
      { kind: "financial_proof", label: "إثبات القدرة المالية", status: "approved" },
      { kind: "national_address", label: "العنوان الوطني", status: "approved" },
      { kind: "contract_pdf", label: "نسخة العقد (PDF)", status: "approved", url: "/mock/contract-sample.pdf" },
    ],
    events: [
      { status: "new", note: "تم إنشاء الطلب" },
      { status: "under_review", note: "تمت مراجعة المستندات" },
      { status: "approved", note: "تم الاعتماد" },
      { status: "in_progress", note: "تم وصول العمالة إلى المملكة" },
      { status: "completed", note: "اكتمل الطلب بنجاح" },
    ],
  },
  {
    orderNumber: "TRF-2026-0004",
    status: "new",
    customerName: "فهد العتيبي",
    nationalId: "1055667788",
    phone: "0571112233",
    email: "",
    city: "الرياض",
    region: "الرياض",
    nationalAddress: "",
    profession: "عاملة منزلية",
    nationality: "أوغندية",
    gender: "female",
    expectedSalary: 1200,
    contractMonths: 24,
    attachments: [],
    events: [{ status: "new", note: "تم إنشاء الطلب — في انتظار المستندات" }],
  },
];

async function main() {
  console.log("🌱 Seeding orders…");

  // Wipe & reseed so the dataset stays deterministic in dev.
  await prisma.orderStatusEvent.deleteMany();
  await prisma.orderAttachment.deleteMany();
  await prisma.order.deleteMany();

  for (const o of seedOrders) {
    const { attachments, events, ...orderData } = o;
    await prisma.order.create({
      data: {
        ...orderData,
        attachments: { create: attachments },
        events: { create: events },
      },
    });
    console.log(`  • ${o.orderNumber} (${o.status})`);
  }

  console.log("✅ Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
