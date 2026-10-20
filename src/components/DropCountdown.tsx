import React, { useState, useEffect } from 'react';
import { Bell, Check, Sparkles, X } from 'lucide-react';

export const DropCountdown: React.FC = () => {
  // Target date set to 2 days, 14 hours, 37 minutes, 9 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 37,
    seconds: 9,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsSubscribed(false);
      setPhoneOrEmail('');
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden bg-neutral-900 text-white rounded-3xl p-8 md:p-14 border border-neutral-800">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
        <span className="font-display font-black text-9xl tracking-tighter">DROP</span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 max-w-5xl mx-auto">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3D81]/20 border border-[#FF3D81]/40 text-[#FF3D81] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIMITED RUN · DROP 02</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
            NEXT DROP.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-md">
            New colorways. Ultra-limited pairs. Once they sell out, they do not restock.
          </p>
        </div>

        {/* Countdown Digits */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOURS' },
            { value: timeLeft.minutes, label: 'MINUTES' },
            { value: timeLeft.seconds, label: 'SECONDS' },
          ].map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-18 sm:w-20 sm:h-22 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-inner">
                  <span className="font-display font-black text-2xl sm:text-4xl text-[#B7FF3C] tabular-nums">
                    {formatDigit(item.value)}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-400 mt-2 uppercase">
                  {item.label}
                </span>
              </div>
              {idx < 3 && (
                <span className="font-display font-bold text-xl sm:text-2xl text-neutral-600 -mt-6">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Remind Button */}
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto py-3.5 px-8 bg-[#FF3D81] hover:bg-[#ff206d] text-white rounded-full font-display font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF3D81]/25 hover:scale-105 transition-all"
          >
            <Bell className="w-4 h-4" />
            <span>REMIND ME</span>
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>

      {/* Remind Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 text-white rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubscribed ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#B7FF3C] text-black mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-display font-extrabold text-xl uppercase text-white">
                  YOU'RE ON THE VIP DROP LIST ⚡
                </h3>
                <p className="text-xs text-neutral-400">
                  We'll ping you 30 minutes before Drop 02 goes live.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-bold text-[#B7FF3C] uppercase">
                    EARLY ACCESS PASS
                  </div>
                  <h3 className="text-xl font-display font-extrabold uppercase">
                    GET THE DROP NOTIFICATION
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Drops sell out in under 3 hours. Enter your email or phone for instant SMS access.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or phone"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B7FF3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#B7FF3C] hover:bg-[#a5f322] text-black rounded-full font-display font-extrabold text-sm uppercase tracking-wider transition-colors"
                >
                  NOTIFY ME FIRST →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
