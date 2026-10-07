import React, { useMemo } from 'react';
import { site } from '../../lib/site';

interface OpenTicketProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const OpenTicket: React.FC<OpenTicketProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const status = useMemo(() => {
    if (!site.hours || site.hours.length === 0) {
      return { state: 'SOON', label: 'HOURS SOON', sublabel: 'Schedule being updated' };
    }

    try {
      const now = new Date();
      // Format to Asia/Kolkata time
      const kolkataTimeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: site.timezone,
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(now);

      const parts = kolkataTimeStr.split(' ');
      const weekday = parts[0];
      const timeParts = parts[parts.length - 1].split(':');
      const currentMinutes = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);

      const todayHours = site.hours.find((h) => h.day.toLowerCase() === weekday.toLowerCase());
      if (!todayHours) {
        return { state: 'CLOSED', label: 'CLOSED', sublabel: 'Closed today' };
      }

      const [openH, openM] = todayHours.open.split(':').map(Number);
      const [closeH, closeM] = todayHours.close.split(':').map(Number);
      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        const remainingMinutes = closeMinutes - currentMinutes;
        const hRemaining = Math.floor(remainingMinutes / 60);
        const mRemaining = remainingMinutes % 60;
        const closeText = hRemaining > 0 ? `Closes in ${hRemaining}h ${mRemaining}m` : `Closes in ${mRemaining}m`;
        return { state: 'OPEN', label: 'OPEN NOW', sublabel: closeText };
      } else {
        return {
          state: 'CLOSED',
          label: 'CLOSED',
          sublabel: `Opens at ${todayHours.open}`,
        };
      }
    } catch {
      return { state: 'OPEN', label: 'OPEN TODAY', sublabel: '11:30 - 23:00 IST' };
    }
  }, []);

  const badgeStyles = {
    OPEN: 'bg-[#8DB580] text-[#1E3E26] border-[#2F5D3A]',
    CLOSED: 'bg-[#2A1E18] text-[#F3FEFE] border-[#E6C08B]',
    SOON: 'bg-[#F5F0E6] text-[#6D4B38] border-[#E6C08B]',
  };

  return (
    <div
      aria-live="polite"
      className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-md border-2 border-dashed ${
        badgeStyles[status.state as keyof typeof badgeStyles]
      } ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%, 4% 50%)',
      }}
    >
      <span className="w-2 h-2 rounded-full animate-ping bg-current opacity-75 shrink-0" />
      <div className="flex flex-col">
        <span className="font-ui text-[11px] font-bold tracking-widest uppercase">
          {status.label}
        </span>
        {variant === 'full' && (
          <span className="text-[10px] opacity-80 font-mono tracking-tight">
            {status.sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
