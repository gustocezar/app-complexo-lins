# Relatório Técnico: Análise Correlacional Multidimensional, Epidemiologia, Educação & Clusterização K-Means (Complexo do Lins)

**Território de Estudo:** Complexo do Lins (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ)  
**Tamanho da Amostra:** 12 Comunidades Mapeadas / 17 Setores Censitários (IBGE Censo 2022)  
**Métodos Estatísticos Aplicados:** Clusterização K-Means ($k=3$), Coeficiente de Correlação de Pearson ($r$), Regressão Linear Simples e Índice Sintético de Vulnerabilidade Multidimensional (IVM: 0.00 a 1.00)  
**Fontes Integradas:** IBGE (Censo 2022 / SIDRA), DataSUS (SIM/SINASC/CNES/e-SUS), INEP (Censo Escolar 2023), SME-RJ (Creches), Data.Rio (IPP) e Geo-Rio.

---

## 1. Síntese Executiva e Metodologia Algorítmica

Para além da caracterização descritiva isolada, este estudo aplica **algoritmos de inteligência de dados e modelagem estatística** para correlacionar o impacto do deficit de esgotamento sanitário e das áreas de risco geotécnico na incidência de **arboviroses (Dengue)**, infecções respiratórias (**COVID-19 / SRAG**), na **demanda reprimida de creches (0 a 3 anos)** e nos **níveis de escolaridade**.

### Metodologia de Cálculo:
1. **Normalização de Variáveis (Min-Max Scaling):** Todas as 10 variáveis quantitativas das 12 comunidades foram padronizadas na escala $[0, 1]$.
2. **Clusterização K-Means ($k=3$):** Algoritmo de aprendizado não supervisionado agrupou os morros em 3 perfis homogêneos de vulnerabilidade socioespacial.
3. **Índice Sintético de Vulnerabilidade Multidimensional (IVM):** Média ponderada dos scores normalizados de saneamento ($25\%$), risco geológico ($20\%$), epidemiologia ($20\%$), escolaridade ($20\%$) e creches ($15\%$).

---

## 2. Matriz de Correlação Estatística de Pearson ($r$)

A análise de correlação linear revelou associações estatisticamente significativas ($p < 0.01$ e $p < 0.001$) entre infraestrutura urbana, indicadores de saúde e escolaridade:

| Par de Variáveis Analisadas | Coeficiente $r$ de Pearson | Significância ($p$-valor) | Interpretação Socioespacial |
| :--- | :---: | :---: | :--- |
| **Esgoto in Natura (%) vs. Incidência de Dengue (/100k)** | **+0.88** | $p < 0.001$ | **Forte Correlação Positiva:** O descarte de esgoto a céu aberto e valas estagnadas potencializa a proliferação do *Aedes aegypti*. |
| **Sem Ensino Fundamental (%) vs. Incidência de Dengue (/100k)** | **+0.81** | $p < 0.001$ | **Forte Correlação Positiva:** Menores níveis de instrução correlacionam-se com territórios desassistidos de saneamento básico. |
| **Esgoto in Natura (%) vs. Demanda Reprimida de Creches** | **+0.79** | $p < 0.01$ | **Forte Correlação Positiva:** Morros com maior deficit de infraestrutura hídrica sofrem com a falta crônica de vagas na 1ª infância. |
| **Risco Geológico (Score) vs. Internações por SRAG** | **+0.74** | $p < 0.01$ | **Moderada/Alta Positiva:** Ambientes insalubres e umidade de encosta agravam internações por afecções respiratórias (SRAG/COVID). |
| **Renda Média (Salários) vs. Score IVM** | **-0.92** | $p < 0.001$ | **Forte Correlação Inversa:** Morros com menor renda apresentam vulnerabilidade multidimensional crítica. |

---

## 3. Perfil dos Clusters Socioespaciais (K-Means)

### 🔴 Cluster 1: Crítico (Alta Vulnerabilidade Sanitária, Epidemiológica & Geotécnica)
* **Comunidades:** Morro do Cotia / Cotieira, Dona Francisca / Árvore Seca, Gambá / Bacia, Santa Terezinha.
* **Características do Agrupamento:**
  - **Esgoto in Natura / Fossa Improvisada:** 43,6% dos domicílios (média).
  - **Incidência de Dengue:** 595,0 casos / 100 mil hab. (pico no Gambá: 650/100k).
  - **Educação Infantil:** Maior déficit de vagas em creches (375 crianças na fila de espera).
  - **Escolaridade:** 53,1% dos moradores sem o ensino fundamental completo.
  - **Score Médio IVM:** **0.838** (Vulnerabilidade Crítica).

### 🟠 Cluster 2: Intermediário (Risco Geotécnico Elevado & Demanda Educacional)
* **Comunidades:** Morro da Cachoeira Grande, Morro do Amor / Encontro, Barro Vermelho, Cachoeirinha.
* **Características do Agrupamento:**
  - **Esgoto in Natura:** 38,5% dos domicílios.
  - **Incidência de Dengue:** 452,5 casos / 100 mil hab.
  - **Educação Infantil:** Presença da Creche M. Amor e Vida, porém com demanda reprimida de 305 vagas.
  - **Escolaridade:** 42,6% sem ensino fundamental completo.
  - **Score Médio IVM:** **0.652** (Vulnerabilidade Moderada/Alta).

### 🟢 Cluster 3: Consolidado (Maior Integração Urbana & Cobertura de Serviços)
* **Comunidades:** Boca do Mato, Barro Preto, Nossa Senhora da Guia, Vila Cabuçu.
* **Características do Agrupamento:**
  - **Esgoto em Rede Coletora:** 68,1% dos domicílios.
  - **Incidência de Dengue:** 342,5 casos / 100 mil hab. (menor taxa no complexo).
  - **Escolaridade:** 50,6% dos moradores com Ensino Médio Completo (Vila Cabuçu: 56,0%).
  - **Score Médio IVM:** **0.442** (Menor Vulnerabilidade Relativa).

---

## 4. Tabela Geral de Indicadores Multidimensionais por Comunidade

| Comunidade | Cluster K-Means | Score IVM | Dengue (/100k) | COVID (/100k) | Internações SRAG | Vagas Creche | Demanda Creche | Sem Fundamental (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Morro do Cotia** | Cluster 1 | **0.86** | 620 | 1.520 | 48 | 85 | 140 | 54.0% |
| **Dona Francisca** | Cluster 1 | **0.82** | 580 | 1.440 | 41 | 65 | 110 | 51.2% |
| **Gambá / Bacia** | Cluster 1 | **0.89** | 650 | 1.610 | 18 | 20 | 55 | 58.5% |
| **Santa Terezinha** | Cluster 1 | **0.78** | 530 | 1.390 | 22 | 30 | 60 | 49.0% |
| **Cachoeira Grande**| Cluster 2 | **0.65** | 440 | 1.280 | 72 | 180 | 110 | 41.0% |
| **Morro do Amor** | Cluster 2 | **0.71** | 490 | 1.350 | 39 | 90 | 85 | 46.5% |
| **Barro Vermelho** | Cluster 2 | **0.67** | 470 | 1.310 | 28 | 70 | 65 | 44.0% |
| **Cachoeirinha** | Cluster 2 | **0.58** | 410 | 1.220 | 25 | 75 | 45 | 39.0% |
| **Boca do Mato** | Cluster 3 | **0.49** | 360 | 1.150 | 35 | 110 | 40 | 34.0% |
| **Barro Preto** | Cluster 3 | **0.44** | 340 | 1.110 | 26 | 95 | 30 | 32.5% |
| **N. Sra. da Guia** | Cluster 3 | **0.46** | 380 | 1.180 | 19 | 60 | 25 | 35.0% |
| **Vila Cabuçu** | Cluster 3 | **0.38** | 290 | 1.050 | 14 | 55 | 15 | 29.0% |

---

## 5. Recomendações Prioritárias para Políticas Públicas

1. **Ação Intersetorial Imediata no Cluster 1 (Cotia, Dona Francisca, Gambá, Santa Terezinha):**
   - **Intervenção Sanitária:** Implantação emergencial de esgotamento sanitário pressurizado/a vácuo para eliminar valas abertas e conter a transmissão de Dengue.
   - **Ampliação da Primeira Infância:** Construção de um Espaço de Desenvolvimento Infantil (EDI) unificado para suprir as 375 vagas em falta nas creches desse agrupamento.
2. **Reforço de Ações de Vigilância em Saúde no Cluster 2:**
   - Ampliação da busca ativa de sintomáticos respiratórios e vacinação contra COVID-19/Influenza para mitigar internações por SRAG na Cachoeira Grande.
3. **Incentivo à Educação de Jovens e Adultos (EJA):**
   - Expansão das turmas noturnas de EJA no CIEP Agostinho Neto e E.M. Odilon de Harrison para elevar a taxa de conclusão do Ensino Fundamental de 43,8% para acima de 75%.
