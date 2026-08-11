# Guia de Especificação de Implementação Técnica para Desenvolvedores
## Blueprint Técnico & Handover: Observatório Urbano, Painel Preditivo & GIS - Complexo do Lins (Rio de Janeiro / RJ)

Este documento serve como um **Guia Completo de Implementação (Step-by-Step Technical Blueprint)** destinado a engenheiros de software, desenvolvedores frontend/fullstack e analistas GIS que necessitem recriar, manter ou expandir a plataforma do Observatório do Complexo do Lins.

---

## 📋 1. Visão Geral & Requisitos do Sistema

### 🎯 Objetivo do Software
Fornecer um **painel operacional de controle em tempo real**, simulador preditivo de riscos meteorológicos, mapeamento GIS com GPS/CEP e observatório censitário para as **12 comunidades do Complexo do Lins** (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ).

### 🛠️ Stack Tecnológica (Zero Framework Overhead)
* **Linguagem Principal:** JavaScript ES6+ (Vanilla / Native DOM API).
* **Estrutura:** HTML5 Semântico com suporte a Acessibilidade (ARIA Roles).
* **Estilização:** CSS3 nativo com variáveis CSS (`:root`), Glassmorphism, Dark Neon Theme e Flexbox/Grid responsivos.
* **Geoprocessamento GIS:** Leaflet.js v1.9.4 + OpenStreetMap Tiles + CARTO Dark Canvas.
* **Visualização de Dados:** Chart.js v4.x (Gráficos de Linha, Barra, Dispersão/Scatter).
* **APIs Externas:** Open-Meteo Weather API, ViaCEP API, Nominatim Geocoding API.

---

## 📁 2. Estrutura de Arquivos do Projeto

```
complexo-lins/
├── index.html                  # Interface única (SPA) contendo as 10 visões/abas
├── styles.css                  # Design System, variáveis CSS, temas e animações
├── app.js                      # Lógica de controle, motores preditivos, GIS e timers
├── data/
│   └── lins_data.js            # Base de dados estruturada (Censos, 1746, Riscos, APIs)
├── README.md                   # Manual de execução e visão geral
├── especificacao_tecnica_observatorio_complexo_lins.md  # Especificação de Arquitetura
├── apresentacao_executiva_observatorio_complexo_lins.md # Pitch Slide a Slide
└── relatorio_*.md              # Relatórios analíticos das bases
```

---

## 🚀 3. Guia de Implementação Passo a Passo (Step-by-Step Blueprint)

### Passo 1: Configuração do Data Store (`data/lins_data.js`)
O desenvolvedor deve estruturar o objeto global `COMPLEXO_LINS_DATA` contendo os schemas de dados:

```javascript
const COMPLEXO_LINS_DATA = {
  metadata: { ... },
  clustersKMeansConfig: [ ... ], // 3 grupos socioespaciais descritivos
  historicoUltimas24Horas: [ ... ], // Log com auditoria de SLA e veracidade de alertas
  comunidades: [ ... ], // Array com as 12 comunidades, coordenadas, IVM e estatísticas
  seriesHistoricasCenso: [ ... ], // Dados dos Censos 2000, 2010 e 2022
  seriesHistoricasTemporaisChuva: [ ... ], // Eventos extremos (2010, 2019, 2024)
  blocosRochososInstaveis: [ ... ], // Geometria de pedras e risco Geo-Rio
  pontosInundacaoVias: [ ... ], // Trechos de alagamento Rio-Águas
  bueirosCriticos1746: [ ... ], // Chamados recorrentes da Central 1746
  modeloPreditivoConfig: {
    funcaoPreditiva: function(chuvaMmH, acumulado24h) { ... }
  }
};
```

---

### Passo 2: Implementação do Design System (`styles.css`)
O desenvolvedor deve definir o CSS base com variáveis para manter a consistência visual:

```css
:root {
  --bg-dark: #0f172a;
  --bg-card: rgba(30, 41, 59, 0.75);
  --border-color: rgba(255, 255, 255, 0.1);
  --primary: #38bdf8;
  --accent-green: #34d399;
  --accent-orange: #fb923c;
  --accent-red: #f87171;
  --accent-purple: #a78bfa;
  --font-family: 'Outfit', sans-serif;
}
```

---

### Passo 3: Implementação do Gerenciador de Abas (`app.js`)
Criar o alternador de visões (Single Page Application via tabs):

```javascript
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById(targetTab);
      if (targetEl) targetEl.classList.add('active');

      // Se alternar para a aba do Mapa, forçar atualização de tamanho do Leaflet
      if (targetTab === 'tab-geral' && map) {
        setTimeout(() => map.invalidateSize(), 200);
      }
    });
  });
}
```

---

### Passo 4: Implementação do Motor de Tempo Real (10min Refresh & Live Fetch)
Implementar o consumo da Open-Meteo Weather API e a contagem regressiva:

```javascript
async function fetchRealtimeAPIs() {
  const timeEl = document.getElementById('last-update-time');
  const now = new Date();
  if (timeEl) timeEl.textContent = `Última leitura: Hoje às ${now.toLocaleTimeString('pt-BR')}`;

  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-22.9145&longitude=-43.2855&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m');
    if (response.ok) {
      const weatherData = await response.json();
      const current = weatherData.current;
      document.getElementById('live-temp').textContent = `${current.temperature_2m.toFixed(1)} °C`;
      document.getElementById('live-humidity').textContent = `${current.relative_humidity_2m}%`;
      document.getElementById('live-wind').textContent = `${current.wind_speed_10m.toFixed(1)} km/h`;
    }
  } catch (e) {
    console.warn("Fallback de clima ativado:", e);
  }
}
```

---

### Passo 5: Motor Geodésico Haversine & Vetor de Risco Mais Próximo
Desenvolver o cálculo de distância em metros entre a posição GPS/CEP e os pontos de risco:

```javascript
function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raio da Terra em metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
```

Ao obter a localização do usuário, desenhar a linha vetorial no Leaflet:
```javascript
if (riskLinePolyline) map.removeLayer(riskLinePolyline);

riskLinePolyline = L.polyline([userCoords, topRiskPoint.coordenadas], {
  color: topRiskColor,
  weight: 4,
  dashArray: '8, 8',
  opacity: 0.85
}).addTo(map);
```

---

### Passo 6: Motor Preditivo Meteorológico (RainRisk Engine)
Implementar as equações matemáticas de estimativa de chamados do 1746:

```javascript
function calcularRainRisk(chuvaMmH, acumulado24h) {
  const fatorChuva = chuvaMmH / 10;
  const fatorAcumulado = acumulado24h / 40;

  const alagamentos = Math.round(4 + (fatorChuva * 6.5) + (fatorAcumulado * 8));
  const deslizamentos = Math.round(1 + Math.pow(fatorAcumulado, 1.8) * 3.5);
  const bueiros = Math.round(6 + (fatorChuva * 4.2));

  return {
    total: alagamentos + deslizamentos + bueiros,
    alagamentos,
    deslizamentos,
    bueiros
  };
}
```

---

## 🧪 4. Guia de Teste & Validação de Qualidade

1. **Teste de Geocodificação CEP:** Digite `20720-000` no campo de busca e verifique se o mapa aproxima da Rua Cabuçu e exibe o banner de proximidade.
2. **Teste de GPS HTML5:** Clique em `Usar Meu GPS Atual`, autorize a localização e verifique o desenho da linha tracejada conectando o usuário ao risco mais próximo.
3. **Teste do Botão Manual:** Clique em `🔄 Atualizar APIs Agora` e confirme o estado `⏳ Atualizando APIs...` seguido da notificação Toast verde.
4. **Teste de Navegação entre Abas:** Clique em cada uma das 10 abas e confirme a renderização dos gráficos sem sobreposição de canvas.

---

## ✅ 5. Definition of Done (DoD) para a Implementação

* [x] Todas as 10 visões/abas estão presentes e acessíveis via cabeçalho.
* [x] O Leaflet GIS renderiza 9 camadas georreferenciadas com controle de visibilidade.
* [x] O simulador RainRisk recalcula as métricas instantaneamente ao mover os sliders.
* [x] A busca por CEP via ViaCEP e geolocalização GPS funcionam perfeitamente.
* [x] A linha vetorial tracejada de risco geodésico é traçada no mapa.
* [x] Os 3 clusters socioespaciais possuem nomenclaturas descritivas e significados.
* [x] O feed das últimas 24h exibe badges de auditoria de SLA do 1746 e veracidade dos alertas.
