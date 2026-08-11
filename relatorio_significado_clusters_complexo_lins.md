# Relatório Técnico: O que Significa o Cluster 1 & Nova Nomenclatura Descritiva dos Grupos Socioespaciais

**Território:** Complexo do Lins (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ)  
**Objeto:** Explicação conceitual e técnica sobre o **Cluster 1** e substituição de nomenclaturas abstratas por títulos autodescritivos e significativos baseados nos dados abertos do IBGE 2022, Geo-Rio, Central 1746 e DataSUS.

---

## 1. O que Significa o "Cluster 1"?

Na análise estatística multivariada por algoritmo **K-Means ($k=3$)**, o termo **Cluster 1** refere-se ao agrupamento de comunidades que apresentam a **maior acumulação de vulnerabilidades socioambientais, sanitárias e geológicas** do Complexo do Lins.

### 🔴 Morros Integrantes do Cluster 1:
1. **Morro do Cotia / Cotieira**
2. **Dona Francisca / Árvore Seca**
3. **Gambá / Bacia**
4. **Santa Terezinha**

---

## 2. Por que o Cluster 1 é o Grupo Mais Crítico? (Diagnóstico em Dados)

* **💧 Esgoto a Céu Aberto:** Até **49,0% dos domicílios no Morro do Gambá** não possuem ligação com a rede coletora formal de esgoto, lançando dejetos in natura nas valas.
* **⛰️ Risco Geotécnico de Deslizamento:** Classificado como **"Muito Alto"** pela Defesa Civil / Geo-Rio. É onde concentram-se os matacões de rocha instável mais perigosos (ex: bloco de 45 m³ no topo do Cotia com 28 moradias abaixo).
* **🦟 Vulnerabilidade Epidemiológica:** Taxa de notificação de Dengue atinge **650 casos por 100 mil habitantes**, diretamente impulsionada pelo esgoto parado e falta de abastecimento regular de água.
* **👶 Fila de Espera em Creches:** Maior demanda reprimida da primeira infância (mais de **345 crianças sem vaga na pré-escola**).
* **⏳ Lentidão no Atendimento Municipal (SLA 1746):** Tempo médio para a Prefeitura resolver um chamado do 1746 no Cluster 1 é de **14,2 dias** (contra 4,1 dias nas áreas consolidadas).

---

## 3. Novas Nomenclaturas Descritivas dos Grupos Socioespaciais

Para tornar o painel intuitivo e compreensível, os 3 clusters foram renomeados na plataforma:

| Nome Antigo | Nova Nomenclatura Descritiva | Tag Curta na Interface | Significado Técnico |
| :--- | :--- | :---: | :--- |
| **Cluster 1** | **Morros de Alta Vulnerabilidade Sanitária & Risco Geotécnico (Alerta Máximo)** | `Alta Vulnerabilidade Sanitária & Geotécnica` | Topo de morro com alto déficit de esgoto, risco de deslizamento e picos de Dengue. |
| **Cluster 2** | **Encostas de Adensamento Populacional & Risco Geológico Moderado/Alto** | `Encostas de Risco Geológico Moderado` | Alta densidade populacional, saneamento intermediário e necessidade de obras de contenção. |
| **Cluster 3** | **Áreas de Sopé com Maior Integração Urbana & Infraestrutura Básica** | `Sopé com Maior Integração Urbana` | Faixa de pé do morro com maior renda, maior escolaridade e 73% de saneamento adequado. |

---

## 4. Visualização na Aplicação Web (`http://localhost:3000`)

1. Acesse **`http://localhost:3000`**.
2. Clique na aba **`🤖 Clusters K-Means & Correlações`**.
3. Veja os cartões atualizados com as novas nomenclaturas descritivas, badges coloridos e significados detalhados para cada morro do Lins!
