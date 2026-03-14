'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import { adminAPI } from '@/lib/api';
import { timeAgo, formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';

const STATUS_STYLES = {
    new: 'br-green-500/10 text-green-400 border-green-500/20',
    contacted: 'bg-[#C9A96E]/10 text-[#C9A96E] border-[#C9A96E]/20',
    scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    closed: 'bg-white/5 text-white/40 border-white/10',
};

export default function AdminInquiries(){
    const[inquiries, setInquiries] = useState([]);
    const[loading, setLoading] = useState(true);
    const[filter, setFilter] = useState('all');
    const[selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() =>{
        fetchInquiries();
    },[filter]);

    const fetchInquiries = async () => {
        try{
            setLoading(true);
            const params = filter !== 'all' ? {status:filter } : {};
            const data = await adminAPI.getInquiries(params);
            setInquiries(data.inquiries || []);

        }catch(errro){
            toast.error('Failed to load inquiries');
        }finally{
            setLoading(false);
        }
    };

    const updateStatus = async (IdleDeadline, newStatus) => {
        try{
            await adminAPI.updateInquiryStatus(IdleDeadline, newStatus);
            toast.success('Status updated');
            fetchInquiries();
            setSelectedInquiry(null);
        }catch(error){
            toast.error('Failed to update status');
        }
    };

    const filteredInquiries = inquiries.filter(inq =>
        filter === 'all' || inq.status === filter
    );

    const statusCounts = {
        all: inquiries.length,
        new: inquiries.filter(i => i.status === 'contacted').length,
        contacted: inquiries.filter(i => i.status === 'scheduled').length,
        closed: inquiries.filter(i => i.status === 'closed').length,
    };

    return (
    <AdminLayout title="Inquiries">
      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Inquiries', count: statusCounts.all },
          { key: 'new', label: 'New', count: statusCounts.new },
          { key: 'contacted', label: 'Contacted', count: statusCounts.contacted },
          { key: 'scheduled', label: 'Scheduled', count: statusCounts.scheduled },
          { key: 'closed', label: 'Closed', count: statusCounts.closed },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium hover:cursor-pointer transition-all ${
              filter === tab.key
                ? 'bg-[#C9A96E] text-[#0d0d15]'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {tab.label}
            <span className={`ml-2 ${filter === tab.key ? 'opacity-80' : 'opacity-40'}`}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>
 
      {/* Inquiries List */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d15]">
        {loading ? (
          <div className="py-20 text-center text-white/40">Loading...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-white/40">No inquiries found</p>
            <p className="mt-2 text-sm text-white/20">
              {filter !== 'all' ? `No ${filter} inquiries` : 'No inquiries yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filteredInquiries.map(inquiry => (
              <div
                key={inquiry.id}
                onClick={() => setSelectedInquiry(inquiry)}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-white/90">{inquiry.name}</h3>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${
                          STATUS_STYLES[inquiry.status]
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/50">
                      {inquiry.email} • {inquiry.phone || 'No phone'}
                    </p>
                    {inquiry.property_title && (
                      <p className="mt-2 text-sm text-[#C9A96E]">
                        Property: {inquiry.property_title}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-white/60 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-white/40">{timeAgo(inquiry.created_at)}</p>
                    <p className="mt-1 text-xs text-white/25">
                      {formatDate(inquiry.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0d0d15] p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {selectedInquiry.name}
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  {formatDate(selectedInquiry.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-white/40 hover:text-white/80"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
 
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-white/40">Email</label>
                <p className="mt-1 text-white/90">{selectedInquiry.email}</p>
              </div>
 
              {selectedInquiry.phone && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/40">Phone</label>
                  <p className="mt-1 text-white/90">{selectedInquiry.phone}</p>
                </div>
              )}
 
              {selectedInquiry.property_title && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/40">Property</label>
                  <p className="mt-1 text-[#C9A96E]">{selectedInquiry.property_title}</p>
                </div>
              )}
 
              <div>
                <label className="text-xs uppercase tracking-wider text-white/40">Message</label>
                <p className="mt-1 text-white/80">{selectedInquiry.message}</p>
              </div>
 
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
                  Update Status
                </label>
                <div className="flex gap-2">
                  {['new', 'contacted', 'scheduled', 'closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedInquiry.id, status)}
                      className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                        selectedInquiry.status === status
                          ? STATUS_STYLES[status] + ' opacity-100'
                          : 'border-white/10 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}