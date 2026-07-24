import Logo from "@/assets/logos/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: ["Features", "Communities", "How It Works", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community Guidelines", "API Docs", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  },
];

const socials = ["Twitter", "LinkedIn", "Instagram", "YouTube"];

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

          {/* Logo + Tagline */}
          <div className="col-span-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center mb-4"
            >
              <img
                src={Logo}
                alt="Neighbourly Logo"
                className="h-12 w-auto"
              />
            </button>

            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
              Save Money. Earn Money. Strengthen Your Community.
            </p>
          </div>

          {/* Links */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3">{col.title}</h4>

              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neutral-500 hover:text-olive-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Social</h4>

            <ul className="space-y-2">
              {socials.map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-sm text-neutral-500 hover:text-olive-700 transition-colors"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Neighbourly Logo"
              className="h-8 w-auto"
            />

            <span className="text-sm text-neutral-500">
              © 2024 NEIGHBOURLY. All rights reserved.
            </span>
          </div>

          <p className="text-xs text-neutral-400">
            The Trusted Community Platform for Residential Communities
          </p>

        </div>
      </div>
    </footer>
  );
}