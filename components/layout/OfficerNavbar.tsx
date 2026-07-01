'use client';

import { useRouter } from 'next/navigation';
import { Menu, Zap, LogOut } from 'lucide-react';

type OfficerNavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OfficerNavbar({
  setOpen,
}: OfficerNavbarProps) {
  const router = useRouter();

  return (
    <header
      className="
      fixed top-0 left-0 right-0 z-50
      h-16
      flex items-center justify-between
      border-b border-white/40
      bg-gradient-to-r from-white/80 via-white/70 to-white/80
      backdrop-blur-2xl
      px-3 sm:px-4 lg:left-64 lg:px-8
      shadow-[0_8px_30px_rgba(0,0,0,0.05)]
    "
    >
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Mobile Menu */}
        <button
  onClick={() => setOpen(true)}
  className="rounded-xl bg-[#EAF3FF] p-2 text-[#45607F] transition hover:bg-blue-100 lg:hidden shrink-0"
>
  <Menu className="h-5 w-5" />
</button>

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">


          <div className="min-w-0">
            <h1
              className="
              text-sm sm:text-base
              font-extrabold
              text-[#0B1B34]
              truncate
            "
            >
              Officer Dashboard
            </h1>

            <p
              className="
              hidden
              md:block
              text-[11px]
              text-[#6B85A6]
              truncate
            "
            >
              Manage resumes, ATS scores & student insights
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Logout */}
        <button
          onClick={async () => {
            try {
              await fetch('/api/auth/logout', {
                method: 'POST',
              });
            } catch {}

            router.push('/login');
          }}
          className="
          group
          flex items-center justify-center
          gap-2
          rounded-xl
          bg-red-50
          p-2 sm:px-4 sm:py-2
          text-red-600
          transition-all
          hover:bg-gradient-to-r
          hover:from-red-500
          hover:to-pink-500
          hover:text-white
        "
        >
          <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform" />

          <span className="hidden sm:inline text-xs font-bold">
            Logout
          </span>
        </button>

        {/* Profile */}
        <div
          className="
          flex
          h-9 w-9 sm:h-10 sm:w-10
          items-center justify-center
          rounded-full
          bg-blue-500
          text-xs
          font-bold
          text-white
          ring-2 ring-white
          shadow-[0_10px_25px_rgba(59,73,223,0.35)]
        "
        >
          PO
        </div>
      </div>
    </header>
  );
}