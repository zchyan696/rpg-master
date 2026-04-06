'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  MapPin,
  Search,
  BookOpen,
  PenLine,
  Coffee,
  Lock,
  FileText,
  BookMarked,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/personagens', label: 'Personagens', icon: Users },
  { href: '/locais', label: 'Locais', icon: MapPin },
  { href: '/caso', label: 'O Caso', icon: Search },
  { href: '/sessoes', label: 'Sessões', icon: BookOpen },
  { href: '/notas', label: 'Notas', icon: PenLine },
]

const docItems = [
  { href: '/documentos/fbi', label: 'Despacho DPF', icon: FileText },
  { href: '/documentos/diario-sofia', label: 'Diário da Sofia', icon: BookMarked },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #110c06 40%, #0d0d0d 100%)',
        borderRight: '1px solid #1e1e1e',
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-9 h-9 rounded-sm flex items-center justify-center text-xl"
            style={{ background: '#8B0000', boxShadow: '0 0 12px rgba(139,0,0,0.4)' }}
          >
            🦉
          </div>
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: '#8B0000', fontFamily: "'Special Elite', monospace" }}
            >
              Black Pines
            </div>
            <div
              className="text-sm font-semibold"
              style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}
            >
              Caderno do Mestre
            </div>
          </div>
        </div>

        {/* Zigzag divider */}
        <div className="mt-4 h-[6px] w-full" style={{
          backgroundImage: 'linear-gradient(135deg, #8B0000 25%, transparent 25%) -5px 0, linear-gradient(225deg, #8B0000 25%, transparent 25%) -5px 0, linear-gradient(315deg, #8B0000 25%, transparent 25%), linear-gradient(45deg, #8B0000 25%, transparent 25%)',
          backgroundSize: '10px 10px',
          backgroundColor: '#1a0505',
        }} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer group"
                style={{
                  background: isActive ? 'rgba(139, 0, 0, 0.15)' : 'transparent',
                  borderLeft: isActive ? '2px solid #8B0000' : '2px solid transparent',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-sm"
                    style={{ background: 'rgba(139, 0, 0, 0.08)' }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon
                  size={16}
                  style={{ color: isActive ? '#8B0000' : '#6B6560', flexShrink: 0 }}
                  className="group-hover:text-[#C9A84C] transition-colors"
                />
                <span
                  className="text-sm transition-colors"
                  style={{
                    color: isActive ? '#F5F0E8' : '#9b8ea0',
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1rem',
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Documentos */}
      <div className="px-3 pb-2 border-t border-[#1e1e1e] pt-3">
        <div
          className="px-3 mb-1"
          style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: '#3a3a3a', textTransform: 'uppercase' }}
        >
          Documentos
        </div>
        {docItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer group"
                style={{
                  background: isActive ? 'rgba(139,0,0,0.15)' : 'transparent',
                  borderLeft: isActive ? '2px solid #8B0000' : '2px solid transparent',
                }}
              >
                <Icon size={14} style={{ color: isActive ? '#8B0000' : '#4a3a3a', flexShrink: 0 }} className="group-hover:text-[#C9A84C] transition-colors" />
                <span className="text-sm" style={{ color: isActive ? '#F5F0E8' : '#6a5a5a', fontFamily: "'Crimson Text', serif", fontSize: '0.9rem' }}>
                  {item.label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Verdade — acesso restrito */}
      <div className="px-3 pb-2 border-t border-[#1e1e1e] pt-2">
        <Link href="/verdade">
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
            className="relative flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer group"
            style={{
              background: pathname === '/verdade' ? 'rgba(139,0,0,0.15)' : 'transparent',
              borderLeft: pathname === '/verdade' ? '2px solid #8B0000' : '2px solid transparent',
            }}
          >
            <Lock size={14} style={{ color: pathname === '/verdade' ? '#8B0000' : '#3a2a2a', flexShrink: 0 }} />
            <span className="text-sm" style={{
              color: pathname === '/verdade' ? '#F5F0E8' : '#4a3a3a',
              fontFamily: "'Crimson Text', serif",
              fontSize: '0.9rem',
            }}>
              A Verdade
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Coffee footer */}
      <div className="px-5 py-5 border-t border-[#1e1e1e]">
        <div className="flex items-center gap-2 opacity-50">
          <Coffee size={13} style={{ color: '#C9A84C' }} />
          <span
            className="text-xs"
            style={{ color: '#6B6560', fontFamily: "'Special Elite', monospace", letterSpacing: '0.1em' }}
          >
            "The owls are not<br />what they seem"
          </span>
        </div>
      </div>
    </motion.aside>
  )
}
