import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import '../styles/layouts/AppLayout.css'

const navItems = [
  { to: '/coach', label: 'AI 피드백' },
  { to: '/rewards', label: '마이 페이지' },
  { to: '/rewards/shop', label: '리워드샵' },
  { to: '/settings', label: '루틴 설정' },
]

const activeLinkClass = ({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')

export default function AppLayout() {
  const location = useLocation()
  const { user } = useAppState()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const isLanding = location.pathname === '/'
  const isAuth = location.pathname.startsWith('/auth')

  useEffect(() => {
    setIsNavOpen(false)
  }, [location.pathname])

  return (
    <div className="shell">
      <div className="shell__glow" aria-hidden="true" />

      <header className={`shell__header ${isLanding ? 'is-transparent' : ''}`}>
        <div className="shell__brand">
          <Link to="/" className="brand">
            <span className="brand__symbol">PP</span>
            <span className="brand__meta">
              <strong>PrePair</strong>
              <span>AI Interview Partner for Your Best Match</span>
            </span>
          </Link>
        </div>

        {!isAuth && (
          <nav
            id="primary-navigation"
            className={`shell__nav ${isNavOpen ? 'is-open' : ''}`}
            aria-label="주요 메뉴"
          >
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={activeLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="shell__actions">
          {!isAuth && (
            <button
              type="button"
              className="menu-toggle"
              aria-controls="primary-navigation"
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="menu-toggle__icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="sr-only">{isNavOpen ? '메뉴 닫기' : '메뉴 열기'}</span>
            </button>
          )}

          {user ? (
            <Link to="/rewards" className="user-chip">
              <span className="user-chip__avatar" aria-hidden="true">
                {user.avatar || '✨'}
              </span>
              <div className="user-chip__meta">
                <strong>{user.name}</strong>
                <span>
                  {user.points.toLocaleString()} pts · {user.tier}
                </span>
              </div>
            </Link>
          ) : (
            <>
              <Link to="/auth?mode=login" className="cta-button cta-button--ghost">
                로그인
              </Link>
              <Link to="/auth?mode=signup" className="cta-button cta-button--primary">
                회원가입
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="shell__main">
        <AnimatePresence mode="wait">
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="shell__page"
          >
            <Outlet />
          </Motion.div>
        </AnimatePresence>
      </main>

      <footer className="shell__footer">
        <span>© {new Date().getFullYear()} PrePair · 완벽한 면접 준비를 위한 AI 파트너</span>
        <span>Beta • 함께 성장할 이야기를 들려주세요</span>
      </footer>
    </div>
  )
}
