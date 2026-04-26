'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import '@/app/landing.css';

function OceanEffects() {
  useEffect(() => {
    const canvas = document.getElementById('ocean-canvas');
    if (!canvas) return;
    const rays = [
      { l: '8%', w: 70, dur: 9, del: 0, rot: -7, op: 0.55 },
      { l: '20%', w: 28, dur: 11, del: 1.5, rot: -3, op: 0.35 },
      { l: '32%', w: 90, dur: 8, del: 0.4, rot: 2, op: 0.65 },
      { l: '47%', w: 22, dur: 13, del: 2.2, rot: -5, op: 0.28 },
      { l: '60%', w: 55, dur: 9.5, del: 0.9, rot: 4, op: 0.5 },
      { l: '74%', w: 40, dur: 10, del: 1.8, rot: -2, op: 0.45 },
      { l: '89%', w: 32, dur: 8.5, del: 0.2, rot: 3, op: 0.38 },
    ];
    rays.forEach((r) => {
      const el = document.createElement('div');
      el.className = 'ray';
      el.style.cssText = `left:${r.l};width:${r.w}px;height:130vh;background:linear-gradient(180deg,rgba(0,200,255,${r.op * 0.25}) 0%,transparent 80%);--rot:${r.rot}deg;animation-duration:${r.dur}s;animation-delay:${r.del}s;`;
      canvas.appendChild(el);
    });
    for (let i = 0; i < 35; i++) {
      const b = document.createElement('div');
      b.className = 'bub';
      const s = Math.random() * 14 + 3;
      b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;bottom:-20px;animation-duration:${Math.random() * 14 + 8}s;animation-delay:${Math.random() * 12}s;`;
      canvas.appendChild(b);
    }
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.className = 'plank';
      const dx = (Math.random() - 0.5) * 100;
      const dy = -(Math.random() * 100 + 30);
      p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--px:${dx}px;--py:${dy}px;animation-duration:${Math.random() * 10 + 6}s;animation-delay:${Math.random() * 10}s;`;
      canvas.appendChild(p);
    }
    return () => {
      canvas.innerHTML = '';
    };
  }, []);
  return null;
}

function DepthMeter() {
  useEffect(() => {
    const prog = document.getElementById('depthProg');
    const numEl = document.getElementById('depthNum');
    if (!prog || !numEl) return;
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      const pct = h <= 0 ? 0 : Math.min(window.scrollY / h, 1);
      prog.style.height = `${pct * 100}%`;
      numEl.textContent = `${Math.round(pct * 40)}m`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector('.landing-body');
    const rvEls = root ? root.querySelectorAll('.rv') : [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('vi');
        });
      },
      { threshold: 0.1 },
    );
    rvEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}

export function ApneiaLanding() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-landing', 'true');
    return () => document.documentElement.removeAttribute('data-landing');
  }, []);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => {
      if (mq.matches) setNavOpen(false);
    };
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <div className="landing-body">
      <OceanEffects />
      <DepthMeter />
      <ScrollReveal />
<div id="ocean-canvas"></div>


<div className="depth-hud">
  <span className="depth-label" id="depthNum">0m</span>
  <div className="depth-track"><div className="depth-prog" id="depthProg"></div></div>
  <span className="depth-label">40m</span>
</div>

<div className="page">

  
  {navOpen ? (
    <button
      type="button"
      className="nav-backdrop"
      aria-label="Fechar menu"
      onClick={closeNav}
    />
  ) : null}
  <nav className={`landing-nav${navOpen ? ' is-open' : ''}`}>
    <Link className="logo-wrap" href="/" onClick={closeNav}>
      <div className="logo-mark">AP</div>
      <div className="logo-text">APNEIA <span>SUB</span></div>
    </Link>
    <button
      type="button"
      className="nav-toggle"
      aria-expanded={navOpen}
      aria-controls="landing-nav-links"
      aria-label={navOpen ? 'Fechar menu' : 'Abrir menu'}
      onClick={() => setNavOpen((o) => !o)}
    >
      <span className="nav-toggle-bar" />
      <span className="nav-toggle-bar" />
      <span className="nav-toggle-bar" />
    </button>
    <ul className="nav-mid" id="landing-nav-links">
      <li><a href="#modulos" onClick={closeNav}>Módulos</a></li>
      <li><a href="#divelog" onClick={closeNav}>Dive Log</a></li>
      <li><a href="#geo" onClick={closeNav}>Geo & Spots</a></li>
      <li><a href="#gamif" onClick={closeNav}>Conquistas</a></li>
      <li><a href="#pwa" onClick={closeNav}>Tecnologia</a></li>
    </ul>
    <div className="nav-cta">
      <Link className="btn-sm" href="/login" onClick={closeNav}>Entrar</Link>
      <Link className="btn-sm solid" href="/cadastro" onClick={closeNav}>Criar Conta</Link>
    </div>
  </nav>

  
  <section id="hero">
    <div className="hero-eyebrow">Plataforma do Mergulhador Livre</div>
    <h1 className="hero-h1">
      APNEIA
      <span className="line2">Sub</span>
    </h1>
    <div className="hero-rule"></div>
    <p className="hero-p">O app que transforma cada mergulho em dado, conexão e evolução. Registre, compartilhe, compita e proteja o oceano — tudo em um único lugar.</p>
    <div className="hero-btns">
      <a href="#modulos" className="btn-hero primary">Explorar o App</a>
      <a href="#divelog" className="btn-hero ghost">Ver o Feed →</a>
    </div>
    <div className="stats-row">
      <div className="stat"><div className="stat-v">7</div><div className="stat-l">Módulos</div></div>
      <div className="stat-sep"></div>
      <div className="stat"><div className="stat-v">40m</div><div className="stat-l">Profundidade</div></div>
      <div className="stat-sep"></div>
      <div className="stat"><div className="stat-v">PWA</div><div className="stat-l">Offline First</div></div>
      <div className="stat-sep"></div>
      <div className="stat"><div className="stat-v">100%</div><div className="stat-l">Open Ocean</div></div>
    </div>
    <div className="scroll-hint">
      <span>Rolar</span>
      <i></i>
    </div>
  </section>

  
  <div className="modules-intro" id="modulos">
    <div className="rv">
      <div className="section-eyebrow">O App</div>
      <h2 className="section-h2">PLATAFORMA <br />COMPLETA <br />DO CAÇADOR</h2>
      <p className="section-desc">Do Dive Log social ao mapa de spots secretos, do inventário de equipamentos ao leaderboard de profundidade — tudo pensado para quem vive no mar.</p>
    </div>
    <div className="module-visual rv">
      <div className="floating-badge fb1">
        <span className="fb-label">Personal Best</span>
        <span className="fb-val">▼ 32.4M</span>
      </div>
      <div className="floating-badge fb2">
        <span className="fb-label">Apneia Máx</span>
        <span className="fb-val">◷ 3:42</span>
      </div>
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="pui-header">
            <div className="pui-title">Dashboard</div>
            <div className="pui-avatar"></div>
          </div>
          <div className="pui-stats">
            <div className="pui-stat"><div className="pui-stat-v">24</div><span className="pui-stat-l">Mergulhos</span></div>
            <div className="pui-stat"><div className="pui-stat-v">32m</div><span className="pui-stat-l">Profund</span></div>
            <div className="pui-stat"><div className="pui-stat-v">Lv4</div><span className="pui-stat-l">Nível</span></div>
          </div>
          <div className="pui-divelog">
            <div className="pui-dive-row">
              <span className="pui-dive-user">GABRIEL_SUB</span>
              <span className="pui-dive-time">14:23</span>
            </div>
            <div className="pui-dive-data">
              <div className="pui-kv"><strong>28m</strong><small>Profund</small></div>
              <div className="pui-kv"><strong>2:15</strong><small>Apneia</small></div>
              <div className="pui-kv"><strong>26°C</strong><small>Temp</small></div>
            </div>
            <div className="pui-actions">
              <div className="pui-btn">🎯 Arpão Up (12)</div>
              <div className="pui-btn">💬 Comentar</div>
            </div>
          </div>
          <div className="pui-map-box">
            <div className="pui-map-grid"></div>
            <div className="pui-map-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <div className="section" style={{
    'paddingTop': '0'
  }}>
    <div className="modules-list rv">
      <div className="mod-card rv d1">
        <div className="mod-num">01 / AUTH</div>
        <div className="mod-icon">👤</div>
        <div className="mod-h3">Identidade & Perfil</div>
        <p className="mod-p">Cadastro e Login via JWT / OAuth2. Perfil do Mergulhador com avatar, biografia e nível. Gestão de Recordes Pessoais (PB) — Profundidade e Tempo de Apneia. Configurações de privacidade por público, privado ou amigos.</p>
        <div className="mod-tags">
          <span className="tag">JWT</span>
          <span className="tag">OAuth2</span>
          <span className="tag green">Personal Best</span>
        </div>
      </div>
      <div className="mod-card rv d2">
        <div className="mod-num">02 / DIVE LOG</div>
        <div className="mod-icon">📓</div>
        <div className="mod-h3">Dive Log Social</div>
        <p className="mod-p">Postagem de mergulhos com upload de fotos e vídeos. Dados técnicos: profundidade, apneia, temperatura, lastro e visibilidade. Sistema de "Arpão Up", comentários em árvore e feed dinâmico por relevância ou cronologia.</p>
        <div className="mod-tags">
          <span className="tag green">Arpão Up</span>
          <span className="tag">Feed Dinâmico</span>
          <span className="tag">Upload</span>
        </div>
      </div>
      <div className="mod-card rv d3">
        <div className="mod-num">03 / GEO</div>
        <div className="mod-icon">🗺️</div>
        <div className="mod-h3">Geo & Spots</div>
        <p className="mod-p">Marcação de hotspots via GPS com filtros por tipo de fundo: Pedra, Areia, Naufrágio. Opção "Ocultar Coordenadas" para pontos secretos. Busca por parceiros de mergulho por raio geográfico.</p>
        <div className="mod-tags">
          <span className="tag">GPS</span>
          <span className="tag gold">Pontos Secretos</span>
          <span className="tag green">Buddy Finder</span>
        </div>
      </div>
      <div className="mod-card rv d4">
        <div className="mod-num">04 / GEAR</div>
        <div className="mod-icon">🔱</div>
        <div className="mod-h3">Equipment (Gear)</div>
        <p className="mod-p">Inventário de arbaletes, nadadeiras, computadores e roupas. Alertas de manutenção automáticos (troca de elásticos, revisão de carretilhas). Reviews técnicos da comunidade sobre performance de itens.</p>
        <div className="mod-tags">
          <span className="tag">My Gear</span>
          <span className="tag gold">Alertas</span>
          <span className="tag">Reviews</span>
        </div>
      </div>
      <div className="mod-card rv d5">
        <div className="mod-num">05 / AMBIENTE</div>
        <div className="mod-icon">🌊</div>
        <div className="mod-h3">Ambiental & Espécies</div>
        <p className="mod-p">APIs de Tábua de Marés, Vento e Ondulação integradas. Catálogo ilustrado de espécies com nomes científicos e tamanhos mínimos legais. Alertas de Zonas de Exclusão — Reservas Marinhas visíveis no mapa.</p>
        <div className="mod-tags">
          <span className="tag green">API Marés</span>
          <span className="tag">Catálogo</span>
          <span className="tag gold">Reservas</span>
        </div>
      </div>
      <div className="mod-card rv d1">
        <div className="mod-num">06 / GAME</div>
        <div className="mod-icon">🏅</div>
        <div className="mod-h3">Gamificação</div>
        <p className="mod-p">Badges automáticos: "Mergulhador Noturno", "Deep Master", "Explorador de Naufrágios". Rankings mensais por profundidade ou peixe, entre amigos ou global. XP baseado em logs e interações na comunidade.</p>
        <div className="mod-tags">
          <span className="tag gold">Badges</span>
          <span className="tag">Leaderboard</span>
          <span className="tag green">XP</span>
        </div>
      </div>
      <div className="mod-card rv d2" style={{
    'gridColumn': '1/-1'
  }}>
        <div className="mod-num">07 / SOCIAL</div>
        <div className="mod-icon">📡</div>
        <div className="mod-h3">Social Graph & Segurança</div>
        <p className="mod-p">Follow system completo com seguidores e seguindo. Push Notifications para curtidas, comentários e avisos de segurança. <strong style={{
    'color': 'var(--bio)'
  }}>Buddy Safety</strong> — funcionalidade que avisa um contato externo sobre o horário previsto de retorno da água. Nunca mergulhe sem parceiro.</p>
        <div className="mod-tags">
          <span className="tag">Follow</span>
          <span className="tag">Push</span>
          <span className="tag green">Buddy Safety</span>
          <span className="tag gold">Segurança</span>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  
  <div className="divelog-showcase rv" id="divelog">
    <div className="section-eyebrow">Módulo 02</div>
    <h2 className="section-h2">O FEED <br />QUE RESPIRA</h2>
    <p className="section-desc">Cada mergulho vira uma história técnica e visual. Curta, comente, compartilhe — a comunidade se forma em torno da profundidade.</p>
    <div className="dl-feed">
      <div className="dl-card rv d1">
        <div className="dl-img">
          <div className="dl-img-glow"></div>
          <div className="dl-img-fish">🐠</div>
          <div className="dl-img-depth">▼ 28m</div>
        </div>
        <div className="dl-body">
          <div className="dl-user">
            <div className="dl-avatar">MR</div>
            <div><div className="dl-name">Marcos Rocha</div><div className="dl-loc">📍 Arraial do Cabo, RJ</div></div>
          </div>
          <div className="dl-data-row">
            <div className="dl-datum"><strong>28m</strong><small>Profund</small></div>
            <div className="dl-datum"><strong>2:18</strong><small>Apneia</small></div>
            <div className="dl-datum"><strong>26°C</strong><small>Temp</small></div>
            <div className="dl-datum"><strong>8m</strong><small>Visib</small></div>
          </div>
          <div className="dl-species">🐟 Garoupa-verdadeira · 1.4kg</div>
          <div className="dl-actions">
            <span className="dl-action"><span className="icon">🎯</span> Arpão Up (24)</span>
            <span className="dl-action"><span className="icon">💬</span> 8</span>
            <span className="dl-action"><span className="icon">↗</span></span>
          </div>
        </div>
      </div>
      <div className="dl-card rv d2">
        <div className="dl-img" style={{
    'background': 'linear-gradient(135deg,#031525,#062040,#031020)'
  }}>
          <div className="dl-img-glow"></div>
          <div className="dl-img-fish">🦑</div>
          <div className="dl-img-depth">▼ 35m</div>
        </div>
        <div className="dl-body">
          <div className="dl-user">
            <div className="dl-avatar" style={{
    'background': 'linear-gradient(135deg,#008844,var(--bio))'
  }}>CA</div>
            <div><div className="dl-name">Carol Abreu</div><div className="dl-loc">📍 Búzios, RJ</div></div>
          </div>
          <div className="dl-data-row">
            <div className="dl-datum"><strong>35m</strong><small>Profund</small></div>
            <div className="dl-datum"><strong>3:05</strong><small>Apneia</small></div>
            <div className="dl-datum"><strong>22°C</strong><small>Temp</small></div>
            <div className="dl-datum"><strong>15m</strong><small>Visib</small></div>
          </div>
          <div className="dl-species">🔴 Ponto Naufrágio · Fundo Misto</div>
          <div className="dl-actions">
            <span className="dl-action"><span className="icon">🎯</span> Arpão Up (61)</span>
            <span className="dl-action"><span className="icon">💬</span> 17</span>
            <span className="dl-action"><span className="icon">↗</span></span>
          </div>
        </div>
      </div>
      <div className="dl-card rv d3">
        <div className="dl-img" style={{
    'background': 'linear-gradient(135deg,#042030,#051828,#020d1a)'
  }}>
          <div className="dl-img-glow"></div>
          <div className="dl-img-fish">🐡</div>
          <div className="dl-img-depth">▼ 18m</div>
        </div>
        <div className="dl-body">
          <div className="dl-user">
            <div className="dl-avatar" style={{
    'background': 'linear-gradient(135deg,#884400,var(--gold))'
  }}>FS</div>
            <div><div className="dl-name">Felipe Santos</div><div className="dl-loc">📍 Angra dos Reis, RJ</div></div>
          </div>
          <div className="dl-data-row">
            <div className="dl-datum"><strong>18m</strong><small>Profund</small></div>
            <div className="dl-datum"><strong>1:45</strong><small>Apneia</small></div>
            <div className="dl-datum"><strong>28°C</strong><small>Temp</small></div>
            <div className="dl-datum"><strong>6m</strong><small>Visib</small></div>
          </div>
          <div className="dl-species">🐟 Cioba · 800g</div>
          <div className="dl-actions">
            <span className="dl-action"><span className="icon">🎯</span> Arpão Up (9)</span>
            <span className="dl-action"><span className="icon">💬</span> 4</span>
            <span className="dl-action"><span className="icon">↗</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  
  <div className="geo-section rv" id="geo">
    <div>
      <div className="section-eyebrow">Módulo 03</div>
      <h2 className="section-h2">MAPA <br />DE SPOTS</h2>
      <p className="section-desc" style={{
    'marginBottom': '2rem'
  }}>Inteligência geográfica para o caçador. Descubra, marque e proteja seus pontos favoritos.</p>
      <div className="geo-text">
        <div className="geo-feature rv d1">
          <h4>Hotspots por GPS</h4>
          <p>Marque pontos de mergulho precisos com coordenadas, tipo de fundo e espécies avistadas. Compartilhe ou mantenha privado.</p>
        </div>
        <div className="geo-feature rv d2">
          <h4>Modo Ponto Secreto 🔴</h4>
          <p>Oculte coordenadas exatas no feed social. Apenas você e seus buddies aprovados veem a localização real — evite overfishing nos seus melhores spots.</p>
        </div>
        <div className="geo-feature rv d3">
          <h4>Buddy Finder</h4>
          <p>Localize parceiros de mergulho disponíveis em um raio configurável. Segurança e comunidade andando juntas.</p>
        </div>
        <div className="geo-feature rv d4">
          <h4>Zonas de Exclusão</h4>
          <p>Reservas Marinhas aparecem em vermelho no mapa, com alertas automáticos ao se aproximar de áreas protegidas. Pesque com consciência.</p>
        </div>
      </div>
    </div>
    <div className="map-mockup rv">
      <div className="map-spot" style={{
    'top': '35%',
    'left': '30%'
  }}>
        <div className="spot-dot rock"></div>
        <div className="spot-label">Pedra da Garoupa</div>
      </div>
      <div className="map-spot" style={{
    'top': '55%',
    'left': '55%'
  }}>
        <div className="spot-dot sand"></div>
        <div className="spot-label">Areia do Xaréu</div>
      </div>
      <div className="map-spot" style={{
    'top': '25%',
    'left': '65%'
  }}>
        <div className="spot-dot wreck"></div>
        <div className="spot-label">Naufrágio NE</div>
      </div>
      <div className="map-spot" style={{
    'top': '68%',
    'left': '22%'
  }}>
        <div className="spot-dot secret"></div>
        <div className="spot-label">🔴 Coordenadas Ocultas</div>
      </div>
      <div className="map-spot" style={{
    'top': '42%',
    'left': '72%'
  }}>
        <div className="spot-dot rock"></div>
        <div className="spot-label">Pedral Fundo</div>
      </div>
      
      <div className="map-legend">
        <div className="leg-item"><div className="leg-dot" style={{
    'background': 'var(--glow)'
  }}></div>Pedra</div>
        <div className="leg-item"><div className="leg-dot" style={{
    'background': 'var(--gold)'
  }}></div>Areia</div>
        <div className="leg-item"><div className="leg-dot" style={{
    'background': 'var(--bio)'
  }}></div>Naufrágio</div>
        <div className="leg-item"><div className="leg-dot" style={{
    'background': 'var(--danger)'
  }}></div>Oculto</div>
      </div>
      
      <div className="map-hud">
        <div className="hud-row">Maré: <span>Enchendo ↑</span></div>
        <div className="hud-row">Ondas: <span>0.8m / 10s</span></div>
        <div className="hud-row">Vento: <span>12 NE</span></div>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  
  <div className="gear-section rv" id="gear">
    <div className="section-eyebrow">Módulo 04</div>
    <h2 className="section-h2">MEU GEAR</h2>
    <p className="section-desc">Inventário técnico completo com alertas de manutenção preventiva e reviews da comunidade.</p>
    <div className="gear-grid">
      <div className="gear-card rv d1">
        <span className="gear-icon">🔱</span>
        <span className="gear-name">Arbalete 1.2m</span>
        <span className="gear-brand">Rob Allen · Tuna 120</span>
        <span className="gear-alert">⚠ Trocar Elásticos</span>
      </div>
      <div className="gear-card rv d2">
        <span className="gear-icon">🦶</span>
        <span className="gear-name">Monofin Carbon</span>
        <span className="gear-brand">Orca · CF Pro</span>
        <span className="gear-ok">✓ OK</span>
      </div>
      <div className="gear-card rv d3">
        <span className="gear-icon">💻</span>
        <span className="gear-name">Computador</span>
        <span className="gear-brand">Suunto · D5</span>
        <span className="gear-ok">✓ OK</span>
      </div>
      <div className="gear-card rv d4">
        <span className="gear-icon">🥽</span>
        <span className="gear-name">Máscara LV</span>
        <span className="gear-brand">Cressi · Nano</span>
        <span className="gear-alert">⚠ Revisar Vedação</span>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  
  <div className="gamif-section rv" id="gamif">
    <div className="section-eyebrow">Módulo 06</div>
    <h2 className="section-h2">CONQUISTAS <br />& RANKING</h2>
    <p className="section-desc">Cada mergulho registrado é XP. Cada espécie nova é um badge. A profundidade te posiciona no ranking global.</p>

    <div className="badges-row">
      <div className="badge-item rv d1">
        <span className="badge-icon">🌙</span>
        <span className="badge-name">Noturno</span>
        <span className="badge-desc">3 mergulhos noturnos</span>
      </div>
      <div className="badge-item rv d2">
        <span className="badge-icon">🏔️</span>
        <span className="badge-name">Deep Master</span>
        <span className="badge-desc">Ultrapassou 30m</span>
      </div>
      <div className="badge-item rv d3">
        <span className="badge-icon">🚢</span>
        <span className="badge-name">Explorador</span>
        <span className="badge-desc">5 naufrágios</span>
      </div>
      <div className="badge-item rv d4">
        <span className="badge-icon">🫁</span>
        <span className="badge-name">Apneísta</span>
        <span className="badge-desc">Apneia {'>'} 3 min</span>
      </div>
      <div className="badge-item rv d5">
        <span className="badge-icon">🐟</span>
        <span className="badge-name">Caçador</span>
        <span className="badge-desc">10 espécies</span>
      </div>
      <div className="badge-item rv d1">
        <span className="badge-icon">🌊</span>
        <span className="badge-name">Maré Viva</span>
        <span className="badge-desc">Mergulho {'>'} 3m ondas</span>
      </div>
      <div className="badge-item rv d2 locked">
        <span className="badge-icon">🦈</span>
        <span className="badge-name">Abissal</span>
        <span className="badge-desc">Alcançar 40m</span>
      </div>
      <div className="badge-item rv d3 locked">
        <span className="badge-icon">💎</span>
        <span className="badge-name">Lendário</span>
        <span className="badge-desc">100 mergulhos log</span>
      </div>
    </div>

    <div className="leaderboard rv" style={{
    'marginTop': '3rem'
  }}>
      <div className="lb-header">
        <div>#</div>
        <div>Mergulhador</div>
        <div style={{
    'textAlign': 'center'
  }}>Prof Max</div>
        <div style={{
    'textAlign': 'center'
  }}>Apneia</div>
        <div style={{
    'textAlign': 'center'
  }}>XP</div>
      </div>
      <div className="lb-row top1">
        <div className="lb-rank">1</div>
        <div className="lb-user"><div className="lb-av">CA</div><div><div className="lb-uname">Carol Abreu</div><div className="lb-city">Búzios, RJ</div></div></div>
        <div className="lb-val">35m</div>
        <div className="lb-val">3:05</div>
        <div className="lb-xp">4.820 XP</div>
      </div>
      <div className="lb-row">
        <div className="lb-rank">2</div>
        <div className="lb-user"><div className="lb-av">MR</div><div><div className="lb-uname">Marcos Rocha</div><div className="lb-city">Arraial do Cabo, RJ</div></div></div>
        <div className="lb-val">32m</div>
        <div className="lb-val">2:50</div>
        <div className="lb-xp">3.910 XP</div>
      </div>
      <div className="lb-row">
        <div className="lb-rank">3</div>
        <div className="lb-user"><div className="lb-av">FS</div><div><div className="lb-uname">Felipe Santos</div><div className="lb-city">Angra dos Reis, RJ</div></div></div>
        <div className="lb-val">28m</div>
        <div className="lb-val">2:18</div>
        <div className="lb-xp">2.540 XP</div>
      </div>
      <div className="lb-row">
        <div className="lb-rank">4</div>
        <div className="lb-user"><div className="lb-av" style={{
    'background': 'linear-gradient(135deg,#550088,#aa44ff)'
  }}>JP</div><div><div className="lb-uname">João Pereira</div><div className="lb-city">Paraty, RJ</div></div></div>
        <div className="lb-val">25m</div>
        <div className="lb-val">2:05</div>
        <div className="lb-xp">1.980 XP</div>
      </div>
    </div>
  </div>

  <div className="divider"></div>

  
  <div className="pwa-section rv" id="pwa">
    <div>
      <div className="section-eyebrow">Tecnologia</div>
      <h2 className="section-h2">OFFLINE <br />FIRST. <br />SEMPRE.</h2>
      <p className="section-desc">Projetado para funcionar onde não tem sinal — no barco, na praia remota, 30 metros abaixo da superfície.</p>
      <div className="pwa-features">
        <div className="pwa-feat rv d1">
          <div className="pwa-feat-icon">📴</div>
          <div>
            <h4>PWA com Offline Mode</h4>
            <p>Preencha o Dive Log no barco sem sinal. Dados sincronizam automaticamente ao detectar conexão via Service Worker.</p>
          </div>
        </div>
        <div className="pwa-feat rv d2">
          <div className="pwa-feat-icon">📊</div>
          <div>
            <h4>Dashboard de Performance</h4>
            <p>Gráficos de evolução de profundidade ao longo do tempo. Mapa de calor das regiões mais frequentadas.</p>
          </div>
        </div>
        <div className="pwa-feat rv d3">
          <div className="pwa-feat-icon">📸</div>
          <div>
            <h4>Upload Inteligente</h4>
            <p>Compressão de imagens no client-side antes do envio. Extração de metadados EXIF para sugerir local e horário automaticamente.</p>
          </div>
        </div>
        <div className="pwa-feat rv d4">
          <div className="pwa-feat-icon">🌒</div>
          <div>
            <h4>Dark Mode de Alto Contraste</h4>
            <p>Interface otimizada para uso sob sol intenso e com as mãos molhadas. Botões grandes, navegação simplificada.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  <div className="cta-final rv">
    <h2>MERGULHE<br />NA <em>PLATAFORMA</em></h2>
    <p>Entre para a lista de acesso antecipado. Seja um dos primeiros mergulhadores na água quando abrirmos.</p>
    <div className="cta-input-row">
      <input className="cta-input" type="email" placeholder="seu@email.com" />
      <button className="cta-submit">Entrar</button>
    </div>
    <div className="cta-fine">ACESSO ANTECIPADO · SEM SPAM · OCEANO LIVRE</div>
  </div>

  
  <footer className="landing-footer">
    <div className="footer-logo">APNEIA SUB</div>
    <div className="footer-links">
      <a href="#">Termos</a>
      <a href="#">Privacidade</a>
      <a href="#">Contato</a>
      <a href="#">API Docs</a>
    </div>
    <div className="footer-copy">© 2026 APNEIA SUB · Atlantico Sul · Brasil</div>
  </footer>

</div>


    </div>
  );
}
