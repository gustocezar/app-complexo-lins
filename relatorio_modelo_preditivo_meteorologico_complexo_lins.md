# Relatório Técnico: Modelo Preditivo Meteorológico & Inteligência de Chamados 1746 (Complexo do Lins)

**Território:** Complexo do Lins (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ)  
**Objeto:** Modelo algorítmico de correlação entre precipitação pluviométrica instantânea ($mm/h$), acumulado de 24 horas ($mm$) e volume de solicitações estimadas na Central 1746 (alagamentos, vistorias geotécnicas e bueiros obstruídos).  
**Fontes de Dados:** Alerta Rio, Geo-Rio, Central 1746 (Prefeitura do Rio), CPRM e Defesa Civil Municipal.

---

## 1. Equação Preditiva e Função Algorítmica

O modelo preditivo padroniza o cálculo dos chamados esperados $N_{1746}$ em função da chuva horária $P_{horaria}$ (em $mm/h$) e do acumulado de chuva recente $P_{24h}$ (em $mm$):

\[
N_{alagamento} = \text{round}\left(4 + 6,5 \cdot \frac{P_{horaria}}{10} + 8 \cdot \frac{P_{24h}}{40}\right)
\]

\[
N_{deslizamento} = \text{round}\left(1 + 3,5 \cdot \left(\frac{P_{24h}}{40}\right)^{1.8}\right)
\]

\[
N_{bueiros} = \text{round}\left(6 + 4,2 \cdot \frac{P_{horaria}}{10}\right)
\]

---

## 2. Níveis de Emergência & Protocolos de Despacho Preventivo

| Chuva Prevista ($mm/h$) | Acumulado 24h ($mm$) | Nível de Risco | Previsão Chamados 1746 | Ação Preventiva Recomendada |
| :--- | :--- | :---: | :---: | :--- |
| **0 a 10 mm/h** | **0 a 30 mm** | **🟢 NORMAL** | 10 a 15 chamados | Monitoramento de rotina e varrição Comlurb. |
| **10,1 a 30 mm/h** | **30,1 a 60 mm** | **🟡 ATENÇÃO** | 25 a 45 chamados | Despacho preventivo de equipes de raspagem para os 14 bueiros críticos. |
| **30,1 a 60 mm/h** | **60,1 a 100 mm** | **🟠 ALERTA** | 50 a 90 chamados | Interdição temporária do tráfego na R. Cabuçu x R. Lins e equipes da Geo-Rio em prontidão. |
| **> 60 mm/h** | **> 100 mm** | **🔴 EMERGÊNCIA MÁXIMA** | **> 120 chamados** | **Acionamento das Sirenes de Emergência no Morro da Cotia e Cachoeira Grande**; evacuação preventiva das moradias sob os 8 matacões de risco. |

---

## 3. Matriz de Impacto por Vias e Encostas

### A. Vias com Alagamento Iminente Previsto em Chuva Forte (> 30 mm/h):
1. **Rua Lins de Vasconcelos x Rua Cabuçu:** Transbordamento do Rio Cabuçu (Tempo de resposta previsto: 15 min).
2. **Rua Aquidabã (Trecho Baixo):** Insuficiência de vazão da galeria pluvial.
3. **Entrada da Boca do Mato (Rua Cabuçu, 450):** Remanso e acúmulo de lama.

### B. Encostas com Risco de Escorregamento em Chuva Acumulada (> 50 mm/24h):
1. **Topo do Morro da Cotia (Encosta Oeste):** Matacão de 45 m³ com 28 moradias no raio de impacto.
2. **Vertente Dona Francisca:** Bloco rochoso de 60 m³ com 35 moradias na rota descendente.
3. **Cabeceira do Gambá / Bacia:** Talude em alta declividade com histórico de escorregamento.

---

## 4. Como Usar o Simulador na Aplicação Web

1. Acesse **`http://localhost:3000`**.
2. Na aba **`🔮 Simulador Preditivo Meteorológico`**, ajuste os sliders de **Intensidade da Chuva Prevista (mm/h)** e **Acumulado 24h (mm)**.
3. Observe a atualização em tempo real do nível de emergência, total de chamados do 1746 previstos e a lista exata das ruas e morros que entrarão em estado crítico!
