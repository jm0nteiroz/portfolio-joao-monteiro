"use client";

import { useState } from "react";
import Link from "next/link";
import NexoraWorkspace from "./NexoraWorkspace";

export const demoProducts = {
  nexora: { name: "Nexora", kind: "Inteligência de tickets", short: "Causas, relações e soluções" },
  "pulse-hours": { name: "Pulse Hours", kind: "Horas e chamados", short: "Esforço e produtividade" },
  "project-flow": { name: "Project Flow", kind: "Gestão de implantações", short: "Clientes, fases e tarefas" },
  bridgeops: { name: "BridgeOps", kind: "Observabilidade", short: "Rotinas, eventos e logs" },
} as const;

export type DemoSlug = keyof typeof demoProducts;

const tickets = [
  { id: "TK-1048", client: "Aurora Foods", product: "Portal Web", module: "Cadastros", cause: "Regra de validação", status: "Em análise", owner: "Marina" },
  { id: "TK-1042", client: "Vértice Serviços", product: "App Mobile", module: "Autenticação", cause: "Sessão expirada", status: "Solucionado", owner: "Rafael" },
  { id: "TK-1037", client: "Horizonte Logística", product: "Painel BI", module: "Relatórios", cause: "Fila de processamento", status: "Em análise", owner: "Camila" },
  { id: "TK-1029", client: "Lume Varejo", product: "Portal Web", module: "Permissões", cause: "Perfil incompleto", status: "Solucionado", owner: "Diego" },
];

const hourTickets = [
  { month: "Jul/26", id: "CH-382", client: "Aurora Foods", product: "Portal", type: "Suporte", owner: "Ana", hours: "3h 20m", dev: "1h 10m" },
  { month: "Jul/26", id: "CH-377", client: "Lume Varejo", product: "Mobile", type: "Correção", owner: "Bruno", hours: "2h 45m", dev: "2h 05m" },
  { month: "Jun/26", id: "CH-351", client: "Vértice Serviços", product: "Dados", type: "Análise", owner: "Clara", hours: "4h 15m", dev: "0h 50m" },
  { month: "Jun/26", id: "CH-344", client: "Horizonte Logística", product: "Portal", type: "Suporte", owner: "Davi", hours: "1h 30m", dev: "0h 20m" },
];

const clients = [
  { name: "Aurora Foods", health: "Saudável", progress: 72, phase: "Homologação", deadline: "18 Ago 2026", next: "Validar fluxo com usuários-chave" },
  { name: "Vértice Serviços", health: "Atenção", progress: 48, phase: "Configuração", deadline: "02 Set 2026", next: "Revisar regras de acesso" },
  { name: "Horizonte Logística", health: "Saudável", progress: 86, phase: "Treinamento", deadline: "29 Jul 2026", next: "Concluir plano de ativação" },
  { name: "Lume Varejo", health: "Risco", progress: 31, phase: "Mapeamento", deadline: "15 Set 2026", next: "Confirmar responsáveis internos" },
];

const logs = [
  { time: "10:42:18", entity: "Colaboradores", routine: "Sincronização cadastral", status: "Sucesso", records: "248" },
  { time: "10:38:05", entity: "Marcações", routine: "Eventos operacionais", status: "Pendente", records: "36" },
  { time: "10:31:44", entity: "Afastamentos", routine: "Atualização incremental", status: "Erro", records: "12" },
  { time: "10:22:10", entity: "Centros de custo", routine: "Carga de referência", status: "Sucesso", records: "84" },
  { time: "10:14:27", entity: "Escalas", routine: "Sincronização diária", status: "Sucesso", records: "190" },
];

function DemoShell({ slug, children }: { slug: DemoSlug; children: React.ReactNode }) {
  const product = demoProducts[slug];
  return (
    <main className="product-demo">
      <header className="demo-app-header">
        <Link className="demo-logo" href="/">JQ</Link>
        <div><strong>{product.name}</strong><span>{product.kind}</span></div>
        <span className="fiction-badge">Demonstração • dados fictícios</span>
        <Link className="back-portfolio" href="/">← Voltar ao portfólio</Link>
      </header>
      <div className="demo-app-layout">
        <aside className="demo-app-nav">
          <p>Meus produtos</p>
          {Object.entries(demoProducts).map(([key, item]) => <a key={key} className={key === slug ? "active" : ""} href={`/demos/${key}`}><span>{item.name}</span><small>{item.short}</small></a>)}
          <div className="demo-data-note"><b>Ambiente demonstrativo</b><span>Identidades e dados foram substituídos para preservar clientes e operações.</span></div>
        </aside>
        <section className="demo-workspace">{children}</section>
      </div>
    </main>
  );
}

function Tabs({ items, active, onChange }: { items: string[]; active: string; onChange: (value: string) => void }) {
  return <div className="inside-tabs">{items.map((item) => <button key={item} className={active === item ? "active" : ""} onClick={() => onChange(item)}>{item}</button>)}</div>;
}

function Kpis({ items }: { items: Array<[string, string, string]> }) {
  return <div className="kpi-row">{items.map(([label, value, note]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div>;
}

function NexoraDemo() {
  const [view, setView] = useState("Visão geral");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(false);
  const filtered = tickets.filter((t) => Object.values(t).join(" ").toLowerCase().includes(query.toLowerCase()));
  return <DemoShell slug="nexora">
    <div className="workspace-title"><div><span>Central analítica</span><h1>Nexora</h1><p>Investigue tickets, causas e soluções recorrentes em um único ambiente.</p></div></div>
    <Tabs items={["Visão geral", "Galáxia", "Grafo", "Assistente IA", "Tickets"]} active={view} onChange={setView} />
    {view === "Visão geral" && <><Kpis items={[["Tickets analisados", "1.284", "+96 no período"], ["Tempo médio de solução", "3h 18m", "−14% no mês"], ["Tickets técnicos", "38%", "488 casos"]]} /><div className="two-panels"><section className="panel"><h2>Causas mais recorrentes</h2>{[["Regra de validação",72],["Sessão e acesso",55],["Fila de processamento",43],["Configuração",31]].map(([n,v]) => <div className="rank-row" key={String(n)}><span>{n}</span><i><b style={{width:`${v}%`}} /></i><strong>{v}</strong></div>)}</section><section className="panel"><h2>Módulos com mais tickets</h2><div className="donut"><strong>1.284</strong><span>tickets</span></div><p className="legend">● Cadastros&nbsp;&nbsp; ● Relatórios&nbsp;&nbsp; ● Autenticação</p></section></div></>}
    {(view === "Galáxia" || view === "Grafo") && <div className="graph-panel"><div className="graph-info"><span>{view}</span><h2>{view === "Galáxia" ? "Produto → módulo → causa → cliente → ticket" : "Relações entre sintomas, causas e soluções"}</h2><p>Clique nos elementos para explorar as conexões simuladas.</p></div><div className="graph-space"><i className="edge e1"/><i className="edge e2"/><i className="edge e3"/><i className="edge e4"/><button className="bubble b0">Portal Web</button><button className="bubble b1">Cadastros</button><button className="bubble b2">Validação</button><button className="bubble b3">Aurora Foods</button><button className="bubble b4">TK-1048</button></div></div>}
    {view === "Assistente IA" && <div className="assistant-panel"><div><span>Assistente de investigação</span><h2>Descreva um sintoma</h2><textarea defaultValue="Usuário não consegue concluir o cadastro após atualizar o perfil." /><button className="primary-action" onClick={() => setAnswer(true)}>Analisar casos relacionados</button></div>{answer ? <aside><span>Sugestão baseada em casos semelhantes</span><h3>Verifique a regra de validação do campo de perfil.</h3><p>Foram encontrados 12 tickets com sintomas próximos. A solução mais recorrente foi revisar a configuração obrigatória e reprocessar o cadastro.</p><b>84% de similaridade</b></aside> : <aside className="empty-answer">A análise aparecerá aqui.</aside>}</div>}
    {view === "Tickets" && <><div className="table-tools"><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar ticket, cliente ou causa..." /></div><div className="wide-table"><div className="wide-head"><span>Ticket</span><span>Cliente</span><span>Produto / módulo</span><span>Causa</span><span>Status</span></div>{filtered.map(t=><div key={t.id}><strong>{t.id}</strong><span>{t.client}</span><span>{t.product}<small>{t.module}</small></span><span>{t.cause}</span><em className={`status ${t.status === "Solucionado" ? "ok" : "warn"}`}>{t.status}</em></div>)}</div></>}
  </DemoShell>;
}

function PulseHoursDemo() {
  const [view,setView]=useState("Chamados e horas");
  const [search,setSearch]=useState("");
  const visible=hourTickets.filter(t=>Object.values(t).join(" ").toLowerCase().includes(search.toLowerCase()));
  return <DemoShell slug="pulse-hours">
    <div className="workspace-title"><div><span>Controle operacional</span><h1>Pulse Hours</h1><p>Acompanhe chamados, horas consumidas e produtividade mensal.</p></div><select aria-label="Período"><option>Julho de 2026</option><option>Junho de 2026</option></select></div>
    <Tabs items={["Chamados e horas","Produção operacional"]} active={view} onChange={setView}/>
    {view === "Chamados e horas" ? <><Kpis items={[["Chamados","42","8 em andamento"],["Horas de suporte","36h 20m","meta mensal: 40h"],["Horas de desenvolvimento","18h 45m","12 chamados"],["Total operacional","55h 05m","período selecionado"]]} /><div className="target-panel"><div><span>Consumo da franquia mensal</span><strong>36h 20m de 40h</strong></div><i><b style={{width:"91%"}}/></i></div><div className="table-tools"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar chamado, cliente ou produto..." /></div><div className="wide-table hours-table"><div className="wide-head"><span>Mês / chamado</span><span>Cliente</span><span>Produto</span><span>Tipo</span><span>Horas / dev</span></div>{visible.map(t=><div key={t.id}><strong>{t.month}<small>{t.id}</small></strong><span>{t.client}</span><span>{t.product}</span><span>{t.type}</span><span>{t.hours}<small>{t.dev} dev</small></span></div>)}</div></> : <><Kpis items={[["Colaboradores","184","base simulada"],["Registros processados","12.640","no período"],["Inconsistências","17","aguardando revisão"]]} /><div className="two-panels"><section className="panel"><h2>Distribuição operacional</h2>{[["Registros válidos",88],["Ajustes automáticos",64],["Pendências",18]].map(([n,v])=><div className="rank-row" key={String(n)}><span>{n}</span><i><b style={{width:`${v}%`}}/></i><strong>{v}%</strong></div>)}</section><section className="panel alert-list"><h2>Inconsistências recentes</h2><p><b>07</b> registros sem vínculo de equipe</p><p><b>06</b> eventos fora da janela esperada</p><p><b>04</b> cadastros aguardando revisão</p></section></div></>}
  </DemoShell>;
}

function ProjectFlowDemo(){
  const [selected,setSelected]=useState(0); const client=clients[selected];
  return <DemoShell slug="project-flow">
    <div className="workspace-title"><div><span>Atualização semanal</span><h1>Status dos projetos</h1><p>Visão executiva de implantações, prazos e próximas ações.</p></div><button className="refresh-button">Modo apresentação</button></div>
    <Kpis items={[["Projetos ativos","04","2 em homologação"],["No prazo","03","75% da carteira"],["Ações abertas","12","4 prioritárias"],["Próxima entrega","8 dias","Aurora Foods"]]}/>
    <div className="portfolio-layout"><aside className="client-list"><span>Clientes</span>{clients.map((c,i)=><button key={c.name} className={i===selected?"active":""} onClick={()=>setSelected(i)}><strong>{c.name}</strong><small>{c.phase} • {c.progress}%</small></button>)}</aside><section className="client-detail"><div className="client-title"><div><span>Projeto selecionado</span><h2>{client.name}</h2></div><em className={`health ${client.health.toLowerCase()}`}>{client.health}</em></div><div className="client-facts"><div><span>Fase atual</span><strong>{client.phase}</strong></div><div><span>Prazo</span><strong>{client.deadline}</strong></div><div><span>Próxima ação</span><strong>{client.next}</strong></div></div><div className="phase-progress"><span>Progresso geral <b>{client.progress}%</b></span><i><b style={{width:`${client.progress}%`}}/></i></div><div className="task-board">{[["Não iniciada",["Validar permissões","Preparar comunicação"]],["Em andamento",["Revisar configuração","Executar cenário-piloto"]],["Concluída",["Mapear processo","Definir responsáveis"]]].map(([title,tasks])=><div key={String(title)}><h3>{title}</h3>{(tasks as string[]).map(task=><span key={task}>{task}<small>Responsável fictício</small></span>)}</div>)}</div></section></div>
  </DemoShell>
}

function BridgeOpsDemo(){
  const [view,setView]=useState("Dashboard"); const [period,setPeriod]=useState("24h"); const [active,setActive]=useState([true,true,false]);
  return <DemoShell slug="bridgeops">
    <div className="workspace-title"><div><span>Portal de operações</span><h1>{view}</h1><p>Monitore rotinas, entidades processadas e ocorrências técnicas.</p></div><div className="range-switch">{["24h","7 dias","30 dias"].map(p=><button key={p} className={period===p?"active":""} onClick={()=>setPeriod(p)}>{p}</button>)}</div></div>
    <Tabs items={["Dashboard","Logs da integração","Rotinas"]} active={view} onChange={setView}/>
    {view==="Dashboard"&&<><Kpis items={[["Recebidos",period==="24h"?"8.426":"48.210","eventos"],["Sucesso","97,8%","8.241 eventos"],["Pendentes","112","em processamento"],["Erros","73","0,9% do total"]]}/><div className="two-panels"><section className="panel"><h2>Saúde das rotinas ativas</h2><div className="health-ring"><strong>92%</strong><span>saudável</span></div><p className="legend">7 rotinas saudáveis • 1 requer atenção</p></section><section className="panel"><h2>Resumo por entidade</h2>{[["Colaboradores",98],["Marcações",91],["Afastamentos",82],["Escalas",96]].map(([n,v])=><div className="rank-row" key={String(n)}><span>{n}</span><i><b style={{width:`${v}%`}}/></i><strong>{v}%</strong></div>)}</section></div></>}
    {view==="Logs da integração"&&<><div className="table-tools"><input aria-label="Filtrar logs" placeholder="Filtrar por entidade ou rotina..."/><select aria-label="Filtrar por status"><option>Todos os status</option><option>Sucesso</option><option>Pendente</option><option>Erro</option></select></div><div className="wide-table logs-table"><div className="wide-head"><span>Horário</span><span>Entidade</span><span>Rotina</span><span>Registros</span><span>Status</span></div>{logs.map(l=><div key={l.time}><strong>{l.time}</strong><span>{l.entity}</span><span>{l.routine}</span><span>{l.records}</span><em className={`status ${l.status==="Sucesso"?"ok":l.status==="Erro"?"error":"warn"}`}>{l.status}</em></div>)}</div></>}
    {view==="Rotinas"&&<div className="routine-grid">{["Sincronização cadastral","Eventos operacionais","Carga de referência"].map((name,i)=><article key={name}><div><span className={active[i]?"live-dot":"live-dot off"}/><strong>{name}</strong></div><p>Execução programada • ambiente demonstrativo</p><dl><div><dt>Última execução</dt><dd>{i+2} min atrás</dd></div><div><dt>Taxa de sucesso</dt><dd>{98-i*3},2%</dd></div></dl><button onClick={()=>setActive(a=>a.map((v,index)=>index===i?!v:v))}>{active[i]?"Pausar rotina":"Ativar rotina"}</button></article>)}</div>}
  </DemoShell>
}

export default function DemoApp({ slug }: { slug: DemoSlug }) {
  if(slug==="nexora") return <DemoShell slug="nexora"><NexoraWorkspace/></DemoShell>;
  if(slug==="pulse-hours") return <PulseHoursDemo/>;
  if(slug==="project-flow") return <ProjectFlowDemo/>;
  return <BridgeOpsDemo/>;
}
