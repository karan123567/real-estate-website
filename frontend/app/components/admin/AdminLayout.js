// FILE: frontend/src/components/admin/AdminLayout.js
// PURPOSE: Client-side layout wrapper for admin pages

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { adminAPI } from '@/lib/api';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/properties', label: 'Properties' },
  { href: '/admin/inquiries', label: 'Inquiries' },
  { href: '/admin/analytics', label: 'Analytics' },
];

export default function AdminLayout({ children, title }) {
  const pathname = usePathname();
  const router = useRouter();

  const [adminName, setAdminName] = useState('Admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await adminAPI.getMe();
        setAdminName(data.admin?.name || 'Admin');
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [router]);

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="font-playfair font-bold text-xl">
            LuxEstate
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-3 rounded-lg text-sm transition-colors
                ${
                  pathname === item.href
                    ? 'bg-white text-gray-900 font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-3">
            Logged in as {adminName}
          </p>

          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}