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
      eyebrow: "Independent AI product / engineering practice",
      title: "Systems for turning unclear work into clear evidence.",
      intro:
        "Bohan builds practical AI product workflows, agent-assisted engineering processes, and quiet interfaces for decisions that need proof.",
      primary: "View the work index",
      secondary: "Read current notes",
      meta: [
        ["Mode", "AI product discovery"],
        ["Method", "Evidence-led engineering"],
        ["Output", "Systems, notes, prototypes"],
      ],
      strips: [
        "Product judgment shaped into small repeatable tools.",
        "Engineering work kept close to source truth and runtime evidence.",
        "A personal archive edited for clarity, restraint, and reuse.",
      ],
    },
    work: {
      eyebrow: "Work",
      title: "A public index of AI product and engineering practice.",
      intro:
        "The site currently uses public-safe descriptions only. Replace these entries with specific project names when they are ready to publish.",
      items: [
        {
          year: "2026",
          title: "AI Product Discovery System",
          type: "Product workflow",
          description:
            "A workflow for narrowing broad market questions into scoped product bets, validation artifacts, and implementation-ready briefs.",
        },
        {
          year: "2026",
          title: "Agentic Engineering Practice",
          type: "Engineering method",
          description:
            "Working patterns for AI-assisted development that stay grounded in repository truth, command evidence, and reviewable diffs.",
        },
        {
          year: "Ongoing",
          title: "Personal Operating Studio",
          type: "Private tooling",
          description:
            "A small personal system for turning research, prompts, source code, and decisions into durable operating memory.",
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Engineering taste is a way of reducing ambiguity.",
      body:
        "The practice sits between AI product thinking, software delivery, and editorial judgment. The work is strongest when the interface is quiet, the evidence is visible, and the next action is obvious.",
      facts: [
        "Turns strategy into runnable artifacts",
        "Prefers simple systems with visible evidence",
        "Uses writing to clarify product judgment",
        "Treats restraint as a design and engineering constraint",
      ],
    },
    notes: {
      eyebrow: "Notes",
      title: "Questions that shape the work.",
      items: [
        {
          title: "What should an AI-native product remember?",
          body:
            "Enough context to improve the next decision; not so much that the system becomes a pile of undifferentiated traces.",
        },
        {
          title: "When does design make engineering better?",
          body:
            "When it helps people find truth faster: hierarchy, spacing, naming, and rhythm all change how evidence is read.",
        },
        {
          title: "What should a personal site prove?",
          body:
            "Not that a template can be filled, but that the person behind it has judgment, range, and a coherent way of working.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to precise collaboration and serious product conversations.",
      body:
        "Only public-safe contact information is listed for now. A public email can be added when you decide what should be published.",
      github: "GitHub / xubohan",
      email: "Public email to be added",
    },
  },
  zh: {
    name: "Bohan",
    role: "AI 产品 / 工程",
    nav: ["工作", "关于", "札记", "联系"],
    home: {
      eyebrow: "独立 AI 产品 / 工程实践",
      title: "把含混工作变成清晰证据的系统。",
      intro:
        "Bohan 关注 AI 产品工作流、Agent 辅助工程实践，以及能帮助判断沉淀下来的克制界面。",
      primary: "查看工作索引",
      secondary: "阅读当前札记",
      meta: [
        ["状态", "AI 产品发现"],
        ["方法", "证据驱动工程"],
        ["产出", "系统、札记、原型"],
      ],
      strips: [
        "把产品判断整理成小而可复用的工具。",
        "让工程过程贴近源码事实和运行证据。",
        "用克制、清晰、可复用的方式编辑个人档案。",
      ],
    },
    work: {
      eyebrow: "工作",
      title: "AI 产品与工程实践的公开索引。",
      intro:
        "当前版本只保留适合公开的描述。等具体项目可发布后，可以直接替换这里的数据。",
      items: [
        {
          year: "2026",
          title: "AI 产品发现系统",
          type: "产品工作流",
          description:
            "把宽泛市场问题收束成产品假设、验证材料和可进入实施的 brief。",
        },
        {
          year: "2026",
          title: "Agent 工程实践",
          type: "工程方法",
          description:
            "让 AI 辅助开发始终贴近仓库事实、命令证据和可审查 diff 的工作方式。",
        },
        {
          year: "持续中",
          title: "个人工作室系统",
          type: "私人工具",
          description:
            "把研究、提示词、源码和决策沉淀为可长期复用的个人工作记忆。",
        },
      ],
    },
    about: {
      eyebrow: "关于",
      title: "工程审美，是一种降低含混度的方法。",
      body:
        "这套实践位于 AI 产品思考、软件交付和编辑判断之间。界面足够安静、证据足够可见、下一步足够明确时，工作质量最好。",
      facts: [
        "把策略问题推进成可运行产物",
        "偏好证据可见的简单系统",
        "用写作澄清产品判断",
        "把克制视为设计和工程约束",
      ],
    },
    notes: {
      eyebrow: "札记",
      title: "持续影响工作的几个问题。",
      items: [
        {
          title: "AI 原生产品应该记住什么？",
          body:
            "记住足以改善下一次判断的上下文，而不是把系统变成没有层级的痕迹堆。",
        },
        {
          title: "设计什么时候让工程更好？",
          body:
            "当它帮助人更快找到事实时：层级、间距、命名和节奏都会改变证据被阅读的方式。",
        },
        {
          title: "个人网站应该证明什么？",
          body:
            "不是证明模板能被填满，而是证明背后的人有判断、有跨度，并且有一致的工作方式。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "适合具体协作和严肃产品讨论。",
      body:
        "当前只保留适合公开的信息。等你决定公开邮箱后，可以再添加到这里。",
      github: "GitHub / xubohan",
      email: "公开邮箱后续添加",
    },
  },
} satisfies Record<Language, SiteCopy>;

type SiteCopy = {
  name: string;
  role: string;
  nav: string[];
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    primary: string;
    secondary: string;
    meta: [string, string][];
    strips: string[];
  };
  work: PageCopy & { items: WorkItem[] };
  about: PageCopy & { facts: string[]; body: string };
  notes: Pick<PageCopy, "eyebrow" | "title"> & { items: NoteItem[] };
  contact: PageCopy & { github: string; email: string; body: string };
};

type PageCopy = {
  eyebrow: string;
  title: string;
  intro?: string;
};

type WorkItem = {
  year: string;
  title: string;
  type: string;
  description: string;
};

type NoteItem = {
  title: string;
  body: string;
};

const routes = ["/work", "/about", "/notes", "/contact"];

function useText(language: Language) {
  return copy[language];
}

function Layout({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
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
    <div className="site-shell" data-language={language}>
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
          <Languages aria-hidden="true" size={15} />
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
      <section className="home-hero" aria-labelledby="home-title">
        <div className="issue-mark" aria-hidden="true">
          <span>01</span>
          <span>Personal Index</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{text.home.eyebrow}</p>
          <h1 id="home-title">{text.home.title}</h1>
          <p className="lede">{text.home.intro}</p>
          <div className="hero-actions">
            <NavLink className="text-link primary-link" to="/work">
              {text.home.primary}
              <ArrowUpRight aria-hidden="true" size={17} />
            </NavLink>
            <NavLink className="text-link" to="/notes">
              {text.home.secondary}
            </NavLink>
          </div>
        </div>
        <aside className="studio-index" aria-label="Studio index">
          {text.home.meta.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              {value}
            </p>
          ))}
        </aside>
      </section>
      <section className="strip-list" aria-label="Current focus">
        {text.home.strips.map((strip, index) => (
          <p key={strip}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {strip}
          </p>
        ))}
      </section>
    </main>
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
            <div className="work-meta">
              <span>{item.year}</span>
              <span>{item.type}</span>
            </div>
            <h2>{item.title}</h2>
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
    <main className="page editorial-page about-page">
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
            <NotebookPen aria-hidden="true" size={18} />
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
    <main className="page editorial-page contact-page">
      <PageIntro eyebrow={text.contact.eyebrow} title={text.contact.title} intro={text.contact.body} />
      <section className="contact-lines" aria-label={text.contact.eyebrow}>
        <a href="https://github.com/xubohan" target="_blank" rel="noreferrer">
          {text.contact.github}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <span className="pending-contact">
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
