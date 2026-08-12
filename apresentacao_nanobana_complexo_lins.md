# Apresentação Executiva Nanobana (Pitch Deck 7 Slides)
## Observatório do Complexo do Lins · Inteligência Territorial, PWA & Gestão Preditiva de Riscos

---

### 👨‍💻 Informações de Autoria & Contato
* **Desenvolvedor Titular:** Augusto Cezar
* **E-mail Oficial:** `gustocezar@gmail.com`
* **Repositório GitHub:** `https://github.com/gustocezar/app-complexo-lins`
* **Web App PWA (4G/5G):** `https://gustocezar.github.io/app-complexo-lins/`
* **Direitos Reservados:** Copyright (c) 2026 Augusto Cezar. Todos os Direitos Reservados.

---

## 💻 Slide 1: Capa & Apresentação do Desenvolvedor

```
===================================================================================
                   OBSERVATÓRIO URBANO DO COMPLEXO DO LINS
        Inteligência de Dados Abertos, Mapeamento GIS & Gestão Preditiva
===================================================================================
• Desenvolvedor Titular: Augusto Cezar
• E-mail para Contato & Suporte: gustocezar@gmail.com
• Repositório: github.com/gustocezar/app-complexo-lins
• PWA Oficial: gustocezar.github.io/app-complexo-lins/
• Rio de Janeiro - RJ | 2026
```

---

## 💻 Slide 2: Diagnóstico Socioambiental do Lins

```
===================================================================================
                    O DESAFIO: VULNERABILIDADE MULTIDIMENSIONAL
===================================================================================
• 34.850 moradores distribuídos em 12 morros e comunidades de forte declividade.
• 24,6% dos domicílios em áreas de risco geotécnico direto (blocos de rocha instáveis).
• 37,9% das residências sem esgotamento sanitário formal (esgoto in natura).
• 650 casos de Dengue / 100k hab. nos picos epidêmicos sazonais.
```

---

## 💻 Slide 3: Arquitetura Integrada em 10 Visões Interativas

```
===================================================================================
                ARQUITETURA INTEGRADA EM 10 VISÕES INTERATIVAS
===================================================================================
 1. 🔴 PAINEL DO DIA: Refresh 10min (Open-Meteo) + Histórico 24h auditável do 1746.
 2. 🗺️ MAPA GIS, CEP & GPS: Busca ViaCEP e GPS do celular com vetor Haversine.
 3. 🚦 SALA DE SITUAÇÃO OPERACIONAL: Horizontes operacionais de 7, 15 e 30 dias.
 4. 🔮 SIMULADOR PREDITIVO RAINRISK: Estimativa de chamados 1746 via chuva (mm/h).
 5. 📜 SÉRIES HISTÓRICAS: Censos IBGE (2000-2022) e temporais extremos (2010-2024).
 6. 🤖 CLUSTERS K-MEANS & PEARSON: Diagnóstico dos 3 grupos socioespaciais.
 7. 🏥 EPIDEMIOLOGIA: Curvas de Dengue, COVID-19 e internações por SRAG.
 8. 👶 EDUCAÇÃO: Déficit de vagas em creches públicas vs. escolaridade adulta.
 9. 👮 SEGURANÇA: Estatísticas da 25ª DP (ISP-RJ) e tiroteios (Fogo Cruzado).
10. 📚 MEMÓRIA & MOBILIDADE: Wikifavelas (Fiocruz) e mototáxis no OpenStreetMap.
```

---

## 💻 Slide 4: Inovação Tecnológica: Motores Preditivos & Haversine

```
===================================================================================
                MOTORES PREDITIVOS & CÁLCULO DE DISTÂNCIA GPS
===================================================================================
• ALGORITMO RAINRISK (Demandas 1746):
  N_alagamentos = round(4 + 6.5 * (P_h / 10) + 8.0 * (P_24h / 40))
  N_deslizamentos = round(1 + 3.5 * (P_24h / 40)^1.8)
  N_bueiros = round(6 + 4.2 * (P_h / 10))

• MOTOR GEODÉSICO DE HAVERSINE (Proximidade GPS / CEP):
  Calcula a distância exata em metros até a rocha instável mais próxima e traça 
  o vetor (polyline tracejada) no mapa Leaflet.
```

---

## 💻 Slide 5: Agrupamentos Socioespaciais K-Means ($k=3$)

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

## 💻 Slide 6: Aplicativo PWA Instalável no Celular

```
===================================================================================
            PROGRESSIVE WEB APP (PWA INSTALÁVEL NO CELULAR)
===================================================================================
• Service Worker (sw.js): Caching de mapas e dados para funcionamento offline.
• Manifesto Nativo (manifest.json): Modo standalone em tela cheia sem navegador.
• Instalação no Android: Clique em "📱 Instalar App no Celular".
• Instalação no iPhone: "Adicionar à Tela de Início" no Safari iOS.
• Link Público 4G/5G: gustocezar.github.io/app-complexo-lins/
```

---

## 💻 Slide 7: Contato, Licença & Encerramento

```
===================================================================================
                    CONTATO OFICIAL & DIREITOS DE AUTORIA
===================================================================================
• Desenvolvedor Titular: Augusto Cezar
• E-mail: gustocezar@gmail.com
• GitHub: https://github.com/gustocezar/app-complexo-lins
• PWA: https://gustocezar.github.io/app-complexo-lins/
• Direitos Reservados: © 2026 Augusto Cezar. Proprietary Rights.
```
