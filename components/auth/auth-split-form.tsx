'use client';

import Link from 'next/link';
import '@/app/auth.css';

type AuthSplitFormProps = {
  mode: 'login' | 'signup';
};

const contentByMode = {
  login: {
    title: 'Entrar',
    description: 'Acesse sua conta para continuar registrando seus mergulhos.',
    actionLabel: 'Entrar',
    alternateLabel: 'Nao tem conta?',
    alternateLinkLabel: 'Criar conta',
    alternateLinkHref: '/cadastro',
  },
  signup: {
    title: 'Criar Conta',
    description: 'Crie seu acesso e comece a evoluir no APNEIA SUB.',
    actionLabel: 'Criar Conta',
    alternateLabel: 'Ja tem conta?',
    alternateLinkLabel: 'Entrar',
    alternateLinkHref: '/login',
  },
} as const;

export function AuthSplitForm({ mode }: AuthSplitFormProps) {
  const content = contentByMode[mode];
  const isSignup = mode === 'signup';

  return (
    <main className="auth-page">
      <section className="auth-split">
        <aside className="auth-brand-panel">
          <Link href="/" className="auth-logo">
            <span className="auth-logo-mark">AP</span>
            <span className="auth-logo-text">APNEIA SUB</span>
          </Link>
          <h1 className="auth-brand-headline">Mergulhe mais fundo nos seus dados.</h1>
          <p className="auth-brand-copy">
            Sua jornada de apneia organizada em um unico lugar: mergulhos, metas e evolucao.
          </p>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-card">
            <Link href="/" className="auth-back-link">
              ← Voltar para home
            </Link>
            <h2>{content.title}</h2>
            <p>{content.description}</p>

            <form className="auth-form">
              {isSignup ? (
                <>
                  <label htmlFor="fullName">Nome completo</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    required
                  />

                  <label htmlFor="phone">Telefone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    required
                  />
                </>
              ) : null}

              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />

              {isSignup ? (
                <>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    autoComplete="new-password"
                    required
                  />
                </>
              ) : null}

              <button type="submit">{content.actionLabel}</button>
            </form>

            <span className="auth-alt-link">
              {content.alternateLabel}{' '}
              <Link href={content.alternateLinkHref}>{content.alternateLinkLabel}</Link>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
}
