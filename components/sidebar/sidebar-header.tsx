import Image from "next/image"
import { User as UserIcon } from "lucide-react"
import type { User } from "@/types"

interface SidebarHeaderProps {
  user?: User | null
  isUserLoading?: boolean
  userError?: string | null
  className?: string
}

export function SidebarHeader({ user, isUserLoading, userError, className = "" }: SidebarHeaderProps) {
  // Determine what to display
  let displayUser = {
    name: "Loading...",
    role: "..."
  }
  
  if (isUserLoading) {
    displayUser = {
      name: "Loading...",
      role: "Memuat..."
    }
  } else if (userError) {
    displayUser = {
      name: "Error",
      role: "Gagal memuat"
    }
  } else if (user) {
    displayUser = {
      name: user.name,
      role: formatRole(user.role)
    }
  } else {
    displayUser = {
      name: "Guest",
      role: "User"
    }
  }

  return (
    <>
      <div className={`bg-[#2d29c8] flex items-center justify-between px-4 py-3 ${className}`}>
        {/* Left Side: Logo + WMS */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/hpc-logo-white.webp"
            alt="LogiFlow Logo"
            width={65}
            height={22}
            className="object-contain"
          />
        </div>

        {/* Right Side: Profile */}
        <div className="flex items-center gap-2 border-l border-indigo-400/20 pl-3">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-indigo-400/30 bg-indigo-600/30 flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <h3 className={`truncate text-[11px] font-bold text-white ${isUserLoading ? 'animate-pulse' : ''}`}>
              {displayUser.name}
            </h3>
            <h4 className={`truncate text-[9px] text-indigo-300 uppercase font-medium ${isUserLoading ? 'animate-pulse' : ''} ${userError ? 'text-red-300' : ''}`}>
              {displayUser.role}
            </h4>
          </div>
        </div>
      </div>
      <div className="border-b border-indigo-500/30" />
    </>
  )
}

// Helper function to format role display
function formatRole(role: string): string {
  const roleMap: Record<string, string> = {
    'admin': 'Admin',
    'super_admin': 'Super Admin',
    'user': 'Pengguna',
    'staff': 'Staff',
    'supervisor': 'Supervisor',
    'approver': 'Approver',
    'inspeksi_mesin': 'Inspeksi',
    'assembly_staff': 'Assembly',
    'qc_staff': 'QC',
    'pdi_staff': 'PDI',
    'painting_staff': 'Painting',
    'pindah_lokasi': 'Logistics'
  }
  
  return roleMap[role] || role
}