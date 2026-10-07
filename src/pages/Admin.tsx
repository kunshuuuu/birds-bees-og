import React, { useState, useEffect } from 'react';
import { bookingRepo } from '../services/bookingRepo.local';
import { BookingRecord } from '../services/types';
import { MagneticButton } from '../components/animations/MagneticButton';

export const Admin: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  const fetchBookings = async () => {
    const list = await bookingRepo.getAll();
    setBookings(list);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BookingRecord['status']) => {
    await bookingRepo.updateStatus(id, newStatus);
    await fetchBookings();
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Date', 'Time', 'Guests', 'Seating', 'Occasion', 'Name', 'Phone', 'Email', 'Status', 'Notes'];
    const rows = bookings.map((b) => [
      b.id,
      b.date,
      b.time,
      b.guests,
      b.seating,
      `"${b.occasion}"`,
      `"${b.name}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      b.status,
      `"${b.notes || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `birds-and-bees-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = bookings.filter((b) => {
    if (filterDate && b.date !== filterDate) return false;
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12 bg-[#F3FEFE]">
      <div className="max-w-7xl mx-auto">
        {/* Mandatory Staff Demo Banner (§3 & §14) */}
        <div className="mb-8 p-4 rounded-xl bg-[#E6C08B]/30 border-2 border-[#E6C08B] text-xs font-mono text-[#6D4B38] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-bold uppercase tracking-wider text-[#AB653E] block mb-1">
              STAFF RESERVATIONS VIEW (DEMO)
            </span>
            <p>Demo only — real password protection needs the server (see README &rarr; Phase 7). Bookings stored in browser localStorage.</p>
          </div>
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-lg bg-[#2A1E18] text-white font-ui font-semibold hover:bg-[#AB653E] transition-colors whitespace-nowrap"
          >
            Export CSV ⤓
          </button>
        </div>

        {/* Dashboard Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#6D4B38]/15 pb-6">
          <div>
            <h1 className="font-display font-medium text-4xl text-[#2A1E18]">
              Garden Reservation Desk
            </h1>
            <p className="font-body text-sm text-[#6D4B38] mt-1">
              Managing real-time guest capacity and slot confirmations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-ui text-xs">
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#6D4B38] mb-1">Filter Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#CED9E1] bg-white text-[#2A1E18]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#6D4B38] mb-1">Filter Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#CED9E1] bg-white text-[#2A1E18]"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {filterDate && (
              <button
                onClick={() => setFilterDate('')}
                className="self-end px-3 py-1.5 text-xs text-[#AB653E] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#F5F0E6] paper-texture rounded-2xl border border-[#CED9E1] shadow-lg overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-[#6D4B38]">
              <p className="font-display text-xl mb-1">No reservations found.</p>
              <p className="font-body text-sm">Make a booking on /book to see it populate here instantly.</p>
            </div>
          ) : (
            <table className="w-full text-left font-ui text-xs">
              <thead className="bg-[#2A1E18] text-[#F3FEFE] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Party</th>
                  <th className="py-3 px-4">Seating</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6D4B38]/15">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-white/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#AB653E]">{b.id}</td>
                    <td className="py-3 px-4 font-medium">{b.date} at {b.time}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#2A1E18]">{b.name}</div>
                      <div className="text-[10px] text-[#6D4B38]">{b.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{b.guests} guests</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2F5D3A]/10 text-[#2F5D3A]">
                        {b.seating}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : b.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-2 py-1 rounded-sm bg-white border border-[#CED9E1] hover:bg-[#E6C08B] text-[#2A1E18]"
                      >
                        Details
                      </button>
                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'cancelled')}
                          className="px-2 py-1 rounded-sm text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                      {b.status === 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'confirmed')}
                          className="px-2 py-1 rounded-sm text-green-600 hover:bg-green-50"
                        >
                          Reconfirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Selected Booking Details Drawer Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6">
            <div className="relative w-full max-w-md bg-[#F5F0E6] paper-texture rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#CED9E1]">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 text-[#2A1E18] font-bold text-lg hover:text-[#AB653E]"
              >
                ✕
              </button>

              <h3 className="font-display text-2xl text-[#2A1E18] mb-4">
                Reservation Details: {selectedBooking.id}
              </h3>

              <div className="space-y-3 font-ui text-sm border-t border-b border-[#6D4B38]/20 py-4 my-4">
                <div className="flex justify-between">
                  <span className="text-[#6D4B38]">Guest Name:</span>
                  <span className="font-bold text-[#2A1E18]">{selectedBooking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D4B38]">Contact:</span>
                  <span>{selectedBooking.phone} · {selectedBooking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D4B38]">Date &amp; Time:</span>
                  <span className="font-bold">{selectedBooking.date} at {selectedBooking.time} IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D4B38]">Party &amp; Seating:</span>
                  <span>{selectedBooking.guests} Guests ({selectedBooking.seating})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D4B38]">Occasion:</span>
                  <span>{selectedBooking.occasion}</span>
                </div>
                {selectedBooking.notes && (
                  <div className="pt-2">
                    <span className="text-[#6D4B38] block text-xs uppercase font-bold">Special Notes:</span>
                    <p className="font-body text-sm bg-white/70 p-2 rounded-lg mt-1">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-5 py-2 rounded-full bg-[#2A1E18] text-white text-xs font-ui font-bold uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
