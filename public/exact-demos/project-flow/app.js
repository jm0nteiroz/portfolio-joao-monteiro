const taskStatuses = ["Não iniciada", "Em andamento", "Concluída"];
const monthReferences = [
  { key: "jan", label: "Jan" },
  { key: "fev", label: "Fev" },
  { key: "mar", label: "Mar" },
  { key: "abr", label: "Abr" },
  { key: "mai", label: "Mai" },
  { key: "jun", label: "Jun" },
  { key: "jul", label: "Jul" },
  { key: "ago", label: "Ago" },
  { key: "set", label: "Set" },
  { key: "out", label: "Out" },
  { key: "nov", label: "Nov" },
  { key: "dez", label: "Dez" }
];

const sampleRows = [
  {
    cliente: "Aurora Foods",
    responsavel: "Equipe Produto",
    atividade: "Configuração do ambiente",
    descricaoTarefa: "Preparar ambiente, validar acessos e confirmar pré-requisitos da implantação.",
    statusTarefa: "Concluída",
    nivel: "Baixo",
    fase: "Implantação",
    porcentagem: 100,
    data: "2026-06-08",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Validar acessos e pré-requisitos finais.",
    observacao: "Ambiente preparado para carga inicial."
  },
  {
    cliente: "Aurora Foods",
    responsavel: "Equipe Produto",
    atividade: "Carga inicial de estruturas",
    descricaoTarefa: "Importar estruturas iniciais, revisar inconsistências e liberar dados para conferência.",
    statusTarefa: "Em andamento",
    nivel: "Médio",
    fase: "Implantação",
    porcentagem: 55,
    data: "2026-06-10",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Consolidar inconsistências para homologação.",
    observacao: "Estrutura operacional em validação."
  },
  {
    cliente: "Aurora Foods",
    responsavel: "Equipe Produto",
    atividade: "Validação de horários, escalas e troca entre empresas",
    descricaoTarefa: "Conferir regras operacionais de horários, escalas e troca entre empresas no fluxo homologado.",
    statusTarefa: "Não iniciada",
    nivel: "Médio",
    fase: "Homologação",
    porcentagem: 0,
    data: "2026-06-12",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Avaliar aderência fora do padrão atual da integração.",
    observacao: "Ponto de atenção técnico."
  },
  {
    cliente: "Vértice Serviços",
    responsavel: "Equipe Produto, Bridge e cliente",
    atividade: "Validação do ambiente de homologação",
    descricaoTarefa: "Validar dados carregados no ambiente de homologação com as equipes envolvidas.",
    statusTarefa: "Em andamento",
    nivel: "Médio",
    fase: "Homologação",
    porcentagem: 45,
    data: "2026-06-12",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Conferir dados carregados e inconsistências.",
    observacao: "Homologação depende de alinhamento operacional."
  },
  {
    cliente: "Vértice Serviços",
    responsavel: "Bridge",
    atividade: "Importação dos IDs Bridge",
    descricaoTarefa: "Receber e importar IDs Bridge para criar vínculos necessários entre os sistemas.",
    statusTarefa: "Não iniciada",
    nivel: "Alto",
    fase: "Homologação",
    porcentagem: 0,
    data: "",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Receber planilha de IDs Bridge.",
    observacao: "Bloqueia vínculos necessários entre sistemas."
  },
  {
    cliente: "Horizonte Logística",
    responsavel: "Equipe Produto",
    atividade: "Planejamento da virada de produção",
    descricaoTarefa: "Definir janela de virada, responsáveis e restrições operacionais antes da produção.",
    statusTarefa: "Em andamento",
    nivel: "Médio",
    fase: "Virada de produção",
    porcentagem: 60,
    data: "2026-06-28",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Definir janela sem movimentações críticas.",
    observacao: "Aguardando confirmação das equipes."
  },
  {
    cliente: "Lume Varejo",
    responsavel: "Suporte Equipe Produto",
    atividade: "Monitoramento pós-virada",
    descricaoTarefa: "Acompanhar integrações após a virada e registrar ajustes residuais.",
    statusTarefa: "Em andamento",
    nivel: "Baixo",
    fase: "Estabilização",
    porcentagem: 80,
    data: "2026-06-14",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Registrar ajustes residuais.",
    observacao: "Integrações em acompanhamento."
  },
  {
    cliente: "Nexo Transportes",
    responsavel: "Comercial e Projetos",
    atividade: "Qualificação da oportunidade",
    descricaoTarefa: "Avaliar aderência do cliente, escopo e janela possível de implantação.",
    statusTarefa: "Não iniciada",
    nivel: "Baixo",
    fase: "Oportunidade",
    porcentagem: 0,
    data: "",
    dataInicioProjeto: "2026-06-26",
    diasImplantacao: 30,
    proximaAcao: "Confirmar aderência e janela de implantação.",
    observacao: "Possível próximo cliente Project Flow."
  }
];

const defaultProjectStartDate = "2026-06-26";
const defaultImplantationDays = 30;
let taskIdSequence = 1;
let rows = sampleRows.map(prepareRow);
let clientSchedules = buildClientSchedules(rows);
let selectedClient = "todos";
let selectedScheduleClient = Object.keys(clientSchedules)[0] || "";
let searchTerm = "";
let overviewClientIndex = 0;
let nextActionIndex = 0;
let expandedTaskId = "";
let ticketSortDirection = "asc";

const el = (id) => document.getElementById(id);

const keyMap = {
  cliente: "cliente",
  client: "cliente",
  empresa: "cliente",
  responsavel: "responsavel",
  owner: "responsavel",
  atividade: "atividade",
  tarefa: "atividade",
  item: "atividade",
  marco: "atividade",
  descricaodomarco: "atividade",
  descricaotarefa: "descricaoTarefa",
  descricaodatarefa: "descricaoTarefa",
  detalhetarefa: "descricaoTarefa",
  detalhesdatarefa: "descricaoTarefa",
  descricao: "descricaoTarefa",
  observacao: "observacao",
  observacoes: "observacao",
  status: "statusTarefa",
  statustarefa: "statusTarefa",
  statusdaatividade: "statusTarefa",
  statusdoitem: "statusTarefa",
  statusdoprojeto: "statusTarefa",
  situacao: "statusTarefa",
  andamento: "statusTarefa",
  nivel: "nivel",
  risco: "nivel",
  grauderisco: "nivel",
  nivelderisco: "nivel",
  riscodoitem: "nivel",
  riscodoprojeto: "nivel",
  prioridade: "nivel",
  criticidade: "nivel",
  fase: "fase",
  faseatual: "fase",
  etapaatual: "fase",
  etapa: "fase",
  porcentagem: "porcentagem",
  percentual: "porcentagem",
  progresso: "porcentagem",
  percentconcluido: "porcentagem",
  percentualconcluido: "porcentagem",
  data: "data",
  prazo: "data",
  datatarefa: "data",
  virada: "data",
  datavirada: "data",
  inicio: "dataInicioProjeto",
  inicioprojeto: "dataInicioProjeto",
  datainicioprojeto: "dataInicioProjeto",
  datadeinicioprojeto: "dataInicioProjeto",
  datainicio: "dataInicioProjeto",
  inicioimplantacao: "dataInicioProjeto",
  diasfase2: "diasImplantacao",
  diasimplantacao: "diasImplantacao",
  diascorridos: "diasImplantacao",
  diascorridosfase2: "diasImplantacao",
  proximaacao: "proximaAcao",
  proximasacoes: "proximaAcao",
  acao: "proximaAcao",
  bloqueador: "observacao",
  bloqueio: "observacao",
  numero: "ticketNumber",
  numeroticket: "ticketNumber",
  numerodoticket: "ticketNumber",
  ticket: "ticketNumber",
  tickets: "ticketNumber",
  chamado: "ticketNumber",
  chamadoid: "ticketNumber",
  idticket: "ticketNumber",
  referencia: "referencia",
  referenciafaturamento: "referencia",
  mes: "referencia",
  mesreferencia: "referencia",
  competencia: "referencia"
};

function mapColumnKey(key) {
  const normalized = normalizeKey(key);
  if (keyMap[normalized]) return keyMap[normalized];
  if (normalized.includes("cliente") || normalized.includes("empresa")) return "cliente";
  if (normalized.includes("responsavel") || normalized.includes("owner")) return "responsavel";
  if (normalized.includes("status") || normalized.includes("situacao") || normalized.includes("andamento")) return "statusTarefa";
  if (normalized.includes("risco") || normalized.includes("criticidade") || normalized.includes("prioridade")) return "nivel";
  if (normalized.includes("fase") || normalized.includes("etapa")) return "fase";
  if (normalized.includes("porcent") || normalized.includes("percent") || normalized.includes("progresso")) return "porcentagem";
  if (normalized.includes("descricao") && normalized.includes("tarefa")) return "descricaoTarefa";
  if (normalized.includes("detalhe") && normalized.includes("tarefa")) return "descricaoTarefa";
  if (normalized.includes("proxima") || normalized.includes("acao")) return "proximaAcao";
  if (normalized.includes("dias") && (normalized.includes("fase2") || normalized.includes("implant"))) return "diasImplantacao";
  if (normalized.includes("inicio") && normalized.includes("projeto")) return "dataInicioProjeto";
  if (normalized.includes("data") || normalized.includes("prazo") || normalized.includes("virada")) return "data";
  if (normalized.includes("ticket") || normalized.includes("chamado") || normalized === "numero") return "ticketNumber";
  if (normalized.includes("referencia") || normalized.includes("competencia")) return "referencia";
  if (normalized.includes("atividade") || normalized.includes("tarefa") || normalized.includes("item") || normalized.includes("marco")) return "atividade";
  if (normalized.includes("observ") || normalized.includes("bloque")) return "observacao";
  return "";
}

function normalizeKey(key) {
  return String(key || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeRow(row) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    const mapped = mapColumnKey(key);
    const current = String(normalized[mapped] ?? "").trim();
    const incoming = value ?? "";
    if (mapped && (!current || String(incoming).trim())) normalized[mapped] = incoming;
  });

  const cliente = String(normalized.cliente || "").trim();
  if (!cliente) return null;

  return {
    cliente,
    responsavel: String(normalized.responsavel || "A definir").trim(),
    atividade: String(normalized.atividade || normalized.observacao || "Atividade Project Flow").trim(),
    statusTarefa: cleanTaskStatus(normalized.statusTarefa),
    nivel: cleanLevel(normalized.nivel),
    fase: String(normalized.fase || "Fase não informada").trim(),
    porcentagem: cleanPercent(normalized.porcentagem, normalized.statusTarefa),
    data: formatDateValue(normalized.data),
    ticketNumber: cleanTicketNumber(normalized.ticketNumber),
    referencia: cleanReference(normalized.referencia, normalized.data),
    dataInicioProjeto: formatDateValue(normalized.dataInicioProjeto),
    diasImplantacao: cleanDays(normalized.diasImplantacao),
    proximaAcao: String(normalized.proximaAcao || "Definir próxima ação.").trim(),
    descricaoTarefa: String(normalized.descricaoTarefa || normalized.observacao || "").trim(),
    observacao: String(normalized.observacao || "").trim()
  };
}

function prepareRow(row) {
  const taskId = row.taskId || `task-${taskIdSequence++}`;
  return {
    ...row,
    taskId,
    ticketNumber: cleanTicketNumber(row.ticketNumber) || extractTicketNumber(row.atividade) || extractTicketNumber(taskId),
    referencia: cleanReference(row.referencia, row.data),
    descricaoTarefa: String(row.descricaoTarefa || row.observacao || "").trim(),
    dataInicioProjeto: formatDateValue(row.dataInicioProjeto) || defaultProjectStartDate,
    diasImplantacao: cleanDays(row.diasImplantacao)
  };
}

function cleanTicketNumber(value) {
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function extractTicketNumber(value) {
  return cleanTicketNumber(value);
}

function cleanDays(value) {
  const parsed = Number(String(value ?? "").replace(",", ".").trim());
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : defaultImplantationDays;
}

function cleanTaskStatus(value) {
  const raw = normalizeText(value);
  if (raw.includes("concl") || raw.includes("feito") || raw.includes("finaliz")) return "Concluída";
  if (raw.includes("nao") || raw.includes("pend") || raw.includes("a definir") || raw.includes("iniciar")) return "Não iniciada";
  return "Em andamento";
}

function cleanLevel(value) {
  const raw = normalizeText(value);
  if (raw.includes("alto") || raw.includes("alta") || raw.includes("crit") || raw.includes("bloq") || raw.includes("vermelho")) return "Alto";
  if (raw.includes("medio") || raw.includes("media") || raw.includes("moderado") || raw.includes("amarelo")) return "Médio";
  if (raw.includes("baixo") || raw.includes("baixa") || raw.includes("verde")) return "Baixo";
  return "Baixo";
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanPercent(value, statusValue) {
  const raw = String(value ?? "").replace("%", "").replace(",", ".").trim();
  const parsed = Number(raw);
  if (!Number.isNaN(parsed)) return Math.min(100, Math.max(0, parsed));
  const status = cleanTaskStatus(statusValue);
  if (status === "Concluída") return 100;
  if (status === "Não iniciada") return 0;
  return 50;
}

function formatDateValue(value) {
  if (!value) return "";
  if (typeof value === "number") {
    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
    return date.toISOString().slice(0, 10);
  }
  const raw = String(value).trim();
  const brazilian = raw.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
  if (brazilian) {
    const year = brazilian[3] ? brazilian[3].padStart(4, "20") : "2026";
    return `${year}-${brazilian[2].padStart(2, "0")}-${brazilian[1].padStart(2, "0")}`;
  }
  return raw;
}

function displayDate(value) {
  if (!value) return "Sem data";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function cleanReference(value, fallbackDate = "") {
  const normalized = normalizeText(value);
  const monthFromText = monthReferences.find((month) => normalized.includes(month.key));
  if (monthFromText) return monthFromText.key;

  const numericMonth = normalized.match(/(?:^|[^0-9])(1[0-2]|0?[1-9])(?:[^0-9]|$)/);
  if (numericMonth) return monthReferences[Number(numericMonth[1]) - 1]?.key || "";

  const date = fallbackDate ? new Date(`${formatDateValue(fallbackDate)}T12:00:00`) : null;
  if (date && !Number.isNaN(date.getTime())) return monthReferences[date.getMonth()]?.key || "";
  return "";
}

function referenceLabel(reference) {
  return monthReferences.find((month) => month.key === reference)?.label || "Sem referência";
}

function addCalendarDays(value, days) {
  const date = new Date(`${value}T12:00:00`);
  if (!value || Number.isNaN(date.getTime()) || !Number.isFinite(days)) return "";
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildClientSchedules(data) {
  return data.reduce((acc, row) => {
    if (!acc[row.cliente]) {
      acc[row.cliente] = {
        startDate: row.dataInicioProjeto || defaultProjectStartDate,
        days: cleanDays(row.diasImplantacao)
      };
    }
    return acc;
  }, {});
}

function getSchedule(clientName = selectedScheduleClient) {
  return clientSchedules[clientName] || {
    startDate: defaultProjectStartDate,
    days: defaultImplantationDays
  };
}

function groupClients(data = rows) {
  const grouped = new Map();
  data.forEach((row) => {
    if (!grouped.has(row.cliente)) {
      grouped.set(row.cliente, {
        cliente: row.cliente,
        responsavel: row.responsavel,
        tarefas: []
      });
    }
    const client = grouped.get(row.cliente);
    client.tarefas.push(row);
    if (client.responsavel === "A definir" && row.responsavel !== "A definir") {
      client.responsavel = row.responsavel;
    }
  });

  return [...grouped.values()].map((client) => ({
    ...client,
    resumo: summarizeTasks(client.tarefas),
    nivel: majorityLevel(client.tarefas),
    fase: currentPhase(client.tarefas),
    porcentagem: calculateOverallProgress(client.tarefas)
  }));
}

function summarizeTasks(tasks) {
  return taskStatuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.statusTarefa === status).length;
    return acc;
  }, {});
}

function majorityLevel(tasks) {
  if (!tasks.length) return "Baixo";
  const weights = { Baixo: 1, Médio: 2, Alto: 3 };
  const counts = tasks.reduce((acc, task) => {
    acc[task.nivel] = (acc[task.nivel] || 0) + 1;
    return acc;
  }, { Baixo: 0, Médio: 0, Alto: 0 });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || weights[b[0]] - weights[a[0]])[0][0];
}

function currentPhase(tasks) {
  if (!tasks.length) return "Fase não informada";
  const phases = summarizePhases(tasks);
  return phases.find((phase) => phase.percent < 100)?.fase || phases.at(-1)?.fase || "Fase não informada";
}

function isImplantationPhase(phase) {
  return normalizeText(phase).includes("implant");
}

function calculatePhasePercent(phase) {
  return phase.total ? Math.round((phase.done / phase.total) * 100) : 0;
}

function deadlineForClient(clientName = selectedScheduleClient) {
  const schedule = getSchedule(clientName);
  return addCalendarDays(schedule.startDate, schedule.days);
}

function calculateOverallProgress(tasks) {
  if (!tasks.length) return 0;
  const phases = summarizePhases(tasks);
  if (!phases.length) return 0;
  const total = phases.reduce((sum, phase) => sum + phase.percent, 0);
  return Math.round(total / phases.length);
}

function filteredRows() {
  const term = searchTerm.trim().toLowerCase();
  return rows.filter((row) => {
    const matchesClient = selectedClient === "todos" || row.cliente === selectedClient;
    const matchesSearch = !term || Object.values(row).join(" ").toLowerCase().includes(term);
    return matchesClient && matchesSearch;
  });
}

function render() {
  const allClients = groupClients(rows);
  const visibleRows = filteredRows();
  const visibleClients = groupClients(visibleRows);
  const selected = selectedClient === "todos" ? null : allClients.find((client) => client.cliente === selectedClient);

  renderHero(allClients);
  renderDeadlineControls(allClients);
  renderKpis(visibleRows, visibleClients);
  renderClientNav(allClients);
  renderClientSummary(selected, visibleRows, visibleClients);
  renderTasks(visibleRows);
  renderTicketReferences(visibleRows);
  renderTicketTable(visibleRows);
}

function renderHero(clients) {
  const totals = clients.reduce((acc, client) => {
    acc[client.nivel] += 1;
    return acc;
  }, { Baixo: 0, Médio: 0, Alto: 0 });
  const executiveLevel = totals.Alto ? "Alto" : totals.Médio ? "Médio" : "Baixo";

  el("healthDot").className = `health-dot ${levelClass(executiveLevel)}`;
  el("healthLabel").textContent = `Visão ${executiveLevel}`;
  el("lastUpdate").textContent = `Atualizado em ${new Date().toLocaleDateString("pt-BR")}`;
  el("executiveSummary").textContent =
    `Painel Project Flow com ${clients.length} cliente(s): ${totals.Baixo} verde(s), ${totals.Médio} amarelo(s) e ${totals.Alto} vermelho(s).`;
}

function renderKpis(data, clients) {
  const summary = summarizeTasks(data);
  const progress = calculateOverallProgress(data);
  const phase = currentPhase(data);
  const schedule = getSchedule(selectedScheduleClient);
  const deadline = deadlineForClient(selectedScheduleClient);
  const deadlineLabel = selectedScheduleClient ? `Cliente: ${selectedScheduleClient}` : "Selecione um cliente";
  const cards = [
    ["Clientes", clients.length, "na visão atual"],
    ["Não iniciadas", summary["Não iniciada"], "tarefas aguardando início"],
    ["Em andamento", summary["Em andamento"], "tarefas em execução"],
    ["Concluídas", summary["Concluída"], "tarefas finalizadas"],
    ["Progresso", `${progress}%`, phase],
    ["Deadline fase 2", displayDate(deadline), `${deadlineLabel} · ${schedule.days} dia(s)`]
  ];

  el("kpiGrid").innerHTML = cards.map(([label, value, hint]) => `
    <article class="kpi-card">
      <small>${label}</small>
      <strong>${value}</strong>
      <span>${hint}</span>
    </article>
  `).join("");
}

function renderClientNav(clients) {
  const allTasks = clients.flatMap((client) => client.tarefas);
  const buttons = [
    {
      cliente: "todos",
      nivel: majorityLevel(allTasks),
      resumo: summarizeTasks(allTasks),
      tarefas: allTasks,
      fase: "Por cliente"
    },
    ...clients
  ];

  el("clientNav").innerHTML = buttons.map((client) => {
    const isAll = client.cliente === "todos";
    const active = selectedClient === client.cliente ? "active" : "";
    const label = isAll ? "Todos os clientes" : client.cliente;
    const meta = isAll
      ? `${clients.length} cliente(s)`
      : `${client.resumo["Concluída"]}/${client.tarefas.length} concluída(s)`;

    return `
      <button class="client-button ${active}" type="button" data-client="${escapeHtml(client.cliente)}">
        <span class="client-dot ${levelClass(client.nivel)}"></span>
        <span>
          <strong>${escapeHtml(label)}</strong>
          <small>${escapeHtml(meta)}</small>
          <em>${escapeHtml(client.fase || "Fase não informada")}</em>
        </span>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".client-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedClient = button.dataset.client;
      if (selectedClient !== "todos") selectedScheduleClient = selectedClient;
      render();
    });
  });
}

function renderClientSummary(selected, visibleRows, visibleClients) {
  const title = selected ? selected.cliente : "Todos os clientes";
  const tasks = selected ? selected.tarefas : visibleRows;
  const summary = summarizeTasks(tasks);
  const level = selected ? selected.nivel : majorityLevel(visibleRows.length ? visibleRows : rows);
  const phase = selected ? selected.fase : "Por cliente";
  const progress = selected ? selected.porcentagem : calculateOverallProgress(tasks);

  el("clientTitle").textContent = title;
  el("clientLevelDot").className = `client-dot large ${levelClass(level)}`;
  el("clientMeta").textContent = selected
    ? `${selected.responsavel} · ${phase} · ${tasks.length} tarefa(s)`
    : `${visibleClients.length} cliente(s) · ${phase} · ${tasks.length} tarefa(s)`;
  el("clientNextAction").innerHTML = renderNextActions(selected ? [selected] : visibleClients);
  el("miniSummary").innerHTML = taskStatuses.map((status) => `
    <div class="mini-card">
      <small>${statusLabel(status)}</small>
      <strong>${summary[status]}</strong>
    </div>
  `).join("") + renderPhaseMiniCard(selected, visibleClients, phase) + `
    <div class="mini-card">
      <small>Progresso</small>
      <strong>${progress}%</strong>
    </div>
  `;
  el("phaseProgress").innerHTML = renderPhaseProgress(tasks, !selected);
  bindCarouselControls(visibleClients);
}

function renderPhaseMiniCard(selected, visibleClients, phase) {
  if (selected || !visibleClients.length) {
    return `
      <div class="mini-card">
        <small>Fase</small>
        <strong class="text-value">${escapeHtml(phase)}</strong>
      </div>
    `;
  }

  overviewClientIndex = wrapIndex(overviewClientIndex, visibleClients.length);
  const client = visibleClients[overviewClientIndex];
  return `
    <div class="mini-card carousel-mini-card">
      <div class="carousel-mini-head">
        <small>Fase</small>
        <div class="carousel-controls" aria-label="Navegar clientes">
          <button type="button" data-carousel="phase" data-direction="-1" aria-label="Cliente anterior">‹</button>
          <button type="button" data-carousel="phase" data-direction="1" aria-label="Próximo cliente">›</button>
        </div>
      </div>
      <strong class="text-value">${escapeHtml(client.fase)}</strong>
      <span>${escapeHtml(client.cliente)} · ${client.porcentagem}%</span>
    </div>
  `;
}

function getNextTask(tasks) {
  const byDate = (a, b) => {
    const dateA = a.data || "9999-12-31";
    const dateB = b.data || "9999-12-31";
    return String(dateA).localeCompare(String(dateB), "pt-BR", { numeric: true, sensitivity: "base" });
  };
  const notStarted = tasks.filter((task) => task.statusTarefa === "Não iniciada").sort(byDate);
  if (notStarted.length) return notStarted[0];
  const running = tasks.filter((task) => task.statusTarefa === "Em andamento").sort(byDate);
  if (running.length) return running[0];
  return null;
}

function renderNextActions(clients) {
  if (!clients.length) return `<p class="empty-state">Nenhum cliente na visão atual.</p>`;
  nextActionIndex = wrapIndex(nextActionIndex, clients.length);
  const client = clients[nextActionIndex];
  const task = getNextTask(client.tarefas);
  const phase = task?.fase || client.fase || "Fase não informada";
  const text = task ? `${task.atividade}: ${task.proximaAcao}` : "Sem pendências abertas.";

  return `
    <div class="next-action-carousel">
      <button type="button" class="carousel-arrow" data-carousel="next" data-direction="-1" aria-label="Cliente anterior">‹</button>
      <article class="next-action-card">
        <small>${escapeHtml(client.cliente)} · ${escapeHtml(phase)} · ${nextActionIndex + 1}/${clients.length}</small>
        <strong>${escapeHtml(text)}</strong>
      </article>
      <button type="button" class="carousel-arrow" data-carousel="next" data-direction="1" aria-label="Próximo cliente">›</button>
    </div>
  `;
}

function bindCarouselControls(visibleClients) {
  document.querySelectorAll("[data-carousel]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.direction || 1);
      if (button.dataset.carousel === "phase") {
        overviewClientIndex = wrapIndex(overviewClientIndex + direction, visibleClients.length);
      }
      if (button.dataset.carousel === "next") {
        nextActionIndex = wrapIndex(nextActionIndex + direction, visibleClients.length);
      }
      render();
    });
  });
}

function wrapIndex(index, length) {
  if (!length) return 0;
  return ((index % length) + length) % length;
}

function renderTasks(data) {
  el("taskColumns").innerHTML = taskStatuses.map((status) => {
    const tasks = data.filter((task) => task.statusTarefa === status);
    return `
      <section class="task-column" data-status="${escapeHtml(status)}">
        <div class="column-title">
          <span>${statusLabel(status)}</span>
          <span class="pill">${tasks.length}</span>
        </div>
        ${tasks.map(taskCard).join("") || `<p class="empty-state">Nenhuma tarefa.</p>`}
      </section>
    `;
  }).join("");
  bindKanban();
}

function renderTicketReferences(data) {
  const counts = data.reduce((acc, row) => {
    if (row.referencia) acc[row.referencia] = (acc[row.referencia] || 0) + 1;
    return acc;
  }, {});
  const visibleMonths = monthReferences.filter((month) => counts[month.key]);

  el("referenceMonths").innerHTML = visibleMonths.map((month) => `
    <span class="reference-pill">
      <strong>${escapeHtml(month.label)}</strong>
      <small>${counts[month.key]} ticket(s)</small>
    </span>
  `).join("");
}

function renderTicketTable(data) {
  const sorted = [...data].sort((a, b) => {
    const numberCompare = (a.ticketNumber || 0) - (b.ticketNumber || 0);
    const directed = ticketSortDirection === "asc" ? numberCompare : -numberCompare;
    return directed || monthCompare(a.referencia, b.referencia) || naturalCompare(a.cliente, b.cliente);
  });
  const sortLabel = ticketSortDirection === "asc" ? "crescente" : "decrescente";
  const sortIcon = ticketSortDirection === "asc" ? "↑" : "↓";

  if (!sorted.length) {
    el("ticketTable").innerHTML = `<p class="empty-state">Nenhum ticket para exibir.</p>`;
    return;
  }

  el("ticketTable").innerHTML = `
    <table class="ticket-table">
      <thead>
        <tr>
          <th>
            <button type="button" id="ticketNumberSort" class="table-sort-button" aria-label="Ordenar número em ordem ${sortLabel}">
              Número ${sortIcon}
            </button>
          </th>
          <th>Referência</th>
          <th>Cliente</th>
          <th>Atividade</th>
          <th>Status</th>
          <th>Responsável</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map((ticket) => `
          <tr>
            <td><strong>${ticket.ticketNumber || "-"}</strong></td>
            <td>${ticket.referencia ? escapeHtml(referenceLabel(ticket.referencia)) : "-"}</td>
            <td>${escapeHtml(ticket.cliente)}</td>
            <td>${escapeHtml(ticket.atividade)}</td>
            <td>${escapeHtml(ticket.statusTarefa)}</td>
            <td>${escapeHtml(ticket.responsavel)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  el("ticketNumberSort").addEventListener("click", () => {
    ticketSortDirection = ticketSortDirection === "asc" ? "desc" : "asc";
    render();
  });
}

function monthCompare(a, b) {
  return monthRank(a) - monthRank(b);
}

function monthRank(reference) {
  const index = monthReferences.findIndex((month) => month.key === reference);
  return index === -1 ? 99 : index;
}

function bindKanban() {
  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.taskId);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  document.querySelectorAll(".task-column").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    column.addEventListener("dragleave", () => {
      column.classList.remove("drag-over");
    });
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      const taskId = event.dataTransfer.getData("text/plain");
      moveTaskToStatus(taskId, column.dataset.status);
    });
  });

  document.querySelectorAll("[data-toggle-description]").forEach((button) => {
    button.addEventListener("click", () => {
      expandedTaskId = expandedTaskId === button.dataset.toggleDescription ? "" : button.dataset.toggleDescription;
      render();
    });
  });
}

function moveTaskToStatus(taskId, status) {
  if (!taskStatuses.includes(status)) return;
  const task = rows.find((row) => row.taskId === taskId);
  if (!task || task.statusTarefa === status) return;
  task.statusTarefa = status;
  render();
}

function renderPhaseProgress(tasks, showClients = false) {
  const phases = summarizePhases(tasks);
  if (!phases.length) {
    return `<p class="empty-state">Nenhuma fase para exibir.</p>`;
  }

  return phases.map((phase) => `
    <article class="phase-row">
      <div class="phase-row-header">
        <strong>${escapeHtml(phase.fase)}</strong>
        <span>${phase.percent}%</span>
      </div>
      <div class="phase-progress" aria-label="${escapeHtml(phase.fase)} ${phase.percent}% concluída">
        <span style="width:${phase.percent}%"></span>
      </div>
      <small>${escapeHtml(phase.description)}</small>
      ${showClients ? renderPhaseClients(phase, tasks) : ""}
    </article>
  `).join("");
}

function renderPhaseClients(phase, tasks) {
  const clientsInPhase = groupClients(tasks)
    .filter((client) => client.fase === phase.fase)
    .map((client) => client.cliente);

  if (!clientsInPhase.length) return "";

  return `
    <div class="phase-client-carousel" aria-label="Clientes em ${escapeHtml(phase.fase)}">
      ${clientsInPhase.map((client) => `<span>${escapeHtml(client)}</span>`).join("")}
    </div>
  `;
}

function summarizePhases(tasks) {
  const grouped = new Map();
  tasks.forEach((task) => {
    const phaseName = task.fase || "Fase não informada";
    if (!grouped.has(phaseName)) {
      grouped.set(phaseName, {
        fase: phaseName,
        total: 0,
        done: 0,
        running: 0,
        notStarted: 0,
        clients: new Set()
      });
    }
    const phase = grouped.get(phaseName);
    phase.clients.add(task.cliente);
    phase.total += 1;
    if (task.statusTarefa === "Concluída") phase.done += 1;
    if (task.statusTarefa === "Em andamento") phase.running += 1;
    if (task.statusTarefa === "Não iniciada") phase.notStarted += 1;
  });

  return [...grouped.values()]
    .map((phase) => {
      const pending = phase.running + phase.notStarted;
      const deadlineText = isImplantationPhase(phase.fase) && pending > 0 && phase.clients.size === 1
        ? ` · deadline ${displayDate(deadlineForClient([...phase.clients][0]))}`
        : "";
      const pendingText = pending > 0
        ? ` · ${phase.running} em andamento · ${phase.notStarted} não iniciada(s)${deadlineText}`
        : "";
      const percent = calculatePhasePercent(phase);
      const description = `${phase.done}/${phase.total} tarefa(s) concluída(s)${pendingText}`;
      return {
        ...phase,
        percent,
        description
      };
    })
    .sort((a, b) => phaseCompare(a.fase, b.fase));
}

function naturalCompare(a, b) {
  return String(a).localeCompare(String(b), "pt-BR", { numeric: true, sensitivity: "base" });
}

function phaseCompare(a, b) {
  const rankA = phaseRank(a);
  const rankB = phaseRank(b);
  if (rankA !== rankB) return rankA - rankB;
  return naturalCompare(a, b);
}

function phaseRank(phase) {
  const raw = normalizeText(phase);
  const numbered = raw.match(/fase\s*(\d+)/);
  if (numbered) return Number(numbered[1]);
  if (raw.includes("oportun")) return 0;
  if (raw.includes("implant") || raw.includes("config")) return 1;
  if (raw.includes("homolog")) return 2;
  if (raw.includes("virada") || raw.includes("producao")) return 3;
  if (raw.includes("estabil")) return 4;
  return 99;
}

function taskCard(task) {
  const isExpanded = expandedTaskId === task.taskId;
  const description = task.descricaoTarefa || task.observacao || "Sem descrição cadastrada.";
  return `
    <article class="task-card" draggable="true" data-task-id="${escapeHtml(task.taskId)}">
      <div class="task-head">
        <span class="client-dot ${levelClass(task.nivel)}"></span>
        <div>
          <h4>${escapeHtml(task.atividade)}</h4>
          <p>${escapeHtml(task.cliente)} · ${escapeHtml(task.responsavel)}</p>
        </div>
        <button class="icon-button" type="button" data-toggle-description="${escapeHtml(task.taskId)}" aria-label="Ver descrição da tarefa">
          👁
        </button>
      </div>
      <div class="task-footer">
        <span class="tag ${levelClass(task.nivel)}">${escapeHtml(task.nivel)}</span>
        <span class="muted">${displayDate(task.data)}</span>
      </div>
      <div class="task-footer compact">
        <span class="muted">${escapeHtml(task.fase)}</span>
        <strong>${escapeHtml(task.statusTarefa)}</strong>
      </div>
      ${isExpanded ? `<p class="task-description">${escapeHtml(description)}</p>` : ""}
      <p class="task-note">${escapeHtml(task.proximaAcao)}</p>
    </article>
  `;
}

function renderDeadlineControls(clients) {
  if (!selectedScheduleClient || !clientSchedules[selectedScheduleClient]) {
    selectedScheduleClient = clients[0]?.cliente || "";
  }
  const schedule = getSchedule(selectedScheduleClient);
  el("scheduleClientSelect").innerHTML = clients.map((client) => `
    <option value="${escapeHtml(client.cliente)}">${escapeHtml(client.cliente)}</option>
  `).join("");
  el("scheduleClientSelect").value = selectedScheduleClient;
  el("projectStartInput").value = schedule.startDate;
  el("implantationDaysInput").value = schedule.days;
  el("implantationDeadline").textContent = displayDate(deadlineForClient(selectedScheduleClient));
}

function statusLabel(status) {
  if (status === "Concluída") return "Concluídas";
  if (status === "Não iniciada") return "Não iniciadas";
  return status;
}

function levelClass(level) {
  if (level === "Alto") return "high";
  if (level === "Médio") return "medium";
  return "low";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if ((char === "," || char === ";" || char === "\t") && !quoted) {
      current.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (field || current.length) {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      }
      if (char === "\r" && next === "\n") index += 1;
    } else {
      field += char;
    }
  }
  if (field || current.length) {
    current.push(field);
    rows.push(current);
  }

  const headers = rows.shift() || [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

async function readCsvText(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le", { fatal: false }).decode(buffer);
  }
  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder("utf-16be", { fatal: false }).decode(buffer);
  }
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  }

  const encodings = ["utf-8", "windows-1252", "iso-8859-1", "macintosh", "utf-16le"];
  const candidates = encodings.flatMap((encoding) => {
    try {
      const text = new TextDecoder(encoding, { fatal: false }).decode(buffer);
      return [{ encoding, text, score: encodingScore(text) }];
    } catch {
      return [];
    }
  });

  return candidates.sort((a, b) => a.score - b.score)[0]?.text || "";
}

function encodingScore(text) {
  const replacement = (text.match(/\uFFFD/g) || []).length * 100;
  const mojibake = (text.match(/Ã|Â|â€|â€“|â€œ|â€|ðŸ/g) || []).length * 20;
  const boxDrawing = (text.match(/[\u2500-\u257f]/g) || []).length * 20;
  const controls = (text.match(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g) || []).length * 50;
  const portugueseSignals = (text.match(/[ãõçáéíóúâêôàüÃÕÇÁÉÍÓÚÂÊÔÀÜ]/g) || []).length;
  const delimiters = (text.match(/[;\t,\n]/g) || []).length;
  return replacement + mojibake + boxDrawing + controls - portugueseSignals - Math.min(delimiters, 200);
}

async function handleFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  let importedRows = [];

  if (ext === "csv") {
    importedRows = parseCsv(await readCsvText(file));
  } else if (["xlsx", "xls"].includes(ext)) {
    if (!window.XLSX) {
      alert("A biblioteca de XLSX ainda não carregou. Verifique a conexão e tente novamente.");
      return;
    }
    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    importedRows = window.XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
  } else {
    alert("Formato não suportado. Use CSV, XLSX ou XLS.");
    return;
  }

  const normalized = importedRows.map(normalizeRow).filter(Boolean).map(prepareRow);
  if (!normalized.length) {
    alert("Não encontrei clientes na planilha. Confira se existe uma coluna chamada Cliente.");
    return;
  }

  rows = normalized;
  clientSchedules = buildClientSchedules(rows);
  selectedClient = "todos";
  selectedScheduleClient = Object.keys(clientSchedules)[0] || "";
  overviewClientIndex = 0;
  nextActionIndex = 0;
  expandedTaskId = "";
  el("fileInput").value = "";
  render();
}

function downloadTemplate() {
  const headers = [
    "Cliente",
    "Responsável",
    "Atividade",
    "Descrição da tarefa",
    "Status",
    "Risco",
    "Fase",
    "Data da tarefa",
    "Data início projeto",
    "Dias fase 2",
    "Próxima Ação",
    "Observação"
  ];
  const csv = [headers, ...sampleRows.map((row) => [
    row.cliente,
    row.responsavel,
    row.atividade,
    row.descricaoTarefa,
    row.statusTarefa,
    row.nivel,
    row.fase,
    row.data,
    row.dataInicioProjeto,
    row.diasImplantacao,
    row.proximaAcao,
    row.observacao
  ])]
    .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "modelo-painel-projectflow.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

el("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) handleFile(file);
});

el("downloadTemplate").addEventListener("click", downloadTemplate);

el("presentationToggle").addEventListener("click", () => {
  document.body.classList.toggle("presentation-mode");
  el("presentationToggle").innerHTML = document.body.classList.contains("presentation-mode")
    ? `<span class="icon">▢</span> Sair da apresentação`
    : `<span class="icon">▣</span> Modo apresentação`;
});

el("searchInput").addEventListener("input", (event) => {
  searchTerm = event.target.value;
  render();
});

el("scheduleClientSelect").addEventListener("change", (event) => {
  selectedScheduleClient = event.target.value;
  render();
});

el("projectStartInput").addEventListener("input", (event) => {
  if (!selectedScheduleClient) return;
  clientSchedules[selectedScheduleClient] = {
    ...getSchedule(selectedScheduleClient),
    startDate: event.target.value
  };
  render();
});

el("implantationDaysInput").addEventListener("input", (event) => {
  if (!selectedScheduleClient) return;
  clientSchedules[selectedScheduleClient] = {
    ...getSchedule(selectedScheduleClient),
    days: cleanDays(event.target.value)
  };
  render();
});

render();
