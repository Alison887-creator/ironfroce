/* ==========================================================================
   Iron Force — Efeitos visuais (usado no index.html e no treino.html)
   - Letras: título do topo letra por letra, títulos palavra por palavra,
     etiquetas "embaralhadas", texto digitando e links que rolam no hover.
   - Fotos: slides no topo, parallax, revelação em cortina ao rolar.
   - Mouse: cards com inclinação 3D e brilho que segue o cursor,
     botões magnéticos e um anel que acompanha o cursor.
   - Troca de página: uma cortina laranja cobre a tela ao ir para outra página do site.
   Com "reduzir movimento" ativo no sistema, o parallax e a inclinação 3D ficam
   desligados. Os efeitos de mouse não rodam no celular.
   ========================================================================== */

"use strict";

(() => {
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];
  const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouseFino = matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    // Páginas sem tela de carregamento já começam "prontas"
    if (!$("#loader")) document.body.classList.add("pronto");
    transicaoDePaginas();
    cabecalhoInteligente();
    efeitosDeToque();
    botaoTopo();
    dicaDeArrastar();

    dividirTituloHero();
    dividirTitulos();
    embaralharEtiquetas();
    textoDigitando();
    linksQueRolam();
    slidesHero();
    fotosEmCortina();
    if (!reduzirMovimento) efeitosDeRolagem();

    if (mouseFino) {
      cardsInteligentes();
      botoesMagneticos();
      anelDoCursor();
    }
  });

  /* ------------------------------------------------------------------------
     LETRAS
     ------------------------------------------------------------------------ */

  /** Título principal: cada letra entra girando; as letras pulam no hover. */
  function dividirTituloHero() {
    const titulo = $(".hero__titulo");
    if (!titulo) return;
    titulo.setAttribute("aria-label", titulo.textContent.replace(/\s+/g, " ").trim());
    let indice = 0;

    const processar = (no, gradiente) => {
      [...no.childNodes].forEach((filho) => {
        if (filho.nodeType === Node.TEXT_NODE) {
          const fragmento = document.createDocumentFragment();
          filho.textContent.split(/(\s+)/).forEach((parte) => {
            if (!parte) return;
            if (/^\s+$/.test(parte)) { fragmento.append(" "); return; }
            const palavra = document.createElement("span");
            palavra.className = "palavra-h";
            palavra.setAttribute("aria-hidden", "true");
            [...parte].forEach((caractere) => {
              const letra = document.createElement("span");
              letra.className = gradiente ? "letra letra--grad" : "letra";
              letra.textContent = caractere;
              letra.style.setProperty("--i", indice++);
              palavra.append(letra);
            });
            fragmento.append(palavra);
          });
          filho.replaceWith(fragmento);
        } else if (filho.nodeName !== "BR") {
          processar(filho, gradiente || filho.nodeName === "SPAN");
        }
      });
    };

    processar(titulo, false);
    titulo.classList.remove("anim-entrada");
    titulo.classList.add("dividido");
  }

  /** Títulos de seção: as palavras sobem de dentro de uma "máscara" ao aparecer. */
  function dividirTitulos() {
    const titulos = $$(".secao__titulo, .aluno-hero__titulo");
    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("titulo-on");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.3 });

    titulos.forEach((titulo) => {
      titulo.setAttribute("aria-label", titulo.textContent.replace(/\s+/g, " ").trim());
      let indice = 0;
      const processar = (no) => {
        [...no.childNodes].forEach((filho) => {
          if (filho.nodeType === Node.TEXT_NODE) {
            const fragmento = document.createDocumentFragment();
            filho.textContent.split(/(\s+)/).forEach((parte) => {
              if (!parte) return;
              if (/^\s+$/.test(parte)) { fragmento.append(" "); return; }
              const palavra = document.createElement("span");
              palavra.className = "palavra";
              palavra.setAttribute("aria-hidden", "true");
              const interno = document.createElement("span");
              interno.className = "palavra__in";
              interno.textContent = parte;
              interno.style.setProperty("--i", indice++);
              palavra.append(interno);
              fragmento.append(palavra);
            });
            filho.replaceWith(fragmento);
          } else if (filho.nodeName !== "BR") {
            processar(filho);
          }
        });
      };
      processar(titulo);
      titulo.classList.add("titulo-dividido");
      observador.observe(titulo);
    });
  }

  /** Etiquetas pequenas (ex.: "PLANOS E PREÇOS") se "decodificam" ao aparecer e no hover. */
  function embaralharEtiquetas() {
    const simbolos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>";
    const embaralhar = (el) => {
      if (el.dataset.embaralhando) return;
      el.dataset.embaralhando = "1";
      const final = el.dataset.textoFinal;
      let quadro = 0;
      const timer = setInterval(() => {
        const revelados = quadro / 2;
        quadro++;
        if (revelados >= final.length) {
          clearInterval(timer);
          el.textContent = final;
          delete el.dataset.embaralhando;
          return;
        }
        el.textContent = [...final].map((c, i) =>
          c === " " || i < revelados ? c : simbolos[(Math.random() * simbolos.length) | 0]).join("");
      }, 30);
    };

    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("tag-on");
        embaralhar(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.8 });

    $$(".secao__tag").filter((el) => !el.closest(".modal") && !el.id).forEach((el) => {
      el.dataset.textoFinal = el.textContent;
      el.setAttribute("aria-label", el.textContent);
      el.addEventListener("mouseenter", () => embaralhar(el));
      observador.observe(el);
    });
  }

  /** Palavra que é digitada e apagada em sequência (ex.: "Treine com força"). */
  function textoDigitando() {
    $$(".digitar[data-palavras]").forEach((el) => {
      const palavras = el.dataset.palavras.split("|");
      let p = 0;
      let letras = el.textContent.length;
      let apagando = true;
      const passo = () => {
        const palavra = palavras[p];
        if (apagando) {
          letras--;
          if (letras <= 0) { apagando = false; p = (p + 1) % palavras.length; }
        } else {
          letras++;
          if (letras >= palavras[p].length) { apagando = true; el.textContent = palavras[p]; return setTimeout(passo, 1800); }
        }
        el.textContent = (apagando ? palavra : palavras[p]).slice(0, Math.max(0, letras));
        setTimeout(passo, apagando ? 55 : 95);
      };
      setTimeout(passo, 2600);
    });
  }

  /** Links do menu e do rodapé: o texto "rola" para cima e aparece em laranja. */
  function linksQueRolam() {
    $$(".nav__link, .footer__links a").forEach((link) => {
      const texto = link.textContent.trim();
      if (!texto || link.children.length) return;
      const caixa = document.createElement("span");
      caixa.className = "rolar";
      caixa.dataset.texto = texto;
      const interno = document.createElement("span");
      interno.textContent = texto;
      caixa.append(interno);
      link.replaceChildren(caixa);
    });
  }

  /* ------------------------------------------------------------------------
     TROCA DE PÁGINA
     ------------------------------------------------------------------------ */

  /** Ao clicar num link para outra página do site, uma cortina laranja sobe;
      na página nova ela continua subindo e revela o conteúdo. */
  function transicaoDePaginas() {
    const cortina = document.createElement("div");
    cortina.className = "troca-pagina";
    cortina.setAttribute("aria-hidden", "true");
    cortina.innerHTML = '<span class="troca-pagina__logo">IRON<span>FORCE</span></span>';
    document.body.append(cortina);

    const memoria = {
      ler() { try { return sessionStorage.getItem("if_troca") === "1"; } catch { return false; } },
      marcar(v) { try { v ? sessionStorage.setItem("if_troca", "1") : sessionStorage.removeItem("if_troca"); } catch { /* sem armazenamento */ } }
    };

    // Chegando de outra página do site: começa coberta e sai para cima
    if (memoria.ler()) {
      memoria.marcar(false);
      cortina.classList.add("cobrindo");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cortina.classList.remove("cobrindo");
        cortina.classList.add("saindo");
      }));
    }

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link || e.defaultPrevented || link.target === "_blank" || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const destino = new URL(link.href, location.href);
      const mesmaPagina = destino.pathname === location.pathname && destino.search === location.search;
      if (destino.protocol !== location.protocol || destino.origin !== location.origin || mesmaPagina) return;
      if (!/(\.html|\/)$/.test(destino.pathname)) return;

      e.preventDefault();
      memoria.marcar(true);
      cortina.classList.remove("saindo", "cobrindo");
      cortina.classList.add("entrando");
      setTimeout(() => { location.href = link.href; }, 550);
    });

    // Voltar pelo navegador (página vinda do cache): tira a cortina
    addEventListener("pageshow", (e) => {
      if (e.persisted) cortina.classList.remove("entrando", "cobrindo");
    });
  }

  /* ------------------------------------------------------------------------
     CELULAR E TOQUE
     ------------------------------------------------------------------------ */

  /** Em telas pequenas, o cabeçalho esconde ao rolar para baixo e volta ao rolar para cima. */
  function cabecalhoInteligente() {
    const header = $("#header");
    if (!header) return;
    let ultimo = scrollY;
    const esconder = (v) => {
      header.classList.toggle("header--oculto", v);
      document.body.classList.toggle("header-oculto", v);
    };
    addEventListener("scroll", () => {
      const y = scrollY;
      const menuAberto = $("#nav")?.classList.contains("aberto");
      if (menuAberto || innerWidth >= 1200 || y < 120) { esconder(false); ultimo = y; return; }
      if (Math.abs(y - ultimo) < 8) return;
      esconder(y > ultimo);
      ultimo = y;
    }, { passive: true });
  }

  /** Ondulação ao tocar, letras que pulam, vibração leve e destaque do card que está no centro da tela. */
  function efeitosDeToque() {
    const ONDULAR = ".btn, .chip, .aba, .abas-aluno__btn, .musculo, .toggle-periodo__btn, .acordeao__botao, .card-mod, .card-personal, .beneficio, .mod-outra, .galeria__item, .chamada-aluno__cards a";

    document.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      const letra = e.target.closest?.(".letra");
      if (letra) {
        letra.classList.add("pula");
        setTimeout(() => letra.classList.remove("pula"), 380);
      }
      const alvo = e.target.closest?.(ONDULAR);
      if (!alvo) return;
      if (alvo.matches(".btn")) navigator.vibrate?.(8);
      const r = alvo.getBoundingClientRect();
      const tamanho = Math.max(r.width, r.height) * 2;
      const onda = document.createElement("span");
      onda.className = "ripple";
      onda.style.cssText = `width:${tamanho}px;height:${tamanho}px;left:${e.clientX - r.left - tamanho / 2}px;top:${e.clientY - r.top - tamanho / 2}px`;
      alvo.append(onda);
      setTimeout(() => onda.remove(), 700);
    }, { passive: true });

    // Sem mouse não existe hover: o card que passa pelo centro da tela recebe o destaque
    if (mouseFino) return;
    const FOCO = ".card-mod, .card-personal, .plano, .galeria__item, .contador, .beneficio, .mod-outra, .mod-numero, .exercicio, .depoimento__caixa, .aula, .etapa, .chamada-aluno__cards a, .mod-dia, .acordeao__item";
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => e.target.classList.toggle("em-foco", e.isIntersecting));
    }, { rootMargin: "-38% 0px -38% 0px" });
    const preparar = () => $$(FOCO).forEach((el) => {
      if (el.dataset.foco) return;
      el.dataset.foco = "1";
      observador.observe(el);
    });
    preparar();
    let agendado = false;
    new MutationObserver(() => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(() => { agendado = false; preparar(); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------------
     DETALHES (computador e celular)
     ------------------------------------------------------------------------ */

  /** Botão de voltar ao topo com um anel que mostra o quanto da página já foi lido. */
  function botaoTopo() {
    let botao = $("#btn-topo");
    if (!botao) {
      botao = document.createElement("button");
      botao.id = "btn-topo";
      botao.className = "topo";
      botao.type = "button";
      botao.setAttribute("aria-label", "Voltar ao topo");
      botao.textContent = "↑";
      botao.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
      document.body.append(botao);
    }
    botao.insertAdjacentHTML("afterbegin", '<svg class="topo__anel" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20"/></svg>');
    const circulo = $("circle", botao);
    const perimetro = 2 * Math.PI * 20;
    circulo.style.strokeDasharray = perimetro;

    const atualizar = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      circulo.style.strokeDashoffset = perimetro * (1 - (total > 0 ? scrollY / total : 0));
      botao.classList.toggle("visivel", scrollY > 700);
    };
    addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
    atualizar();
  }

  /** Chuva de confete saindo de um ponto da tela (usada quando algo dá certo). */
  window.confete = (x = innerWidth / 2, y = innerHeight * 0.55) => {
    const cores = ["#e3260f", "#ff6b00", "#ffc069", "#ffffff"];
    for (let i = 0; i < 48; i++) {
      const peca = document.createElement("i");
      const angulo = Math.random() * Math.PI * 2;
      const distancia = 90 + Math.random() * 190;
      peca.className = "confete";
      peca.style.cssText =
        `left:${x}px;top:${y}px;background:${cores[i % cores.length]};` +
        `width:${6 + Math.random() * 6}px;height:${8 + Math.random() * 8}px;` +
        `--dx:${(Math.cos(angulo) * distancia).toFixed(0)}px;--dy:${(Math.sin(angulo) * distancia - 90).toFixed(0)}px;--r:${(Math.random() * 720 - 360).toFixed(0)}deg`;
      document.body.append(peca);
      setTimeout(() => peca.remove(), 1400);
    }
  };

  /** No celular, listas que rolam para o lado dão uma "cutucada" ao entrar na tela, mostrando que dá para arrastar. */
  function dicaDeArrastar() {
    if (mouseFino) return;
    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        setTimeout(() => {
          if (el.matches(".slider__trilho")) {
            el.animate([{ translate: "0 0" }, { translate: "-34px 0", offset: 0.4 }, { translate: "0 0" }], { duration: 1100, easing: "ease-in-out" });
          } else if (el.scrollWidth > el.clientWidth + 8) {
            el.scrollTo({ left: 56, behavior: "smooth" });
            setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 650);
          }
        }, 500);
      });
    }, { threshold: 0.7 });
    $$(".slider__trilho, .chips, .abas").forEach((el) => observador.observe(el));
  }

  /* ------------------------------------------------------------------------
     FOTOS
     ------------------------------------------------------------------------ */

  /** Slides do topo com troca suave e barra de progresso. */
  function slidesHero() {
    const fundo = $(".hero__fundo");
    const slides = fundo ? $$(".hero__slide", fundo) : [];
    if (slides.length < 2) return;

    // As fotos extras só carregam depois da página pronta (não atrasam a abertura)
    addEventListener("load", () => {
      slides.forEach((s) => { if (s.dataset.bg) s.style.backgroundImage = `url("${s.dataset.bg}")`; });
    });

    const indicadores = $("#hero-indicadores");
    indicadores.innerHTML = slides.map((_, i) => `<span class="${i === 0 ? "ativo" : ""}"></span>`).join("");
    let atual = 0;
    setInterval(() => {
      if (document.hidden) return;
      slides[atual].classList.remove("ativo");
      indicadores.children[atual].classList.remove("ativo");
      atual = (atual + 1) % slides.length;
      slides[atual].classList.add("ativo");
      indicadores.children[atual].classList.add("ativo");
    }, 6000);
  }

  /** Parallax do topo, fotos que flutuam e faixas que entortam com a velocidade da rolagem. */
  function efeitosDeRolagem() {
    const fundo = $(".hero__fundo");
    const conteudo = $(".hero__conteudo");
    const faixas = $$(".faixa");
    const flutuantes = $$("[data-parallax]");
    let ultimoY = scrollY;
    let inclinacao = 0;
    let mouseX = 0;
    let mouseY = 0;

    if (fundo && mouseFino) {
      $(".hero").addEventListener("pointermove", (e) => {
        mouseX = e.clientX / innerWidth - 0.5;
        mouseY = e.clientY / innerHeight - 0.5;
      });
    }

    // Celular: inclinar o aparelho move o fundo do topo (Android; no iPhone exigiria permissão)
    if (!mouseFino && "DeviceOrientationEvent" in window && typeof DeviceOrientationEvent.requestPermission !== "function") {
      addEventListener("deviceorientation", (e) => {
        if (e.gamma == null) return;
        mouseX = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        mouseY = Math.max(-0.5, Math.min(0.5, ((e.beta ?? 45) - 45) / 60));
      });
    }

    const quadro = () => {
      const y = scrollY;
      // Velocidade da rolagem vira inclinação nas faixas de texto
      inclinacao += ((y - ultimoY) * 0.15 - inclinacao) * 0.15;
      inclinacao = Math.max(-12, Math.min(12, inclinacao));
      ultimoY = y;
      faixas.forEach((f) => f.style.setProperty("--skew", `${inclinacao.toFixed(2)}deg`));

      if (fundo && y < innerHeight * 1.2) {
        fundo.style.translate = `${mouseX * -24}px ${y * 0.35 + mouseY * -18}px`;
        conteudo.style.translate = `${mouseX * 14}px ${y * 0.15 + mouseY * 10}px`;
        conteudo.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.75));
      }

      flutuantes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const centro = r.top + r.height / 2 - innerHeight / 2;
        el.style.translate = `0 ${(centro * Number(el.dataset.parallax)).toFixed(1)}px`;
      });
      requestAnimationFrame(quadro);
    };
    requestAnimationFrame(quadro);
  }

  /** Fotos se revelam como uma cortina ao entrar na tela (inclui cards criados depois). */
  function fotosEmCortina() {
    const SELETOR = ".card-mod__midia, .card-personal__foto, .galeria__item";
    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("cortina--on");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15 });

    const preparar = () => {
      $$(SELETOR).forEach((el) => {
        if (el.dataset.cortina) return;
        el.dataset.cortina = "1";
        el.classList.add("cortina");
        observador.observe(el);
      });
    };
    preparar();

    // Cards gerados pelo JavaScript (filtros, galeria) também recebem o efeito
    let agendado = false;
    new MutationObserver(() => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(() => { agendado = false; preparar(); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------------
     MOUSE (somente computador)
     ------------------------------------------------------------------------ */

  /** Cards inclinam em 3D na direção do mouse e ganham um brilho que segue o cursor. */
  function cardsInteligentes() {
    const INCLINAR = ".card-mod, .card-personal, .plano, .galeria__item, .contador, .chamada-aluno__cards a, .sobre__imagem, .beneficio, .mod-outra, .mod-numero";
    const BRILHO = `${INCLINAR}, .exercicio, .depoimento__caixa, .acordeao__item, .aula, .bloco, .musculo, .etapa__caixa, .mod-dia`;
    let inclinado = null;
    let iluminado = null;

    const soltar = () => {
      if (inclinado) { inclinado.style.transform = ""; inclinado.style.transition = ""; }
      if (iluminado) { iluminado.style.removeProperty("--mx"); iluminado.style.removeProperty("--my"); }
      inclinado = iluminado = null;
    };

    document.addEventListener("pointermove", (e) => {
      const alvoBrilho = e.target.closest?.(BRILHO);
      const alvoInclinar = e.target.closest?.(INCLINAR);
      if (iluminado && iluminado !== alvoBrilho) { iluminado.style.removeProperty("--mx"); iluminado.style.removeProperty("--my"); }
      if (inclinado && inclinado !== alvoInclinar) { inclinado.style.transform = ""; inclinado.style.transition = ""; }
      iluminado = alvoBrilho;
      inclinado = alvoInclinar;

      if (iluminado) {
        const r = iluminado.getBoundingClientRect();
        iluminado.style.setProperty("--mx", `${e.clientX - r.left}px`);
        iluminado.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (inclinado && !reduzirMovimento) {
        const r = inclinado.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const forca = inclinado.matches(".galeria__item, .chamada-aluno__cards a, .sobre__imagem, .mod-outra") ? 5 : 9;
        const deslocar = inclinado.matches(".chamada-aluno__cards a") ? "translateX(6px)"
          : inclinado.matches(".sobre__imagem") ? "" : "translateY(-8px)";
        const escala = inclinado.matches(".plano--destaque") && innerWidth >= 900 ? " scale(1.04)" : "";
        inclinado.style.transition = "transform .15s ease-out, box-shadow .3s, border-color .3s";
        inclinado.style.transform =
          `perspective(900px) rotateX(${((0.5 - y) * forca).toFixed(2)}deg) rotateY(${((x - 0.5) * forca).toFixed(2)}deg) ${deslocar}${escala}`;
      }
    });
    document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) soltar(); });
  }

  /** Botões são "puxados" levemente na direção do mouse. */
  function botoesMagneticos() {
    const SELETOR = ".btn, .whatsapp, .slider__btn";
    let atual = null;
    document.addEventListener("pointermove", (e) => {
      const alvo = e.target.closest?.(SELETOR);
      if (atual && atual !== alvo) atual.style.translate = "";
      atual = alvo;
      if (!alvo || alvo.closest(".exercicio__add, .adicionar")) return; // botões pequenos de formulário ficam parados
      const r = alvo.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      alvo.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px`;
    });
  }

  /** Anel laranja que segue o mouse com atraso e cresce sobre itens clicáveis. */
  function anelDoCursor() {
    const anel = document.createElement("div");
    anel.className = "cursor-anel";
    anel.setAttribute("aria-hidden", "true");
    document.body.append(anel);

    let alvoX = innerWidth / 2;
    let alvoY = innerHeight / 2;
    let x = alvoX;
    let y = alvoY;

    document.addEventListener("pointermove", (e) => {
      alvoX = e.clientX;
      alvoY = e.clientY;
      anel.classList.add("visivel");
      const sobreFoto = e.target.closest?.(".galeria__item, .card-mod__midia");
      const clicavel = e.target.closest?.("a, button, label, select, input, textarea, .musculo");
      anel.classList.toggle("ativo", !!(sobreFoto || clicavel));
      anel.dataset.texto = sobreFoto ? "Ver" : "";
    });
    document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) anel.classList.remove("visivel"); });
    document.addEventListener("pointerdown", () => anel.classList.add("clicando"));
    document.addEventListener("pointerup", () => anel.classList.remove("clicando"));

    const seguir = () => {
      x += (alvoX - x) * 0.18;
      y += (alvoY - y) * 0.18;
      anel.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(seguir);
    };
    seguir();
  }
})();
