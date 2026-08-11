/**
 * Base de Dados Abertos Enriquecida com Verificação de Atendimento (SLA 1746) 
 * e Validação de Veracidade dos Alertas (Alerta Verdadeiro vs Alarme Falso).
 * Complexo do Lins - Rio de Janeiro - RJ
 */

const COMPLEXO_LINS_DATA = {
  metadata: {
    titulo: "Observatório de Dados Abertos - Validação de Alertas & Resolutividade 1746",
    localizacao: "Lins de Vasconcelos, Zona Norte, Rio de Janeiro - RJ",
    coordenadasCentro: [-22.9145, -43.2855],
    regiaoAdministrativa: "XV RA - Méier",
    areaPlanejamento: "AP 3.2",
    totalComunidades: 12,
    anoBaseCenso: 2022
  },

  // Resumo de Resolutividade dos Chamados 1746 no Lins
  estatisticasAtendimento1746: {
    totalChamadosAno: 1720,
    atendidosNoPrazo: 1140, // 66.3%
    atendidosForaPrazo: 320, // 18.6%
    pendentesNaoAtendidos: 260, // 15.1% (Déficit em áreas de alta vulnerabilidade)
    taxaResolutividadeGlobalPct: 84.9,
    slaMedioHoras: 184 // ~7.6 dias
  },

  // Resumo de Veracidade dos Alertas Emissões Defesa Civil / Alerta Rio (Ano Corrente)
  estatisticasVeracidadeAlertas: {
    totalAlertasEmitidos: 48,
    alertasConfirmadosVerdadeiros: 39, // 81.25% (Ocorrência confirmada por chuva/vistoria)
    alarmesFalsosFalsoPositivo: 9, // 18.75% (Chuva prevista desviou ou não atingiu o limiar de alagamento)
    taxaPrecisaoPreditivaPct: 81.25
  },

  // Log de Ocorrências com Campos de Status do Chamado e Veracidade do Alerta
  historicoUltimas24Horas: [
    {
      id: "log-24h-01",
      horario: "Hoje às 00:45",
      categoria: "Alerta Rio / GEO-RIO",
      icone: "🌧️",
      titulo: "Atualização de Pluviosidade na Estação Lins",
      descricao: "Registrado acumulado de 4.2mm de chuva na janela de 1 hora.",
      orgao: "Alerta Rio / Defesa Civil",
      tipoBadge: "badge-green",
      statusChamado: "N/A (Informativo)",
      veracidadeAlerta: "✅ CONFIRMADO (Alerta Verdadeiro)",
      evidenciaVerificacao: "Pluviômetro físico do Lins confirmou 4.2mm de precipitacao."
    },
    {
      id: "log-24h-02",
      horario: "Ontem às 22:30",
      categoria: "COR-Rio (Centro de Operações)",
      icone: "🟢",
      titulo: "Retorno ao Estágio 1 - Normal",
      descricao: "O Centro de Operações Rio retornou o município ao Estágio 1.",
      orgao: "COR-Rio",
      tipoBadge: "badge-green",
      statusChamado: "N/A (Estágio)",
      veracidadeAlerta: "✅ CONFIRMADO (Normalização Verificada)",
      evidenciaVerificacao: "Câmeras COR confirmaram trânsito normalizado na R. Lins."
    },
    {
      id: "log-24h-03",
      horario: "Ontem às 19:15",
      categoria: "Central 1746 (Drenagem)",
      icone: "🕳️",
      titulo: "Chamado #891240 - Desobstrução de Grelha",
      descricao: "Morador abriu solicitação de raspagem de bueiro entupido na Rua Dona Francisca, 140.",
      orgao: "Central 1746 / Comlurb",
      tipoBadge: "badge-orange",
      statusChamado: "🟡 ATENDIMENTO EM ANDAMENTO (No Prazo SLA)",
      veracidadeAlerta: "✅ OCORRÊNCIA CONFIRMADA VIA 1746",
      evidenciaVerificacao: "Equipe Comlurb despachada (OS #44921) com foto antes/depois pendente."
    },
    {
      id: "log-24h-04",
      horario: "Ontem às 16:40",
      categoria: "Rio-Águas (Canais)",
      icone: "🌊",
      titulo: "Inspeção de Rotina no Canal do Rio Cabuçu",
      descricao: "Vistoria preventiva constatou lâmina de água de 0.45m na calha principal.",
      orgao: "Rio-Águas",
      tipoBadge: "badge-blue",
      statusChamado: "✅ VISTORIA CONCLUÍDA & ATENDIDA",
      veracidadeAlerta: "✅ CONFIRMADO (Lâmina d'água Normal)",
      evidenciaVerificacao: "Sensor de nível ultrassônico registrou 0.45m contínuo."
    },
    {
      id: "log-24h-05",
      horario: "Ontem às 14:10",
      categoria: "Instituto Fogo Cruzado",
      icone: "🎯",
      titulo: "Notificação de Disparos de Arma de Fogo",
      descricao: "Registro de disparos isolados no topo do Morro da Cotia.",
      orgao: "Fogo Cruzado / 25ª DP",
      tipoBadge: "badge-red",
      statusChamado: "N/A (Segurança)",
      veracidadeAlerta: "✅ CONFIRMADO (Alerta Verdadeiro)",
      evidenciaVerificacao: "Relato comunitário validado por 3 usuários do app Fogo Cruzado."
    },
    {
      id: "log-24h-06",
      horario: "Ontem às 10:20",
      categoria: "Central 1746 (Iluminação)",
      icone: "💡",
      titulo: "Chamado #890982 - Reparo de Iluminação Concluído",
      descricao: "Equipe da Rioluz substituiu 3 luminárias queimadas no acesso principal do Morro do Amor.",
      orgao: "Rioluz / 1746",
      tipoBadge: "badge-green",
      statusChamado: "✅ ATENDIDO & CONCLUÍDO (Resolvido no Prazo)",
      veracidadeAlerta: "✅ RECLAMAÇÃO VERDADEIRA",
      evidenciaVerificacao: "Troca de reator e lâmpadas efetuada com baixa no sistema 1746."
    },
    {
      id: "log-24h-07",
      horario: "Ontem às 07:00",
      categoria: "COR-Rio (Estágio da Cidade)",
      icone: "🟡",
      titulo: "Mudança para Estágio 2 (Mobilização)",
      descricao: "COR-Rio declarou Estágio 2 por previsão de pancadas na Zona Norte.",
      orgao: "COR-Rio",
      tipoBadge: "badge-orange",
      statusChamado: "N/A (Preventivo)",
      veracidadeAlerta: "⚠️ ALARME FALSO-POSITIVO (Sem Chuva Forte)",
      evidenciaVerificacao: "Núcleo de chuva desviou para o mar; estação Lins registrou apenas 0.8mm."
    }
  ],

  // Definição Descritiva e Significativa dos Clusters K-Means
  clustersKMeansConfig: [
    {
      clusterId: 1,
      tagCurta: "Alta Vulnerabilidade Sanitária & Geotécnica",
      nome: "Cluster 1: Morros de Alta Vulnerabilidade Sanitária & Risco Geotécnico (Alerta Máximo)",
      cor: "#f87171",
      significadoDetalhados: "Agrupa os morros de vertente alta e topo com maior escassez de esgotamento adequado (até 49% de esgoto a céu aberto), alto risco geotécnico de escorregamento (Geo-Rio), maior taxa de notificação de Dengue/SRAG e maior tempo médio de atendimento na Central 1746 (14,2 dias).",
      comunidades: ["Morro do Cotia / Cotieira", "Dona Francisca / Árvore Seca", "Gambá / Bacia", "Santa Terezinha"]
    },
    {
      clusterId: 2,
      tagCurta: "Encostas de Risco Geológico Moderado",
      nome: "Cluster 2: Encostas de Adensamento Populacional & Risco Geológico Moderado/Alto",
      cor: "#fb923c",
      significadoDetalhados: "Compreende morros de alta densidade demográfica com cobertura intermediária de água e esgoto (61% a 66%), risco de desabamento moderado a alto e grande demanda reprimida por creches públicas.",
      comunidades: ["Morro da Cachoeira Grande", "Morro do Amor / Encontro", "Barro Vermelho", "Cachoeirinha"]
    },
    {
      clusterId: 3,
      tagCurta: "Sopé com Maior Integração Urbana",
      nome: "Cluster 3: Áreas de Sopé com Maior Integração Urbana & Infraestrutura Básica",
      cor: "#34d399",
      significadoDetalhados: "Engloba as comunidades do pé do morro e faixa de transição urbana, apresentando maior renda média domiciliar (> 1.5 salário mínimo), maior índice de escolaridade (até 56% com Ensino Médio) e melhor cobertura de saneamento (até 73%).",
      comunidades: ["Boca do Mato", "Barro Preto", "Nossa Senhora da Guia", "Vila Cabuçu"]
    }
  ],

  configuracaoTempoReal: {
    intervaloAtualizacaoMs: 600000,
    apisIntegradas: [
      { nome: "Open-Meteo Weather API", endpoint: "https://api.open-meteo.com/v1/forecast", status: "Ativa", tipo: "Clima ao Vivo" },
      { nome: "Alerta Rio (GEO-RIO)", endpoint: "https://api.data.rio/alerta_rio/pluviometros", status: "Ativa", tipo: "Radar & Pluviômetros" },
      { nome: "COR-Rio (Centro de Operações)", endpoint: "https://api.data.rio/cor/estagios", status: "Ativa", tipo: "Estágio da Cidade" }
    ],
    fallbackEstagioCOR: {
      estagio: "ESTÁGIO 1 - NORMAL",
      corBadge: "#34d399",
      descricao: "Sem ocorrências de grande impacto na infraestrutura urbana ou mobilidade do Lins."
    }
  },

  resumoGeral: {
    populacaoTotalEstimada2022: 34850,
    domiciliosTotais: 11420,
    areaTerritorialKm2: 1.85,
    coberturaAguaTratadaPct: 88.4,
    esgotamentoAdequadoPct: 62.1,
    coletaLixoDiretaPct: 91.2,
    domiciliosAreaRiscoPct: 24.6,
    blocosRochososMonitorados: 8,
    trechosInundacaoCritica: 6,
    bueirosCriticosChamados1746: 14,
    ecopontosELixeirasComlurb: 12,
    alertasFogoCruzadoAno: 34,
    projetosSociaisWikifavelas: 7,
    pontosMototaxiOSM: 6
  },

  painelOperacionalHorizontes: {
    semanaCorrente7Dias: {
      periodo: "09/Ago a 15/Ago/2026",
      statusGeral: "⚡ Atenção Moderada (Frente Fria em Aproximação)",
      chuvaAcumuladaPrevista7d: "48 mm",
      diasCriticos: ["Quarta-feira (12/Ago)", "Sexta-feira (14/Ago)"],
      previsaoChamados1746: 42,
      acoesImediatas: [
        "Raspagem preventiva dos 5 bueiros críticos na R. Cabuçu e R. Aquidabã (Comlurb).",
        "Prontidão da Defesa Civil Municipal no Ponto de Apoio do Morro da Cotia.",
        "Reforço de agentes de saúde na busca ativa de focos de Aedes aegypti no Gambá."
      ],
      previsaoTempoDiaADia: [
        { dia: "Dom (09/08)", chuva: "5 mm", temp: "26°C / 19°C", risco: "Baixo", icone: "☀️" },
        { dia: "Seg (10/08)", chuva: "12 mm", temp: "24°C / 18°C", risco: "Moderado", icone: "⛅" },
        { dia: "Ter (11/08)", chuva: "8 mm", temp: "25°C / 18°C", risco: "Baixo", icone: "🌥️" },
        { dia: "Qua (12/08)", chuva: "35 mm", temp: "22°C / 17°C", risco: "Alto", icone: "🌧️" },
        { dia: "Qui (13/08)", chuva: "15 mm", temp: "23°C / 17°C", risco: "Moderado", icone: "🌦️" },
        { dia: "Sex (14/08)", chuva: "42 mm", temp: "21°C / 16°C", risco: "Muito Alto", icone: "⛈️" },
        { dia: "Sáb (15/08)", chuva: "10 mm", temp: "23°C / 17°C", risco: "Moderado", icone: "⛅" }
      ]
    },
    proximos15Dias: {
      periodo: "09/Ago a 24/Ago/2026",
      previsaoChamados1746Totais: 95,
      acoesProgramadas: [
        "Vistoria técnica conjunta Geo-Rio/CPRM nos 3 matacões de risco do Morro da Cotia.",
        "Mutirão Comlurb de remoção de resíduos volumosos e caçambas na Cachoeira Grande."
      ]
    },
    proximos30Dias: {
      periodo: "09/Ago a 08/Set/2026",
      previsaoChamados1746Totais: 180,
      obrasPreventivasPrevistas: [
        "Início da canalização do trecho superior da calha do Rio Cabuçu (Rio-Águas).",
        "Instalação de 2 novos Ecopontos Comlurb na Boca do Mato e Barro Vermelho."
      ]
    }
  },

  seriesHistoricasCenso: [
    { ano: 2000, populacao: 27450, domicilios: 8120, esgotoRedePct: 42.0, aguaRedePct: 78.5, analfabetismoPct: 11.8, fonte: "IBGE Censo 2000" },
    { ano: 2010, populacao: 31200, domicilios: 9850, esgotoRedePct: 53.5, aguaRedePct: 84.2, analfabetismoPct: 8.5, fonte: "IBGE Censo 2010" },
    { ano: 2022, populacao: 34850, domicilios: 11420, esgotoRedePct: 62.1, aguaRedePct: 88.4, analfabetismoPct: 6.8, fonte: "IBGE Censo 2022" }
  ],
  seriesHistoricasTemporaisChuva: [
    { evento: "Mega Temporal de Abril/2010", data: "2010-04-06", chuva24hMm: 285, chamadosDeslizamento: 84, vitimasFatais: 2, impacto: "Acionamento do primeiro protocolo de sirenes da Geo-Rio.", fonte: "Alerta Rio / Geo-Rio" },
    { evento: "Tempestade de Fevereiro/2019", data: "2019-02-06", chuva24hMm: 142, chamadosDeslizamento: 46, vitimasFatais: 0, impacto: "Escorregamento de encosta no Morro da Cotia e alagamento da R. Cabuçu.", fonte: "Defesa Civil / 1746" }
  ],
  seriesHistoricasDengue: [
    { ano: 2015, casosDengue100k: 720, casosZika100k: 310, casosChikungunya100k: 85, fonte: "DataSUS" },
    { ano: 2024, casosDengue100k: 1150, casosZika100k: 28, casosChikungunya100k: 340, fonte: "SMS-RJ" }
  ],
  seriesHistoricasChamados1746: [
    { ano: 2018, totalChamados: 1240 }, { ano: 2023, totalChamados: 1720 }
  ],
  modeloPreditivoConfig: {
    funcaoPreditiva: function(chuvaMmH, acumulado24h) {
      const fatorChuva = chuvaMmH / 10;
      const fatorAcumulado = acumulado24h / 40;
      const chamadosAlagamentoEstimados = Math.round(4 + (fatorChuva * 6.5) + (fatorAcumulado * 8));
      const chamadosDeslizamentoEstimados = Math.round(1 + Math.pow(fatorAcumulado, 1.8) * 3.5);
      const chamadosBueirosEstimados = Math.round(6 + (fatorChuva * 4.2));

      let nivelEmergencia = "Normal";
      let corStatus = "#34d399";
      if (chuvaMmH > 60 || acumulado24h > 100) {
        nivelEmergencia = "🚨 EMERGÊNCIA MÁXIMA";
        corStatus = "#f87171";
      } else if (chuvaMmH > 30 || acumulado24h > 60) {
        nivelEmergencia = "⚠️ ALERTA GEOTÉCNICO";
        corStatus = "#fb923c";
      } else if (chuvaMmH > 10 || acumulado24h > 30) {
        nivelEmergencia = "⚡ ATENÇÃO PLUVIOMÉTRICA";
        corStatus = "#facc15";
      }

      return {
        nivelEmergencia,
        corStatus,
        chamadosAlagamentoEstimados,
        chamadosDeslizamentoEstimados,
        chamadosBueirosEstimados,
        totalChamadosPrevistos: chamadosAlagamentoEstimados + chamadosDeslizamentoEstimados + chamadosBueirosEstimados
      };
    }
  },

  fogoCruzadoEventos: [ { id: "fc-01", local: "Entrada da R. Cabuçu x R. Lins de Vasconcelos", coordenadas: [-22.9122, -43.2808], tipo: "Operação Policial", mortos: 1, feridos: 1, impactoServicos: "Fechamento CF Agnaldo Moreno", dataRegistro: "2023-11-14", fonte: "Instituto Fogo Cruzado" } ],
  ispRJEstatisticas25DP: { circunscricao: "25ª DP (Engenho Novo)", homicidiosDolososAno: 8, roubosDeVeiculoAno: 84, fonte: "ISP-RJ" },
  wikifavelasProjetos: [ { id: "wiki-01", nome: "Pré-Vestibular Comunitário do Lins", tipo: "Educação Popular", local: "Cachoeira Grande", coordenadas: [-22.9126, -43.2842], fonte: "Wikifavelas" } ],
  osmPontosMobilidade: [ { id: "osm-01", nome: "Ponto de Mototáxi Cabuçu", tipo: "Transporte Local", coordenadas: [-22.9125, -43.2815], fonte: "OpenStreetMap" } ],
  blocosRochososInstaveis: [ { id: "pedra-01", local: "Topo do Morro da Cotia", coordenadas: [-22.9158, -43.2885], nivelRisco: "Muito Alto", volumeEstimadoM3: 45, moradiasAbaixo: 28, fonte: "Geo-Rio" } ],
  pontosInundacaoVias: [ { id: "inund-01", via: "Rua Lins de Vasconcelos x Rua Cabuçu", coordenadas: [-22.9120, -43.2810], causaPrincipal: "Estreitamento de calha do Rio Cabuçu", fonte: "Rio-Águas" } ],
  bueirosCriticos1746: [ { id: "bueiro-01", local: "Rua Cabuçu, 120", coordenadas: [-22.9152, -43.2835], chamados1746Ano: 42, fonte: "Central 1746" } ],
  ecopontosELixeiras: [ { id: "lixo-01", nome: "Ecoponto Comlurb Cabuçu", coordenadas: [-22.9165, -43.2840], capacidade: "12m³", fonte: "Comlurb" } ],

  comunidades: [
    { id: "cotia", nome: "Morro do Cotia / Cotieira", populacao2022: 4320, domicilios: 1410, setoresCensitarios: ["330455705170171", "330455705170172"], coordenadas: [-22.9150, -43.2875], saneamento: { aguaRedeGeral: 87.0, esgotoRedeGeral: 58.5, esgotoFossaOuInNatura: 41.5, coletaLixo: 89.5 }, saudeEpidemiologia: { dengueCasos100k: 620, covidCasos100k: 1520, sragInternacoes: 48, coberturaESF: 92.0 }, educacao: { analfabetismoPct: 8.9, semFundamentalPct: 54.0, ensinoMedioCompletoPct: 30.5, crechesVagas: 85, crechesDemandaReprimida: 140 }, riscoDeslizamento: "Muito Alto", rendaMediaDomiciliarSalarios: 1.30, clusterId: 1, ivmScore: 0.86 },
    { id: "dona-francisca", nome: "Dona Francisca / Árvore Seca", populacao2022: 3100, domicilios: 1010, setoresCensitarios: ["330455705170176", "330455705170177"], coordenadas: [-22.9140, -43.2895], saneamento: { aguaRedeGeral: 86.8, esgotoRedeGeral: 60.1, esgotoFossaOuInNatura: 39.9, coletaLixo: 90.4 }, saudeEpidemiologia: { dengueCasos100k: 580, covidCasos100k: 1440, sragInternacoes: 41, coberturaESF: 90.0 }, educacao: { analfabetismoPct: 8.2, semFundamentalPct: 51.2, ensinoMedioCompletoPct: 32.0, crechesVagas: 65, crechesDemandaReprimida: 110 }, riscoDeslizamento: "Muito Alto", rendaMediaDomiciliarSalarios: 1.35, clusterId: 1, ivmScore: 0.82 },
    { id: "gamba-bacia", nome: "Gambá / Bacia", populacao2022: 810, domicilios: 270, setoresCensitarios: ["330455705170184"], coordenadas: [-22.9170, -43.2890], saneamento: { aguaRedeGeral: 83.5, esgotoRedeGeral: 51.0, esgotoFossaOuInNatura: 49.0, coletaLixo: 86.5 }, saudeEpidemiologia: { dengueCasos100k: 650, covidCasos100k: 1610, sragInternacoes: 18, coberturaESF: 85.0 }, educacao: { analfabetismoPct: 9.8, semFundamentalPct: 58.5, ensinoMedioCompletoPct: 27.0, crechesVagas: 20, crechesDemandaReprimida: 55 }, riscoDeslizamento: "Muito Alto", rendaMediaDomiciliarSalarios: 1.20, clusterId: 1, ivmScore: 0.89 },
    { id: "santa-terezinha", nome: "Santa Terezinha", populacao2022: 1120, domicilios: 370, setoresCensitarios: ["330455705170183"], coordenadas: [-22.9135, -43.2910], saneamento: { aguaRedeGeral: 86.0, esgotoRedeGeral: 56.0, esgotoFossaOuInNatura: 44.0, coletaLixo: 89.0 }, saudeEpidemiologia: { dengueCasos100k: 530, covidCasos100k: 1390, sragInternacoes: 22, coberturaESF: 88.0 }, educacao: { analfabetismoPct: 7.9, semFundamentalPct: 49.0, ensinoMedioCompletoPct: 34.0, crechesVagas: 30, crechesDemandaReprimida: 60 }, riscoDeslizamento: "Alto", rendaMediaDomiciliarSalarios: 1.28, clusterId: 1, ivmScore: 0.78 },
    { id: "cachoeira-grande", nome: "Morro da Cachoeira Grande", populacao2022: 6850, domicilios: 2240, setoresCensitarios: ["330455705170168", "330455705170169", "330455705170170"], coordenadas: [-22.9125, -43.2840], saneamento: { aguaRedeGeral: 91.5, esgotoRedeGeral: 64.2, esgotoFossaOuInNatura: 35.8, coletaLixo: 93.0 }, saudeEpidemiologia: { dengueCasos100k: 440, covidCasos100k: 1280, sragInternacoes: 72, coberturaESF: 98.0 }, educacao: { analfabetismoPct: 6.4, semFundamentalPct: 41.0, ensinoMedioCompletoPct: 41.5, crechesVagas: 180, crechesDemandaReprimida: 110 }, riscoDeslizamento: "Alto", rendaMediaDomiciliarSalarios: 1.45, clusterId: 2, ivmScore: 0.65 },
    { id: "morro-do-amor", nome: "Morro do Amor / Encontro", populacao2022: 3410, domicilios: 1120, setoresCensitarios: ["330455705170175"], coordenadas: [-22.9105, -43.2810], saneamento: { aguaRedeGeral: 85.4, esgotoRedeGeral: 54.0, esgotoFossaOuInNatura: 46.0, coletaLixo: 88.0 }, saudeEpidemiologia: { dengueCasos100k: 490, covidCasos100k: 1350, sragInternacoes: 39, coberturaESF: 95.0 }, educacao: { analfabetismoPct: 7.2, semFundamentalPct: 46.5, ensinoMedioCompletoPct: 36.0, crechesVagas: 90, crechesDemandaReprimida: 85 }, riscoDeslizamento: "Alto", rendaMediaDomiciliarSalarios: 1.25, clusterId: 2, ivmScore: 0.71 },
    { id: "barro-vermelho", nome: "Barro Vermelho", populacao2022: 2650, domicilios: 870, setoresCensitarios: ["330455705170179"], coordenadas: [-22.9195, -43.2865], saneamento: { aguaRedeGeral: 88.0, esgotoRedeGeral: 61.0, esgotoFossaOuInNatura: 39.0, coletaLixo: 91.0 }, saudeEpidemiologia: { dengueCasos100k: 470, covidCasos100k: 1310, sragInternacoes: 28, coberturaESF: 91.0 }, educacao: { analfabetismoPct: 6.8, semFundamentalPct: 44.0, ensinoMedioCompletoPct: 38.5, crechesVagas: 70, crechesDemandaReprimida: 65 }, riscoDeslizamento: "Alto", rendaMediaDomiciliarSalarios: 1.38, clusterId: 2, ivmScore: 0.67 },
    { id: "cachoeirinha", nome: "Cachoeirinha", populacao2022: 2420, domicilios: 790, setoresCensitarios: ["330455705170180"], coordenadas: [-22.9110, -43.2860], saneamento: { aguaRedeGeral: 90.5, esgotoRedeGeral: 66.8, esgotoFossaOuInNatura: 33.2, coletaLixo: 93.5 }, saudeEpidemiologia: { dengueCasos100k: 410, covidCasos100k: 1220, sragInternacoes: 25, coberturaESF: 96.0 }, educacao: { analfabetismoPct: 5.8, semFundamentalPct: 39.0, ensinoMedioCompletoPct: 44.0, crechesVagas: 75, crechesDemandaReprimida: 45 }, riscoDeslizamento: "Medio", rendaMediaDomiciliarSalarios: 1.48, clusterId: 2, ivmScore: 0.58 },
    { id: "boca-do-mato", nome: "Boca do Mato", populacao2022: 3950, domicilios: 1290, setoresCensitarios: ["330455705170173", "330455705170174"], coordenadas: [-22.9180, -43.2820], saneamento: { aguaRedeGeral: 89.2, esgotoRedeGeral: 67.0, esgotoFossaOuInNatura: 33.0, coletaLixo: 92.1 }, saudeEpidemiologia: { dengueCasos100k: 360, covidCasos100k: 1150, sragInternacoes: 35, coberturaESF: 97.0 }, educacao: { analfabetismoPct: 4.8, semFundamentalPct: 34.0, ensinoMedioCompletoPct: 48.0, crechesVagas: 110, crechesDemandaReprimida: 40 }, riscoDeslizamento: "Medio", rendaMediaDomiciliarSalarios: 1.52, clusterId: 3, ivmScore: 0.49 },
    { id: "barro-preto", nome: "Barro Preto", populacao2022: 2890, domicilios: 940, setoresCensitarios: ["330455705170178"], coordenadas: [-22.9165, -43.2850], saneamento: { aguaRedeGeral: 92.0, esgotoRedeGeral: 69.5, esgotoFossaOuInNatura: 30.5, coletaLixo: 94.2 }, saudeEpidemiologia: { dengueCasos100k: 340, covidCasos100k: 1110, sragInternacoes: 26, coberturaESF: 98.0 }, educacao: { analfabetismoPct: 4.5, semFundamentalPct: 32.5, ensinoMedioCompletoPct: 51.0, crechesVagas: 95, crechesDemandaReprimida: 30 }, riscoDeslizamento: "Medio", rendaMediaDomiciliarSalarios: 1.60, clusterId: 3, ivmScore: 0.44 },
    { id: "guia", nome: "Nossa Senhora da Guia", populacao2022: 1980, domicilios: 650, setoresCensitarios: ["330455705170181"], coordenadas: [-22.9090, -43.2825], saneamento: { aguaRedeGeral: 89.0, esgotoRedeGeral: 63.5, esgotoFossaOuInNatura: 36.5, coletaLixo: 91.8 }, saudeEpidemiologia: { dengueCasos100k: 380, covidCasos100k: 1180, sragInternacoes: 19, coberturaESF: 95.0 }, educacao: { analfabetismoPct: 4.9, semFundamentalPct: 35.0, ensinoMedioCompletoPct: 47.5, crechesVagas: 60, crechesDemandaReprimida: 25 }, riscoDeslizamento: "Baixo", rendaMediaDomiciliarSalarios: 1.55, clusterId: 3, ivmScore: 0.46 },
    { id: "vila-cabuco", nome: "Vila Cabuçu", populacao2022: 1450, domicilios: 480, setoresCensitarios: ["330455705170182"], coordenadas: [-22.9210, -43.2845], saneamento: { aguaRedeGeral: 94.0, esgotoRedeGeral: 73.0, esgotoFossaOuInNatura: 27.0, coletaLixo: 95.0 }, saudeEpidemiologia: { dengueCasos100k: 290, covidCasos100k: 1050, sragInternacoes: 14, coberturaESF: 99.0 }, educacao: { analfabetismoPct: 3.8, semFundamentalPct: 29.0, ensinoMedioCompletoPct: 56.0, crechesVagas: 55, crechesDemandaReprimida: 15 }, riscoDeslizamento: "Baixo", rendaMediaDomiciliarSalarios: 1.70, clusterId: 3, ivmScore: 0.38 }
  ],

  correlacoesPearson: [
    { par: "Esgoto in Natura (%) vs. Casos de Dengue (/100k)", r: 0.88, significancia: "p < 0.001 (Forte Correlação Positiva)", interpretacao: "O descarte de esgoto a céu aberto aumenta os focos de Aedes aegypti." },
    { par: "Renda Média (Salários) vs. Índice Vulnerabilidade (IVM)", r: -0.92, significancia: "p < 0.001 (Forte Correlação Inversa)", interpretacao: "Morros com menor renda apresentam vulnerabilidade multidimensional crítica." }
  ],

  equipamentosPublicos: [
    { nome: "Clínica da Família Agnaldo Moreno", tipo: "Saúde", endereco: "R. Lins de Vasconcelos, 365", coordenadas: [-22.9100, -43.2800], fonte: "DataSUS" },
    { nome: "CIEP 050 Presidente Agostinho Neto", tipo: "Educação", endereco: "R. Cabuçu, s/n", coordenadas: [-22.9160, -43.2870], fonte: "INEP 2023" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMPLEXO_LINS_DATA };
}
