# Relatório Técnico: Painel em Tempo Real & Sala de Controle (Auto-Refresh 10 Minutos)

**Território:** Complexo do Lins (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ)  
**Frequência de Atualização:** Automática a cada **10 minutos (600 segundos)**  
**APIs Integradas:** COR-Rio (Centro de Operações), Alerta Rio (GEO-RIO), Open-Meteo Weather API, Central 1746 (Data.Rio) e Instituto Fogo Cruzado.

---

## 1. Arquitetura de Conexão com APIs em Tempo Real

A aplicação realiza requisições assíncronas em background utilizando um cronômetro regressivo de 600 segundos:

1. **Open-Meteo Weather API (`https://api.open-meteo.com/v1/forecast`):**
   - Coordenadas do Lins: `latitude=-22.9145&longitude=-43.2855`
   - Parâmetros extraídos em tempo real: Temperatura instantânea (°C), umidade relativa (%), velocidade do vento (km/h) e taxa de chuva atual (mm/h).
2. **Sistema Alerta Rio (Geo-Rio):**
   - Monitoramento do pluviômetro da Estação Lins/Grajaú.
   - Leitura contínua dos acumulados de 15 minutos, 1 hora, 4 horas e 24 horas.
3. **COR-Rio (Centro de Operações Rio):**
   - Transmissão do Estágio da Cidade (Estágio 1 - Normal até Estágio 5 - Crise).
4. **Central de Atendimento 1746 (Data.Rio):**
   - Stream de chamados abertos no dia com geolocalização e protocolo.

---

## 2. Indicadores do Painel do Dia ao Vivo

| Indicador ao Vivo | Fonte de Dados | Função no Painel |
| :--- | :--- | :--- |
| **Estágio da Cidade (COR-Rio)** | Centro de Operações Rio | Define o nível global de prontidão das equipes municipais. |
| **Temperatura & Sensação Térmica** | Open-Meteo API | Alertas de estresse térmico e insolação comunitária. |
| **Taxa de Precipitação (mm/h)** | Open-Meteo / Alerta Rio | Alimenta o modelo preditivo de alagamentos na R. Cabuçu. |
| **Acumulado Pluviométrico 24h** | Alerta Rio | Gatilho para emissão de alertas de escorregamento geotécnico. |
| **Feed de Chamados 1746 do Dia** | Central 1746 | Acompanhamento ao vivo de reclamações de esgoto e iluminação. |

---

## 3. Funcionamento da Atualização Automática (10 Minutos)

* O painel exibe um cronômetro visível `⏱️ Próxima atualização automática em: 09:59`.
* Ao atingir `00:00`, a aplicação reinicia a contagem e executa a atualização automática das métricas de clima, estágios do COR e feeds de ocorrências.
* O usuário pode clicar a qualquer momento no botão **`🔄 Atualizar APIs Agora`** para forçar uma nova leitura instantânea sem recarregar a página.
