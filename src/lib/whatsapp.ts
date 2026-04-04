const WHATSAPP_NUMBER = '966500000000'

// Smart routing based on service type
export function getWhatsAppTeam(service: string): string {
  const teamB = ['تأجير شهري', 'استقدام منشآت', 'الخدمات المميزة', 'شركات']
  return teamB.some(s => service.includes(s)) ? WHATSAPP_NUMBER : WHATSAPP_NUMBER
  // In production, different numbers per team
}

// Generate WhatsApp URL with pre-filled message
export function getWhatsAppUrl(name: string, service: string): string {
  const message = encodeURIComponent(
    `مرحباً، تم استلام طلبك بنجاح ✅\n` +
    `الاسم: ${name}\n` +
    `الخدمة: ${service}\n\n` +
    `فريقنا بيبدأ معك خلال وقت قصير لتنظيم الطلب بشكل واضح`
  )
  const number = getWhatsAppTeam(service)
  return `https://wa.me/${number}?text=${message}`
}

// Follow-up message after 24 hours
export function getFollowUpMessage(name: string): string {
  return `حياك الله ${name}، جاهزين نكمل لك الطلب في أي وقت 🙏`
}

// WhatsApp scripts for team
export const whatsappScripts = {
  firstReply: 'حياك الله 👋\nوصلنا طلبك، خلنا نرتب لك الخيارات المناسبة بسرعة',
  needAssessment: 'وش النوع اللي تحتاجه؟\n(منزلية / سائق / شركة / تأجير شهري)',
  offerSolution: (details: string, duration: string, price: string) =>
    `عندنا خيار مناسب لك 👇\n- التفاصيل: ${details}\n- المدة: ${duration}\n- السعر: ${price}`,
  closing: 'نبدأ لك الآن؟ نحتاج تأكيدك فقط ✅',
}
