/* SITE IV — comportamento compartilhado · Ivo (CTO) · 11/07/2026
   Relógio vivo, menu mobile, revelações, vídeo do palco (IV Games),
   chamado→WhatsApp e paleta de comando Ctrl+K com navegação entre páginas. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* relógio de BH (decorativo — aria-hidden no markup) */
  var clock = document.getElementById("clock");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "America/Sao_Paulo" });
    var tick = function () {
      var t = fmt.format(new Date()) + " BRT";
      clock.textContent = t;
      var c2 = document.getElementById("clockCell");
      if (c2) { c2.textContent = t; }
    };
    tick();
    setInterval(tick, 1000);
  }

  /* letreiro: duplica o conteúdo p/ o loop de -50% fechar sem emenda */
  var tk = document.getElementById("ticker");
  if (tk) { tk.innerHTML = tk.innerHTML + tk.innerHTML; }

  /* topbar encolhe ao rolar (leitura coalescida em rAF) */
  var topbar = document.querySelector(".topbar");
  if (topbar) {
    var tbPend = false;
    var tbCheck = function () { topbar.classList.toggle("mini", window.scrollY > 24); };
    tbCheck();
    window.addEventListener("scroll", function () {
      if (!tbPend) {
        tbPend = true;
        requestAnimationFrame(function () { tbPend = false; tbCheck(); });
      }
    }, { passive: true });
  }

  /* barra de progresso de leitura */
  if (!reduced) {
    var prog = document.createElement("div");
    prog.className = "progresso";
    prog.setAttribute("aria-hidden", "true");
    document.body.appendChild(prog);
    var pPend = false;
    var pTick = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    };
    pTick();
    window.addEventListener("scroll", function () {
      if (!pPend) { pPend = true; requestAnimationFrame(function () { pPend = false; pTick(); }); }
    }, { passive: true });
  }

  /* títulos entram palavra por palavra */
  if (!reduced) {
    document.querySelectorAll("h1").forEach(function (h) {
      var frag = document.createDocumentFragment();
      var idx = 0;
      [].slice.call(h.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach(function (parte) {
            if (!parte.trim()) { frag.appendChild(document.createTextNode(parte)); return; }
            var wm = document.createElement("span");
            wm.className = "wm";
            var w = document.createElement("span");
            w.className = "w";
            w.textContent = parte;
            w.style.animationDelay = (0.06 * idx++) + "s";
            wm.appendChild(w);
            frag.appendChild(wm);
          });
        } else { frag.appendChild(node.cloneNode(true)); }
      });
      h.innerHTML = "";
      h.appendChild(frag);
    });
  }

  /* linha de código que digita sozinha (home) */
  var tl = document.getElementById("typeline");
  if (tl && !reduced) {
    var FRASES = ["// diagnóstico medido na fonte", "// auditoria dupla antes de subir", "// quem constrói, opera", "// software que existe"];
    var fi = 0, ci = 0, apagando = false;
    var digita = function () {
      var f = FRASES[fi];
      tl.textContent = f.slice(0, ci);
      if (!apagando) {
        ci++;
        if (ci > f.length) { apagando = true; setTimeout(digita, 2200); return; }
        setTimeout(digita, 42 + Math.random() * 50);
      } else {
        ci--;
        if (ci === 0) { apagando = false; fi = (fi + 1) % FRASES.length; }
        setTimeout(digita, 22);
      }
    };
    digita();
  }

  /* parallax de profundidade nos elementos [data-plx] */
  var plxEls = [].slice.call(document.querySelectorAll("[data-plx]"));
  if (plxEls.length && !reduced) {
    var xPend = false;
    var plxTick = function () {
      var mid = window.innerHeight / 2;
      plxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var d = (r.top + r.height / 2 - mid) / mid;
        el.style.transform = "translateY(" + Math.max(-22, Math.min(22, d * -22)).toFixed(1) + "px)";
      });
    };
    plxTick();
    window.addEventListener("scroll", function () {
      if (!xPend) { xPend = true; requestAnimationFrame(function () { xPend = false; plxTick(); }); }
    }, { passive: true });
  }

  /* holofote do palco segue o cursor */
  var spot = document.getElementById("spot");

  /* tilt 3D suave nas janelas (só ponteiro fino, morto sob reduced-motion) */
  var fine = window.matchMedia("(pointer: fine)").matches;
  if (spot && fine && !reduced) {
    window.addEventListener("pointermove", function (e) {
      spot.style.setProperty("--mx", (e.clientX / window.innerWidth * 100).toFixed(1) + "%");
      spot.style.setProperty("--my", (e.clientY / window.innerHeight * 100).toFixed(1) + "%");
    }, { passive: true });
  } else if (spot && (!fine || reduced)) { spot.remove(); }

  /* botões magnéticos (ponteiro fino) */
  if (fine && !reduced) {
    document.querySelectorAll(".btn, .cta-top").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.18;
        var dy = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = "translate(" + Math.max(-6, Math.min(6, dx)).toFixed(1) + "px," + Math.max(-4, Math.min(4, dy)).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  /* confete quando o GameON entra em cena (uma vez) */
  var zona = document.querySelector(".confete-zona");
  if (zona && !reduced && "IntersectionObserver" in window) {
    var CORES = ["#7A5CF6", "#FF4D00", "#38BDF8", "#FEBC2E", "#28C840"];
    var cio = new IntersectionObserver(function (ents) {
      if (!ents[0].isIntersecting) { return; }
      cio.disconnect();
      for (var i = 0; i < 26; i++) {
        var c = document.createElement("i");
        c.className = "confete";
        c.style.left = (Math.random() * 100) + "%";
        c.style.background = CORES[i % CORES.length];
        c.style.animationDuration = (2.2 + Math.random() * 2.4) + "s";
        c.style.animationDelay = (Math.random() * 0.8) + "s";
        c.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
        zona.appendChild(c);
      }
      setTimeout(function () {
        zona.querySelectorAll(".confete").forEach(function (c) { c.remove(); });
      }, 6500);
    }, { threshold: 0.25 });
    cio.observe(zona);
  }
  if (fine && !reduced) {
    document.querySelectorAll(".janela").forEach(function (j) {
      j.addEventListener("pointermove", function (e) {
        var r = j.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
        j.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      });
      j.addEventListener("pointerleave", function () { j.style.transform = ""; });
    });
  }

  /* menu mobile */
  var mbtn = document.getElementById("menuBtn");
  var mnav = document.getElementById("mnav");
  if (mbtn && mnav) {
    mbtn.addEventListener("click", function () {
      var aberto = mnav.classList.toggle("on");
      mbtn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

  /* count-up nos numerais [data-count] quando entram na tela */
  var countUp = function (el) {
    var alvo = parseInt(el.dataset.count, 10);
    if (isNaN(alvo) || reduced) { return; }
    var t0 = null;
    var passo = function (t) {
      if (!t0) { t0 = t; }
      var k = Math.min((t - t0) / 900, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
      if (k < 1) { requestAnimationFrame(passo); }
    };
    requestAnimationFrame(passo);
  };

  /* revelações por scroll */
  var els = document.querySelectorAll(".sr");
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          en.target.querySelectorAll("[data-count]").forEach(countUp);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* menu mobile nunca fica órfão ao cruzar o breakpoint (achado OTTO) */
  if (mnav && "matchMedia" in window) {
    var mqDesk = window.matchMedia("(min-width: 1024px)");
    var fechaMenu = function () {
      mnav.classList.remove("on");
      if (mbtn) { mbtn.setAttribute("aria-expanded", "false"); }
    };
    if (mqDesk.addEventListener) { mqDesk.addEventListener("change", function (e) { if (e.matches) { fechaMenu(); } }); }
  }

  /* vídeo do palco (página IV Games) — só desktop, só com movimento permitido */
  var video = document.getElementById("palcoVideo");
  var heroPalco = document.getElementById("gamesHero");
  var wide = window.matchMedia("(min-width: 768px)").matches;
  if (video && heroPalco && wide && !reduced) {
    var start = function () {
      var webm = document.createElement("source");
      webm.src = video.dataset.webm || "assets/hero-loop.webm"; webm.type = "video/webm";
      var mp4 = document.createElement("source");
      mp4.src = video.dataset.mp4 || "assets/hero-loop.mp4"; mp4.type = "video/mp4";
      video.appendChild(webm); video.appendChild(mp4);
      video.load();
      video.addEventListener("playing", function () { heroPalco.classList.add("live"); }, { once: true });
      var p = video.play();
      if (p && p.catch) { p.catch(function () {}); }
    };
    if (document.readyState === "complete") { start(); }
    else { window.addEventListener("load", start, { once: true }); }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { video.pause(); }
      else if (video.paused && video.currentSrc) { video.play().catch(function () {}); }
    });
  }

  /* chamado → WhatsApp com mensagem montada */
  var btnChamado = document.getElementById("btnChamado");
  if (btnChamado) {
    btnChamado.addEventListener("click", function () {
      var nome = (document.getElementById("cNome") || {}).value || "";
      var prob = (document.getElementById("cProblema") || {}).value || "";
      var msg = "Olá, IV!";
      if (nome.trim()) { msg += " Sou " + nome.trim() + "."; }
      if (prob.trim()) { msg += " Meu problema: " + prob.trim(); }
      btnChamado.href = "https://wa.me/5531996715639?text=" + encodeURIComponent(msg);
    });
  }

  /* ── Byte: o concierge do site (presente em todas as páginas) ── */
  (function () {
    var MINI = '<svg viewBox="40 55 160 140" aria-hidden="true">' +
      '<rect x="52" y="70" width="136" height="112" rx="24" fill="#0C1420"/>' +
      '<rect x="52" y="70" width="136" height="112" rx="24" fill="none" stroke="#5FD4FF" stroke-width="3" opacity="0.6"/>' +
      '<rect class="bw-pisca" x="88" y="104" width="15" height="26" rx="4" fill="#5FD4FF"/>' +
      '<rect class="bw-pisca d2" x="137" y="104" width="15" height="26" rx="4" fill="#5FD4FF"/>' +
      '<rect class="bw-caret" x="100" y="148" width="10" height="16" rx="2" fill="#FF4D00"/>' +
      '<rect x="114" y="148" width="16" height="16" rx="2" fill="rgba(95,212,255,0.25)"/>' +
      "</svg>";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "byte-btn";
    btn.setAttribute("aria-label", "Falar com o Byte, atendente da IV");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<span class="halo" aria-hidden="true"></span>' + MINI;
    var panel = document.createElement("div");
    panel.className = "byte-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Byte — atendimento IV");
    panel.innerHTML =
      '<div class="byte-head">' + MINI + '<div><b>Byte · Atendimento IV</b><small>● ONLINE — EM TREINAMENTO</small></div><button type="button" class="byte-x" aria-label="Fechar">×</button></div>' +
      '<div class="byte-corpo">' +
      '<div class="byte-balao">Oi! Eu sou o <b>Byte</b> 👋 Ainda estou aprendendo a conversar — enquanto isso, te levo direto aonde você precisa:</div>' +
      '<div class="byte-acoes">' +
      '<a class="byte-acao" href="https://wa.me/5531996715639" target="_blank" rel="noopener">💬 Falar com a IV no WhatsApp<span class="seta">→</span></a>' +
      '<a class="byte-acao" href="sistemas.html">🖥️ Conhecer os sistemas<span class="seta">→</span></a>' +
      '<a class="byte-acao" href="iv-games.html">🎮 Entrar no IV Games<span class="seta">→</span></a>' +
      "</div></div>" +
      '<div class="byte-foot">byte//v0 · quem responde no WhatsApp é quem constrói</div>';
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    var abrirB = function () {
      panel.classList.add("on");
      btn.setAttribute("aria-expanded", "true");
      var x = panel.querySelector(".byte-x");
      if (x) { x.focus(); }
    };
    var fecharB = function () {
      panel.classList.remove("on");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    };
    btn.addEventListener("click", function () {
      if (panel.classList.contains("on")) { fecharB(); } else { abrirB(); }
    });
    panel.querySelector(".byte-x").addEventListener("click", fecharB);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("on")) { fecharB(); }
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("on") && !panel.contains(e.target) && !btn.contains(e.target)) { fecharB(); }
    });
  })();

  /* ── paleta de comando (navega entre as páginas) ── */
  var overlay = document.getElementById("palOverlay");
  if (!overlay) { return; }
  var ACTIONS = [
    { t: "Início", kw: "home visao geral bento", tipo: "PÁGINA", href: "index.html" },
    { t: "Sistemas — os 6 registros", kw: "produtos portfolio modulos", tipo: "PÁGINA", href: "sistemas.html" },
    { t: "IV Games", kw: "jogos gamificacao gameon placar tv estadio", tipo: "PÁGINA", href: "iv-games.html" },
    { t: "GameON — o caso com telas", kw: "gamificacao vendas placar", tipo: "SISTEMA", href: "iv-games.html#gameon" },
    { t: "SIEM — Excelência Médica", kw: "hospital saude indicadores", tipo: "SISTEMA", href: "sistemas.html#sis-001" },
    { t: "IV Home", kw: "condominio morador sindico", tipo: "SISTEMA", href: "sistemas.html#sis-002" },
    { t: "ChronoMed", kw: "ponto medico plantao escala", tipo: "SISTEMA", href: "sistemas.html#sis-003" },
    { t: "Órion — IA corporativa", kw: "ia inteligencia artificial rag orion", tipo: "SISTEMA", href: "sistemas.html#sis-004" },
    { t: "Painel de Empenhos", kw: "licitacao empenho pedidos", tipo: "SISTEMA", href: "sistemas.html#sis-005" },
    { t: "Sobre a IV — como operamos", kw: "empresa historia pipeline auditoria operacao", tipo: "PÁGINA", href: "sobre.html" },
    { t: "Contato — abrir um chamado", kw: "whatsapp mensagem orcamento proposta", tipo: "PÁGINA", href: "contato.html" },
    { t: "Falar com a IV — WhatsApp direto", kw: "whatsapp telefone conversar", tipo: "AÇÃO", href: "https://wa.me/5531996715639", ext: true }
  ];
  var input = document.getElementById("palInput");
  var list = document.getElementById("palList");
  var sel = 0;
  var atual = [];
  var focoAnterior = null;

  var ir = function (a) {
    if (a.ext) { window.open(a.href, "_blank", "noopener"); }
    else { location.href = a.href; }
  };
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var render = function () {
    var q = norm(input.value.trim());
    atual = ACTIONS.filter(function (a) { return !q || norm(a.t + " " + (a.kw || "")).indexOf(q) >= 0; });
    if (sel >= atual.length) { sel = Math.max(0, atual.length - 1); }
    if (!atual.length) {
      list.innerHTML = '<div class="pal-vazio">Nada encontrado — tente "sistemas", "games" ou "contato".</div>';
      input.setAttribute("aria-activedescendant", "");
      return;
    }
    list.innerHTML = "";
    atual.forEach(function (a, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.id = "pal-i-" + i;
      b.className = "pal-item" + (i === sel ? " sel" : "");
      b.innerHTML = '<svg class="pi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span></span><span class="tipo">' + a.tipo + "</span>";
      b.children[1].textContent = a.t;
      b.addEventListener("click", function () { fechar(); ir(a); });
      list.appendChild(b);
    });
    input.setAttribute("aria-activedescendant", "pal-i-" + sel);
    var selEl = document.getElementById("pal-i-" + sel);
    if (selEl) { selEl.scrollIntoView({ block: "nearest" }); }
  };
  var abrir = function () {
    focoAnterior = document.activeElement;
    overlay.classList.add("on");
    input.value = "";
    sel = 0;
    render();
    input.focus();
  };
  var fechar = function () {
    overlay.classList.remove("on");
    if (focoAnterior && focoAnterior.focus) { focoAnterior.focus(); }
  };

  var palBtn = document.getElementById("palBtn");
  if (palBtn) { palBtn.addEventListener("click", abrir); }
  overlay.addEventListener("click", function (e) { if (e.target === overlay) { fechar(); } });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); abrir(); return; }
    if (!overlay.classList.contains("on")) { return; }
    if (e.key === "Escape") { fechar(); }
    else if (e.key === "Tab") {
      var focaveis = [input].concat([].slice.call(list.querySelectorAll(".pal-item")));
      var idx = focaveis.indexOf(document.activeElement);
      e.preventDefault();
      var prox = e.shiftKey ? idx - 1 : idx + 1;
      if (prox < 0) { prox = focaveis.length - 1; }
      if (prox >= focaveis.length) { prox = 0; }
      focaveis[prox].focus();
    }
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, atual.length - 1); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
    else if (e.key === "Enter" && atual[sel]) { e.preventDefault(); var a = atual[sel]; fechar(); ir(a); }
  });
  input.addEventListener("input", function () { sel = 0; render(); });
})();
