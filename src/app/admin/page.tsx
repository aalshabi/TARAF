'use client'

import { useState, useEffect, useCallback } from 'react'

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
}

interface Stats {
  total: number
  today: number
  byStatus: Record<string, number>
  byService: Record<string, number>
  conversionRate: number
  recentLeads: Lead[]
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'جديد', color: 'text-blue-700', bg: 'bg-blue-100' },
  contacted: { label: 'تم التواصل', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  qualified: { label: 'مؤهل', color: 'text-purple-700', bg: 'bg-purple-100' },
  offer_sent: { label: 'تم إرسال العرض', color: 'text-orange-700', bg: 'bg-orange-100' },
  closed: { label: 'مغلق', color: 'text-green-700', bg: 'bg-green-100' },
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/leads/stats')
      if (!res.ok) throw new Error('فشل في جلب البيانات')
      const data = await res.json()
      setStats(data)
    } catch {
      setError('حدث خطأ في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

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
          <button
            onClick={fetchStats}
            className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue/90 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const maxServiceCount = Math.max(...Object.values(stats.byService), 1)
  const topService = Object.entries(stats.byService).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray">اجمالي الطلبات</span>
          </div>
          <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray">طلبات اليوم</span>
          </div>
          <p className="text-3xl font-bold text-charcoal">{stats.today}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm text-gray">نسبة التحويل</span>
          </div>
          <p className="text-3xl font-bold text-charcoal">{stats.conversionRate}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-sm text-gray">الخدمة الاكثر طلبا</span>
          </div>
          <p className="text-lg font-bold text-charcoal truncate">{topService ? topService[0] : '-'}</p>
        </div>
      </div>

      {/* Status Breakdown + Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-charcoal mb-4">توزيع الحالات</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(STATUS_MAP).map(([key, { label, color, bg }]) => (
              <div key={key} className={`${bg} ${color} rounded-full px-4 py-2 text-sm font-medium`}>
                {label}: {stats.byStatus[key] || 0}
              </div>
            ))}
          </div>
        </div>

        {/* Service Breakdown - Horizontal Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-charcoal mb-4">توزيع الخدمات</h2>
          <div className="space-y-3">
            {Object.entries(stats.byService)
              .sort((a, b) => b[1] - a[1])
              .map(([service, count]) => (
                <div key={service}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-charcoal font-medium">{service}</span>
                    <span className="text-gray">{count}</span>
                  </div>
                  <div className="w-full bg-light rounded-full h-3">
                    <div
                      className="bg-blue rounded-full h-3 transition-all duration-500"
                      style={{ width: `${(count / maxServiceCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            {Object.keys(stats.byService).length === 0 && (
              <p className="text-gray text-sm text-center py-4">لا توجد بيانات</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal">اخر الطلبات</h2>
          <a
            href="/admin/leads"
            className="text-blue text-sm hover:underline"
          >
            عرض الكل
          </a>
        </div>

        {stats.recentLeads.length === 0 ? (
          <div className="text-center py-12 text-gray">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>لا توجد طلبات بعد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray/10">
                  <th className="text-right py-3 px-2 text-gray font-medium">الاسم</th>
                  <th className="text-right py-3 px-2 text-gray font-medium">الجوال</th>
                  <th className="text-right py-3 px-2 text-gray font-medium">الخدمة</th>
                  <th className="text-right py-3 px-2 text-gray font-medium">الحالة</th>
                  <th className="text-right py-3 px-2 text-gray font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map((lead) => {
                  const statusInfo = STATUS_MAP[lead.status] || { label: lead.status, color: 'text-gray-700', bg: 'bg-gray-100' }
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-gray/5 hover:bg-light/50 cursor-pointer transition-colors"
                      onClick={() => window.location.href = `/admin/leads/${lead.id}`}
                    >
                      <td className="py-3 px-2 font-medium text-charcoal">{lead.name}</td>
                      <td className="py-3 px-2 text-gray" dir="ltr">{lead.phone}</td>
                      <td className="py-3 px-2 text-charcoal">{lead.service}</td>
                      <td className="py-3 px-2">
                        <span className={`${statusInfo.bg} ${statusInfo.color} text-xs font-medium px-2.5 py-1 rounded-full`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray text-xs">{formatDate(lead.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
