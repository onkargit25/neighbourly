import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

import Logo from '@/assets/logos/logo.png';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Communities', href: '#communities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-neutral-100 dark:bg-neutral-950/80 dark:border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center flex-shrink-0"
        >
          <img
            src={Logo}
            alt="Neighbourly"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-olive-700 transition-colors dark:text-neutral-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="btn-ghost"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-900 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <img
                  src={Logo}
                  alt="Neighbourly"
                  className="h-12 w-auto object-contain"
                />

                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-neutral-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 border-b border-neutral-100 dark:border-neutral-800"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-secondary w-full"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary w-full"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}