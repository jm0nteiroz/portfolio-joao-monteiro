"use client";

import { useState } from "react";

type Section = "Sobre" | "Currículo" | "Projetos" | "Certificações" | "Contato";

const experiences = [
  { company:"Maxsystem", period:"Mai 2025 - Atual", role:"Product Owner / Projetos e Operações", intro:"Gestão e evolução de produtos digitais, sistemas corporativos B2B e soluções de integração, da estratégia à implantação.", bullets:["Gestão de múltiplos backlogs com média de 40 a 60 tarefas, priorizados por valor, risco, impacto e feedback.","Definição de roadmap, user stories, regras de negócio, critérios de aceite, fluxos funcionais e documentação.","Condução de Planning, Daily, Review e Retrospectiva em sprints de duas semanas, com gestão de capacidade.","Implantação em aproximadamente 10 clientes e produtos impactando mais de 700 usuários.","Dashboards e automações que reduziram entre 5 e 8 horas semanais de atividades operacionais.","Acompanhamento de SLA, tempo de entrega, bugs, chamados e produtividade; análise de integrações e APIs."] },
  { company:"GO-IT", period:"Ago 2022 - Abr 2025", role:"Product Owner / Gestão de Projetos", intro:"Gestão de produtos web e mobile, levantamento de requisitos, definição de MVP, acompanhamento do desenvolvimento e implantação.", bullets:["Discovery com clientes e usuários, priorização de backlog e refinamento funcional.","Comunicação com stakeholders, acompanhamento de releases e melhoria contínua.","Produtos internacionais, telemedicina, segurança pública e experiências com realidade aumentada.","Atuação em BizDocs, Kidlink, EYE-d e BytenFood, conforme registrado no currículo."] },
  { company:"DEVWAY Academy", period:"Ago 2022 - Dez 2023", role:"Professor e Produtor de Conteúdo", intro:"Ensino de tecnologia em cursos on-line e criação de materiais didáticos para diferentes níveis de conhecimento.", bullets:["Aulas de Python, JavaScript, C++ e fundamentos de TI e comunicações.","Produção de tutoriais e recursos interativos para facilitar a aprendizagem."] },
  { company:"KMM", period:"Abr 2020 - Ago 2020", role:"Desenvolvedor Full Stack", intro:"Desenvolvimento e evolução de sistemas web corporativos.", bullets:["JavaScript, Angular e banco de dados SQL.","Funcionalidades front-end e back-end, integrações, APIs e análise de requisitos."] },
  { company:"Lapps", period:"Ago 2018 - Dez 2019", role:"Desenvolvedor Full Stack", intro:"Desenvolvimento e manutenção de aplicações web.", bullets:["JavaScript, HTML, CSS, Angular e Node.js."] },
];

const projects = [
  {slug:"nexora",number:"01",name:"Nexora",image:"/system-nexora.png",category:"Inteligência de tickets",text:"Análise de tickets, causas raiz e soluções por dashboards, galáxia hierárquica, grafo investigativo e assistente inteligente."},
  {slug:"pulse-hours",number:"02",name:"Pulse Hours",image:"/system-pulse-hours.png",category:"Horas e chamados",text:"Acompanhamento de chamados, esforço de suporte e desenvolvimento, metas mensais e produtividade operacional."},
  {slug:"project-flow",number:"03",name:"Project Flow",image:"/system-project-flow.png",category:"Gestão de implantações",text:"Visão executiva por cliente com fases, prazos, saúde, próximas ações, tarefas e referências mensais."},
  {slug:"bridgeops",number:"04",name:"BridgeOps",image:"/system-bridgeops.png",category:"Observabilidade de integrações",text:"Monitoramento operacional de APIs, rotinas, volumes processados, logs, pendências, erros e reprocessamentos."},
];

const methods = [
  ["Scrum","Planejamento, cerimônias, incremento e melhoria contínua."],
  ["Kanban","Gestão visual de fluxo, limites e previsibilidade."],
  ["Discovery","Entendimento do problema, usuários e contexto de negócio."],
  ["MVP","Recorte de valor para validar hipóteses com menor risco."],
  ["Roadmap","Direção, objetivos e evolução do produto."],
  ["User Stories","Necessidades transformadas em entregas claras e verificáveis."],
  ["Priorização","Valor, impacto, urgência, risco e esforço técnico."],
  ["Métricas","SLA, qualidade, produtividade, adoção e resultado."],
];

const discoveryMethods = [
  { name: "Design Sprint by Google", source: "Google", logo: "/method-google.svg", text: "Alinhamento do desafio, ideação, prototipação e validação rápida de hipóteses com usuários." },
  { name: "User Story Mapping", source: "Jeff Patton", logo: "/method-story-map.svg", text: "Mapeamento da jornada do usuário para organizar histórias, visualizar o produto e priorizar entregas por valor." },
  { name: "Tanque de Decantação", source: "Product Discovery", logo: "/method-decantation.svg", text: "Refinamento de problemas e oportunidades para separar necessidades relevantes de soluções prematuras antes do backlog." },
  { name: "Agile Design Thinking", source: "Discovery contínuo", logo: "/method-design-thinking.svg", text: "Integração de empatia, definição, ideação, experimentação e ciclos ágeis de aprendizado e entrega." },
];

const experienceTechnologies: Record<string, { name: string; logo: string }[]> = {
  "DEVWAY Academy": [
    { name: "Python", logo: "/tech-python.svg" },
    { name: "JavaScript", logo: "/logo-javascript.svg" },
    { name: "C++", logo: "/tech-cplusplus.svg" },
  ],
  KMM: [
    { name: "JavaScript", logo: "/logo-javascript.svg" },
    { name: "Angular", logo: "/tech-angular.svg" },
    { name: "SQL", logo: "/logo-sql.svg" },
    { name: "APIs REST", logo: "/logo-api.svg" },
  ],
  Lapps: [
    { name: "JavaScript", logo: "/logo-javascript.svg" },
    { name: "HTML e CSS", logo: "/logo-html.svg" },
    { name: "Angular", logo: "/tech-angular.svg" },
    { name: "Node.js", logo: "/tech-nodejs.svg" },
  ],
};

const productTools = [
  { name: "Monday.com", logo: "/logo-monday.svg" },
  { name: "ClickUp", logo: "/logo-clickup.svg" },
  { name: "Jira", logo: "/logo-jira.svg" },
  { name: "Trello", logo: "/logo-trello.svg" },
  { name: "Notion", logo: "/logo-notion.svg" },
];

const agileCeremonies = ["Planning", "Daily", "Refinamento", "Review", "Retrospectiva"];

const skills = [
  { logo: "/badge-cspo.png", name: "Product Ownership", text: "Visão, estratégia, roadmap e priorização" },
  { logo: "/logo-jira.svg", name: "Scrum e Kanban", text: "Fluxo, cerimônias e melhoria contínua" },
  { logo: "/logo-api.svg", name: "APIs REST", text: "Contratos, payloads, logs e homologação" },
  { logo: "/logo-sql.svg", name: "SQL", text: "Consultas, análise e validação de dados" },
  { logo: "/logo-github.svg", name: "GitHub", text: "Versionamento e colaboração técnica" },
  { logo: "/logo-javascript.svg", name: "JavaScript", text: "Desenvolvimento de soluções web" },
  { logo: "/logo-html.svg", name: "HTML e CSS", text: "Interfaces responsivas e acessíveis" },
  { logo: "/project-pulse.png", name: "Dashboards", text: "Indicadores, SLA e produtividade" },
  { logo: "/logo-claude.svg", name: "Claude", text: "Análise, descoberta e apoio à criação de soluções" },
  { logo: "/logo-lovable.png", name: "Lovable", text: "Criação e evolução rápida de produtos digitais" },
  { logo: "/logo-codex.svg", name: "Codex", text: "Desenvolvimento assistido e automação técnica" },
  { logo: "/logo-mongodb.svg", name: "MongoDB", text: "Modelagem, consulta e organização de dados NoSQL" },
  { logo: "/logo-supabase.svg", name: "Supabase", text: "Banco de dados, autenticação e APIs para aplicações" },
];

function SectionTitle({children}:{children:React.ReactNode}) { return <><h1 className="content-title">{children}</h1><span className="title-line" /></>; }

function DiscoveryMethods(){return <div className="discovery-grid focus-group">{discoveryMethods.map(method=><article key={method.name}><span className="discovery-logo"><img src={method.logo} alt={`Ícone ${method.name}`} /></span><div><small>{method.source}</small><h3>{method.name}</h3><p>{method.text}</p></div></article>)}</div>}

function ExperienceResources({company}:{company:string}){const technologies=experienceTechnologies[company];return <>{technologies?<><h2 className="sub-title education-title">Tecnologias utilizadas nesta experiência</h2><div className="experience-tech-grid focus-group">{technologies.map(technology=><article key={technology.name}><img src={technology.logo} alt={`Logo ${technology.name}`} /><strong>{technology.name}</strong></article>)}</div></>:<><h2 className="sub-title education-title">Metodologias aplicadas nesta experiência</h2><DiscoveryMethods/></>}</>}

function About(){return <div className="content-page"><SectionTitle>Sobre mim</SectionTitle><div className="lead-copy"><p>Product Owner com experiência em produtos digitais B2B, integrações entre sistemas e soluções para acompanhamento operacional.</p><p>Atuo da descoberta à entrega: defino roadmaps, priorizo backlogs, escrevo histórias e critérios de aceite, facilito cerimônias e acompanho métricas, implantação e sustentação. Meu background full stack aproxima a visão de negócio das decisões técnicas.</p></div><div className="api-highlight"><span>IA</span><div><h3>Inteligência artificial aplicada a produtos</h3><p>Também utilizo inteligência artificial no dia a dia como apoio à descoberta, análise, tomada de decisão e desenvolvimento de soluções. Aplico ferramentas de IA para acelerar atividades, explorar oportunidades e criar produtos digitais com mais eficiência, mantendo o contexto de negócio e as necessidades dos usuários no centro das decisões.</p></div></div><h2 className="sub-title">Como eu trabalho</h2><div className="service-grid focus-group"><article><span>◈</span><div><h3>Estratégia de produto</h3><p>Transformo objetivos, evidências e restrições em direção clara para o time.</p></div></article><article><span>⌁</span><div><h3>Operações e integrações</h3><p>Estruturo processos e painéis que dão visibilidade a fluxos complexos.</p></div></article><article><span>◎</span><div><h3>Dados para decisão</h3><p>Uso indicadores de produto, suporte e entrega para priorizar com contexto.</p></div></article><article><span>↗</span><div><h3>Colaboração técnica</h3><p>Conecto usuários, negócio e engenharia com comunicação objetiva.</p></div></article></div><h2 className="sub-title">APIs e integrações</h2><div className="api-highlight"><span>API</span><div><h3>Produtos conectados de ponta a ponta</h3><p>Atuação com APIs REST, documentação e contratos, autenticação, endpoints, payloads, tratamento de erros, logs, homologação e monitoramento de integrações entre sistemas.</p></div></div><h2 className="sub-title">Metodologias e práticas</h2><div className="method-grid focus-group">{methods.map(([name,text])=><article key={name}><b>{name}</b><p>{text}</p></article>)}</div><h2 className="sub-title">Cerimônias ágeis</h2><div className="ceremony-row focus-group">{agileCeremonies.map((ceremony,index)=><span key={ceremony}><i>{String(index+1).padStart(2,"0")}</i>{ceremony}</span>)}</div></div>}

function Resume(){const [selected,setSelected]=useState(0);const [resumeView,setResumeView]=useState<"Experiência"|"Skills">("Experiência");const item=experiences[selected];return <div className="content-page"><div className="resume-heading"><div><SectionTitle>Currículo</SectionTitle></div><a href="/Joao-Pedro-Quintas-CV.pdf" download className="download-button">Baixar currículo <span>↓</span></a></div><div className="resume-switch" role="tablist" aria-label="Conteúdo do currículo"><button role="tab" aria-selected={resumeView==="Experiência"} className={resumeView==="Experiência"?"active":""} onClick={()=>setResumeView("Experiência")}>Experiência</button><button role="tab" aria-selected={resumeView==="Skills"} className={resumeView==="Skills"?"active":""} onClick={()=>setResumeView("Skills")}>Skills</button></div>{resumeView==="Experiência"?<><div className="resume-summary"><b>Product Owner</b><span>Produtos digitais B2B • SaaS • APIs • Dashboards • Agile</span><p>Experiência em roadmap, backlog, requisitos, cerimônias, integrações, logs, SLA, chamados, bugs, métricas e produtividade.</p></div><h2 className="sub-title">Experiência</h2><div className="resume-tabs"><nav aria-label="Experiências profissionais">{experiences.map((exp,index)=><button key={exp.company} className={selected===index?"active":""} onClick={()=>setSelected(index)}><span>{String(index+1).padStart(2,"0")}</span>{exp.company}</button>)}</nav><article><span className="job-company">{item.company}</span><h2>{item.role}</h2><time>{item.period}</time><p>{item.intro}</p><ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul></article></div><ExperienceResources company={item.company}/></>:<Skills/>}</div>}

function Skills(){return <div className="skills-view"><div className="skills-heading"><span>Habilidades</span><h2>Técnicas e de produto</h2><p>Conhecimentos que conectam estratégia, operação, dados e desenvolvimento.</p></div><div className="skills-grid focus-group">{skills.map(skill=><article key={skill.name}><span><img src={skill.logo} alt={`Logo ${skill.name}`} /></span><div><h3>{skill.name}</h3><p>{skill.text}</p></div></article>)}</div><h2 className="sub-title">Ferramentas de gestão</h2><div className="management-skills focus-group">{productTools.map(tool=><article key={tool.name}><img src={tool.logo} alt={`Logo ${tool.name}`} /><div><h3>{tool.name}</h3><p>Organização, acompanhamento e colaboração</p></div></article>)}</div></div>}

function Projects(){return <div className="content-page"><SectionTitle>Projetos</SectionTitle><div className="section-note project-note"><p>Soluções que desenvolvi para apoiar a tomada de decisão, identificar gargalos na operação, orientar a evolução de produtos e tornar mais previsível a implantação para novos clientes.</p><p>As demonstrações mantêm os principais fluxos e funcionalidades, com dados, nomes e métricas fictícios para garantir a confidencialidade das informações.</p></div><div className="portfolio-grid focus-group">{projects.map(project=><article key={project.slug}><div className="project-cover"><span className="project-number">{project.number}</span><img src={project.image} alt={`Tela do sistema ${project.name}`} /><a className="project-hover" href={`/exact-demos/${project.slug}/`} target="_blank" rel="noreferrer" aria-label={`Visualizar demonstração ${project.name}`}><b>◉</b><small>Visualizar demo</small></a></div><div className="project-info"><span>{project.category}</span><h2>{project.name}</h2><p>{project.text}</p></div></article>)}</div></div>}

function Certifications(){return <div className="content-page"><SectionTitle>Certificações</SectionTitle><p className="section-note">Formação complementar em produto, agilidade e gestão.</p><div className="certificate-grid focus-group"><a href="https://www.scrumalliance.org" target="_blank" rel="noreferrer"><div className="cert-logo badge"><img src="/badge-cspo.png" alt="Scrum Alliance CSPO" /></div><span>Scrum Alliance</span><h2>Certified Scrum Product Owner®</h2><p>Certificação internacional em visão de produto, geração de valor e colaboração.</p></a><a href="https://k21.global" target="_blank" rel="noreferrer"><div className="cert-logo"><img src="/logo-k21.png" alt="K21" /></div><span>K21</span><h2>Curso Certified Scrum Product Owner</h2><p>Formação prática em Product Ownership e métodos ágeis.</p></a><a href="https://portal.fgv.br" target="_blank" rel="noreferrer"><div className="cert-logo"><img src="/logo-fgv.png" alt="Fundação Getulio Vargas" /></div><span>FGV</span><h2>Certificado Scrum</h2><p>Fundamentos, papéis, eventos e artefatos do Scrum.</p></a></div><h2 className="sub-title education-title">Formação</h2><div className="education-row focus-group"><article><span>Conclusão 2027</span><h3>Processos Gerenciais</h3><p>UFBRA</p></article><article><span>Formação contínua</span><h3>Produto, agilidade e tecnologia</h3><p>Certificações e experiência prática</p></article></div></div>}

function Contact(){return <div className="content-page"><SectionTitle>Contato</SectionTitle><div className="contact-lead"><p>Vamos trabalhar juntos?</p><a href="mailto:jpquintassjc@gmail.com">jpquintassjc@gmail.com <span>↗</span></a></div><div className="contact-grid focus-group"><a href="tel:+5512981516983"><span>Telefone</span><b>(12) 98151-6983</b></a><a href="https://www.linkedin.com/in/jmonteiroz" target="_blank" rel="noreferrer"><span>LinkedIn</span><b>/in/jmonteiroz ↗</b></a><a href="/Joao-Pedro-Quintas-CV.pdf" download><span>Currículo</span><b>Baixar PDF ↓</b></a><div><span>Localização</span><b>São José dos Campos, SP</b></div></div></div>}

export default function PortfolioShell(){const [active,setActive]=useState<Section>("Sobre");const sections:Section[]=["Sobre","Currículo","Projetos","Certificações","Contato"];return <main className="portfolio-shell"><aside className="profile-card"><div className="profile-photo-wrap"><div className="profile-photo"><img src="/perfil-joao.jpeg" alt="João Pedro Monteiro Quintas" /></div><img className="profile-cspo" src="/badge-cspo.png" alt="Certificação CSPO da Scrum Alliance" /></div><div className="profile-typing" aria-label="Oi, eu sou João Pedro Monteiro Quintas"><span>Oi, eu sou</span><strong>João Pedro</strong><strong>Monteiro Quintas</strong></div><div className="profile-tags" aria-label="Especialidades"><span>Product Owner</span><span>Produtos Digitais B2B</span><span>SaaS</span><span>Integrações via API</span><span>Agile</span></div><div className="profile-divider"/><dl><div><dt><img src="/logo-gmail.png" alt="" /></dt><dd><span>E-mail</span><a href="mailto:jpquintassjc@gmail.com">jpquintassjc@gmail.com</a></dd></div><div><dt>⌖</dt><dd><span>Localização</span><b>São José dos Campos, SP</b></dd></div></dl><div className="profile-links focus-group"><a href="https://www.linkedin.com/in/jmonteiroz" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="tel:+5512981516983" aria-label="Telefone">☎</a><a href="mailto:jpquintassjc@gmail.com" aria-label="Gmail"><img src="/logo-gmail.png" alt="" /></a><a href="https://github.com/jm0nteiroz/" target="_blank" rel="noreferrer" aria-label="GitHub"><img src="/logo-github.svg" alt="" /></a></div></aside><section className="portfolio-main"><nav className="top-nav" aria-label="Navegação do portfólio">{sections.map(section=><button key={section} className={active===section?"active":""} onClick={()=>setActive(section)}>{section}</button>)}</nav><div className="page-host">{active==="Sobre"&&<About/>}{active==="Currículo"&&<Resume/>}{active==="Projetos"&&<Projects/>}{active==="Certificações"&&<Certifications/>}{active==="Contato"&&<Contact/>}</div><footer className="site-footer"><p>Criado por João Monteiro usando <strong>Next.js, React, TypeScript e Tailwind CSS.</strong></p><span>© Todos os direitos reservados.</span></footer></section></main>}
