'use client'

import { useState, useCallback } from 'react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const SERVICE_OPTIONS = [
  'عاملة منزلية',
  'سائق خاص',
  'طباخ / طباخة',
  'ممرض / ممرضة',
  'حارس أمن',
  'تأجير شهري',
  'استقدام منشآت',
  'الخدمات المميزة',
  'أخرى',
] as const

interface LeadFormProps {
  source: string
  defaultService?: string
  compact?: boolean
}

export default function LeadForm({ source, defaultService, compact = false }: LeadFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(defaultService ?? '')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const validatePhone = useCallback((value: string): boolean => {
    const trimmed = value.trim()
    return /^05\d{8}$/.test(trimmed) || /^\+9665\d{8}$/.test(trimmed)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('يرجى إدخال الاسم الكامل')
      return
    }

    if (!validatePhone(phone)) {
      setError('رقم الجوال يجب أن يبدأ بـ 05 أو +966')
      return
    }

    if (!service) {
      setError('يرجى اختيار نوع الخدمة')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service,
          notes: notes.trim(),
          source,
        }),
      })

      if (!res.ok) {
        throw new Error('فشل في إرسال الطلب')
      }

      setSuccess(true)

      // Redirect to WhatsApp after a short delay
      setTimeout(() => {
        const url = getWhatsAppUrl(name.trim(), service)
        window.open(url, '_blank')
      }, 1500)
    } catch {
      setError('حدث خطأ، يرجى المحاولة مرة أخرى')
    } finally {
      setLoading(false)
    }
  }, [name, phone, service, notes, source, validatePhone])

  if (success) {
    return (
      <div className="rounded-2xl bg-green/5 border border-green/20 p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green mb-2">
          تم استلام طلبك بنجاح
        </h3>
        <p className="text-gray">
          جاري تحويلك للواتساب...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      {/* الاسم الكامل */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-charcoal mb-1.5">
          الاسم الكامل
        </label>
        <input
          id="lead-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: محمد العلي"
          className="w-full rounded-lg border border-gray-200 bg-light p-3 text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors"
        />
      </div>

      {/* رقم الجوال */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-charcoal mb-1.5">
          رقم الجوال
        </label>
        <input
          id="lead-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05XXXXXXXX"
          dir="ltr"
          className="w-full rounded-lg border border-gray-200 bg-light p-3 text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors text-left"
        />
      </div>

      {/* نوع الخدمة */}
      <div>
        <label htmlFor="lead-service" className="block text-sm font-medium text-charcoal mb-1.5">
          نوع الخدمة
        </label>
        <select
          id="lead-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-light p-3 text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
        >
          <option value="">اختر الخدمة المطلوبة</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* ملاحظات */}
      {!compact && (
        <div>
          <label htmlFor="lead-notes" className="block text-sm font-medium text-charcoal mb-1.5">
            ملاحظات
            <span className="text-gray text-xs mr-1">(اختياري)</span>
          </label>
          <textarea
            id="lead-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي تفاصيل إضافية تساعدنا في خدمتك بشكل أفضل"
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-light p-3 text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors resize-none"
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue text-white rounded-xl p-4 font-bold text-lg hover:bg-blue/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جاري الإرسال...
          </span>
        ) : (
          'أرسل الطلب'
        )}
      </button>

      {/* Note */}
      <p className="text-center text-sm text-gray">
        سنتواصل معك خلال ٢٤ ساعة
      </p>
    </form>
  )
}
