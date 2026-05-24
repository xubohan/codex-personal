import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { ArrowUpRight, Languages, Mail, NotebookPen } from "lucide-react";
import "./styles.css";

type Language = "en" | "zh";

const copy = {
  en: {
    name: "Bohan",
    role: "AI product engineer",
    nav: ["Work", "About", "Notes", "Contact"],
    home: {
      kicker: "Personal site / AI products / engineering craft",
      title: "Useful systems, edited with taste.",
      intro:
        "A personal website for AI product work, engineering experiments, and notes on making vague ideas concrete enough to ship.",
      cta: "View work",
      secondary: "Read notes",
      index: ["AI product", "Engineering", "Research", "Taste"],
    },
    work: {
      eyebrow: "Selected work",
      title: "Small systems for clear decisions.",
      intro:
        "A compact record of product and engineering directions. Replace these entries with public projects when the site moves from placeholder to final personal archive.",
      items: [
        {
          year: "2026",
          title: "AI Product Discovery",
          type: "Product system",
          description:
            "A repeatable workflow for moving from raw market signals to scoped product bets, validation artifacts, and implementation briefs.",
        },
        {
          year: "2026",
          title: "Agentic Engineering Notes",
          type: "Engineering practice",
          description:
            "Patterns for keeping AI-assisted development grounded in source truth, current evidence, and reviewable changes.",
        },
        {
          year: "Ongoing",
          title: "Personal Operating Studio",
          type: "Tooling",
          description:
            "A private workspace for turning research, prompts, code, and decisions into durable personal infrastructure.",
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "An engineer's workflow with an editor's eye.",
      body:
        "I work at the intersection of AI products, software systems, and practical judgment. The goal is not theatrical automation; it is to make ambiguous work legible, testable, and useful.",
      facts: ["Builds with evidence", "Prefers restrained interfaces", "Writes to clarify decisions", "Treats taste as an execution skill"],
    },
    notes: {
      eyebrow: "Notes",
      title: "Questions worth keeping open.",
      items: [
        {
          title: "What should an AI-native product remember?",
          body:
            "Enough context to improve the next decision; not so much that every artifact becomes a museum.",
        },
        {
          title: "Where does design help engineering?",
          body:
            "At the moment a system becomes inspectable: hierarchy, spacing, naming, and rhythm all change how quickly truth can be found.",
        },
        {
          title: "How should a personal site feel?",
          body:
            "Less like a resume template, more like a quiet index: accurate, edited, and easy to revisit.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "For precise collaborations and serious product conversations.",
      body:
        "Public contact details can stay minimal. The current version links only to the visible GitHub account to avoid publishing private information by assumption.",
      github: "GitHub: xubohan",
      email: "Add public email later",
    },
  },
  zh: {
    name: "Bohan",
    role: "AI 产品 / 工程",
    nav: ["作品", "关于", "札记", "联系"],
    home: {
      kicker: "个人网站 / AI 产品 / 工程实践",
      title: "有用的系统，也要有审美。",
      intro:
        "这里用于展示 AI 产品工作、工程实验，以及如何把模糊想法推进到可验证、可交付的状态。",
      cta: "查看作品",
      secondary: "阅读札记",
      index: ["AI 产品", "工程", "研究", "审美"],
    },
    work: {
      eyebrow: "精选工作",
      title: "为清晰判断服务的小系统。",
      intro:
        "这是一个先上线的克制版本。等你提供可公开项目后，只需要替换数据，就能变成完整个人作品档案。",
      items: [
        {
          year: "2026",
          title: "AI 产品发现",
          type: "产品系统",
          description:
            "从市场信号到产品假设、验证材料、实施 brief 的可复用工作流。",
        },
        {
          year: "2026",
          title: "Agent 工程札记",
          type: "工程实践",
          description:
            "让 AI 辅助开发始终落在源码事实、当前证据和可审查变更上的方法。",
        },
        {
          year: "持续中",
          title: "个人工作室系统",
          type: "工具",
          description:
            "把研究、提示词、代码和决策沉淀为可长期复用的个人基础设施。",
        },
      ],
    },
    about: {
      eyebrow: "关于",
      title: "工程师的工作流，编辑的眼光。",
      body:
        "我关注 AI 产品、软件系统和实践判断的交汇点。目标不是炫技式自动化，而是让含混的工作变得清晰、可验证、可使用。",
      facts: ["用证据推进", "偏好克制界面", "用写作澄清决策", "把审美视为执行能力"],
    },
    notes: {
      eyebrow: "札记",
      title: "值得持续保留的问题。",
      items: [
        {
          title: "AI 原生产品应该记住什么？",
          body: "记住足以改善下一次判断的上下文，而不是把每个产物都变成展柜。",
        },
        {
          title: "设计在哪里帮助工程？",
          body: "在系统变得可检查的那一刻：层级、间距、命名和节奏都会影响找到事实的速度。",
        },
        {
          title: "个人网站应该是什么感觉？",
          body: "不应该像简历模板，更像一个安静索引：准确、经过编辑，并且值得再次打开。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "适合具体协作和严肃产品讨论。",
      body:
        "公开联系方式保持克制。当前版本只链接已经可见的 GitHub 账号，避免擅自发布私人信息。",
      github: "GitHub: xubohan",
      email: "公开邮箱后续添加",
    },
  },
} satisfies Record<Language, unknown>;

const routes = ["/work", "/about", "/notes", "/contact"];

function useText(language: Language) {
  return copy[language];
}

function Layout({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  const text = useText(language);
  const nav = useMemo(
    () =>
      routes.map((path, index) => ({
        path,
        label: text.nav[index],
      })),
    [text.nav],
  );

  return (
    <div className="site-shell">
      <header className="masthead">
        <NavLink className="brand" to="/" aria-label="Home">
          <span>{text.name}</span>
          <span>{text.role}</span>
        </NavLink>
        <nav className="nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="lang-button"
          type="button"
          onClick={() => setLanguage(language === "en" ? "zh" : "en")}
          aria-label="Switch language"
        >
          <Languages aria-hidden="true" size={16} />
          {language === "en" ? "中文" : "EN"}
        </button>
      </header>
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/work" element={<Work language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/notes" element={<Notes language={language} />} />
        <Route path="/contact" element={<Contact language={language} />} />
      </Routes>
    </div>
  );
}

function Home({ language }: { language: Language }) {
  const text = useText(language);

  return (
    <main className="page home-page">
      <section className="hero-grid">
        <div className="hero-type">
          <p className="eyebrow">{text.home.kicker}</p>
          <h1>{text.home.title}</h1>
          <p className="lede">{text.home.intro}</p>
          <div className="hero-actions">
            <NavLink className="text-link primary-link" to="/work">
              {text.home.cta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </NavLink>
            <NavLink className="text-link" to="/notes">
              {text.home.secondary}
            </NavLink>
          </div>
        </div>
        <MagazinePanel labels={text.home.index} />
      </section>
    </main>
  );
}

function MagazinePanel({ labels }: { labels: string[] }) {
  return (
    <aside className="magazine-panel" aria-label="Editorial index">
      <div className="panel-mark">01</div>
      <div className="panel-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="panel-list">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </aside>
  );
}

function Work({ language }: { language: Language }) {
  const text = useText(language);

  return (
    <main className="page editorial-page">
      <PageIntro eyebrow={text.work.eyebrow} title={text.work.title} intro={text.work.intro} />
      <section className="work-table" aria-label={text.work.eyebrow}>
        {text.work.items.map((item) => (
          <article className="work-row" key={item.title}>
            <span>{item.year}</span>
            <div>
              <p>{item.type}</p>
              <h2>{item.title}</h2>
            </div>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function About({ language }: { language: Language }) {
  const text = useText(language);

  return (
    <main className="page editorial-page split-page">
      <PageIntro eyebrow={text.about.eyebrow} title={text.about.title} intro={text.about.body} />
      <section className="fact-list" aria-label={text.about.eyebrow}>
        {text.about.facts.map((fact, index) => (
          <p key={fact}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {fact}
          </p>
        ))}
      </section>
    </main>
  );
}

function Notes({ language }: { language: Language }) {
  const text = useText(language);

  return (
    <main className="page editorial-page">
      <PageIntro eyebrow={text.notes.eyebrow} title={text.notes.title} />
      <section className="notes-list" aria-label={text.notes.eyebrow}>
        {text.notes.items.map((note, index) => (
          <article className="note-row" key={note.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <NotebookPen aria-hidden="true" size={20} />
            <div>
              <h2>{note.title}</h2>
              <p>{note.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function Contact({ language }: { language: Language }) {
  const text = useText(language);

  return (
    <main className="page contact-page">
      <PageIntro eyebrow={text.contact.eyebrow} title={text.contact.title} intro={text.contact.body} />
      <section className="contact-lines" aria-label={text.contact.eyebrow}>
        <a href="https://github.com/xubohan" target="_blank" rel="noreferrer">
          {text.contact.github}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <span>
          <Mail aria-hidden="true" size={18} />
          {text.contact.email}
        </span>
      </section>
    </main>
  );
}

function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {intro ? <p className="lede">{intro}</p> : null}
    </section>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <Layout language={language} setLanguage={setLanguage} />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
