# Relatório Técnico: Mapeamento GIS com Busca por CEP & Captura de GPS

**Território:** Complexo do Lins (Lins de Vasconcelos, Zona Norte do Rio de Janeiro - RJ)  
**Funcionalidades Implementadas:** Geocodificação de CEP / Endereços via ViaCEP & Nominatim OpenStreetMap + Captura de GPS HTML5 do dispositivo (Smartphone / Notebook).  
**Objetivo:** Permitir ao morador, gestor público ou agente de Defesa Civil digitar um CEP ou usar a localização GPS para posicionar um marcador instantâneo no mapa GIS e identificar riscos e bueiros ao redor.

---

## 1. Arquitetura de Geocodificação de CEP & Endereços

A funcionalidade de busca por CEP opera em duas camadas complementares:

1. **Camada 1 (ViaCEP API - `https://viacep.com.br/ws/{cep}/json/`):**
   - Quando o usuário digita um CEP de 8 dígitos (ex: `20720-000`), a API retorna a rua, bairro, cidade e estado oficial do Correios.
2. **Camada 2 (Nominatim OpenStreetMap Geocoding API - `https://nominatim.openstreetmap.org/search`):**
   - O endereço retornado pelo ViaCEP (ou o texto digitado pelo usuário, como `Rua Cabuçu, Lins`) é converted em coordenadas exatas de Latitude e Longitude (`lat`, `lon`).
3. **Ação no Mapa Leaflet:**
   - Um marcador pulsante de alta visibilidade (`📍 Meu CEP/Endereço`) é fixado no mapa.
   - O mapa realiza uma transição suave de câmera (`map.flyTo([lat, lng], 17)`).

---

## 2. Captura de Sinal GPS do Dispositivo (HTML5 Geolocation)

* **Tecnologia:** `navigator.geolocation.getCurrentPosition`.
* **Precisão:** Retorna as coordenadas de alta precisão (`coords.accuracy` em metros) via chip GPS do smartphone ou triângulos Wi-Fi/IP do navegador.
* **Marcador no Mapa:** Exibe o pino com efeito neon `📍 Sua Posição GPS (Precisão: ±X m)` e exibe uma caixa de notificação destacando o ponto encontrado.

---

## 3. Como Usar na Aplicação Web (`http://localhost:3000`)

1. Acesse a aba **`🗺️ Mapa GIS, CEP & GPS`**.
2. **Opção A (Busca por CEP):** Digite `20720-000` (ou qualquer endereço do Lins) na barra superior e clique em **`🔍 Buscar CEP`**.
3. **Opção B (Usar GPS do Aparelho):** Clique no botão verde **`📡 Usar Meu GPS Atual`** e autorize o navegador a ler a sua localização!
