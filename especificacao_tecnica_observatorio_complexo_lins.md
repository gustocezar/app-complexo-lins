# Especificação Técnica de Arquitetura de Software & Dados (Versão 3.0)
## Plataforma de Observatório Censitário, Predição Meteorológica & Gestão de Riscos Urbana: Complexo do Lins - Rio de Janeiro / RJ

---

## 1. Visão Geral da Arquitetura

A plataforma é um **Sistema de Informação Geográfica (GIS) e Painel de Controle Operacional em Tempo Real** desenvolvido para integração de dados governamentais abertos, monitoramento de desastres naturais, acompanhamento epidemiológico e planejamento urbano socioespacial no Complexo do Lins (XV RA - Méier, AP 3.2, Rio de Janeiro - RJ).

```
+-----------------------------------------------------------------------------------+
|                            CAMADA DE APRESENTAÇÃO (UI/UX)                         |
|  • HTML5 Semantic · CSS Vanilla (Glassmorphism & Dark Neon)                       |
|  • Chart.js (Gráficos Interativos) · Leaflet GIS (Mapas em Camadas + Polylines)   |
|  • Floating Toast Notification System · Auto-Refresh Countdown Timer (10min)     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                        CAMADA DE LÓGICA & MOTORES DO SISTEMA                      |
|  • Motor de Polling Real-Time (10 min)  • Algoritmo Preditivo RainRisk            |
|  • Calculador Geodésico Haversine      • Análise de Risco Mais Próximo (GPS/CEP)  |
|  • Classificador de Clusters K-Means      • Auditor de Resolutividade SLA 1746      |
|  • Geocodificador ViaCEP + Nominatim    • Validador de Veracidade de Alertas      |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                         CAMADA DE DADOS & APIS EXTERNAS                           |
|  • Open-Meteo Weather API (ao vivo)    • Alerta Rio / GEO-RIO (Pluviômetros)      |
|  • COR-Rio (Estágios da Cidade)        • Central 1746 (Data.Rio / Chamados)       |
|  • IBGE Censos (2000, 2010, 2022)      • Instituto Fogo Cruzado (Geolocalizado)  |
|  • OpenStreetMap / Nominatim / ViaCEP  • Wikifavelas (Fiocruz / Projetos)         |
+-----------------------------------------------------------------------------------+
```

---

## 2. Análise de Proximidade de Riscos Geodésicos (Fórmula de Haversine)

Quando o usuário consulta um **CEP** ou aciona o **GPS do aparelho**, o motor geodésico calcula em tempo real a distância euclidiana/esférica em metros até a matriz de perigos:

### 📐 Equação de Haversine Aplicada
\[
a = \sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1) \cdot \cos(\phi_2) \cdot \sin^2\left(\frac{\Delta \lambda}{2}\right)
\]
\[
c = 2 \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1-a}\right), \quad d = R \cdot c \quad (R = 6.371.000\,\text{m})
\]

* **Vetores Auditados:**
  1. 🪨 **Bloco Rochoso Instável mais próximo** (Volume em $\text{m}^3$ e residências na rota de impacto).
  2. 🌊 **Ponto de Inundação em Via Urbana** (Rua Cabuçu / R. Lins de Vasconcelos).
  3. 🕳️ **Bueiro Crítico (Central 1746)** (Histórico de obstruções por descarte irregular).
* **Representação Cartográfica:** Desenho de vetor tracejado em tempo real (`L.polyline`) conectando a posição GPS do usuário ao risco mais próximo.

---

## 3. Modelo Preditivo Meteorológico (RainRisk Engine)

O algoritmo **RainRisk** estima as demandas da Central 1746 e a matriz de emergência com base na intensidade instantânea ($P_{\text{horária}}$ em $\text{mm/h}$) e no acumulado das últimas 24h ($P_{24h}$ em $\text{mm}$):

\[
N_{\text{alagamentos}} = \text{round}\left(4 + 6,5 \cdot \frac{P_{\text{horária}}}{10} + 8,0 \cdot \frac{P_{24h}}{40}\right)
\]
\[
N_{\text{deslizamentos}} = \text{round}\left(1 + 3,5 \cdot \left(\frac{P_{24h}}{40}\right)^{1,8}\right)
\]
\[
N_{\text{bueiros}} = \text{round}\left(6 + 4,2 \cdot \frac{P_{\text{horária}}}{10}\right)
\]

### 🚦 Matriz de Níveis de Emergência

| Condição Limite | Nível de Emergência | Código de Cor | Ações Automáticas |
| :--- | :--- | :---: | :--- |
| $P_{\text{horária}} \le 10\,\text{mm/h} \land P_{24h} \le 30\,\text{mm}$ | **Normal** | `#34d399` | Monitoramento contínuo regular. |
| $P_{\text{horária}} > 10\,\text{mm/h} \lor P_{24h} > 30\,\text{mm}$ | **⚡ Atenção Pluviométrica** | `#facc15` | Alerta de prontidão para equipes da Comlurb. |
| $P_{\text{horária}} > 30\,\text{mm/h} \lor P_{24h} > 60\,\text{mm}$ | **⚠️ Alerta Geotécnico** | `#fb923c` | Prontidão da Defesa Civil nos pontos de apoio. |
| $P_{\text{horária}} > 60\,\text{mm/h} \lor P_{24h} > 100\,\text{mm}$ | **🚨 Emergência Máxima** | `#f87171` | Acionamento das sirenes do Morro da Cotia e evacuação. |

---

## 4. Auditoria de SLA 1746 & Validação de Alertas

1. **Atendimento 1746:**
   - Taxa de Resolutividade Global no Lins: **84,9% (1.460 / 1.720 chamados atendidos)**.
   - 15,1% pendentes auditados por estouro de prazo do SLA.
2. **Precisão Preditiva de Alertas:**
   - Assertividade dos Alertas Emitidos: **81,3% (39 / 48 confirmados por pluviômetro)**.
   - Transparência em 18,7% de alarmes falsos-positivos (nuvem desviada para o mar).

---

## 5. Nomenclaturas Descritivas dos Grupos Socioespaciais K-Means ($k=3$)

* **Cluster 1 (`Morros de Alta Vulnerabilidade Sanitária & Risco Geotécnico`):** *Morro do Cotia, Dona Francisca, Gambá, Santa Terezinha*. Topo de morro, esgoto in natura (49%), alto risco de deslizamento e picos de Dengue.
* **Cluster 2 (`Encostas de Adensamento Populacional & Risco Geológico Moderado`):** *Cachoeira Grande, Morro do Amor, Barro Vermelho, Cachoeirinha*. Encostas densas, saneamento intermediário e falta de vagas em creches.
* **Cluster 3 (`Áreas de Sopé com Maior Integração Urbana & Infraestrutura Básica`):** *Boca do Mato, Barro Preto, N. Sra. da Guia, Vila Cabuçu*. Sopé, renda $> 1,5$ salários, 73% saneamento.

---

## 6. Mapeamento Funcional das 10 Visões Interativas

| # | Aba / Visão na Interface | Módulo Responsável | Dados & Funcionalidades Principais |
| :---: | :--- | :---: | :--- |
| **1** | `🔴 Painel do Dia (10min) & 24h` | `initLiveDashboard()` | Timer regressivo 10min, API Open-Meteo, Alerta Rio, Linha do Tempo 24h auditável. |
| **2** | `🗺️ Mapa GIS, CEP & GPS` | `initMap()`, `initLocationControls()` | Busca ViaCEP, GPS HTML5, Haversine, Vetor `L.polyline` de Risco Mais Próximo. |
| **3** | `🚦 Sala de Situação (7/15/30d)` | `renderOperationalPanel()` | Horizontes de 7 dias (previsão diária), 15 dias (ações) e 30 dias (obras preventivas). |
| **4** | `🔮 Simulador Preditivo RainRisk` | `initPredictiveSimulator()` | Sliders de chuva horária/acumulada e cálculo em tempo real de chamados 1746. |
| **5** | `📜 Séries Históricas (2000-2024)` | `renderHistoricalTable()` | Evolução Censitária IBGE (2000-2022), temporais extremos e curva 1746. |
| **6** | `🤖 Clusters K-Means & Pearson` | `renderClusterCards()`, `renderPearsonTable()` | Cartões descritivos dos 3 clusters, matriz de Pearson ($r$) e Scatter Plots. |
| **7** | `🏥 Epidemiologia (Dengue/COVID)` | `initCharts()` | Curvas de incidência de Dengue, COVID-19 e internações por SRAG por comunidade. |
| **8** | `👶 Educação & Creches` | `initCharts()` | Déficit de vagas em creches (atendidas vs reprimida) e nível de escolaridade. |
| **9** | `👮 Segurança & Fogo Cruzado` | `data.ispRJEstatisticas25DP` | Estatísticas policiais da 25ª DP e tiroteios georreferenciados do Fogo Cruzado. |
| **10** | `📚 Memória & Mobilidade OSM` | `data.wikifavelasProjetos` | Projetos da comunidade (Wikifavelas/Fiocruz) e pontos de mototáxi no OpenStreetMap. |

---

## 7. Requisitos Não-Funcionais & Protocolos de Segurança

1. **Desempenho:** Carregamento inicial em $< 1,2$ segundos com renderização assíncrona de gráficos Chart.js e Leaflet.
2. **Privacidade (LGPD / HTML5 Geolocation):** A coordenada lida do GPS do dispositivo do usuário é processada exclusivamente no navegador cliente (Client-Side), sem armazenamento ou transmissão para servidores externos.
3. **Execução Offline / Resiliência:** Fallback inteligente caso a Open-Meteo Weather API esteja indisponível, garantindo o funcionamento do painel sem travamentos.
