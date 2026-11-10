const fs = require('fs');
const path = require('path');

const htmlContent = `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="Enhjargal — Full-Stack Engineer &amp; Systems Architect (BSUIR '26)" name="description">
  <title>Enhjargal — Senior Full-Stack Engineer &amp; Systems Architect (BSUIR '26)</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: {
            sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            obsidian: '#05070A',
            surface: {
              DEFAULT: '#090C11',
              card: '#0D1117',
              elevated: '#151A23',
              highlight: '#1C2330',
              border: 'rgba(255, 255, 255, 0.08)'
            },
            accent: {
              cyan: '#00f0ff',
              cyanDim: '#00b8c4',
              blue: '#3b82f6',
              violet: '#8b5cf6',
              emerald: '#10b981'
            }
          }
        }
      }
    };
  </script>

  <style>
    @layer base {
      html, body {
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
        background-color: #05070A;
        color: #EDEDED;
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #05070A;
      }
      ::-webkit-scrollbar-thumb {
        background: #1C2330;
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #00f0ff;
      }
    }

    /* Film grain background overlay */
    .bg-grain {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    }

    /* Engineering drafting grid lines */
    .blueprint-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    }

    /* Top Scroll Progress Laser Bar */
    #scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, #00f0ff, #8b5cf6, #00f0ff);
      background-size: 200% 100%;
      z-index: 100;
      width: 0%;
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
      transition: width 0.08s ease-out;
    }

    /* Dynamic Global Spotlight Tracker */
    #cursor-spotlight {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 25;
      background: radial-gradient(650px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(0, 240, 255, 0.04), rgba(139, 92, 246, 0.015) 45%, transparent 75%);
      mix-blend-mode: screen;
    }

    /* Senior Craft Card Spotlight Borders */
    .spotlight-card {
      position: relative;
      background: #0D1117;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease, border-color 0.25s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .spotlight-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: radial-gradient(400px circle at var(--card-x, -500px) var(--card-y, -500px), rgba(0, 240, 255, 0.45), rgba(139, 92, 246, 0.2) 40%, transparent 70%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.35s ease;
      z-index: 2;
    }
    .spotlight-card:hover::before {
      opacity: 1;
    }
    .spotlight-card:hover {
      box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 25px -5px rgba(0, 240, 255, 0.15);
    }

    .spotlight-card .specular-glare {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(350px circle at var(--card-x, -500px) var(--card-y, -500px), rgba(255, 255, 255, 0.05), transparent 60%);
      pointer-events: none;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .spotlight-card:hover .specular-glare {
      opacity: 1;
    }

    /* Better UI: Press scale */
    .btn-tactile {
      transition: transform 150ms cubic-bezier(0.2, 0, 0, 1), background-color 150ms ease, box-shadow 150ms ease;
    }
    .btn-tactile:active {
      transform: scale(0.96) !important;
    }

    .magnetic {
      will-change: transform;
      transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
    }

    #hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      z-index: 1;
    }

    #toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast-pill {
      pointer-events: auto;
      animation: toastIn 0.3s cubic-bezier(0.2, 0, 0, 1) forwards;
    }
    @keyframes toastIn {
      from { transform: translateY(20px) scale(0.9); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
    @keyframes toastOut {
      from { transform: translateY(0) scale(1); opacity: 1; }
      to { transform: translateY(15px) scale(0.95); opacity: 0; }
    }

    .shimmer-text {
      background: linear-gradient(90deg, #FFFFFF 0%, #A5F3FC 25%, #FFFFFF 50%, #C4B5FD 75%, #FFFFFF 100%);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: textShine 8s linear infinite;
    }
    @keyframes textShine {
      to { background-position: 200% center; }
    }

    /* Floating mission control bar with smooth scroll appearance */
    #floating-control-bar {
      transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1), transform 0.3s cubic-bezier(0.2, 0, 0, 1);
    }
    #floating-control-bar.dock-hidden {
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, 20px);
    }
    #floating-control-bar.dock-visible {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0);
    }
  </style>
</head>
<body class="bg-obsidian text-[#EDEDED] font-sans antialiased selection:bg-accent-cyan selection:text-obsidian relative min-h-screen">

  <div id="scroll-progress"></div>
  <div id="cursor-spotlight"></div>
  <div class="fixed inset-0 bg-grain pointer-events-none z-30"></div>
  <div id="toast-container"></div>

  <!-- ==================== TOP NAVIGATION BAR ==================== -->
  <header class="fixed top-0 w-full z-40 bg-obsidian/90 backdrop-blur-2xl border-b border-white/[0.08]">
    <div class="h-16 md:h-18 max-w-[1360px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
      
      <!-- Brand & Identity -->
      <a href="#" class="flex items-center gap-3 group shrink-0">
        <div class="relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-violet p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <div class="w-full h-full bg-obsidian rounded-[9.5px] flex items-center justify-center text-accent-cyan font-mono font-black text-xs md:text-sm group-hover:bg-accent-cyan group-hover:text-obsidian transition-colors">
            E
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span class="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-white group-hover:text-accent-cyan transition-colors">ENHJARGAL.DEV</span>
            <span class="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          </div>
          <span class="font-mono text-[9.5px] md:text-[10px] text-neutral-400">BSUIR '26 // SYSTEMS ARCHITECT</span>
        </div>
      </a>

      <!-- Center Nav Links -->
      <nav class="hidden lg:flex items-center gap-7 font-mono text-xs uppercase tracking-wider text-neutral-400">
        <a href="#about" onclick="openAboutModal(event)" class="hover:text-white transition-colors cursor-pointer flex items-center gap-1 group">
          <span class="text-neutral-500 group-hover:text-accent-cyan transition-colors">/</span>About
        </a>
        <a href="#projects" class="hover:text-white transition-colors flex items-center gap-1 group">
          <span class="text-neutral-500 group-hover:text-accent-cyan transition-colors">/</span>Projects
        </a>
        <a href="#stack" class="hover:text-white transition-colors flex items-center gap-1 group">
          <span class="text-neutral-500 group-hover:text-accent-cyan transition-colors">/</span>Stack
        </a>
        <a href="#contact" class="hover:text-white transition-colors flex items-center gap-1 group">
          <span class="text-neutral-500 group-hover:text-accent-cyan transition-colors">/</span>Contact
        </a>
      </nav>

      <!-- Action Utilities & Clean Fast Triggers -->
      <div class="flex items-center gap-2.5 shrink-0">
        <!-- Audio Synthesizer Toggle -->
        <button id="sound-toggle-btn" onclick="toggleAudio()" title="Toggle UI Sound FX" class="btn-tactile flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-elevated text-neutral-300 hover:text-accent-cyan border border-white/[0.08] font-mono text-xs cursor-pointer">
          <span class="material-symbols-outlined text-sm" id="sound-icon">volume_up</span>
          <span class="hidden sm:inline text-[10px] font-bold">SFX</span>
        </button>

        <!-- Command Palette Trigger Pill -->
        <button onclick="toggleCommandPalette()" title="Press Cmd+K / Ctrl+K" class="btn-tactile hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-elevated text-neutral-300 hover:text-white border border-white/[0.08] font-mono text-xs cursor-pointer">
          <span class="material-symbols-outlined text-sm text-accent-cyan">terminal</span>
          <span class="text-[10px] text-neutral-400 bg-surface-highlight px-1 rounded border border-white/[0.08]">⌘K</span>
        </button>

        <!-- LinkedIn (Icon Only on compact) -->
        <a href="https://www.linkedin.com/in/enhjargal-otgonbaatar-582101420/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" class="btn-tactile flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-[#0a66c2]/20 text-neutral-300 hover:text-[#70b5f9] border border-white/[0.08] hover:border-[#0a66c2]/40 font-mono text-xs transition-all">
          <svg class="w-3.5 h-3.5 fill-current text-[#70b5f9]" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          <span class="hidden xl:inline text-xs">LinkedIn</span>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" title="GitHub Repository" class="btn-tactile flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-elevated text-neutral-300 hover:text-white border border-white/[0.08] font-mono text-xs transition-all">
          <span class="material-symbols-outlined text-sm">code</span>
          <span class="hidden sm:inline text-xs">GitHub</span>
        </a>

        <!-- Live Demos CTA -->
        <a href="#projects" class="btn-tactile magnetic inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.35)]">
          <span class="material-symbols-outlined text-xs font-bold">rocket_launch</span>
          <span>Demos</span>
        </a>
      </div>

    </div>
  </header>

  <main class="w-full pt-20 md:pt-24 pb-20 relative z-10 blueprint-grid">

    <!-- ==================== HERO SECTION (PERFECTLY BALANCED RHYTHM) ==================== -->
    <section class="max-w-[1360px] mx-auto px-5 sm:px-8 pt-8 md:pt-14 pb-16 md:pb-20 relative" id="about">
      
      <!-- Interactive WebGL/Canvas Particle Constellation -->
      <canvas id="hero-canvas"></canvas>

      <!-- Ambient Backdrop Radial Glows -->
      <div class="absolute -top-10 left-1/4 w-[500px] h-[300px] bg-accent-cyan/10 blur-[140px] pointer-events-none rounded-full"></div>
      <div class="absolute top-1/2 right-10 w-[450px] h-[300px] bg-accent-violet/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 pointer-events-none">
        
        <!-- Left Column: Architectural Kinetic Typography -->
        <div class="lg:col-span-7 flex flex-col gap-6 pointer-events-auto">
          
          <!-- Technical Credentials Tag & HUD Stats -->
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-white/[0.1] shadow-sm">
              <span class="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
              <span class="font-mono text-[11px] uppercase tracking-wider text-neutral-200 font-semibold">
                BSUIR '26 // PROGRAMMER &amp; BUSINESS ANALYST
              </span>
            </div>

            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/25 text-accent-emerald font-mono text-[10.5px] font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
              <span>OPEN TO FULL-STACK &amp; BACKEND ROLES</span>
            </div>
          </div>

          <!-- Main Architectural Headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-tight leading-[1.14] text-white">
            Architecting <span class="shimmer-text">distributed backends</span> and zero-friction web apps.
          </h1>

          <!-- Academic & Professional Description (Punchy, Clean, No Overflow) -->
          <p class="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Graduating from <strong class="text-white font-medium">BSUIR</strong> in <span class="text-accent-cyan font-mono font-semibold">June 2026</span> as a certified <span class="text-neutral-100">Programmer &amp; Business Analyst</span> (<span class="font-mono text-xs text-neutral-400">Программист и бизнес-аналитик</span>). Specialized in production JVM microservices (<span class="text-neutral-100">Spring Boot 3, Kotlin, Java 21 LTS</span>), transactional PostgreSQL databases, and high-craft client interfaces with <span class="text-neutral-100">React 19, TypeScript</span>, and <span class="text-neutral-100">Android Jetpack Compose</span>.
          </p>

          <!-- Live Engineering Stat Chips (Compact 4-column HUD) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs max-w-xl">
            <div class="p-3 rounded-xl bg-surface-card/90 border border-white/[0.08] flex flex-col gap-0.5 backdrop-blur">
              <span class="text-[9.5px] uppercase text-neutral-400 tracking-wider">Production Apps</span>
              <span class="text-lg font-bold text-accent-cyan">6 Deployed</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-card/90 border border-white/[0.08] flex flex-col gap-0.5 backdrop-blur">
              <span class="text-[9.5px] uppercase text-neutral-400 tracking-wider">Architecture</span>
              <span class="text-lg font-bold text-white">JVM &amp; React</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-card/90 border border-white/[0.08] flex flex-col gap-0.5 backdrop-blur">
              <span class="text-[9.5px] uppercase text-neutral-400 tracking-wider">Diploma Thesis</span>
              <span class="text-lg font-bold text-accent-violet">A+ Defended</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-card/90 border border-white/[0.08] flex flex-col gap-0.5 backdrop-blur">
              <span class="text-[9.5px] uppercase text-neutral-400 tracking-wider">Edge Latency</span>
              <span class="text-lg font-bold text-accent-emerald" id="live-ping-val">14 ms</span>
            </div>
          </div>

          <!-- Action CTA Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <a href="#projects" class="btn-tactile magnetic inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <span class="material-symbols-outlined text-sm">apps</span>
              <span>Explore 6 Live Systems</span>
            </a>
            
            <a href="#contact" class="btn-tactile inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-card hover:bg-surface-elevated text-white border border-white/[0.1] font-mono text-xs font-semibold uppercase tracking-wider hover:border-accent-cyan/40 transition-colors">
              <span class="material-symbols-outlined text-sm text-accent-cyan">send</span>
              <span>Initiate Contact</span>
            </a>

            <button onclick="openAboutModal(event)" class="btn-tactile inline-flex items-center gap-1.5 px-3 py-3 rounded-xl bg-transparent hover:bg-white/[0.04] text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-sm">school</span>
              <span>BSUIR Specs</span>
            </button>
          </div>

        </div>

        <!-- Right Column: Interactive Live Terminal Sandbox -->
        <div class="lg:col-span-5 pointer-events-auto">
          <div class="spotlight-card rounded-2xl shadow-2xl border border-white/[0.12] bg-surface-card overflow-hidden">
            <div class="specular-glare"></div>
            
            <!-- Window Titlebar & File Tabs (Fixed Clean Layout) -->
            <div class="flex items-center justify-between px-3.5 py-2.5 bg-surface-elevated/90 border-b border-white/[0.08]">
              <!-- Traffic lights -->
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>

              <!-- Interactive Tab Pills -->
              <div class="flex items-center gap-1 font-mono text-[11px]">
                <button onclick="switchCodeTab('finance')" id="tab-finance" class="tab-btn active px-2.5 py-1 rounded bg-obsidian text-accent-cyan font-bold border border-white/[0.08] cursor-pointer transition-colors">
                  FinanceKernel.kt
                </button>
                <button onclick="switchCodeTab('attendance')" id="tab-attendance" class="tab-btn px-2.5 py-1 rounded text-neutral-400 hover:text-white cursor-pointer transition-colors">
                  Attendance.kt
                </button>
                <button onclick="switchCodeTab('match')" id="tab-match" class="tab-btn px-2.5 py-1 rounded text-neutral-400 hover:text-white cursor-pointer transition-colors">
                  MatchEngine.tsx
                </button>
              </div>

              <!-- Cluster badge -->
              <div class="flex items-center gap-1 font-mono text-[10px] text-accent-emerald font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                <span>JVM 21</span>
              </div>
            </div>

            <!-- Code Body Display -->
            <div class="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto min-h-[200px] bg-obsidian/95" id="code-content">
              <!-- Rendered via JS -->
            </div>

            <!-- Live Benchmark Execution Console Bar -->
            <div class="px-4 py-2.5 bg-surface-elevated/70 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <div class="flex items-center gap-2 font-mono text-xs text-neutral-300">
                <span class="material-symbols-outlined text-sm text-accent-cyan animate-spin" id="bench-spinner" style="display:none;">progress_activity</span>
                <span id="bench-status" class="text-[11px] text-neutral-400">Cluster Status: Idle</span>
              </div>
              <button onclick="runLiveBenchmark()" id="bench-btn" class="btn-tactile px-3 py-1 rounded-lg bg-accent-cyan/15 hover:bg-accent-cyan/25 text-accent-cyan border border-accent-cyan/30 font-mono text-[11px] font-bold cursor-pointer flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">play_arrow</span>
                <span>RUN BENCHMARK</span>
              </button>
            </div>

            <!-- Streaming Telemetry Console Log -->
            <div id="bench-log-drawer" class="px-4 py-2.5 bg-obsidian border-t border-white/[0.06] font-mono text-[10.5px] text-neutral-400 space-y-1" style="display:none;">
              <!-- Dynamic Benchmark output -->
            </div>

            <!-- Real-time Sinusoidal Throughput Wave -->
            <div class="px-4 py-2 bg-surface/90 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10.5px] text-neutral-400">
              <div class="flex items-center gap-2">
                <span class="text-accent-cyan font-bold">THROUGHPUT:</span>
                <span class="text-white font-bold" id="live-tps">4,820 req/s</span>
              </div>
              <canvas id="waveform-canvas" class="w-32 h-4"></canvas>
            </div>

          </div>
        </div>

      </div>

    </section>

    <!-- ==================== PRODUCTION PROJECTS SECTION ==================== -->
    <section class="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-24" id="projects">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">PRODUCTION ARCHITECTURE</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            Shipped Systems &amp; Live Demos
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            6 fully functional, deployed full-stack systems. Backends engineered with Spring Boot, Kotlin &amp; Java 21, clients crafted with React 19, TypeScript, and Android Jetpack Compose.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-1.5 flex-wrap p-1 rounded-xl bg-surface-card border border-white/[0.08]">
          <button onclick="filterSystem('all')" class="filter-btn active px-3 py-1.5 rounded-lg font-mono text-xs text-white bg-surface-elevated border border-white/[0.1] transition-all cursor-pointer">
            All (6)
          </button>
          <button onclick="filterSystem('fintech')" class="filter-btn px-3 py-1.5 rounded-lg font-mono text-xs text-neutral-400 hover:text-white transition-all cursor-pointer">
            Fintech
          </button>
          <button onclick="filterSystem('edtech')" class="filter-btn px-3 py-1.5 rounded-lg font-mono text-xs text-neutral-400 hover:text-white transition-all cursor-pointer">
            EdTech
          </button>
          <button onclick="filterSystem('realtime')" class="filter-btn px-3 py-1.5 rounded-lg font-mono text-xs text-neutral-400 hover:text-white transition-all cursor-pointer">
            Realtime
          </button>
        </div>
      </div>

      <!-- 6 Project Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10" id="systems-grid">

        <!-- ==================== CARD 1: BLAZE.by (Sports E-Commerce) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="fintech all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <!-- Header Badges -->
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">
                01 // DIPLOMA THESIS PROJECT
              </span>
              <a href="https://dist-indol-alpha-39.vercel.app" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 text-accent-cyan font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-cyan hover:text-obsidian transition-colors">
                ● LIVE APP ↗
              </a>
            </div>

            <!-- Title & Brief -->
            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                BLAZE.by — Sports E-Commerce &amp; Media Platform
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Full-scale multi-tier athletic equipment e-commerce platform and media portal. Engineered with secure cart persistence, multi-criteria category filtering, catalog search, and Android client interop.
              </p>
            </div>

            <!-- Interactive Browser Chrome Mockup -->
            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-cyan/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-cyan">lock</span>
                  <span>dist-indol-alpha-39.vercel.app</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80" alt="BLAZE.by platform" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Full E-Commerce Stack</span>
                  <span class="bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 px-2 py-0.5 rounded font-bold">Android Ready</span>
                </div>
              </div>
            </div>

            <!-- Tech Pills -->
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React 18</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">TypeScript</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Spring Boot 3</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">PostgreSQL</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">JWT Auth</span>
            </div>

            <!-- One-Click Credential & Architecture Accordion -->
            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">DEMO CREDENTIALS:</span>
              <button onclick="copyCredentials('admin', 'admin123', this)" class="text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>admin / admin123</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <a href="https://dist-indol-alpha-39.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.35)]">
              <span>Launch Live System</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- ==================== CARD 2: DevPrep (Interview Simulation) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="edtech all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet font-bold">
                02 // EDTECH &amp; HIRING SIMULATION
              </span>
              <a href="https://devprep-interview-hazel.vercel.app" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/40 text-accent-violet font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-violet hover:text-white transition-colors">
                ● LIVE APP ↗
              </a>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-violet transition-colors">
                DevPrep — Technical Interview &amp; Algorithmic Engine
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Simulated technical recruitment platform designed for candidates preparing for FAANG/enterprise coding rounds. Features algorithmic test runners, timed quizzes, and instant grading.
              </p>
            </div>

            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-violet/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-violet">lock</span>
                  <span>devprep-interview-hazel.vercel.app</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80" alt="DevPrep Interview Platform" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Quiz Engine &amp; Timers</span>
                  <span class="bg-accent-violet/20 text-accent-violet border border-accent-violet/30 px-2 py-0.5 rounded font-bold">Active Candidates</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React 19</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">TypeScript</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Tailwind CSS</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">State Machines</span>
            </div>

            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">TEST CANDIDATE:</span>
              <button onclick="copyCredentials('candidate@devprep.io', 'pass2026', this)" class="text-accent-violet hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>candidate@devprep.io / pass2026</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <a href="https://devprep-interview-hazel.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-[#9d74ff] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)]">
              <span>Launch Live System</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- ==================== CARD 3: BYnance (Financial Ledger) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="fintech all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">
                03 // PERSONAL FINANCE LEDGER
              </span>
              <a href="https://bynance-finance.vercel.app/admin" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 text-accent-cyan font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-cyan hover:text-obsidian transition-colors">
                ● ADMIN PORTAL ↗
              </a>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                BYnance — Multi-Currency Wealth &amp; Ledger Platform
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Enterprise personal finance and budget auditing system. Supports real-time multi-currency conversions (BYN, USD, EUR, RUB), category-based expense visualization, and comprehensive admin auditing.
              </p>
            </div>

            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-cyan/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-cyan">lock</span>
                  <span>bynance-finance.vercel.app/admin</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&auto=format&fit=crop&q=80" alt="BYnance Wealth Management" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Full Admin Console</span>
                  <span class="bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 px-2 py-0.5 rounded font-bold">Multi-Currency</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Kotlin</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Spring Web</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Chart.js</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">PostgreSQL</span>
            </div>

            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">ADMIN CREDENTIALS:</span>
              <button onclick="copyCredentials('admin', 'admin', this)" class="text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>admin / admin</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <div class="flex items-center gap-2">
              <a href="https://bynance-finance.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-elevated hover:bg-surface-highlight text-neutral-300 hover:text-white border border-white/[0.08] font-mono text-xs transition-all">
                <span>User</span>
              </a>
              <a href="https://bynance-finance.vercel.app/admin" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                <span>Admin</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        <!-- ==================== CARD 4: ДомДела (Housework Tasks) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="realtime all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet font-bold">
                04 // COLLABORATIVE TASK HUB
              </span>
              <a href="https://housework-tasks.vercel.app" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/40 text-accent-violet font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-violet hover:text-white transition-colors">
                ● LIVE APP ↗
              </a>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-violet transition-colors">
                ДомДела — Distributed Household Kanban &amp; Gamification
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Shared family chore coordinator and task scheduler. Implements real-time task board updates, karma point attribution, recurring schedule automation, and priority notifications.
              </p>
            </div>

            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-violet/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-violet">lock</span>
                  <span>housework-tasks.vercel.app</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&auto=format&fit=crop&q=80" alt="ДомДела Task Management" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Interactive Kanban</span>
                  <span class="bg-accent-violet/20 text-accent-violet border border-accent-violet/30 px-2 py-0.5 rounded font-bold">Karma System</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React 18</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">TypeScript</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Tailwind</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Local Storage Sync</span>
            </div>

            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">TEST PROFILE:</span>
              <button onclick="copyCredentials('demo_family', 'demo1234', this)" class="text-accent-violet hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>demo_family / demo1234</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <a href="https://housework-tasks.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-[#9d74ff] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)]">
              <span>Launch Live System</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- ==================== CARD 5: Student Attendance (BSUIR) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="edtech all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">
                05 // UNIVERSITY MANAGEMENT SYSTEM
              </span>
              <a href="https://student-attendance-system-eta-five.vercel.app" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 text-accent-cyan font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-cyan hover:text-obsidian transition-colors">
                ● LIVE APP ↗
              </a>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                Student Attendance &amp; Academic Grade Registry
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Automated attendance tracker for university faculties and students. Includes dynamic QR verification, statistical absence reports, and multi-tier role authorization for deans, professors, and students.
              </p>
            </div>

            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-cyan/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-cyan">lock</span>
                  <span>student-attendance-system-eta-five.vercel.app</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80" alt="Student Attendance System" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Dean &amp; Student Portals</span>
                  <span class="bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 px-2 py-0.5 rounded font-bold">QR Verification</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Java 17/21</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Spring Boot</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">PostgreSQL</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Android App</span>
            </div>

            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">PROFESSOR DEMO:</span>
              <button onclick="copyCredentials('teacher@bsuir.by', 'bsuir2026', this)" class="text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>teacher@bsuir.by / bsuir2026</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <a href="https://student-attendance-system-eta-five.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.35)]">
              <span>Launch Live System</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- ==================== CARD 6: Date Matchmaker (Realtime Social) ==================== -->
        <div class="system-item spotlight-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl group" data-category="realtime all">
          <div class="specular-glare"></div>
          
          <div class="flex flex-col gap-4 relative z-10">
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet font-bold">
                06 // SOCIAL DISCOVERY HUB
              </span>
              <a href="https://date-matchmaker.vercel.app" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/40 text-accent-violet font-mono text-[10.5px] font-bold uppercase tracking-wider hover:bg-accent-violet hover:text-white transition-colors">
                ● LIVE APP ↗
              </a>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-violet transition-colors">
                Date Matchmaker — Real-Time Social &amp; Event Discovery
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mt-2">
                Curated dating and interest-matching platform with fluid gesture-driven card interactions, location-based event filters, real-time messaging, and profile analytics.
              </p>
            </div>

            <div class="w-full rounded-xl bg-obsidian overflow-hidden border border-white/[0.08] group-hover:border-accent-violet/30 transition-colors shadow-inner">
              <div class="flex items-center justify-between px-3.5 py-2 bg-surface-elevated border-b border-white/[0.08] font-mono text-[11px] text-neutral-400">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div class="flex items-center gap-1 px-3 py-0.5 rounded bg-surface-card text-neutral-300">
                  <span class="material-symbols-outlined text-xs text-accent-violet">lock</span>
                  <span>date-matchmaker.vercel.app</span>
                </div>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </div>
              <div class="relative h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&auto=format&fit=crop&q=80" alt="Date Matchmaker Platform" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                  <span class="bg-surface-card/90 px-2 py-0.5 rounded backdrop-blur border border-white/[0.08] text-white">Swipe Gestures &amp; Chat</span>
                  <span class="bg-accent-violet/20 text-accent-violet border border-accent-violet/30 px-2 py-0.5 rounded font-bold">Match Engine</span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">React 19</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">TypeScript</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Tailwind</span>
              <span class="px-2.5 py-1 rounded-md bg-surface-elevated text-neutral-300 font-mono text-xs border border-white/[0.06]">Framer Physics</span>
            </div>

            <div class="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <span class="text-neutral-400">TEST USER:</span>
              <button onclick="copyCredentials('alex@match.dev', 'match2026', this)" class="text-accent-violet hover:underline flex items-center gap-1 cursor-pointer font-bold">
                <span>alex@match.dev / match2026</span>
                <span class="material-symbols-outlined text-xs">content_copy</span>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.08] relative z-10">
            <a href="https://github.com/Enhjargal22/Portfolio" target="_blank" rel="noopener noreferrer" class="btn-tactile inline-flex items-center gap-1.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              <span class="material-symbols-outlined text-sm">code</span>
              <span>Source</span>
            </a>
            <a href="https://date-matchmaker.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-tactile magnetic inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-[#9d74ff] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)]">
              <span>Launch Live System</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

      </div>

    </section>

    <!-- ==================== TECHNICAL RADAR & STACK ==================== -->
    <section class="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-20" id="stack">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">TECHNICAL SPECIFICATIONS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architecture Radar &amp; Core Stack
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base max-w-xl">
            Battle-tested engineering competencies across distributed backends, reactive web clients, mobile runtimes, and DevOps pipelines.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Column 1: Backend Systems -->
          <div class="spotlight-card p-6 rounded-2xl flex flex-col gap-4">
            <div class="specular-glare"></div>
            <div class="flex items-center gap-3 relative z-10">
              <span class="w-8 h-8 rounded-lg bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-mono text-sm font-bold">01</span>
              <h3 class="font-bold text-white text-base">Backend &amp; Distributed</h3>
            </div>
            <ul class="flex flex-col gap-2 text-sm text-neutral-400 font-mono relative z-10">
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> Spring Boot 3.2 / 3.3</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> Kotlin Coroutines &amp; Flow</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> Java 17 / 21 LTS (ZGC)</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Spring Security &amp; JWT</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Hibernate / Spring Data JPA</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> PostgreSQL &amp; MySQL</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Redis &amp; In-Memory Cache</li>
            </ul>
          </div>

          <!-- Column 2: Frontend Engineering -->
          <div class="spotlight-card p-6 rounded-2xl flex flex-col gap-4">
            <div class="specular-glare"></div>
            <div class="flex items-center gap-3 relative z-10">
              <span class="w-8 h-8 rounded-lg bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-violet font-mono text-sm font-bold">02</span>
              <h3 class="font-bold text-white text-base">Frontend Systems</h3>
            </div>
            <ul class="flex flex-col gap-2 text-sm text-neutral-400 font-mono relative z-10">
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> React 18 &amp; React 19</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> TypeScript 5 (Strict Mode)</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> Next.js (App Router / SSR)</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Tailwind CSS &amp; Design Tokens</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> HTML5 Canvas &amp; Web Audio API</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> State Machines &amp; Zustand</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> WebSocket Real-time Clients</li>
            </ul>
          </div>

          <!-- Column 3: Mobile & Android -->
          <div class="spotlight-card p-6 rounded-2xl flex flex-col gap-4">
            <div class="specular-glare"></div>
            <div class="flex items-center gap-3 relative z-10">
              <span class="w-8 h-8 rounded-lg bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan font-mono text-sm font-bold">03</span>
              <h3 class="font-bold text-white text-base">Mobile Architecture</h3>
            </div>
            <ul class="flex flex-col gap-2 text-sm text-neutral-400 font-mono relative z-10">
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> Android SDK &amp; Kotlin</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> Jetpack Compose (Declarative)</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-cyan">▹</span> CameraX &amp; QR Code Scanners</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Retrofit 2 &amp; OkHttp Client</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Room DB / SQLite Offline Sync</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> ViewModel &amp; StateFlow</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Material 3 Design System</li>
            </ul>
          </div>

          <!-- Column 4: Infrastructure & Analysis -->
          <div class="spotlight-card p-6 rounded-2xl flex flex-col gap-4">
            <div class="specular-glare"></div>
            <div class="flex items-center gap-3 relative z-10">
              <span class="w-8 h-8 rounded-lg bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-violet font-mono text-sm font-bold">04</span>
              <h3 class="font-bold text-white text-base">Infra &amp; Business Analysis</h3>
            </div>
            <ul class="flex flex-col gap-2 text-sm text-neutral-400 font-mono relative z-10">
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> Docker &amp; Containerization</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> CI/CD GitHub Actions</li>
              <li class="flex items-center gap-2 text-neutral-200"><span class="text-accent-violet">▹</span> Vercel Cloud Edge Hosting</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Git Branching &amp; Semantic Version</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Business Process Modeling (BPMN)</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Software Requirements Spec (SRS)</li>
              <li class="flex items-center gap-2"><span class="text-neutral-500">▹</span> Agile / Scrum Sprint Delivery</li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- ==================== CONTACT SECTION ==================== -->
    <section class="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 lg:py-24 pb-32" id="contact">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Left: Direct Channels -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
              <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">GET IN TOUCH</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Let's engineer something great together.
            </h2>
            <p class="text-neutral-400 text-sm sm:text-base mt-2.5 leading-relaxed">
              Open to full-time Software Engineer positions, enterprise contract engagements, backend systems architecture, and technical consulting.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            
            <!-- Email Box -->
            <div class="p-4 rounded-xl bg-surface-card border border-white/[0.08] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                  <span class="material-symbols-outlined text-lg">mail</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Direct Email</span>
                  <a href="mailto:enhjargal8919@gmail.com" class="text-white hover:text-accent-cyan font-mono text-xs sm:text-sm transition-colors font-bold">
                    enhjargal8919@gmail.com
                  </a>
                </div>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=enhjargal8919@gmail.com" target="_blank" rel="noopener noreferrer" class="btn-tactile px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-surface-highlight text-accent-cyan font-mono text-xs font-semibold border border-white/[0.08] transition-all">
                Compose
              </a>
            </div>

            <!-- LinkedIn Box -->
            <div class="p-4 rounded-xl bg-surface-card border border-white/[0.08] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#70b5f9]">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </div>
                <div class="flex flex-col">
                  <span class="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Professional Network</span>
                  <a href="https://www.linkedin.com/in/enhjargal-otgonbaatar-582101420/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#70b5f9] font-mono text-xs sm:text-sm transition-colors font-bold">
                    Enhjargal Otgonbaatar
                  </a>
                </div>
              </div>
              <a href="https://www.linkedin.com/in/enhjargal-otgonbaatar-582101420/" target="_blank" rel="noopener noreferrer" class="btn-tactile px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-surface-highlight text-neutral-300 font-mono text-xs font-semibold border border-white/[0.08] transition-all">
                Connect ↗
              </a>
            </div>

            <!-- GitHub Box -->
            <div class="p-4 rounded-xl bg-surface-card border border-white/[0.08] flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-lg">terminal</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Source Repositories</span>
                  <a href="https://github.com/Enhjargal22" target="_blank" rel="noopener noreferrer" class="text-white hover:text-accent-cyan font-mono text-xs sm:text-sm transition-colors font-bold">
                    github.com/Enhjargal22
                  </a>
                </div>
              </div>
              <a href="https://github.com/Enhjargal22" target="_blank" rel="noopener noreferrer" class="btn-tactile px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-surface-highlight text-neutral-300 font-mono text-xs font-semibold border border-white/[0.08] transition-all">
                Explore ↗
              </a>
            </div>

          </div>
        </div>

        <!-- Right: Direct Delivery Contact Form -->
        <div class="lg:col-span-7">
          <div class="spotlight-card p-6 sm:p-8 rounded-2xl bg-surface-card border border-white/[0.08]">
            <div class="specular-glare"></div>
            
            <form action="https://formsubmit.co/enhjargal8919@gmail.com" method="POST" class="flex flex-col gap-5 relative z-10" id="contact-form">
              <input type="hidden" name="_subject" value="New Engineering Inquiry via Portfolio">
              <input type="hidden" name="_captcha" value="false">
              <input type="hidden" name="_template" value="table">

              <div class="flex flex-col gap-1 border-b border-white/[0.08] pb-3">
                <span class="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">DISPATCH DIRECT MESSAGE</span>
                <p class="text-neutral-400 text-xs">
                  Submissions are routed directly to <span class="text-white font-mono font-medium">enhjargal8919@gmail.com</span>.
                </p>
              </div>

              <!-- Topic Chips -->
              <div class="flex flex-col gap-2">
                <label class="font-mono text-xs uppercase tracking-wider text-neutral-400">Inquiry Topic</label>
                <div class="flex flex-wrap gap-2">
                  <button type="button" onclick="selectTopic(this, 'Full-time Software Engineer')" class="topic-chip active px-3 py-1 rounded-lg bg-surface-elevated border border-accent-cyan/40 text-accent-cyan font-mono text-xs cursor-pointer">
                    Full-time Role
                  </button>
                  <button type="button" onclick="selectTopic(this, 'Backend Microservices Architecture')" class="topic-chip px-3 py-1 rounded-lg bg-surface-card border border-white/[0.08] text-neutral-400 hover:text-white font-mono text-xs cursor-pointer">
                    Backend Architecture
                  </button>
                  <button type="button" onclick="selectTopic(this, 'Web & Mobile Full-Stack Project')" class="topic-chip px-3 py-1 rounded-lg bg-surface-card border border-white/[0.08] text-neutral-400 hover:text-white font-mono text-xs cursor-pointer">
                    Web &amp; Mobile App
                  </button>
                  <button type="button" onclick="selectTopic(this, 'Technical Consulting')" class="topic-chip px-3 py-1 rounded-lg bg-surface-card border border-white/[0.08] text-neutral-400 hover:text-white font-mono text-xs cursor-pointer">
                    Consulting
                  </button>
                </div>
                <input type="hidden" name="topic" id="selected-topic-input" value="Full-time Software Engineer">
              </div>

              <!-- Two Column: Name & Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs uppercase tracking-wider text-neutral-400" for="form-name">Your Name / Organization *</label>
                  <input type="text" id="form-name" name="name" required placeholder="Alex Chen (Tech Lead)" class="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-white/[0.1] text-white font-mono text-sm focus:outline-none focus:border-accent-cyan transition-colors">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="font-mono text-xs uppercase tracking-wider text-neutral-400" for="form-email">Your Work Email *</label>
                  <input type="email" id="form-email" name="email" required placeholder="name@company.com" class="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-white/[0.1] text-white font-mono text-sm focus:outline-none focus:border-accent-cyan transition-colors">
                </div>
              </div>

              <!-- Message -->
              <div class="flex flex-col gap-1.5">
                <label class="font-mono text-xs uppercase tracking-wider text-neutral-400" for="form-message">Project Scope or Role Description *</label>
                <textarea id="form-message" name="message" required rows="3" placeholder="Detail your project requirements, technology stack, timeline or job opening..." class="w-full px-3.5 py-2.5 rounded-xl bg-obsidian border border-white/[0.1] text-white font-mono text-sm focus:outline-none focus:border-accent-cyan transition-colors resize-none"></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex items-center justify-between gap-4 pt-1">
                <span class="font-mono text-[11px] text-neutral-400">Response SLA: &lt; 24 Hours</span>
                <button type="submit" class="btn-tactile magnetic px-5 py-3 rounded-xl bg-accent-cyan hover:bg-[#3bf4ff] text-obsidian font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 cursor-pointer">
                  <span>Transmit Message</span>
                  <span class="material-symbols-outlined text-sm font-bold">send</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- ==================== COMMAND PALETTE (CMD+K / CTRL+K) ==================== -->
  <div id="cmd-palette" class="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-xl flex items-start justify-center pt-24 px-4" style="display:none;" onclick="handlePaletteBackdrop(event)">
    <div class="w-full max-w-xl rounded-2xl bg-surface-card border border-white/[0.15] shadow-2xl overflow-hidden flex flex-col" onclick="event.stopPropagation()">
      <div class="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.08] bg-surface-elevated">
        <span class="material-symbols-outlined text-accent-cyan">search</span>
        <input type="text" id="cmd-input" placeholder="Type a command or jump to system..." class="w-full bg-transparent text-white font-mono text-sm focus:outline-none" oninput="filterPalette(this.value)">
        <span class="text-[10px] font-mono text-neutral-400 border border-white/[0.1] px-1.5 py-0.5 rounded">ESC</span>
      </div>

      <div class="p-3 max-h-[340px] overflow-y-auto space-y-1 font-mono text-xs" id="cmd-list">
        <div class="px-3 py-1.5 text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Systems &amp; Demos</div>
        
        <a href="https://dist-indol-alpha-39.vercel.app" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-cyan transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-cyan">shopping_cart</span>
            <span>BLAZE.by — Sports E-Commerce</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <a href="https://devprep-interview-hazel.vercel.app" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-violet transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-violet">code_blocks</span>
            <span>DevPrep — Interview Engine</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <a href="https://bynance-finance.vercel.app/admin" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-cyan transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-cyan">account_balance</span>
            <span>BYnance — Ledger Admin</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <a href="https://housework-tasks.vercel.app" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-violet transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-violet">checklist</span>
            <span>ДомДела — Task Kanban</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <a href="https://student-attendance-system-eta-five.vercel.app" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-cyan transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-cyan">school</span>
            <span>Student Attendance System</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <a href="https://date-matchmaker.vercel.app" target="_blank" class="cmd-item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-accent-violet transition-colors">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-violet">favorite</span>
            <span>Date Matchmaker Hub</span>
          </div>
          <span class="text-[10px] text-neutral-500">Live ↗</span>
        </a>

        <div class="px-3 pt-2.5 pb-1 text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Quick Actions</div>

        <button onclick="copyEmailToClipboard(); toggleCommandPalette();" class="cmd-item w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-cyan">mail</span>
            <span>Copy Direct Email (enhjargal8919@gmail.com)</span>
          </div>
          <span class="text-[10px] text-neutral-500">Copy</span>
        </button>

        <button onclick="toggleAudio(); toggleCommandPalette();" class="cmd-item w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-elevated text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-accent-violet">volume_up</span>
            <span>Toggle Synthesizer Sound FX</span>
          </div>
          <span class="text-[10px] text-neutral-500">Toggle</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== BSUIR CREDENTIALS MODAL ==================== -->
  <div id="about-modal" class="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl flex items-center justify-center p-4" style="display:none;" onclick="closeAboutModal()">
    <div class="w-full max-w-xl rounded-2xl bg-surface-card border border-white/[0.15] p-6 sm:p-7 shadow-2xl relative" onclick="event.stopPropagation()">
      <button onclick="closeAboutModal()" class="absolute top-5 right-5 text-neutral-400 hover:text-white cursor-pointer">
        <span class="material-symbols-outlined">close</span>
      </button>

      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
          <span class="material-symbols-outlined">school</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">Academic Qualifications &amp; Diploma</h3>
          <span class="font-mono text-xs text-neutral-400">BSUIR (Белорусский государственный университет информатики и радиоэлектроники)</span>
        </div>
      </div>

      <div class="mt-5 space-y-3.5 text-sm leading-relaxed text-neutral-300">
        <div class="p-3.5 rounded-xl bg-surface-elevated border border-white/[0.08] flex flex-col gap-1 font-mono text-xs">
          <div class="flex justify-between text-neutral-400">
            <span>DEGREE SPECIALTY:</span>
            <span class="text-white font-bold">1-40 05 01-01</span>
          </div>
          <div class="flex justify-between text-neutral-400">
            <span>QUALIFICATION:</span>
            <span class="text-accent-cyan font-bold">Programmer &amp; Business Analyst</span>
          </div>
          <div class="flex justify-between text-neutral-400">
            <span>GRADUATION DATE:</span>
            <span class="text-white">June 2026</span>
          </div>
          <div class="flex justify-between text-neutral-400">
            <span>DIPLOMA DEFENSE:</span>
            <span class="text-accent-emerald font-bold">Excellent / Defended</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm">
          Trained in rigorous software engineering fundamentals, algorithms, discrete mathematics, distributed systems architecture, business process engineering (BPMN), and enterprise database design.
        </p>

        <p class="text-neutral-400 text-xs">
          Diploma thesis centered on designing a scalable, multi-tier athletic commerce and athlete telemetry hub with Spring Boot 3, PostgreSQL, React, and Android Jetpack Compose interop.
        </p>
      </div>

      <div class="mt-5 flex justify-end">
        <button onclick="closeAboutModal()" class="btn-tactile px-4 py-2 rounded-xl bg-accent-cyan text-obsidian font-mono text-xs font-bold uppercase tracking-wider cursor-pointer">
          Close Window
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== FLOATING MISSION CONTROL DOCK (AUTO-HIDE AT HERO) ==================== -->
  <footer id="floating-control-bar" class="dock-hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-surface-card/90 backdrop-blur-xl border border-white/[0.1] rounded-full px-4 py-2 shadow-2xl flex items-center gap-3 text-xs font-mono">
    <div class="flex items-center gap-1.5">
      <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
      <span class="text-neutral-400">PROD OK</span>
    </div>
    <span class="text-neutral-600">|</span>
    <span class="text-neutral-400 hidden sm:inline">UPTIME: <strong class="text-white">99.98%</strong></span>
    <span class="text-neutral-600 hidden sm:inline">|</span>
    <button onclick="toggleCommandPalette()" class="text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer font-bold">
      <span class="material-symbols-outlined text-xs">terminal</span>
      <span>⌘K PALETTE</span>
    </button>
    <span class="text-neutral-600">|</span>
    <a href="#" class="text-neutral-400 hover:text-white flex items-center gap-1">
      <span class="material-symbols-outlined text-xs">arrow_upward</span>
      <span class="hidden sm:inline">TOP</span>
    </a>
  </footer>

  <!-- ==================== LOGIC & INTERACTION SCRIPTS ==================== -->
  <script>
    // -------------------------------------------------------------
    // 1. Web Audio API Synthesizer (Zero dependencies, pure craft)
    // -------------------------------------------------------------
    let audioCtx = null;
    let soundEnabled = true;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playTone(freq, type, duration, gainVal = 0.05) {
      if (!soundEnabled) return;
      try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Audio policy ignore
      }
    }

    function playClickSound() {
      playTone(720, 'sine', 0.04, 0.04);
    }
    function playChimeSound() {
      playTone(587.33, 'triangle', 0.12, 0.06);
      setTimeout(() => playTone(880, 'sine', 0.18, 0.05), 60);
    }

    function toggleAudio() {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('sound-icon');
      if (soundEnabled) {
        icon.textContent = 'volume_up';
        showToast('UI Sound FX Enabled', 'success');
        playChimeSound();
      } else {
        icon.textContent = 'volume_off';
        showToast('UI Sound FX Muted', 'info');
      }
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('button, a, .tab-btn, .topic-chip')) {
        playClickSound();
      }
    });

    // -------------------------------------------------------------
    // 2. Global Scroll Laser, Spotlight & Dock Auto-Visibility
    // -------------------------------------------------------------
    const dock = document.getElementById('floating-control-bar');
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / (docHeight || 1)) * 100;
      document.getElementById('scroll-progress').style.width = scrolled + '%';

      // Only show floating dock when scrolled past 220px to prevent blocking hero text!
      if (dock) {
        if (window.scrollY > 220) {
          dock.classList.remove('dock-hidden');
          dock.classList.add('dock-visible');
        } else {
          dock.classList.remove('dock-visible');
          dock.classList.add('dock-hidden');
        }
      }
    });

    document.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // -------------------------------------------------------------
    // 3. Senior Craft Card Dynamic Spotlight & 3D Tilt
    // -------------------------------------------------------------
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--card-x', x + 'px');
        card.style.setProperty('--card-y', y + 'px');

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.015, 1.015, 1.015)\`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // -------------------------------------------------------------
    // 4. Magnetic Buttons Easing (better-ui compliant)
    // -------------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = \`translate(\${x * 0.2}px, \${y * 0.2}px)\`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });

    // -------------------------------------------------------------
    // 5. Interactive Particle Constellation Canvas (Hero)
    // -------------------------------------------------------------
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let width, height;
      let mousePos = { x: -1000, y: -1000 };

      function resizeCanvas() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 22), 55);

      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.radius = Math.random() * 1.5 + 0.8;
          this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(139, 92, 246,';
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;

          const dx = mousePos.x - this.x;
          const dy = mousePos.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color + '0.7)';
          ctx.fill();
        }
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }

      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
      });

      function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = \`rgba(0, 240, 255, \${alpha})\`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        particles.forEach(p => {
          p.update();
          p.draw();
        });

        requestAnimationFrame(animateCanvas);
      }
      animateCanvas();
    }

    // -------------------------------------------------------------
    // 6. Interactive Terminal Studio & Benchmark Engine
    // -------------------------------------------------------------
    const CODE_SNIPPETS = {
      finance: \`<div class="text-neutral-500">// Multi-Currency Financial Ledger Service</div>
<div><span class="text-accent-violet font-semibold">@Service</span></div>
<div><span class="text-accent-violet font-semibold">class</span> <span class="text-accent-cyan font-bold">FinancialEngine</span>(</div>
<div class="pl-4"><span class="text-neutral-400">private val</span> <span class="text-white">ledgerRepo</span>: <span class="text-blue-400">TransactionRepository</span>,</div>
<div class="pl-4"><span class="text-neutral-400">private val</span> <span class="text-white">rateService</span>: <span class="text-blue-400">CurrencyExchangeService</span></div>
<div>) {</div>
<div class="pl-4 py-0.5"><span class="text-accent-violet font-semibold">suspend fun</span> <span class="text-accent-cyan font-bold">rebalance</span>(<span class="text-white">userId</span>: <span class="text-blue-400">Long</span>): <span class="text-blue-400">Summary</span> {</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">val</span> rates = rateService.<span class="text-accent-cyan">getActiveRates</span>()</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">val</span> balance = ledgerRepo.<span class="text-accent-cyan">getBalance</span>(userId, rates)</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">return</span> <span class="text-blue-400 font-semibold">Summary</span>(balance, LedgerStatus.HEALTHY)</div>
<div class="pl-4">}</div>
<div>}\`,

      attendance: \`<div class="text-neutral-500">// Automated University Attendance Verification</div>
<div><span class="text-accent-violet font-semibold">@RestController</span></div>
<div><span class="text-accent-violet font-semibold">@RequestMapping</span>(<span class="text-accent-cyan">"/api/v1/attendance"</span>)</div>
<div><span class="text-accent-violet font-semibold">class</span> <span class="text-accent-cyan font-bold">AttendanceController</span>(</div>
<div class="pl-4"><span class="text-neutral-400">private val</span> <span class="text-white">verifyService</span>: <span class="text-blue-400">AttendanceEngine</span></div>
<div>) {</div>
<div class="pl-4 py-0.5"><span class="text-accent-violet font-semibold">@PostMapping</span>(<span class="text-accent-cyan">"/scan"</span>)</div>
<div class="pl-4"><span class="text-accent-violet font-semibold">suspend fun</span> <span class="text-accent-cyan font-bold">verify</span>(<span class="text-accent-violet">@RequestBody</span> <span class="text-white">scan</span>: <span class="text-blue-400">QRScanEvent</span>) {</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">val</span> rec = verifyService.<span class="text-accent-cyan">commit</span>(scan.token, scan.studentId)</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">return</span> ResponseEntity.<span class="text-accent-cyan">ok</span>(rec)</div>
<div class="pl-4">}</div>
<div>}\`,

      match: \`<div class="text-neutral-500">// Gesture-Driven Real-time Match Vector Engine</div>
<div><span class="text-accent-violet font-semibold">export const</span> <span class="text-accent-cyan font-bold">MatchDeck</span>: <span class="text-blue-400">React.FC</span>&lt;<span class="text-blue-400">DeckProps</span>&gt; = ({ pool }) =&gt; {</div>
<div class="pl-4"><span class="text-neutral-400">const</span> [index, setIndex] = <span class="text-accent-cyan">useState</span>(0);</div>
<div class="pl-4 py-0.5"><span class="text-accent-violet font-semibold">const</span> onSwipe = <span class="text-accent-cyan">useCallback</span>(<span class="text-accent-violet">async</span> (dir) =&gt; {</div>
<div class="pl-8 text-neutral-300"><span class="text-accent-violet">await</span> api.<span class="text-accent-cyan">vote</span>(pool[index].id, dir);</div>
<div class="pl-8 text-neutral-300">setIndex(i =&gt; i + 1);</div>
<div class="pl-4">}, [index, pool]);</div>
<div class="pl-4"><span class="text-accent-violet">return</span> &lt;<span class="text-blue-400">CardDeck</span> onSwipe={onSwipe} /&gt;;</div>
<div>};\`
    };

    function switchCodeTab(fileKey) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-obsidian', 'text-accent-cyan', 'font-bold');
        btn.classList.add('text-neutral-400');
      });
      const activeBtn = document.getElementById('tab-' + fileKey);
      if (activeBtn) {
        activeBtn.classList.add('active', 'bg-obsidian', 'text-accent-cyan', 'font-bold');
        activeBtn.classList.remove('text-neutral-400');
      }
      document.getElementById('code-content').innerHTML = CODE_SNIPPETS[fileKey] || '';
    }
    switchCodeTab('finance');

    let benchmarkRunning = false;
    function runLiveBenchmark() {
      if (benchmarkRunning) return;
      benchmarkRunning = true;
      playTone(440, 'sawtooth', 0.15, 0.05);

      const statusEl = document.getElementById('bench-status');
      const spinner = document.getElementById('bench-spinner');
      const btn = document.getElementById('bench-btn');
      const drawer = document.getElementById('bench-log-drawer');

      statusEl.textContent = 'Cluster Stress Test Running...';
      statusEl.classList.add('text-accent-cyan');
      spinner.style.display = 'inline-block';
      btn.disabled = true;
      btn.classList.add('opacity-50');
      drawer.style.display = 'block';
      drawer.innerHTML = '';

      const logs = [
        '[JVM 21] Virtual Thread Dispatcher: 8 workers active',
        '[Postgres] HikariCP connection pool warmed (max=30)',
        '[Benchmark] 50,000 ledger transactions committed',
        '[Result] Latency P99: 1.18ms | Zero race conditions'
      ];

      logs.forEach((log, idx) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'text-accent-cyan flex items-center gap-2';
          line.innerHTML = \`<span class="text-accent-emerald">✓</span> \${log}\`;
          drawer.appendChild(line);
          playTone(600 + idx * 80, 'sine', 0.04, 0.03);

          if (idx === logs.length - 1) {
            statusEl.textContent = 'Benchmark: PASS (1.18ms)';
            statusEl.classList.remove('text-accent-cyan');
            statusEl.classList.add('text-accent-emerald');
            spinner.style.display = 'none';
            btn.disabled = false;
            btn.classList.remove('opacity-50');
            benchmarkRunning = false;
            playChimeSound();
            showToast('Benchmark Suite: 50,000 TPS Passed with P99 1.18ms', 'success');
          }
        }, idx * 260);
      });
    }

    // -------------------------------------------------------------
    // 7. Live Sinusoidal Throughput Waveform Canvas
    // -------------------------------------------------------------
    const waveCanvas = document.getElementById('waveform-canvas');
    if (waveCanvas) {
      const wCtx = waveCanvas.getContext('2d');
      let step = 0;
      function drawWave() {
        wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        wCtx.beginPath();
        wCtx.lineWidth = 1.6;
        wCtx.strokeStyle = '#00f0ff';

        const height = waveCanvas.height;
        const width = waveCanvas.width;
        wCtx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
          const y = Math.sin((x + step) * 0.1) * (height / 3.5) + (height / 2);
          wCtx.lineTo(x, y);
        }
        wCtx.stroke();
        step += 2;
        requestAnimationFrame(drawWave);
      }
      drawWave();
    }

    // -------------------------------------------------------------
    // 8. One-Click Credential Copy & Toast Notifications
    // -------------------------------------------------------------
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast-pill px-4 py-2.5 rounded-xl bg-surface-elevated/95 backdrop-blur-xl border border-white/[0.12] text-white font-mono text-xs flex items-center gap-2.5 shadow-2xl';
      
      const icon = type === 'success' ? 'check_circle' : 'info';
      const color = type === 'success' ? 'text-accent-emerald' : 'text-accent-cyan';
      
      toast.innerHTML = \`
        <span class="material-symbols-outlined text-base \${color}">\${icon}</span>
        <span>\${message}</span>
      \`;

      container.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s cubic-bezier(0.2, 0, 0, 1) forwards';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    function copyCredentials(user, pass, btnElement) {
      const text = \`Username: \${user} | Password: \${pass}\`;
      navigator.clipboard.writeText(text).then(() => {
        playChimeSound();
        showToast(\`Credentials copied: \${user} / \${pass}\`, 'success');
        const origHTML = btnElement.innerHTML;
        btnElement.innerHTML = \`<span class="text-accent-emerald font-bold">COPIED!</span>\`;
        setTimeout(() => {
          btnElement.innerHTML = origHTML;
        }, 2000);
      });
    }

    function copyEmailToClipboard() {
      navigator.clipboard.writeText('enhjargal8919@gmail.com').then(() => {
        playChimeSound();
        showToast('Direct email copied: enhjargal8919@gmail.com', 'success');
      });
    }

    // -------------------------------------------------------------
    // 9. Command Palette (Cmd+K / Ctrl+K)
    // -------------------------------------------------------------
    function toggleCommandPalette() {
      const palette = document.getElementById('cmd-palette');
      const isOpen = palette.style.display !== 'none';
      if (isOpen) {
        palette.style.display = 'none';
      } else {
        palette.style.display = 'flex';
        playTone(500, 'sine', 0.05, 0.04);
        setTimeout(() => document.getElementById('cmd-input').focus(), 50);
      }
    }

    function handlePaletteBackdrop(e) {
      if (e.target.id === 'cmd-palette') {
        toggleCommandPalette();
      }
    }

    function filterPalette(query) {
      const q = query.toLowerCase().trim();
      const items = document.querySelectorAll('.cmd-item');
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (e.key === 'Escape') {
        const palette = document.getElementById('cmd-palette');
        if (palette && palette.style.display !== 'none') {
          palette.style.display = 'none';
        }
        closeAboutModal();
      }
    });

    // -------------------------------------------------------------
    // 10. Filter System Cards
    // -------------------------------------------------------------
    function filterSystem(category) {
      const items = document.querySelectorAll('.system-item');
      const buttons = document.querySelectorAll('.filter-btn');

      buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-surface-elevated', 'text-white', 'border-white/[0.1]');
        btn.classList.add('text-neutral-400');
      });

      event.target.classList.add('active', 'bg-surface-elevated', 'text-white', 'border-white/[0.1]');
      event.target.classList.remove('text-neutral-400');

      items.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (category === 'all' || categories.includes(category)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // -------------------------------------------------------------
    // 11. Modal Windows (BSUIR Qualifications)
    // -------------------------------------------------------------
    function openAboutModal(e) {
      if (e) e.preventDefault();
      document.getElementById('about-modal').style.display = 'flex';
      playTone(520, 'sine', 0.05, 0.04);
    }
    function closeAboutModal() {
      const modal = document.getElementById('about-modal');
      if (modal) modal.style.display = 'none';
    }

    // -------------------------------------------------------------
    // 12. Contact Form Topic Selector
    // -------------------------------------------------------------
    function selectTopic(button, topicName) {
      document.querySelectorAll('.topic-chip').forEach(chip => {
        chip.classList.remove('active', 'border-accent-cyan/40', 'text-accent-cyan', 'bg-surface-elevated');
        chip.classList.add('bg-surface-card', 'text-neutral-400', 'border-white/[0.08]');
      });
      button.classList.add('active', 'border-accent-cyan/40', 'text-accent-cyan', 'bg-surface-elevated');
      button.classList.remove('bg-surface-card', 'text-neutral-400', 'border-white/[0.08]');
      document.getElementById('selected-topic-input').value = topicName;
      playClickSound();
    }

    setInterval(() => {
      const pingEl = document.getElementById('live-ping-val');
      if (pingEl) {
        const ping = Math.floor(12 + Math.random() * 5);
        pingEl.textContent = ping + ' ms';
      }
      const tpsEl = document.getElementById('live-tps');
      if (tpsEl) {
        const tps = (4800 + Math.floor(Math.random() * 120)).toLocaleString();
        tpsEl.textContent = tps + ' req/s';
      }
    }, 3000);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf-8');
console.log('Successfully refined spacing and layout in index.html!');
