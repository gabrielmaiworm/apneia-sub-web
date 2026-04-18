import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const navigation = [
  { href: '/', label: 'Base' },
  { href: '/feed', label: 'Feed' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/spots', label: 'Spots' },
  { href: '/gear', label: 'Gear' },
  { href: '/profile', label: 'Perfil' },
];

export default function AppShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="shell">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-storm/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <Link className="flex items-center gap-3" href="/">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-reef to-kelp text-storm">
                ▽
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Plataforma</p>
                <h1 className="text-lg font-semibold text-white">Apneia & Pesca Sub</h1>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => (
                <Link
                  className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </div>
  );
}
