"use client";

import { useState } from "react";

const experiences = [
  {
    company: "Maxsystem",
    period: "Mai 2025 — Atual",
    role: "Product Owner / Projetos e Operações",
    summary: "Gestão e evolução de produtos digitais B2B, sistemas corporativos e soluções de integração, conectando estratégia, operação e tecnologia.",
    highlights: [
      "Gestão de roadmaps e múltiplos backlogs priorizados por valor, risco e impacto operacional.",
      "Estruturação do processo ágil, com sprints, capacidade e indicadores de previsibilidade.",
      "Implantações em cerca de 10 clientes, com produtos alcançando mais de 700 usuários.",
      "Criação de dashboards e automações que reduziram de 5 a 8 horas semanais de trabalho operacional.",
    ],
  },
  {
    company: "GO-IT",
    period: "Ago 2022 — Abr 2025",
    role: "Product Owner / Gestão de Projetos",
    summary: "Gestão de produtos web e mobile, do discovery à implantação, em colaboração direta com clientes, stakeholders e equipes técnicas.",
    highlights: [
      "Levantamento de requisitos, definição de MVPs e construção de regras de negócio.",
      "Criação de user stories, refinamento funcional e priorização de backlog.",
      "Atuação em produtos internacionais, telemedicina, segurança pública e realidade aumentada.",
    ],
  },
  {
    company: "DEVWAY Academy",
    period: "Ago 2022 — Dez 2023",
    role: "Professor e Produtor de Conteúdo",
    summary: "Ensino de programação e produção de materiais didáticos para alunos de diferentes níveis.",
    highlights: ["Criação de conteúdos sobre Python, JavaScript, C++ e fundamentos de tecnologia."],
  },
  {
    company: "KMM",
    period: "Abr 2020 — Ago 2020",
    role: "Desenvolvedor Full Stack",
    summary: "Desenvolvimento e manutenção de aplicações web e sistemas corporativos.",
    highlights: ["Atuação com JavaScript, Angular, Node.js, HTML, CSS, SQL e APIs."],
  },
  {
    company: "Lapps",
    period: "Ago 2018 — Dez 2019",
    role: "Desenvolvedor Full Stack",
    summary: "Construção de aplicações web, integrações e experiências digitais.",
    highlights: ["Desenvolvimento de interfaces, serviços e integrações para produtos digitais."],
  },
];

export default function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const item = experiences[active];

  return (
    <div className="experience-tabs">
      <div className="experience-nav" role="tablist" aria-label="Empresas">
        {experiences.map((experience, index) => (
          <button
            key={experience.company}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            role="tab"
            aria-selected={active === index}
            aria-controls="experience-detail"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{experience.company}
          </button>
        ))}
      </div>
      <article className="experience-detail" id="experience-detail" role="tabpanel">
        <p className="experience-company">{item.company}</p>
        <h3>{item.role}</h3>
        <p className="experience-period">{item.period}</p>
        <p className="experience-summary">{item.summary}</p>
        <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </article>
    </div>
  );
}
