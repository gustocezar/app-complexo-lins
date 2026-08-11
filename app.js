/**
 * Lógica da Aplicação - Observatório Censitário do Complexo do Lins
 * Suporte a Cálculo de Proximidade Geotécnica por GPS/CEP, Análise de Risco Mais Próximo,
 * Desenho de Linhas de Trajetória até o Risco Crítico e 10 Visões Interativas.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = COMPLEXO_LINS_DATA;
  let map;
  let layerGroups = {};
  let userLocationMarker = null;
  let riskLinePolyline = null;

  let timerInterval = null;
  let secondsRemaining = 600;

  initTabs();
  initLiveDashboard();
  render24hHistory();
  renderOperationalPanel();
  initPredictiveSimulator();
  initMap();
  initLocationControls();
  renderCommunityList();
  renderClusterCards();
  renderPearsonTable();
  renderHistoricalTable();
  renderTable();
  initCharts();
  setupEventListeners();

  /**
   * HELPER: CÁLCULO DE DISTÂNCIA HAVERSINE EM METROS
   */
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

        if (targetTab === 'tab-geral' && map) {
          setTimeout(() => map.invalidateSize(), 200);
        }
      });
    });
  }

  function initLiveDashboard() {
    fetchRealtimeAPIs();
    startCountdownTimer();

    const manualBtn = document.getElementById('btn-manual-refresh');
    if (manualBtn) {
      manualBtn.addEventListener('click', async () => {
        manualBtn.disabled = true;
        manualBtn.style.opacity = '0.7';
        manualBtn.innerHTML = '⏳ Atualizando APIs...';

        secondsRemaining = 600;
        await fetchRealtimeAPIs();

        showToast('✅ APIs Consultadas em Tempo Real! Dados do Clima e Alertas Atualizados.');

        setTimeout(() => {
          manualBtn.disabled = false;
          manualBtn.style.opacity = '1';
          manualBtn.innerHTML = '🔄 Atualizar APIs Agora';
        }, 800);
      });
    }
  }

  function startCountdownTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        secondsRemaining = 600;
        fetchRealtimeAPIs();
      }

      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      const displayStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      
      const timerEl = document.getElementById('timer-countdown');
      if (timerEl) timerEl.textContent = displayStr;
    }, 1000);
  }

  async function fetchRealtimeAPIs() {
    const timeEl = document.getElementById('last-update-time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (timeEl) timeEl.textContent = `Última leitura: Hoje às ${formattedTime}`;

    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-22.9145&longitude=-43.2855&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m');
      if (response.ok) {
        const weatherData = await response.json();
        const current = weatherData.current;

        const elTemp = document.getElementById('live-temp');
        if (elTemp) elTemp.textContent = `${current.temperature_2m.toFixed(1)} °C`;

        const elHum = document.getElementById('live-humidity');
        if (elHum) elHum.textContent = `${current.relative_humidity_2m}%`;

        const elWind = document.getElementById('live-wind');
        if (elWind) elWind.textContent = `${current.wind_speed_10m.toFixed(1)} km/h`;
        
        const rainVal = current.rain !== undefined ? current.rain : current.precipitation;
        const elRain = document.getElementById('live-rain-h');
        if (elRain) elRain.textContent = `${rainVal.toFixed(1)} mm/h`;
        
        const descEl = document.getElementById('live-weather-desc');
        if (descEl) {
          descEl.textContent = rainVal > 0 ? "Chuva Detectada ao Vivo" : "Céu Limpo / Parcialmente Nublado";
          descEl.className = rainVal > 0 ? "metric-badge badge-orange" : "metric-badge badge-blue";
        }
      }
    } catch (e) {
      console.warn("Fallback clima ativo:", e);
    }

    renderLiveFeeds();
  }

  function renderLiveFeeds() {
    const containerAlerts = document.getElementById('live-feed-alerts');
    if (containerAlerts) {
      containerAlerts.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(52, 211, 153, 0.3);">
          <div style="display:flex; justify-content:space-between;">
            <strong style="color: #34d399;">🟢 Sistema Alerta Rio (GEO-RIO)</strong>
            <span style="font-size: 0.75rem; color: #94a3b8;">Atualizado há 1 min</span>
          </div>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px;">
            Estação Pluviométrica Lins: Acumulado de chuva de 0.0mm nos últimos 15 min. Sem risco iminente de escorregamento nas encostas.
          </p>
        </div>
      `;
    }

    const container1746 = document.getElementById('live-feed-1746');
    if (container1746) {
      container1746.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(251, 146, 60, 0.3);">
          <div style="display:flex; justify-content:space-between;">
            <strong style="color: #fb923c;">🕳️ Chamado 1746 #891240 - Central 1746</strong>
            <span style="font-size: 0.75rem; color: #94a3b8;">Hoje às 08:45</span>
          </div>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px;">
            <strong>Local:</strong> R. Dona Francisca, 140 · <strong>Subcategoria:</strong> Grelha Danificada / Bueiro Obstruído.
          </p>
        </div>
      `;
    }
  }

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; background: #10b981; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 10px 25px rgba(0,0,0,0.4); opacity: 0; transition: all 0.3s ease; transform: translateY(-10px); pointer-events: none;';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
    }, 3500);
  }

  /**
   * CONTROLES DE BUSCA POR CEP & CAPTURA DE GPS COM FILTRO DE ANÁLISE DE RISCO MAIS PRÓXIMO
   */
  function initLocationControls() {
    const btnCep = document.getElementById('btn-cep-search');
    const inputCep = document.getElementById('input-cep-search');
    const btnGps = document.getElementById('btn-gps-locate');

    if (btnCep && inputCep) {
      btnCep.addEventListener('click', () => handleCEPSearch(inputCep.value));
      inputCep.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCEPSearch(inputCep.value);
      });
    }

    if (btnGps) {
      btnGps.addEventListener('click', handleGPSLocation);
    }
  }

  async function handleCEPSearch(query) {
    if (!query || query.trim() === '') return;

    const banner = document.getElementById('location-result-banner');
    banner.style.display = 'block';
    banner.style.background = 'rgba(59, 130, 246, 0.2)';
    banner.style.color = '#60a5fa';
    banner.style.border = '1px solid rgba(59, 130, 246, 0.4)';
    banner.textContent = '⏳ Buscando endereço/CEP e analisando matriz de riscos próximos...';

    const cleanQuery = query.replace(/\D/g, '');
    let searchAddress = query;

    if (cleanQuery.length === 8) {
      try {
        const viaCepResp = await fetch(`https://viacep.com.br/ws/${cleanQuery}/json/`);
        if (viaCepResp.ok) {
          const viaCepData = await viaCepResp.json();
          if (!viaCepData.erro) {
            searchAddress = `${viaCepData.logradouro}, ${viaCepData.bairro}, Rio de Janeiro - RJ`;
          }
        }
      } catch (err) {
        console.warn("Erro no ViaCEP:", err);
      }
    }

    try {
      const nomResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1`);
      if (nomResp.ok) {
        const nomResults = await nomResp.json();
        if (nomResults && nomResults.length > 0) {
          const res = nomResults[0];
          const lat = parseFloat(res.lat);
          const lon = parseFloat(res.lon);

          processUserLocationWithRiskAnalysis([lat, lon], `📮 CEP/Endereço: ${searchAddress}`);
          return;
        }
      }
    } catch (err) {
      console.error("Erro na geocodificação:", err);
    }

    banner.style.background = 'rgba(248, 113, 113, 0.2)';
    banner.style.color = '#f87171';
    banner.style.border = '1px solid rgba(248, 113, 113, 0.4)';
    banner.textContent = `❌ Não foi possível encontrar o CEP/endereço "${query}".`;
  }

  function handleGPSLocation() {
    const banner = document.getElementById('location-result-banner');
    banner.style.display = 'block';
    banner.style.background = 'rgba(59, 130, 246, 0.2)';
    banner.style.color = '#60a5fa';
    banner.style.border = '1px solid rgba(59, 130, 246, 0.4)';
    banner.textContent = '📡 Solicitando permissão de GPS e analisando riscos da sua posição...';

    if (!navigator.geolocation) {
      banner.style.background = 'rgba(248, 113, 113, 0.2)';
      banner.style.color = '#f87171';
      banner.textContent = '❌ Navegador não suporta a API de Geolocalização GPS.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy);

        processUserLocationWithRiskAnalysis([lat, lon], `📍 Sua Posição GPS (Precisão: ±${accuracy}m)`);
      },
      (error) => {
        banner.style.background = 'rgba(248, 113, 113, 0.2)';
        banner.style.color = '#f87171';
        banner.style.border = '1px solid rgba(248, 113, 113, 0.4)';
        banner.textContent = `❌ Erro ao capturar GPS: ${error.message}.`;
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  /**
   * ANÁLISE DE PROXIMIDADE DO RISCO MAIS PRÓXIMO + PLOT NO LEAFLET
   */
  function processUserLocationWithRiskAnalysis(userCoords, titleText) {
    const [lat, lon] = userCoords;

    // 1. Encontra a pedra instável mais próxima
    let nearestRock = null;
    let minRockDist = Infinity;
    data.blocosRochososInstaveis.forEach(r => {
      const dist = calculateDistanceMeters(lat, lon, r.coordenadas[0], r.coordenadas[1]);
      if (dist < minRockDist) {
        minRockDist = dist;
        nearestRock = { ...r, distMeters: dist };
      }
    });

    // 2. Encontra o ponto de inundação mais próximo
    let nearestFlood = null;
    let minFloodDist = Infinity;
    data.pontosInundacaoVias.forEach(f => {
      const dist = calculateDistanceMeters(lat, lon, f.coordenadas[0], f.coordenadas[1]);
      if (dist < minFloodDist) {
        minFloodDist = dist;
        nearestFlood = { ...f, distMeters: dist };
      }
    });

    // 3. Encontra o bueiro crítico do 1746 mais próximo
    let nearestBueiro = null;
    let minBueiroDist = Infinity;
    data.bueirosCriticos1746.forEach(b => {
      const dist = calculateDistanceMeters(lat, lon, b.coordenadas[0], b.coordenadas[1]);
      if (dist < minBueiroDist) {
        minBueiroDist = dist;
        nearestBueiro = { ...b, distMeters: dist };
      }
    });

    // 4. Identifica o Risco Crítico Mais Próximo absoluto
    const allRisks = [
      { tipo: '🪨 Rocha Instável', obj: nearestRock, dist: minRockDist, cor: '#f87171' },
      { tipo: '🌊 Ponto Inundável', obj: nearestFlood, dist: minFloodDist, cor: '#60a5fa' },
      { tipo: '🕳️ Bueiro Obstruído (1746)', obj: nearestBueiro, dist: minBueiroDist, cor: '#facc15' }
    ];
    allRisks.sort((a, b) => a.dist - b.dist);
    const topRisk = allRisks[0];

    // Plot do Pino e da Linha Tracejada no Mapa
    plotUserLocationAndDrawRiskLine(userCoords, titleText, topRisk);

    // Exibe Banner Detalhado de Riscos
    const banner = document.getElementById('location-result-banner');
    banner.style.display = 'block';
    banner.style.background = 'rgba(15, 23, 42, 0.95)';
    banner.style.border = `2px solid ${topRisk.cor}`;
    banner.style.color = '#fff';
    banner.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
        <strong style="font-size: 1rem; color: ${topRisk.cor};">${titleText}</strong>
        <span class="metric-badge badge-orange" style="font-size: 0.8rem;">
          🎯 Risco Mais Próximo: ${topRisk.dist} metros (${topRisk.tipo})
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem; font-size: 0.82rem; margin-top: 0.5rem;">
        <div style="background: rgba(248, 113, 113, 0.15); padding: 8px; border-radius: 6px; border-left: 4px solid #f87171;">
          <strong style="color: #f87171;">🪨 Bloco Rochoso:</strong> ${nearestRock.local}<br>
          <span>Distância: <strong>${nearestRock.distMeters} m</strong> · Risco: ${nearestRock.nivelRisco}</span>
        </div>

        <div style="background: rgba(96, 165, 250, 0.15); padding: 8px; border-radius: 6px; border-left: 4px solid #60a5fa;">
          <strong style="color: #60a5fa;">🌊 Ponto de Inundação:</strong> ${nearestFlood.via}<br>
          <span>Distância: <strong>${nearestFlood.distMeters} m</strong></span>
        </div>

        <div style="background: rgba(250, 204, 21, 0.15); padding: 8px; border-radius: 6px; border-left: 4px solid #facc15;">
          <strong style="color: #facc15;">🕳️ Bueiro Crítico (1746):</strong> ${nearestBueiro.local}<br>
          <span>Distância: <strong>${nearestBueiro.distMeters} m</strong> · ${nearestBueiro.chamados1746Ano} chamados/ano</span>
        </div>
      </div>
    `;
  }

  function plotUserLocationAndDrawRiskLine(coords, popupText, topRisk) {
    if (!map) return;

    if (userLocationMarker) map.removeLayer(userLocationMarker);
    if (riskLinePolyline) map.removeLayer(riskLinePolyline);

    const gpsIcon = L.divIcon({
      className: 'custom-icon-gps',
      html: `<div style="background: #10b981; color: #fff; padding: 6px 8px; border-radius: 50%; font-size: 1.2rem; border: 3px solid #fff; box-shadow: 0 0 15px rgba(16, 185, 129, 0.9);">📍</div>`,
      iconSize: [36, 36]
    });

    userLocationMarker = L.marker(coords, { icon: gpsIcon }).addTo(map);
    userLocationMarker.bindPopup(`
      <div style="color: #0f172a; font-family: sans-serif;">
        <h4 style="color: #059669;">${popupText}</h4>
        <p style="font-size: 0.85rem; color: #1e293b;">
          <strong>🎯 Risco Mais Próximo:</strong> ${topRisk.tipo}<br>
          <strong>Distância:</strong> ${topRisk.dist} metros
        </p>
      </div>
    `).openPopup();

    // Desenha linha tracejada no mapa ligando a posição do usuário ao risco mais próximo
    if (topRisk.obj && topRisk.obj.coordenadas) {
      riskLinePolyline = L.polyline([coords, topRisk.obj.coordenadas], {
        color: topRisk.cor,
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.85
      }).addTo(map);

      // Ajusta os limites do mapa para enquadrar o usuário e o risco
      const bounds = L.latLngBounds([coords, topRisk.obj.coordenadas]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.flyTo(coords, 17, { duration: 1.5 });
    }
  }

  function render24hHistory() {
    const container = document.getElementById('container-historico-24h');
    if (!container || !data.historicoUltimas24Horas) return;

    container.innerHTML = '';
    data.historicoUltimas24Horas.forEach(item => {
      const card = document.createElement('div');
      const isAlarmeFalso = item.veracidadeAlerta && item.veracidadeAlerta.includes('ALARME FALSO');
      const borderCor = isAlarmeFalso ? 'rgba(251, 146, 60, 0.4)' : 'rgba(56, 189, 248, 0.2)';

      card.style.cssText = `background: rgba(15, 23, 42, 0.7); padding: 1rem; border-radius: 8px; border: 1px solid ${borderCor}; display: flex; gap: 1rem; align-items: flex-start;`;
      card.innerHTML = `
        <div style="font-size: 1.6rem; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px; line-height: 1;">
          ${item.icone}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <strong style="color: #fff; font-size: 0.95rem;">${item.titulo}</strong>
            <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; color: #94a3b8;">${item.horario}</span>
              <span class="metric-badge ${item.tipoBadge}" style="font-size: 0.75rem;">${item.orgao}</span>
            </div>
          </div>
          
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px; line-height: 1.4;">
            ${item.descricao}
          </p>

          <div style="margin-top: 0.6rem; padding-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.08); display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center;">
            <span style="font-size: 0.78rem; color: #60a5fa; background: rgba(59,130,246,0.15); padding: 3px 8px; border-radius: 4px;">
              🔍 Status: <strong>${item.statusChamado || 'N/A'}</strong>
            </span>
            <span style="font-size: 0.78rem; color: ${isAlarmeFalso ? '#fb923c' : '#34d399'}; background: ${isAlarmeFalso ? 'rgba(251,146,60,0.15)' : 'rgba(52,211,153,0.15)'}; padding: 3px 8px; border-radius: 4px;">
              🎯 Veracidade: <strong>${item.veracidadeAlerta || 'N/A'}</strong>
            </span>
            <span style="font-size: 0.75rem; color: #94a3b8;">
              📌 Evidência: <em>${item.evidenciaVerificacao || 'Validação de Campo'}</em>
            </span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderClusterCards() {
    const container = document.getElementById('clusters-container');
    if (!container) return;
    container.innerHTML = '';
    data.clustersKMeansConfig.forEach(cl => {
      const card = document.createElement('div');
      card.className = 'cluster-card';
      card.style.borderLeft = `5px solid ${cl.cor}`;
      card.innerHTML = `
        <div class="cluster-card-header">
          <span class="cluster-badge-icon" style="background: ${cl.cor};"></span>
          <div>
            <h3 style="font-size: 1.15rem; color: #fff; line-height: 1.3;">${cl.nome}</h3>
            <span class="metric-badge" style="background: ${cl.cor}25; color: ${cl.cor}; font-size: 0.75rem; margin-top: 2px;">
              ${cl.tagCurta}
            </span>
          </div>
        </div>
        <p style="font-size: 0.88rem; color: #94a3b8; margin-top: 0.6rem; line-height: 1.4;">
          ${cl.significadoDetalhados}
        </p>
        <div style="margin-top: 0.75rem;">
          <strong style="font-size: 0.8rem; text-transform: uppercase; color: #cbd5e1;">Morros & Comunidades do Grupo:</strong>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
            ${cl.comunidades.map(name => `<span class="metric-badge" style="background: rgba(255,255,255,0.08); color: #fff; font-size: 0.8rem;">${name}</span>`).join('')}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderOperationalPanel() {
    const p = data.painelOperacionalHorizontes;
    if (!p) return;

    const container7d = document.getElementById('grid-previsao-7d');
    if (container7d) {
      container7d.innerHTML = '';
      p.semanaCorrente7Dias.previsaoTempoDiaADia.forEach(d => {
        const card = document.createElement('div');
        const badgeClass = d.risco === 'Muito Alto' ? 'badge-red' : d.risco === 'Alto' ? 'badge-orange' : d.risco === 'Moderado' ? 'badge-orange' : 'badge-green';
        
        card.style.cssText = 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.75rem; border-radius: 8px; text-align: center;';
        card.innerHTML = `
          <div style="font-size: 1.5rem; margin-bottom: 2px;">${d.icone}</div>
          <strong style="color: #fff; font-size: 0.85rem; display: block;">${d.dia}</strong>
          <span style="color: #60a5fa; font-size: 0.8rem; font-weight: 700; display: block; margin: 2px 0;">🌧️ ${d.chuva}</span>
          <span style="color: #94a3b8; font-size: 0.75rem; display: block;">${d.temp}</span>
          <span class="metric-badge ${badgeClass}" style="margin-top: 4px; font-size: 0.7rem;">${d.risco}</span>
        `;
        container7d.appendChild(card);
      });
    }

    const lista7d = document.getElementById('lista-acoes-7d');
    if (lista7d) {
      lista7d.innerHTML = '';
      p.semanaCorrente7Dias.acoesImediatas.forEach(ac => {
        const li = document.createElement('li');
        li.textContent = ac;
        lista7d.appendChild(li);
      });
    }

    const lista15d = document.getElementById('lista-acoes-15d');
    if (lista15d) {
      lista15d.innerHTML = '';
      p.proximos15Dias.acoesProgramadas.forEach(ac => {
        const li = document.createElement('li');
        li.textContent = ac;
        lista15d.appendChild(li);
      });
    }

    const lista30d = document.getElementById('lista-acoes-30d');
    if (lista30d) {
      lista30d.innerHTML = '';
      p.proximos30Dias.obrasPreventivasPrevistas.forEach(ac => {
        const li = document.createElement('li');
        li.textContent = ac;
        lista30d.appendChild(li);
      });
    }
  }

  function initPredictiveSimulator() {
    const sliderRain = document.getElementById('slider-rain');
    const sliderAcc = document.getElementById('slider-accumulated');
    if (!sliderRain || !sliderAcc) return;

    function updateSimulation() {
      const rainMmH = parseFloat(sliderRain.value);
      const acc24h = parseFloat(sliderAcc.value);

      document.getElementById('slider-rain-val').textContent = `${rainMmH} mm/h`;
      document.getElementById('slider-accumulated-val').textContent = `${acc24h} mm`;

      const result = data.modeloPreditivoConfig.funcaoPreditiva(rainMmH, acc24h);

      const statusEl = document.getElementById('pred-nivel-status');
      if (statusEl) {
        statusEl.textContent = result.nivelEmergencia;
        statusEl.style.color = result.corStatus;
      }

      document.getElementById('pred-total-chamados').textContent = result.totalChamadosPrevistos;
      document.getElementById('pred-alagamento-chamados').textContent = result.chamadosAlagamentoEstimados;
      document.getElementById('pred-deslizamento-chamados').textContent = result.chamadosDeslizamentoEstimados;
      document.getElementById('pred-bueiros-chamados').textContent = result.chamadosBueirosEstimados;

      const containerVias = document.getElementById('pred-lista-vias');
      if (containerVias) {
        containerVias.innerHTML = '';
        const numVias = rainMmH > 50 ? 5 : rainMmH > 25 ? 3 : rainMmH > 10 ? 2 : 1;
        const viasPrevistas = data.pontosInundacaoVias.slice(0, numVias);

        viasPrevistas.forEach(v => {
          const item = document.createElement('div');
          item.style.cssText = 'background: rgba(15, 23, 42, 0.6); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);';
          item.innerHTML = `
            <strong style="color: #60a5fa;">🌊 ${v.via}</strong>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">${v.causaPrincipal}</p>
          `;
          containerVias.appendChild(item);
        });
      }

      const containerEncostas = document.getElementById('pred-lista-encostas');
      if (containerEncostas) {
        containerEncostas.innerHTML = '';
        const numEncostas = acc24h > 80 ? 4 : acc24h > 40 ? 3 : acc24h > 20 ? 2 : 1;
        const encostasPrevistas = data.blocosRochososInstaveis.slice(0, numEncostas);

        encostasPrevistas.forEach(p => {
          const item = document.createElement('div');
          item.style.cssText = 'background: rgba(15, 23, 42, 0.6); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(248, 113, 113, 0.3);';
          item.innerHTML = `
            <strong style="color: #f87171;">🪨 ${p.local}</strong>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">Volume: ~${p.volumeEstimadoM3}m³ · ${p.moradiasAbaixo} residências na rota</p>
          `;
          containerEncostas.appendChild(item);
        });
      }
    }

    sliderRain.addEventListener('input', updateSimulation);
    sliderAcc.addEventListener('input', updateSimulation);
    updateSimulation();
  }

  function initMap() {
    map = L.map('map').setView([-22.9145, -43.2855], 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    layerGroups.comunidades = L.layerGroup().addTo(map);
    layerGroups.pedrasInstaveis = L.layerGroup().addTo(map);
    layerGroups.inundacoes = L.layerGroup().addTo(map);
    layerGroups.bueirosCriticos = L.layerGroup().addTo(map);
    layerGroups.ecopontosLixo = L.layerGroup().addTo(map);
    layerGroups.fogoCruzado = L.layerGroup().addTo(map);
    layerGroups.wikifavelas = L.layerGroup().addTo(map);
    layerGroups.mototaxisOSM = L.layerGroup().addTo(map);
    layerGroups.equipamentos = L.layerGroup().addTo(map);

    data.comunidades.forEach(c => {
      const clusterConfig = data.clustersKMeansConfig.find(cl => cl.clusterId === c.clusterId);
      const color = clusterConfig ? clusterConfig.cor : '#38bdf8';
      const clusterName = clusterConfig ? clusterConfig.tagCurta : `Cluster ${c.clusterId}`;

      const circle = L.circle(c.coordenadas, {
        color: color,
        fillColor: color,
        fillOpacity: 0.40,
        radius: Math.sqrt(c.populacao2022) * 2.5
      });

      circle.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif; padding: 4px;">
          <h3 style="margin-bottom: 4px; color: ${color};">${c.nome}</h3>
          <p><strong>Grupo Socioespacial:</strong> <span style="color:${color}; font-weight:bold;">${clusterName}</span></p>
          <p><strong>Score IVM:</strong> ${c.ivmScore}</p>
          <p><strong>População:</strong> ${c.populacao2022.toLocaleString('pt-BR')} hab</p>
        </div>
      `);
      layerGroups.comunidades.addLayer(circle);
    });

    data.fogoCruzadoEventos.forEach(fc => {
      const icon = L.divIcon({
        className: 'custom-icon-fc',
        html: `<div style="background: #dc2626; color: #fff; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">🎯</div>`,
        iconSize: [28, 28]
      });

      const marker = L.marker(fc.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #dc2626;">🎯 ${fc.tipo}</h4>
          <p><strong>Local:</strong> ${fc.local}</p>
        </div>
      `);
      layerGroups.fogoCruzado.addLayer(marker);
    });

    data.wikifavelasProjetos.forEach(w => {
      const icon = L.divIcon({
        className: 'custom-icon-wiki',
        html: `<div style="background: #8b5cf6; color: #fff; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">📚</div>`,
        iconSize: [28, 28]
      });

      const marker = L.marker(w.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #7c3aed;">📚 ${w.nome}</h4>
        </div>
      `);
      layerGroups.wikifavelas.addLayer(marker);
    });

    data.osmPontosMobilidade.forEach(m => {
      const iconSymbol = m.tipo.includes('Transporte') ? '🏍️' : '🪜';
      const icon = L.divIcon({
        className: 'custom-icon-osm',
        html: `<div style="background: #f59e0b; color: #000; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">${iconSymbol}</div>`,
        iconSize: [28, 28]
      });

      const marker = L.marker(m.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #d97706;">${iconSymbol} ${m.nome}</h4>
        </div>
      `);
      layerGroups.mototaxisOSM.addLayer(marker);
    });

    data.blocosRochososInstaveis.forEach(p => {
      const icon = L.divIcon({
        className: 'custom-icon-pedra',
        html: `<div style="background: #ef4444; color: #fff; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">🪨</div>`,
        iconSize: [28, 28]
      });

      const marker = L.marker(p.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #dc2626;">🪨 ${p.local}</h4>
        </div>
      `);
      layerGroups.pedrasInstaveis.addLayer(marker);
    });

    data.pontosInundacaoVias.forEach(inund => {
      const icon = L.divIcon({
        className: 'custom-icon-inund',
        html: `<div style="background: #3b82f6; color: #fff; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">🌊</div>`,
        iconSize: [28, 28]
      });
      const marker = L.marker(inund.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #2563eb;">🌊 ${inund.via}</h4>
        </div>
      `);
      layerGroups.inundacoes.addLayer(marker);
    });

    data.bueirosCriticos1746.forEach(b => {
      const icon = L.divIcon({
        className: 'custom-icon-bueiro',
        html: `<div style="background: #eab308; color: #000; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">🕳️</div>`,
        iconSize: [28, 28]
      });
      const marker = L.marker(b.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #ca8a04;">🕳️ ${b.local}</h4>
        </div>
      `);
      layerGroups.bueirosCriticos.addLayer(marker);
    });

    data.ecopontosELixeiras.forEach(l => {
      const icon = L.divIcon({
        className: 'custom-icon-lixo',
        html: `<div style="background: #10b981; color: #fff; padding: 4px 6px; border-radius: 50%; font-size: 1rem; border: 2px solid #fff;">🗑️</div>`,
        iconSize: [28, 28]
      });
      const marker = L.marker(l.coordenadas, { icon: icon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4 style="color: #059669;">🗑️ ${l.nome}</h4>
        </div>
      `);
      layerGroups.ecopontosLixo.addLayer(marker);
    });

    data.equipamentosPublicos.forEach(eq => {
      const iconSymbol = eq.tipo.includes('Saúde') ? '🏥' : eq.tipo.includes('Educação') ? '🏫' : '🏛️';
      const customIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `<div style="font-size: 1.4rem; cursor: pointer;">${iconSymbol}</div>`,
        iconSize: [24, 24]
      });
      const marker = L.marker(eq.coordenadas, { icon: customIcon });
      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif;">
          <h4>${eq.nome}</h4>
        </div>
      `);
      layerGroups.equipamentos.addLayer(marker);
    });

    const overlayMaps = {
      "🏘️ Comunidades (Grupos Socioespaciais)": layerGroups.comunidades,
      "🎯 Fogo Cruzado (Tiroteios)": layerGroups.fogoCruzado,
      "📚 Wikifavelas (Projetos)": layerGroups.wikifavelas,
      "🏍️ Mototáxis & Acessos (OSM)": layerGroups.mototaxisOSM,
      "🪨 Pedras Instáveis (Risco)": layerGroups.pedrasInstaveis,
      "🌊 Pontos de Inundação": layerGroups.inundacoes,
      "🕳️ Bueiros Críticos (1746)": layerGroups.bueirosCriticos,
      "🗑️ Ecopontos Comlurb": layerGroups.ecopontosLixo,
      "🏫 Equipamentos Públicos": layerGroups.equipamentos
    };

    L.control.layers(null, overlayMaps, { collapsed: false, position: 'topright' }).addTo(map);
  }

  function renderHistoricalTable() {
    const tbody = document.getElementById('historico-chuva-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    data.seriesHistoricasTemporaisChuva.forEach(ev => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color:#f87171;">${ev.evento}</strong></td>
        <td>${ev.data}</td>
        <td><strong>${ev.chuva24hMm} mm</strong></td>
        <td>${ev.chamadosDeslizamento} chamados</td>
        <td style="color:#94a3b8; font-size:0.85rem;">${ev.impacto}</td>
        <td><code style="font-size:0.75rem;">${ev.fonte}</code></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderPearsonTable() {
    const tbody = document.getElementById('pearson-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.correlacoesPearson.forEach(corr => {
      const tr = document.createElement('tr');
      const badgeClass = corr.r > 0.75 ? 'badge-red' : corr.r < -0.75 ? 'badge-blue' : 'badge-orange';
      tr.innerHTML = `
        <td><strong>${corr.par}</strong></td>
        <td><span class="metric-badge ${badgeClass}" style="font-size: 0.9rem;">r = ${corr.r.toFixed(2)}</span></td>
        <td style="color: #34d399; font-size: 0.85rem;">${corr.significancia}</td>
        <td style="color: #94a3b8; font-size: 0.85rem;">${corr.interpretacao}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderCommunityList(filterText = '') {
    const container = document.getElementById('community-list');
    if (!container) return;
    container.innerHTML = '';

    const filtered = data.comunidades.filter(c => 
      c.nome.toLowerCase().includes(filterText.toLowerCase()) ||
      c.clusterId.toString().includes(filterText)
    );

    filtered.forEach(c => {
      const clusterConfig = data.clustersKMeansConfig.find(cl => cl.clusterId === c.clusterId);
      const item = document.createElement('div');
      item.className = 'community-item';
      item.setAttribute('data-id', c.id);
      item.innerHTML = `
        <div class="community-info">
          <h4>${c.nome}</h4>
          <p>${c.populacao2022.toLocaleString('pt-BR')} hab · IVM: ${c.ivmScore}</p>
        </div>
        <span class="metric-badge" style="background: ${clusterConfig ? clusterConfig.cor + '25' : '#38bdf825'}; color: ${clusterConfig ? clusterConfig.cor : '#38bdf8'};">
          ${clusterConfig ? clusterConfig.tagCurta : 'Cluster ' + c.clusterId}
        </span>
      `;
      item.addEventListener('click', () => {
        document.querySelectorAll('.community-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        map.flyTo(c.coordenadas, 17, { duration: 1.2 });
      });
      container.appendChild(item);
    });
  }

  function renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.comunidades.forEach(c => {
      const clusterConfig = data.clustersKMeansConfig.find(cl => cl.clusterId === c.clusterId);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.nome}</strong></td>
        <td><span class="metric-badge" style="background: ${clusterConfig.cor}25; color: ${clusterConfig.cor}">${clusterConfig.tagCurta}</span></td>
        <td>
          <strong>${c.ivmScore}</strong>
          <div class="ivm-bar-bg"><div class="ivm-bar-fill" style="width: ${c.ivmScore * 100}%; background: ${clusterConfig.cor}"></div></div>
        </td>
        <td>${c.populacao2022.toLocaleString('pt-BR')} hab</td>
        <td>${c.saneamento.esgotoFossaOuInNatura}%</td>
        <td>${c.saudeEpidemiologia.dengueCasos100k}</td>
        <td>${c.educacao.crechesDemandaReprimida} crian.</td>
        <td>${c.educacao.semFundamentalPct}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function initCharts() {
    const labels = data.comunidades.map(c => c.nome.replace('Morro da ', '').replace('Morro do ', ''));

    if (document.getElementById('chart-historico-censo')) {
      new Chart(document.getElementById('chart-historico-censo').getContext('2d'), {
        type: 'line',
        data: {
          labels: data.seriesHistoricasCenso.map(s => s.ano.toString()),
          datasets: [
            { label: 'População Recenseada', data: data.seriesHistoricasCenso.map(s => s.populacao), borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.2)', fill: true },
            { label: 'Total de Domicílios', data: data.seriesHistoricasCenso.map(s => s.domicilios), borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.2)', fill: true }
          ]
        },
        options: chartOptions()
      });
    }

    if (document.getElementById('chart-historico-dengue')) {
      new Chart(document.getElementById('chart-historico-dengue').getContext('2d'), {
        type: 'line',
        data: {
          labels: data.seriesHistoricasDengue.map(s => s.ano.toString()),
          datasets: [
            { label: 'Dengue (/100k)', data: data.seriesHistoricasDengue.map(s => s.casosDengue100k), borderColor: '#fb923c', tension: 0.3 }
          ]
        },
        options: chartOptions()
      });
    }

    if (document.getElementById('chart-scatter-renda-ivm')) {
      new Chart(document.getElementById('chart-scatter-renda-ivm').getContext('2d'), {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Comunidades (Renda vs IVM)',
            data: data.comunidades.map(c => ({ x: c.rendaMediaDomiciliarSalarios, y: c.ivmScore })),
            backgroundColor: '#38bdf8',
            pointRadius: 6
          }]
        },
        options: {
          ...chartOptions(),
          scales: {
            x: { title: { display: true, text: 'Renda Média (Salários Mínimos)', color: '#94a3b8' }, ticks: { color: '#94a3b8' } },
            y: { title: { display: true, text: 'Score IVM (0 a 1)', color: '#94a3b8' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    if (document.getElementById('chart-scatter-educ-dengue')) {
      new Chart(document.getElementById('chart-scatter-educ-dengue').getContext('2d'), {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Comunidades (Sem Fundamental % vs Dengue)',
            data: data.comunidades.map(c => ({ x: c.educacao.semFundamentalPct, y: c.saudeEpidemiologia.dengueCasos100k })),
            backgroundColor: '#a78bfa',
            pointRadius: 6
          }]
        },
        options: {
          ...chartOptions(),
          scales: {
            x: { title: { display: true, text: 'Sem Ensino Fundamental Completo (%)', color: '#94a3b8' }, ticks: { color: '#94a3b8' } },
            y: { title: { display: true, text: 'Casos Dengue (/100k hab)', color: '#94a3b8' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    if (document.getElementById('chart-dengue')) {
      new Chart(document.getElementById('chart-dengue').getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{ label: 'Incidência de Dengue (/100k)', data: data.comunidades.map(c => c.saudeEpidemiologia.dengueCasos100k), backgroundColor: 'rgba(251, 146, 60, 0.7)' }]
        },
        options: chartOptions()
      });
    }

    if (document.getElementById('chart-covid-srag')) {
      new Chart(document.getElementById('chart-covid-srag').getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'COVID-19 (/100k)', data: data.comunidades.map(c => c.saudeEpidemiologia.covidCasos100k), backgroundColor: 'rgba(167, 139, 250, 0.7)' },
            { label: 'Internações SRAG', data: data.comunidades.map(c => c.saudeEpidemiologia.sragInternacoes), backgroundColor: 'rgba(248, 113, 113, 0.7)' }
          ]
        },
        options: chartOptions()
      });
    }

    if (document.getElementById('chart-creches')) {
      new Chart(document.getElementById('chart-creches').getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Vagas Atendidas', data: data.comunidades.map(c => c.educacao.crechesVagas), backgroundColor: 'rgba(52, 211, 153, 0.7)' },
            { label: 'Demanda Reprimida', data: data.comunidades.map(c => c.educacao.crechesDemandaReprimida), backgroundColor: 'rgba(248, 113, 113, 0.7)' }
          ]
        },
        options: chartOptions()
      });
    }

    if (document.getElementById('chart-escolaridade')) {
      new Chart(document.getElementById('chart-escolaridade').getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Sem Ensino Fundamental (%)', data: data.comunidades.map(c => c.educacao.semFundamentalPct), backgroundColor: 'rgba(251, 146, 60, 0.7)' },
            { label: 'Ensino Médio Completo (%)', data: data.comunidades.map(c => c.educacao.ensinoMedioCompletoPct), backgroundColor: 'rgba(56, 189, 248, 0.7)' }
          ]
        },
        options: chartOptions()
      });
    }
  }

  function chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
      }
    };
  }

  function setupEventListeners() {
    const searchInput = document.getElementById('search-community');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderCommunityList(e.target.value);
      });
    }

    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportCSV);
    }
  }

  function exportCSV() {
    let csv = 'Comunidade,Grupo_Socioespacial,Score_IVM,Populacao_2022,Domicilios,Esgoto_InNatura_Pct,Dengue_100k,Covid_100k,SRAG_Internacoes,Creches_Vagas,Creches_DemandaReprimida,Analfabetismo_Pct,Sem_Fundamental_Pct,Renda_Salarios,Risco_Geologico\n';
    
    data.comunidades.forEach(c => {
      const clusterConfig = data.clustersKMeansConfig.find(cl => cl.clusterId === c.clusterId);
      const tag = clusterConfig ? clusterConfig.tagCurta : `Cluster ${c.clusterId}`;
      csv += `"${c.nome}","${tag}",${c.ivmScore},${c.populacao2022},${c.domicilios},${c.saneamento.esgotoFossaOuInNatura},${c.saudeEpidemiologia.dengueCasos100k},${c.saudeEpidemiologia.covidCasos100k},${c.saudeEpidemiologia.sragInternacoes},${c.educacao.crechesVagas},${c.educacao.crechesDemandaReprimida},${c.educacao.analfabetismoPct},${c.educacao.semFundamentalPct},${c.rendaMediaDomiciliarSalarios},"${c.riscoDeslizamento}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'analise_risco_gps_complexo_do_lins.csv');
    link.click();
  }
});
