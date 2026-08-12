# 🏔️ Observatório de Dados Abertos, Predição Meteorológica & Controle Urbano - Complexo do Lins (Rio de Janeiro - RJ)

**Desenvolvedor Titular:** Augusto Cezar ([@gustocezar](https://github.com/gustocezar))  
**Licença & Direitos:** Todos os Direitos Reservados © 2026 Augusto Cezar. Proprietary Rights.

Plataforma de inteligência territorial, geoprocessamento GIS e monitoramento preventivo desenvolvida para as **12 comunidades e morros do Complexo do Lins** (Lins de Vasconcelos, XV RA - Méier, AP 3.2, Rio de Janeiro - RJ).

---

## 🌐 Acesso Online & PWA Mobile (4G/5G)

- 📱 **Link do Web App / PWA:** [https://gustocezar.github.io/app-complexo-lins/](https://gustocezar.github.io/app-complexo-lins/)
- 💻 **Repositório Oficial GitHub:** [https://github.com/gustocezar/app-complexo-lins](https://github.com/gustocezar/app-complexo-lins)

---

## 🌟 Principais Recursos & Abas Interativas

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
- 🛠️ [guia_especificacao_implementacao_desenvolvedor.md](guia_especificacao_implementacao_desenvolvedor.md) - Blueprint & Handover Técnico.
- 📖 [relatorio_verificacao_atendimento_1746_veracidade_alertas.md](relatorio_verificacao_atendimento_1746_veracidade_alertas.md) - Auditoria de SLA 1746 & Validação de Alertas.

---

## ⚖️ Licença & Direitos Autorais

Este projeto e seu código-fonte são protegidos por **Direitos Autorais e Propriedade Privada Exclusiva de Augusto Cezar** ([LICENSE](LICENSE)).  
© 2026 Augusto Cezar. Todos os Direitos Reservados.
