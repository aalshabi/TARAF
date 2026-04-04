'use client'

import { useState, useEffect, useCallback } from 'react'

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
  followUps?: FollowUp[]
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'جديد', color: 'text-blue', bg: 'bg-blue/10' },
  contacted: { label: 'تم التواصل', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  qualified: { label: 'مؤهل', color: 'text-purple-700', bg: 'bg-purple-100' },
  offer_sent: { label: 'تم إرسال العرض', color: 'text-orange-700', bg: 'bg-orange-100' },
  closed: { label: 'مغلق', color: 'text-green', bg: 'bg-green/10' },
}

const STATUS_OPTIONS = [
  { value: '', label: 'جميع الحالات' },
  { value: 'new', label: 'جديد' },
  { value: 'contacted', label: 'تم التواصل' },
  { value: 'qualified', label: 'مؤهل' },
  { value: 'offer_sent', label: 'تم إرسال العرض' },
  { value: 'closed', label: 'مغلق' },
]

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
]

const FOLLOWUP_TYPES: Record<string, string> = {
  call: 'مكالمة',
  whatsapp: 'واتساب',
  note: 'ملاحظة',
  status_change: 'تغيير حالة',
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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filters
  const [filterStatus, setFilterStatus] = useState('')
  const [filterService, setFilterService] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')

  // Slide-over panel
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelLoading, setPanelLoading] = useState(false)

  // Status update
  const [updatingStatus, setUpdatingStatus] = useState(false)

  // Follow-up form
  const [followUpNote, setFollowUpNote] = useState('')
  const [followUpType, setFollowUpType] = useState('note')
  const [addingFollowUp, setAddingFollowUp] = useState(false)

  // Pagination
  const [visibleCount, setVisibleCount] = useState(20)

  // Copy feedback
  const [copyFeedback, setCopyFeedback] = useState(false)

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const params = new URLSearchParams()
      if (filterStatus) params.set('status', filterStatus)
      if (filterService) params.set('service', filterService)
      if (searchQuery) params.set('search', searchQuery)

      const url = `/api/leads${params.toString() ? `?${params.toString()}` : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('فشل في جلب الطلبات')
      const data = await res.json()
      setLeads(data)
    } catch {
      setError('حدث خطأ في تحميل الطلبات')
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterService, searchQuery])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const handleSearch = useCallback(() => {
    setSearchQuery(searchInput.trim())
    setVisibleCount(20)
  }, [searchInput])

  const clearFilters = useCallback(() => {
    setFilterStatus('')
    setFilterService('')
    setSearchQuery('')
    setSearchInput('')
    setVisibleCount(20)
  }, [])

  const openLeadPanel = useCallback(async (lead: Lead) => {
    setPanelOpen(true)
    setPanelLoading(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}`)
      if (!res.ok) throw new Error('فشل في جلب تفاصيل الطلب')
      const data = await res.json()
      setSelectedLead(data)
    } catch {
      setSelectedLead(lead)
    } finally {
      setPanelLoading(false)
    }
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
    setSelectedLead(null)
    setFollowUpNote('')
    setFollowUpType('note')
  }, [])

  const updateLeadStatus = useCallback(async (leadId: string, newStatus: string) => {
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('فشل في تحديث الحالة')
      const updated = await res.json()

      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: updated.status } : l))

      if (selectedLead && selectedLead.id === leadId) {
        // Re-fetch full lead to get updated follow-ups
        const detailRes = await fetch(`/api/leads/${leadId}`)
        if (detailRes.ok) {
          const detailData = await detailRes.json()
          setSelectedLead(detailData)
        }
      }
    } catch {
      alert('فشل في تحديث الحالة')
    } finally {
      setUpdatingStatus(false)
    }
  }, [selectedLead])

  const addFollowUp = useCallback(async () => {
    if (!selectedLead || !followUpNote.trim()) return

    setAddingFollowUp(true)
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}/followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: followUpNote.trim(), type: followUpType }),
      })
      if (!res.ok) throw new Error('فشل في إضافة الملاحظة')

      setFollowUpNote('')
      setFollowUpType('note')

      // Re-fetch lead details
      const detailRes = await fetch(`/api/leads/${selectedLead.id}`)
      if (detailRes.ok) {
        const detailData = await detailRes.json()
        setSelectedLead(detailData)
      }
    } catch {
      alert('فشل في إضافة الملاحظة')
    } finally {
      setAddingFollowUp(false)
    }
  }, [selectedLead, followUpNote, followUpType])

  const copyPhone = useCallback(async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch {
      // Fallback
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

  const visibleLeads = leads.slice(0, visibleCount)
  const hasMore = visibleCount < leads.length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal">ادارة الطلبات</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray mb-1">بحث</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="بحث بالاسم أو رقم الجوال..."
                className="flex-1 rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors"
              />
              <button
                onClick={handleSearch}
                className="bg-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue/90 transition-colors"
              >
                بحث
              </button>
            </div>
          </div>

          <div className="min-w-[160px]">
            <label className="block text-xs text-gray mb-1">الحالة</label>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setVisibleCount(20) }}
              className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[160px]">
            <label className="block text-xs text-gray mb-1">الخدمة</label>
            <select
              value={filterService}
              onChange={(e) => { setFilterService(e.target.value); setVisibleCount(20) }}
              className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
            >
              <option value="">جميع الخدمات</option>
              {SERVICE_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="text-gray text-sm hover:text-charcoal transition-colors px-3 py-2"
          >
            مسح الفلاتر
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchLeads} className="underline hover:no-underline">إعادة المحاولة</button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-blue" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : leads.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray text-lg mb-2">لا توجد طلبات</p>
          <p className="text-gray/60 text-sm">جرب تغيير الفلاتر أو إضافة طلبات جديدة</p>
        </div>
      ) : (
        <>
          {/* Results count */}
          <p className="text-sm text-gray">عرض {visibleLeads.length} من {leads.length} طلب</p>

          {/* Leads Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-light/50 border-b border-gray/10">
                    <th className="text-right py-3 px-4 text-gray font-medium">الاسم</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">الجوال</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">الخدمة</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">الحالة</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">الاولوية</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">التاريخ</th>
                    <th className="text-right py-3 px-4 text-gray font-medium">اجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.map((lead) => {
                    const statusInfo = STATUS_MAP[lead.status] || { label: lead.status, color: 'text-gray-700', bg: 'bg-gray-100' }
                    return (
                      <tr key={lead.id} className="border-b border-gray/5 hover:bg-light/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-charcoal">{lead.name}</td>
                        <td className="py-3 px-4 text-gray" dir="ltr">{formatPhone(lead.phone)}</td>
                        <td className="py-3 px-4 text-charcoal">{lead.service}</td>
                        <td className="py-3 px-4">
                          <span className={`${statusInfo.bg} ${statusInfo.color} text-xs font-medium px-2.5 py-1 rounded-full`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${lead.priority === 'high' ? 'bg-red-500' : 'bg-gray/30'}`} />
                            <span className="text-xs text-gray">{lead.priority === 'high' ? 'عالية' : 'عادية'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray text-xs">{formatDate(lead.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              disabled={updatingStatus}
                              className="text-xs border border-gray/20 rounded-md px-2 py-1 bg-white focus:border-blue outline-none appearance-none disabled:opacity-50"
                            >
                              {STATUS_OPTIONS.filter(o => o.value).map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => openLeadPanel(lead)}
                              className="text-blue hover:text-blue/70 text-xs underline transition-colors"
                            >
                              التفاصيل
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 20)}
                className="bg-white text-blue border border-blue/20 px-6 py-2 rounded-lg text-sm hover:bg-blue/5 transition-colors"
              >
                عرض المزيد ({leads.length - visibleCount} متبقي)
              </button>
            </div>
          )}
        </>
      )}

      {/* Slide-over Panel */}
      {panelOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={closePanel}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 start-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray/10 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-charcoal">تفاصيل الطلب</h2>
              <button
                onClick={closePanel}
                className="text-gray hover:text-charcoal transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {panelLoading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 text-blue" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : selectedLead ? (
              <div className="p-6 space-y-6">
                {/* Lead Info */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-gray block">الاسم</span>
                      <span className="text-charcoal font-medium">{selectedLead.name}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">الجوال</span>
                      <span className="text-charcoal font-medium" dir="ltr">{formatPhone(selectedLead.phone)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">الخدمة</span>
                      <span className="text-charcoal font-medium">{selectedLead.service}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">المصدر</span>
                      <span className="text-charcoal font-medium">{selectedLead.source}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">الفريق</span>
                      <span className="text-charcoal font-medium">{selectedLead.team === 'team_a' ? 'فريق أ' : 'فريق ب'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">الاولوية</span>
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${selectedLead.priority === 'high' ? 'bg-red-500' : 'bg-gray/30'}`} />
                        <span className="text-charcoal font-medium">{selectedLead.priority === 'high' ? 'عالية' : 'عادية'}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">تاريخ الإنشاء</span>
                      <span className="text-charcoal text-sm">{formatDate(selectedLead.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray block">آخر تحديث</span>
                      <span className="text-charcoal text-sm">{formatDate(selectedLead.updatedAt)}</span>
                    </div>
                  </div>
                  {selectedLead.notes && (
                    <div>
                      <span className="text-xs text-gray block mb-1">ملاحظات</span>
                      <p className="text-charcoal text-sm bg-light rounded-lg p-3">{selectedLead.notes}</p>
                    </div>
                  )}
                </div>

                {/* Status Update */}
                <div className="border-t border-gray/10 pt-4">
                  <label className="text-sm font-medium text-charcoal block mb-2">تغيير الحالة</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                    disabled={updatingStatus}
                    className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.filter(o => o.value).map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray/10 pt-4">
                  <label className="text-sm font-medium text-charcoal block mb-2">اجراءات سريعة</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openWhatsApp(selectedLead.phone)}
                      className="flex items-center gap-2 bg-green text-white px-4 py-2 rounded-lg text-sm hover:bg-green/90 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      واتساب
                    </button>
                    <button
                      onClick={() => copyPhone(selectedLead.phone)}
                      className="flex items-center gap-2 bg-light text-charcoal px-4 py-2 rounded-lg text-sm hover:bg-gray/10 transition-colors border border-gray/20"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copyFeedback ? 'تم النسخ!' : 'نسخ الجوال'}
                    </button>
                    <a
                      href={`/admin/leads/${selectedLead.id}`}
                      className="flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue/90 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      صفحة كاملة
                    </a>
                  </div>
                </div>

                {/* Add Follow-up */}
                <div className="border-t border-gray/10 pt-4">
                  <label className="text-sm font-medium text-charcoal block mb-2">إضافة ملاحظة</label>
                  <div className="space-y-2">
                    <select
                      value={followUpType}
                      onChange={(e) => setFollowUpType(e.target.value)}
                      className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors appearance-none"
                    >
                      <option value="note">ملاحظة</option>
                      <option value="call">مكالمة</option>
                      <option value="whatsapp">واتساب</option>
                    </select>
                    <textarea
                      value={followUpNote}
                      onChange={(e) => setFollowUpNote(e.target.value)}
                      placeholder="اكتب الملاحظة هنا..."
                      rows={3}
                      className="w-full rounded-lg border border-gray/20 bg-light px-3 py-2 text-sm text-charcoal placeholder:text-gray/50 focus:border-blue focus:ring-1 focus:ring-blue outline-none transition-colors resize-none"
                    />
                    <button
                      onClick={addFollowUp}
                      disabled={addingFollowUp || !followUpNote.trim()}
                      className="w-full bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingFollowUp ? 'جاري الإضافة...' : 'إضافة ملاحظة'}
                    </button>
                  </div>
                </div>

                {/* Follow-up History */}
                {selectedLead.followUps && selectedLead.followUps.length > 0 && (
                  <div className="border-t border-gray/10 pt-4">
                    <label className="text-sm font-medium text-charcoal block mb-3">سجل المتابعة</label>
                    <div className="space-y-3">
                      {selectedLead.followUps.map((fu) => (
                        <div key={fu.id} className="bg-light rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-blue">
                              {FOLLOWUP_TYPES[fu.type] || fu.type}
                            </span>
                            <span className="text-xs text-gray">{formatDate(fu.createdAt)}</span>
                          </div>
                          <p className="text-sm text-charcoal">{fu.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
