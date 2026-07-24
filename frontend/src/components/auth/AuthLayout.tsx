import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/logos/logo.png';

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left side — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-olive-50 via-white to-olive-50 dark:from-olive-900/20 dark:via-neutral-900 dark:to-olive-900/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-olive-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-olive-100/30 rounded-full blur-3xl" />

        <div className="relative flex flex-col justify-between p-12 w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center w-fit"
          >
            <img
              src={Logo}
              alt="Neighbourly Logo"
              className="h-14 w-auto"
            />
          </button>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl lg:text-5xl leading-tight max-w-md"
            >
              Save Money. Earn Money. Strengthen Your Community.
            </motion.h1>

            <p className="mt-4 text-neutral-500 max-w-md">
              The trusted community platform for residential communities.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <span>★★★★★ Trusted by 120+ communities</span>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-neutral-950">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <img
                src={Logo}
                alt="Neighbourly Logo"
                className="h-12 w-auto"
              />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl mb-1">{title}</h2>
            <p className="text-sm text-neutral-500 mb-8">{subtitle}</p>

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}