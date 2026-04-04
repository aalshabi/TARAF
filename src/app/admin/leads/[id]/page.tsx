'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface FollowUp {
  id: string
  leadId: string
  note: string
  type: string
  createdAt: string
}

interface Lead {
  id: string
  name: string
  phone: string
  service: string
  notes: string
  source: string
  status: string
  priority: string
  team: string
  createdAt: string
  updatedAt: string
  followUps: FollowUp[]
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'جديد', color: 'text-blue', bg: 'bg-blue/10' },
  contacted: { label: 'تم التواصل', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  qualified: { label: 'مؤهل', color: 'text-purple-700', bg: 'bg-purple-100' },
  offer_sent: { label: 'تم إرسال العرض', color: 'text-orange-700', bg: 'bg-orange-100' },
  closed: { label: 'مغلق', color: 'text-green', bg: 'bg-green/10' },
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'جديد' },
  { value: 'contacted', label: 'تم التواصل' },
  { value: 'qualified', label: 'مؤهل' },
  { value: 'offer_sent', label: 'تم إرسال العرض' },
  { value: 'closed', label: 'مغلق' },
]

const FOLLOWUP_TYPES: Record<string, { label: string; icon: string }> = {
  call: { label: 'مكالمة', icon: 'phone' },
  whatsapp: { label: 'واتساب', icon: 'whatsapp' },
  note: { label: 'ملاحظة', icon: 'note' },
  status_change: { label: 'تغيير حالة', icon: 'status' },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatPhone(phone: string): string {
  return phone.replace(/^(\+966|0)/, '+966 ')
}

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Status/priority update
  const [newStatus, setNewStatus] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Follow-up form
  const [followUpNote, setFollowUpNote] = useState('')
  const [followUpType, setFollowUpType] = useState('note')
  const [addingFollowUp, setAddingFollowUp] = useState(false)

  // Copy feedback
  const [copyFeedback, setCopyFeedback] = useState(false)

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`/api/leads/${leadId}`)
      if (!res.ok) {
        if (res.status === 404) {
          setError('الطلب غير موجود')
          return
        }
        throw new Error('فشل في جلب البيانات')
      }
      const data = await res.json()
      setLead(data)
      setNewStatus(data.status)
      setNewPriority(data.priority)
    } catch {
      setError('حدث خطأ في تحميل بيانات الطلب')
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    fetchLead()
  }, [fetchLead])

  const saveChanges = useCallback(async () => {
    if (!lead) return

    const updates: Record<string, string> = {}
    if (newStatus !== lead.status) updates.status = newStatus
    if (newPriority !== lead.priority) updates.priority = newPriority

    if (Object.keys(updates).length === 0) return

    setSaving(true)
    setSaveSuccess(false)
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('فشل في الحفظ')

      // Re-fetch to get updated data and follow-ups
      await fetchLead()
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      alert('فشل في حفظ التغييرات')
    } finally {
      setSaving(false)
    }
  }, [lead, newStatus, newPriority, fetchLead])

  const addFollowUp = useCallback(async () => {
    if (!lead || !followUpNote.trim()) return

    setAddingFollowUp(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}/followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: followUpNote.trim(), type: followUpType }),
      })
      if (!res.ok) throw new Error('فشل في إضافة الملاحظة')

      setFollowUpNote('')
      setFollowUpType('note')
      await fetchLead()
    } catch {
      alert('فشل في إضافة الملاحظة')
    } finally {
      setAddingFollowUp(false)
    }
  }, [lead, followUpNote, followUpType, fetchLead])

  const copyPhone = useCallback(async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch {
      const input = document.createElement('input')
      input.value = phone
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    }
  }, [])

  const openWhatsApp = useCallback((phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const intl = cleaned.startsWith('0') ? `966${cleaned.slice(1)}` : cleaned.startsWith('966') ? cleaned : `966${cleaned}`
    window.open(`https://wa.me/${intl}`, '_blank')
  }, [])

  const openWhatsAppWithMessage = useCallback((phone: string, name: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const intl = cleaned.startsWith('0') ? `966${cleaned.slice(1)}` : cleaned.startsWith('966') ? cleaned : `966${cleaned}`
    const message = encodeURIComponent(`مرحبا ${name}، نتواصل معك من شركة ترف بخصوص طلبك. كيف يمكننا مساعدتك؟`)
    window.open(`https://wa.me/${intl}?text=${message}`, '_blank')
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/admin/leads')}
              className="bg-light text-charcoal px-6 py-2 rounded-lg hover:bg-gray/10 transition-colors border border-gray/20"
            >
              العودة للطلبات
            </button>
            <button
              onClick={fetchLead}
              className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue/90 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!lead) return null

  const statusInfo = STATUS_MAP[lead.status] || { label: lead.status, color: 'text-gray-700', bg: 'bg-gray-100' }
  const hasChanges = newStatus !== lead.status || newPriority !== lead.priority

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/leads')}
            className="text-gray hover:text-charcoal transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">{lead.name}</h1>
            <p className="text-gray text-sm">{lead.service}</p>
          </div>
        </div>
        <span className={`${statusInfo.bg} ${statusInfo.color} text-sm font-medium px-4 py-1.5 rounded-full`}>
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">بيانات الطلب</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">الاسم الكامل</span>
                <span className="text-charcoal font-medium">{lead.name}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">رقم الجوال</span>
                <span className="text-charcoal font-medium" dir="ltr">{formatPhone(lead.phone)}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">الخدمة المطلوبة</span>
                <span className="text-charcoal font-medium">{lead.service}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">مصدر الطلب</span>
                <span className="text-charcoal font-medium">{lead.source}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">الفريق المسؤول</span>
                <span className="text-charcoal font-medium">{lead.team === 'team_a' ? 'فريق أ' : 'فريق ب'}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">الاولوية</span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${lead.priority === 'high' ? 'bg-red-500' : 'bg-gray/30'}`} />
                  <span className="text-charcoal font-medium">{lead.priority === 'high' ? 'عالية' : 'عادية'}</span>
                </span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">تاريخ الإنشاء</span>
                <span className="text-charcoal text-sm">{formatDate(lead.createdAt)}</span>
              </div>
              <div className="bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">آخر تحديث</span>
                <span className="text-charcoal text-sm">{formatDate(lead.updatedAt)}</span>
              </div>
            </div>
            {lead.notes && (
              <div className="mt-4 bg-light rounded-lg p-3">
                <span className="text-xs text-gray block mb-1">ملاحظات العميل</span>
                <p className="text-charcoal text-sm">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Follow-up Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">سجل المتابعة</h2>

            {/* Add Follow-up Form */}
            <div className="bg-light rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <select
                    value={followUpType}
                    onChange={(e) => setFollowUpType(e.target.value)}
                    className="rounded-lg border border-gray/20 bg-white px-3 py-2 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
                  >
                    <option value="note">ملاحظة</option>
                    <option value="call">مكالمة</option>
                    <option value="whatsapp">واتساب</option>
                  </select>
                </div>
                <textarea
                  value={followUpNote}
                  onChange={(e) => setFollowUpNote(e.target.value)}
                  placeholder="اكتب تفاصيل المتابعة هنا..."
                  rows={3}
                  className="w-full rounded-lg border border-gray/20 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors resize-none"
                />
                <button
                  onClick={addFollowUp}
                  disabled={addingFollowUp || !followUpNote.trim()}
                  className="bg-navy text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingFollowUp ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      جاري الإضافة...
                    </span>
                  ) : 'إضافة متابعة'}
                </button>
              </div>
            </div>

            {/* Timeline */}
            {lead.followUps.length === 0 ? (
              <div className="text-center py-8 text-gray">
                <svg className="w-10 h-10 mx-auto mb-2 text-gray/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">لا توجد متابعات بعد</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 start-4 w-0.5 bg-gray/10" />

                <div className="space-y-4">
                  {lead.followUps.map((fu) => {
                    const typeInfo = FOLLOWUP_TYPES[fu.type] || { label: fu.type, icon: 'note' }
                    let iconBg = 'bg-gray/10 text-gray'
                    if (fu.type === 'call') iconBg = 'bg-blue-100 text-blue-600'
                    if (fu.type === 'whatsapp') iconBg = 'bg-green/10 text-green'
                    if (fu.type === 'status_change') iconBg = 'bg-purple-100 text-purple-600'
                    if (fu.type === 'note') iconBg = 'bg-gold/10 text-gold'

                    return (
                      <div key={fu.id} className="relative flex gap-4 ps-0">
                        {/* Icon */}
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                          {fu.type === 'call' && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          )}
                          {fu.type === 'whatsapp' && (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                          )}
                          {fu.type === 'note' && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          )}
                          {fu.type === 'status_change' && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-light rounded-lg p-3 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-charcoal">{typeInfo.label}</span>
                            <span className="text-xs text-gray">{formatDate(fu.createdAt)}</span>
                          </div>
                          <p className="text-sm text-charcoal/80">{fu.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="space-y-6">
          {/* Status & Priority Update */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">تحديث البيانات</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal block mb-1.5">الحالة</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2.5 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal block mb-1.5">الاولوية</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2.5 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
                >
                  <option value="normal">عادية</option>
                  <option value="high">عالية</option>
                </select>
              </div>
              <button
                onClick={saveChanges}
                disabled={saving || !hasChanges}
                className="w-full bg-blue text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري الحفظ...
                  </span>
                ) : 'حفظ التغييرات'}
              </button>
              {saveSuccess && (
                <p className="text-green text-sm text-center font-medium">تم الحفظ بنجاح</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-charcoal mb-4">اجراءات سريعة</h2>
            <div className="space-y-2">
              <button
                onClick={() => openWhatsApp(lead.phone)}
                className="w-full flex items-center gap-3 bg-green text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-green/90 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                فتح واتساب
              </button>

              <button
                onClick={() => openWhatsAppWithMessage(lead.phone, lead.name)}
                className="w-full flex items-center gap-3 bg-green/10 text-green px-4 py-3 rounded-lg text-sm font-medium hover:bg-green/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                إرسال رسالة متابعة
              </button>

              <button
                onClick={() => copyPhone(lead.phone)}
                className="w-full flex items-center gap-3 bg-light text-charcoal px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray/10 transition-colors border border-gray/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copyFeedback ? 'تم نسخ الرقم!' : 'نسخ رقم الجوال'}
              </button>

              <button
                onClick={() => router.push('/admin/leads')}
                className="w-full flex items-center gap-3 bg-light text-gray px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray/10 transition-colors border border-gray/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l5-5-5-5M18 12H6" />
                </svg>
                العودة لقائمة الطلبات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
