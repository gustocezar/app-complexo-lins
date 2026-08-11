# 🏔️ Observatório de Dados Abertos, Predição Meteorológica & Controle Urbano - Complexo do Lins (Rio de Janeiro - RJ)

Plataforma de inteligência territorial, geoprocessamento GIS e monitoramento preventivo desenvolvida para as **12 comunidades e morros do Complexo do Lins** (Lins de Vasconcelos, XV RA - Méier, AP 3.2, Rio de Janeiro - RJ).

---

## 🌟 Principais Recursos & Abas Interativas (`http://localhost:3000`)

1. **🔴 Painel do Dia (Tempo Real 10min) & 24h:**
   - Leitura de clima ao vivo via **Open-Meteo Weather API** com timer regressivo de 10 minutos e botão `🔄 Atualizar APIs Agora`.
   - **Linha do Tempo de 24 Horas** auditável com status do chamado 1746 (`✅ ATENDIDO & CONCLUÍDO`, `🟡 EM ANDAMENTO`, `❌ PENDENTE/SLA ESTOURADO`) e veracidade do alerta (`✅ CONFIRMADO` vs `⚠️ ALARME FALSO-POSITIVO`).

2. **🗺️ Mapa GIS, CEP & GPS:**
   - Busca por CEP via **ViaCEP** e **Nominatim OpenStreetMap**.
   - Captura de **GPS do Dispositivo HTML5** com cálculo automático da distância em metros (Fórmula de Haversine) até o **Risco Mais Próximo** (bloco de rocha instável ou trecho inundável) e desenho de linha vetorial tracejada no mapa.

3. **🚦 Sala de Situação Operacional (7 / 15 / 30 Dias):**
   - Horizontes operacionais de gestão: previsão do tempo dia a dia (7d), plano de contingência (15d) e metas de obras preventivas (30d).

4. **🔮 Simulador Preditivo Meteorológico (RainRisk Engine):**
   - Sliders de intensidade de chuva ($0-120\,\text{mm/h}$) e acumulado 24h ($0-200\,\text{mm}$) para calcular em tempo real a demanda esperada da Central 1746 (alagamentos, escorregamentos e bueiros).

5. **📜 Séries Históricas (2000-2024):**
   - Tendências censitárias IBGE (2000, 2010, 2022), curva de epidemias de Dengue (2015-2024) e histórico de temporais extremos (Abril/2010, Fev/2019, Jan/2024).

6. **🤖 Clusters K-Means & Matriz de Pearson:**
   - Classificação descritiva dos 3 grupos socioespaciais (*Morros de Alta Vulnerabilidade Sanitária & Geotécnica*, *Encostas de Risco Geológico Moderado*, *Sopé com Maior Integração Urbana*).
   - Matriz de correlação de Pearson ($r = +0,88$ entre esgoto e dengue).

7. **🏥 Epidemiologia (Dengue, COVID & SRAG):**
   - Curvas de notificação de arboviroses e internações por Síndrome Respiratória Aguda Grave.

8. **👶 Educação & Vagas em Creches:**
   - Balanço de vagas atendidas vs demanda reprimida na primeira infância e taxa de escolaridade.

9. **👮 Segurança & Fogo Cruzado:**
   - Estatísticas policiais da 25ª DP (ISP-RJ) e tiroteios georreferenciados do Instituto Fogo Cruzado.

10. **📚 Memória & Mobilidade OSM:**
    - Projetos sociais do acervo **Wikifavelas (Fiocruz)** e rede de mobilidade local (pontos de mototáxi e escadarias) mapeada no **OpenStreetMap**.

---

## 📖 Documentação & Relatórios Técnicos

- 📄 [especificacao_tecnica_observatorio_complexo_lins.md](especificacao_tecnica_observatorio_complexo_lins.md) - Arquitetura de Software & Motores Geodésicos.
- 💻 [apresentacao_executiva_observatorio_complexo_lins.md](apresentacao_executiva_observatorio_complexo_lins.md) - Apresentação Executiva Slide a Slide.
- 📖 [relatorio_verificacao_atendimento_1746_veracidade_alertas.md](relatorio_verificacao_atendimento_1746_veracidade_alertas.md) - Auditoria de SLA 1746 & Validação de Alertas.
- 📖 [relatorio_geolocalizacao_cep_gps_complexo_lins.md](relatorio_geolocalizacao_cep_gps_complexo_lins.md) - Geocodificação CEP & GPS HTML5.
- 📖 [relatorio_significado_clusters_complexo_lins.md](relatorio_significado_clusters_complexo_lins.md) - Nomenclaturas e Diagnóstico dos Clusters K-Means.

---

## 🚀 Como Executar Localmente

```bash
python3 -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.
