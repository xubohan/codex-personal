import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import {
  ArrowUpRight,
  Github,
  Languages,
  Linkedin,
  Mail,
  NotebookPen,
} from "lucide-react";
import "./styles.css";

type Language = "en" | "zh";

const copy = {
  en: {
    name: "Bohan Xu",
    role: "AI engineer",
    nav: ["Work", "About", "Notes", "Contact"],
    home: {
      eyebrow: "AI agents / on-device AI / software engineering",
      title: "AI engineer building agent workflows and on-device AI applications.",
      intro:
        "I build AI agent workflows, local AI prototypes, and AI-assisted software engineering systems, with interests in human-centered AI, multi-agent systems, and private on-device intelligence.",
      primary: "View selected work",
      secondary: "Read research notes",
      meta: [
        ["Education", "University of Edinburgh, First Class Informatics"],
        ["Current", "Java Developer - AI Application, Hithink RoyalFlush"],
        ["Research", "On-device multimodal agents, human-centered AI systems"],
      ],
      strips: [
        "Agent workflows grounded in repository truth, runtime evidence, and reviewable hand-off artifacts.",
        "On-device AI prototypes that keep sensitive health and chat data local.",
        "Machine learning systems work across graph sampling, compression, and retrieval.",
      ],
    },
    work: {
      eyebrow: "Selected work",
      title: "Projects across AI agents, local AI, and ML systems.",
      intro:
        "A public-safe overview of projects from professional work, technical prototypes, and university research. Sensitive implementation details and private repositories are intentionally omitted.",
      items: [
        {
          year: "2025 - Present",
          title: "Multi-Agent AI Compliance Review System",
          type: "Enterprise AI application",
          stack: "Java, LangChain4j, Claude, RBAC",
          description:
            "Built a multi-agent compliance review system for brokerage advisor content, using configurable regulatory rules and role-based access control across broker hierarchies.",
        },
        {
          year: "2026",
          title: "PHP-to-Java Refactor Workflow",
          type: "AI-assisted software engineering",
          stack: "Python, LangGraph, Codex CLI, Pytest",
          description:
            "Built a multi-agent workflow that analyzes PHP functions, maps Java implementation scope, generates source-backed refactoring plans, and produces structured hand-off artifacts.",
        },
        {
          year: "2026 - Present",
          title: "Offline Local AI Health Coach Prototype",
          type: "On-device AI prototype",
          stack: "Flutter, Dart, Swift, CoreML, HealthKit",
          description:
            "Designed a prototype framework for a local Gemma-based iOS health assistant, covering model lifecycle checks, HealthKit authorization, compact prompt construction, and real-device tracing.",
        },
        {
          year: "2023 - 2024",
          title: "Cerebras Sampling Algorithm",
          type: "Research project",
          stack: "Python, Cerebras System Language",
          description:
            "Investigated GNN sampling acceleration on the Cerebras WSE-2 platform, implementing sampling algorithms on the architecture and achieving 9-10x large-batch speedup over PyTorch-based sampling.",
        },
        {
          year: "2024",
          title: "AI-driven Search Engine",
          type: "Information retrieval system",
          stack: "Python, Flask, Google Cloud Platform",
          description:
            "Built a budget-constrained article search engine for 1.2 million documents, combining TF-IDF ranking, input prediction, classification, and history-driven recommendation.",
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "An AI engineer with research training and production software experience.",
      body:
        "My work sits between applied AI systems, software engineering, and research-oriented prototyping. I care about agent workflows that can be inspected, local AI systems that respect privacy boundaries, and engineering artifacts that make complex decisions easier to review.",
      education: {
        title: "Education",
        school: "The University of Edinburgh",
        degree: "Master of Informatics with Honours, Integrated 5-Year Program, First Class",
        period: "September 2019 - July 2024",
        details:
          "Relevant coursework: Machine Learning, Algorithms, Text Technologies (NLP), Bioinformatics, Internet of Things, Blockchain Technologies.",
      },
      interests: [
        "On-device multimodal agents",
        "Human-centered AI systems",
        "Agents and multi-agent systems",
        "AI-assisted software engineering",
      ],
      experience: [
        {
          company: "Hithink RoyalFlush Information Network Co., Ltd.",
          role: "Java Developer - AI Application",
          period: "September 2025 - Present",
          summary:
            "Built AI application workflows for compliance review and PHP-to-Java refactoring, and explored Vibe Coding adoption in enterprise-level development.",
        },
        {
          company: "Huawei Technologies Co., Ltd.",
          role: "Software Engineer",
          period: "March 2025 - August 2025",
          summary:
            "Developed a Django-based data collection microservice and worked on optical communication drivers, calibration algorithms, and validation workflows.",
        },
        {
          company: "Huawei Technologies Co., Ltd.",
          role: "Software Engineer Intern",
          period: "June 2022 - August 2022",
          summary:
            "Built tools for source/translation consistency checks, file-diff highlighting, and motion-capture data support for human-computer interaction models.",
        },
      ],
      skills: [
        ["Languages", "Python, Java, C/C++, Haskell"],
        ["AI / ML", "PyTorch, PyG, OGBN, Claude SDK, LangGraph"],
        ["App / Systems", "Flutter, CoreML, HealthKit, Django, Flask, GCP"],
        ["Tools", "Codex, Claude Code, Cursor, IntelliJ IDEA, VS Code"],
      ],
    },
    notes: {
      eyebrow: "Notes",
      title: "Research and engineering questions I keep returning to.",
      items: [
        {
          title: "Local AI agents should be useful before they are impressive.",
          body:
            "The hard part is not only running a model on device. It is deciding what data should stay local, what the model is allowed to do, and how failure states are made visible.",
        },
        {
          title: "Agent workflows need evidence, not just autonomy.",
          body:
            "A useful engineering agent should leave behind source-backed plans, command evidence, reviewable artifacts, and enough trace data for the next person to trust or reject its output.",
        },
        {
          title: "AI-assisted software engineering is a coordination problem.",
          body:
            "The system has to coordinate code context, legacy behavior, developer intent, review loops, and hand-off documents. The model is only one part of that workflow.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "For research, engineering, and AI application opportunities.",
      body:
        "I am open to conversations around AI agents, on-device AI systems, applied ML engineering, and research-oriented software projects.",
      links: [
        {
          label: "xubohan1107@outlook.com",
          href: "mailto:xubohan1107@outlook.com",
          icon: "mail",
        },
        {
          label: "GitHub / xubohan",
          href: "https://github.com/xubohan",
          icon: "github",
        },
        {
          label: "LinkedIn / bohan-xu",
          href: "https://linkedin.com/in/bohan-xu",
          icon: "linkedin",
        },
      ],
    },
  },
  zh: {
    name: "Bohan Xu",
    role: "AI 工程师",
    nav: ["工作", "关于", "札记", "联系"],
    home: {
      eyebrow: "AI Agent / 端侧 AI / 软件工程",
      title: "构建 Agent 工作流和端侧 AI 应用的 AI 工程师。",
      intro:
        "我关注 AI Agent 工作流、本地 AI 原型和 AI 辅助软件工程系统，研究兴趣包括人本 AI、多智能体系统和保护隐私边界的端侧智能。",
      primary: "查看代表项目",
      secondary: "阅读研究札记",
      meta: [
        ["教育", "爱丁堡大学 Informatics 一等荣誉硕士"],
        ["当前", "同花顺 Java Developer - AI Application"],
        ["研究", "端侧多模态 Agent、人本 AI 系统"],
      ],
      strips: [
        "让 Agent 工作流贴近仓库事实、运行证据和可审查交付物。",
        "探索把敏感健康和聊天数据留在本地的端侧 AI 原型。",
        "在图采样、图压缩和检索系统中积累机器学习系统经验。",
      ],
    },
    work: {
      eyebrow: "代表项目",
      title: "围绕 AI Agent、本地 AI 和机器学习系统的项目。",
      intro:
        "这里保留适合公开的项目概览，覆盖职业经历、技术原型和大学研究项目。敏感实现细节和私有仓库不会公开展示。",
      items: [
        {
          year: "2025 - 至今",
          title: "多 Agent AI 合规审核系统",
          type: "企业级 AI 应用",
          stack: "Java, LangChain4j, Claude, RBAC",
          description:
            "构建面向投顾内容的多 Agent 合规审核系统，基于可配置监管规则和券商层级角色权限，实现内容审核流程自动化。",
        },
        {
          year: "2026",
          title: "PHP-to-Java 重构工作流",
          type: "AI 辅助软件工程",
          stack: "Python, LangGraph, Codex CLI, Pytest",
          description:
            "构建多 Agent 工作流，用于分析 PHP 函数、映射 Java 实现范围、生成有源码依据的重构计划，并产出结构化交接材料。",
        },
        {
          year: "2026 - 至今",
          title: "离线本地 AI 健康助手原型",
          type: "端侧 AI 原型框架",
          stack: "Flutter, Dart, Swift, CoreML, HealthKit",
          description:
            "设计基于本地 Gemma 的 iOS 健康助手原型框架，覆盖模型生命周期检查、HealthKit 授权、紧凑提示词构造和真机阶段追踪。",
        },
        {
          year: "2023 - 2024",
          title: "Cerebras 采样算法",
          type: "研究项目",
          stack: "Python, Cerebras System Language",
          description:
            "研究在 Cerebras WSE-2 平台上加速 GNN 采样，将采样算法迁移到该架构，并在大批量采样场景中达到相对 PyTorch 的 9-10 倍加速。",
        },
        {
          year: "2024",
          title: "AI 驱动搜索引擎",
          type: "信息检索系统",
          stack: "Python, Flask, Google Cloud Platform",
          description:
            "在有限预算下构建面向 120 万文档的文章搜索引擎，结合 TF-IDF 排序、输入预测、文本分类和基于历史的推荐。",
        },
      ],
    },
    about: {
      eyebrow: "关于",
      title: "具备研究训练和生产软件经验的 AI 工程师。",
      body:
        "我的工作位于应用 AI 系统、软件工程和研究型原型之间。我关注可检查的 Agent 工作流、尊重隐私边界的本地 AI 系统，以及能让复杂决策更容易被审查的工程产物。",
      education: {
        title: "教育背景",
        school: "The University of Edinburgh",
        degree: "Master of Informatics with Honours, Integrated 5-Year Program, First Class",
        period: "September 2019 - July 2024",
        details:
          "相关课程：Machine Learning, Algorithms, Text Technologies (NLP), Bioinformatics, Internet of Things, Blockchain Technologies.",
      },
      interests: [
        "端侧多模态 Agent",
        "人本 AI 系统",
        "Agent 和多智能体系统",
        "AI 辅助软件工程",
      ],
      experience: [
        {
          company: "Hithink RoyalFlush Information Network Co., Ltd.",
          role: "Java Developer - AI Application",
          period: "September 2025 - Present",
          summary:
            "构建面向合规审核和 PHP-to-Java 重构的 AI 应用工作流，并探索 Vibe Coding 在企业级开发中的集成和落地。",
        },
        {
          company: "Huawei Technologies Co., Ltd.",
          role: "Software Engineer",
          period: "March 2025 - August 2025",
          summary:
            "开发 Django 数据采集微服务，并参与光通信设备底层驱动、星间校准算法和验证流程相关工作。",
        },
        {
          company: "Huawei Technologies Co., Ltd.",
          role: "Software Engineer Intern",
          period: "June 2022 - August 2022",
          summary:
            "开发源码与翻译代码一致性检查工具、文件差异高亮工具，并协助采集人机交互模型所需的动作捕捉数据。",
        },
      ],
      skills: [
        ["语言", "Python, Java, C/C++, Haskell"],
        ["AI / ML", "PyTorch, PyG, OGBN, Claude SDK, LangGraph"],
        ["应用 / 系统", "Flutter, CoreML, HealthKit, Django, Flask, GCP"],
        ["工具", "Codex, Claude Code, Cursor, IntelliJ IDEA, VS Code"],
      ],
    },
    notes: {
      eyebrow: "札记",
      title: "我持续关注的研究和工程问题。",
      items: [
        {
          title: "本地 AI Agent 应该先有用，再追求惊艳。",
          body:
            "难点不只是把模型跑在端侧，而是决定哪些数据必须留在本地、模型被允许做什么，以及失败状态如何被清楚地展示出来。",
        },
        {
          title: "Agent 工作流需要证据，而不只是自主性。",
          body:
            "有用的工程 Agent 应该留下有源码依据的计划、命令证据、可审查产物，以及足够让下一个人信任或否定输出的追踪信息。",
        },
        {
          title: "AI 辅助软件工程本质上是协同问题。",
          body:
            "系统需要协调代码上下文、遗留行为、开发者意图、审查循环和交接文档。模型只是这个工作流中的一部分。",
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "欢迎围绕研究、工程和 AI 应用机会联系。",
      body:
        "我愿意交流 AI Agent、端侧 AI 系统、应用型机器学习工程和研究型软件项目。",
      links: [
        {
          label: "xubohan1107@outlook.com",
          href: "mailto:xubohan1107@outlook.com",
          icon: "mail",
        },
        {
          label: "GitHub / xubohan",
          href: "https://github.com/xubohan",
          icon: "github",
        },
        {
          label: "LinkedIn / bohan-xu",
          href: "https://linkedin.com/in/bohan-xu",
          icon: "linkedin",
        },
      ],
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
  about: PageCopy & {
    body: string;
    education: EducationItem;
    interests: string[];
    experience: ExperienceItem[];
    skills: [string, string][];
  };
  notes: Pick<PageCopy, "eyebrow" | "title"> & { items: NoteItem[] };
  contact: PageCopy & { body: string; links: ContactLink[] };
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
  stack: string;
  description: string;
};

type EducationItem = {
  title: string;
  school: string;
  degree: string;
  period: string;
  details: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

type NoteItem = {
  title: string;
  body: string;
};

type ContactLink = {
  label: string;
  href: string;
  icon: "mail" | "github" | "linkedin";
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
              <span>{item.stack}</span>
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
      <section className="profile-section" aria-labelledby="education-title">
        <div className="section-label">{text.about.education.title}</div>
        <article className="education-card">
          <p>{text.about.education.period}</p>
          <h2 id="education-title">{text.about.education.school}</h2>
          <h3>{text.about.education.degree}</h3>
          <p>{text.about.education.details}</p>
        </article>
      </section>
      <section className="profile-section" aria-label="Research interests">
        <div className="section-label">Research</div>
        <div className="interest-grid">
          {text.about.interests.map((interest, index) => (
            <p key={interest}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {interest}
            </p>
          ))}
        </div>
      </section>
      <section className="profile-section" aria-label="Professional experience">
        <div className="section-label">Experience</div>
        <div className="experience-list">
          {text.about.experience.map((item) => (
            <article key={`${item.company}-${item.period}`}>
              <p>{item.period}</p>
              <h2>{item.company}</h2>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="profile-section" aria-label="Technical skills">
        <div className="section-label">Skills</div>
        <div className="skill-grid">
          {text.about.skills.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              {value}
            </p>
          ))}
        </div>
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
        {text.contact.links.map((link) => (
          <a href={link.href} key={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <ContactIcon icon={link.icon} />
            {link.label}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        ))}
      </section>
    </main>
  );
}

function ContactIcon({ icon }: { icon: ContactLink["icon"] }) {
  if (icon === "github") {
    return <Github aria-hidden="true" size={18} />;
  }

  if (icon === "linkedin") {
    return <Linkedin aria-hidden="true" size={18} />;
  }

  return <Mail aria-hidden="true" size={18} />;
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
