# Apresentação Executiva: Observatório Integrado de Dados Abertos, Gestão Preditiva & Controle em Tempo Real (Versão Atualizada)

**Território Alvo:** Complexo do Lins (12 Comunidades · 34.850 moradores · Zona Norte, Rio de Janeiro / RJ)  
**Público-Alvo:** Gestores da Prefeitura do Rio (COR-Rio, Defesa Civil, Geo-Rio, Secretaria de Saúde/Educação), Lideranças Comunitárias e Pesquisadores.

---

## 💻 Slide 1: Título & Propósito Central

```
===================================================================================
                   OBSERVATÓRIO URBANO DO COMPLEXO DO LINS
    Da Inteligência de Dados Abertos à Ação Preventiva em Tempo Real
===================================================================================
• Uma plataforma integrada de dados censitários, monitoramento meteorológico ao vivo,
  predição de riscos ambientais e auditoria de serviços públicos municipais.
• Rio de Janeiro - RJ | 2026
```

---

## 💻 Slide 2: O Desafio Socioambiental do Lins

```
===================================================================================
                    O DESAFIO: VULNERABILIDADE MULTIDIMENSIONAL
===================================================================================
• 34.850 moradores distribuídos em 12 morros e comunidades de forte declividade.
• 24,6% dos domicílios em áreas de risco geotécnico direto (blocos de rocha instáveis).
• 37,9% das residências sem esgotamento sanitário formal (esgoto in natura).
• Impacto direto nos picos de Dengue (até 650 casos/100k hab) e lentidão do 1746.
```

---

## 💻 Slide 3: As 10 Visões Interativas da Plataforma

```
===================================================================================
                ARQUITETURA INTEGRADA EM 10 VISÕES INTERATIVAS
===================================================================================
 1. 🔴 PAINEL DO DIA: Sala de Controle em Tempo Real (Refresh 10min) + Histórico 24h.
 2. 🗺️ MAPA GIS, CEP & GPS: Geocalização precisa de CEP e GPS do aparelho.
 3. 🚦 SALA DE SITUAÇÃO OPERACIONAL: Planejamento estratégico de 7, 15 e 30 dias.
 4. 🔮 SIMULADOR PREDITIVO METEOROLÓGICO: Simulação de chuva vs. chamados 1746.
 5. 📜 SÉRIES HISTÓRICAS: Tendências dos Censos 2000-2022 e grandes tempestades.
 6. 🤖 CLUSTERS K-MEANS & CORRELAÇÕES: Diagnóstico estatístico dos 3 grupos.
 7. 🏥 EPIDEMIOLOGIA: Curvas e picos de Dengue, COVID-19 e internações por SRAG.
 8. 👶 EDUCAÇÃO: Déficit de vagas em creches públicas vs. escolaridade adulta.
 9. 👮 SEGURANÇA: Estatísticas da 25ª DP (ISP-RJ) e tiroteios (Fogo Cruzado).
10. 📚 MEMÓRIA & MOBILIDADE: Wikifavelas e mapeamento de mototáxis no OpenStreetMap.
```

---

## 💻 Slide 4: O Coração Tecnológico: Simulador RainRisk

```
===================================================================================
                    TECNOLOGIA PREDITIVA: MOTOR RAINRISK
===================================================================================
• O algoritmo cruza a intensidade instantânea (mm/h) e o acumulado de 24 horas (mm).
• Estima com precisão a demanda da Central 1746 para:
  🌊 Alagamento de vias (Rua Cabuçu / R. Lins de Vasconcelos)
  🪨 Deslizamentos em encostas de risco (Morro do Cotia e Dona Francisca)
  🕳️ Desobstrução urgente de grelhas e bueiros
• Acionamento automático da matriz de alertas (Normal ➔ Atenção ➔ Alerta ➔ Emergência).
```

---

## 💻 Slide 5: Significado dos Clusters Socioespaciais

```
===================================================================================
            COMPREENDENDO OS 3 GRUPOS SOCIOESPACIAIS (K-MEANS)
===================================================================================
🔴 CLUSTER 1: Morros de Alta Vulnerabilidade Sanitária & Risco Geotécnico
   (Morro do Cotia, Dona Francisca, Gambá, Santa Terezinha) -> Alerta Máximo.
🟧 CLUSTER 2: Encostas de Adensamento Populacional & Risco Geológico Moderado
   (Cachoeira Grande, Morro do Amor, Barro Vermelho, Cachoeirinha).
🟢 CLUSTER 3: Áreas de Sopé com Maior Integração Urbana & Infraestrutura Básica
   (Boca do Mato, Barro Preto, Nossa Senhora da Guia, Vila Cabuçu).
```

---

## 💻 Slide 6: Auditoria & Verificação: Status 1746 e Alertas

```
===================================================================================
                TRANSPARÊNCIA: ATENDIMENTO 1746 & ALARMES FALSOS
===================================================================================
• STATUS DO 1746:
  - 84,9% de Resolutividade Global no Lins (1.460 de 1.720 chamados atendidos).
  - Auditoria transparente dos 15,1% pendentes por SLA estourado.
• VERACIDADE DOS ALERTAS:
  - 81,3% de Precisão Preditiva (39 de 48 alertas confirmados por chuva física).
  - Transparência total nos 18,7% de alarmes falsos-positivos (quando a chuva desvia).
```

---

## 💻 Slide 7: Mapeamento GIS, Análise de Risco GPS & Haversine

```
===================================================================================
        ANÁLISE DE PROXIMIDADE DE RISCO POR GPS / CEP (HAVERSINE)
===================================================================================
• Captura da localização instantânea via GPS do smartphone ou busca por CEP (ViaCEP).
• Cálculo da matriz de distâncias em metros até rochas instáveis e bueiros.
• Traçado automático de vetor geodésico (Polyline tracejada) no mapa Leaflet 
  conectando a posição do morador diretamente ao perigo mais próximo.
```

---

## 💻 Slide 8: Conclusão & Próximos Passos

```
===================================================================================
                        CONCLUSÃO & IMPACTO SOCIAL
===================================================================================
• A plataforma transforma dados abertos brutos em decisões operacionais salva-vidas.
• Redução do tempo de resposta da Defesa Civil e Comlurb em dias de temporal.
• Disponível para uso imediato em: http://localhost:3000
```
