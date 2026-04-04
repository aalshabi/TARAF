import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'لوحة التحكم | شركة الترف للاستقدام',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-light">
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">لوحة التحكم — شركة الترف للاستقدام</h1>
        <nav className="flex gap-4 text-sm">
          <a href="/admin" className="hover:text-gold transition-colors">الرئيسية</a>
          <a href="/admin/leads" className="hover:text-gold transition-colors">الطلبات</a>
          <a href="/" className="hover:text-gold transition-colors">الموقع ←</a>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
