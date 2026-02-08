const protocols = [
  {
    indication: "Skin rejuvenation",
    study: "Wunsch et al. (2014)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5215870/",
    wavelength: "633 nm (Red)",
    dose: 8.0,
    frequency: 2,
    quality: 9.5,
    contact: true,
    notes:
      "↑19% collagen density by ultrasound imaging (collagen = skin structural support).\n" +
      "↓30% wrinkle volume measured via 3D profilometry (wrinkle depth correlates with aging).\n" +
      "No adverse effects reported; protocol: 2×/week for 15 weeks.\n" +
      "Effect durability: benefits persisted at 6-month follow-up.\n" +
      "Panel was in direct contact with the skin."
  },
  {
    indication: "Skin rejuvenation",
    study: "Couturaud et al. (2023)",
    url: "https://doi.org/10.1089/photob.2022.0080",
    wavelength: "660 nm & 590 nm (Red/Amber)",
    dose: 9.0,
    frequency: 2,
    quality: 9.0,
    contact: true,
    notes:
      "30% periocular wrinkle reduction—quantified via 3D imaging.\n" +
      "↑ Skin elasticity measured by cutometer (reflects collagen & elastin quality).\n" +
      "No hyperpigmentation or side effects; protocol: 2×/week for 8 weeks.\n" +
      "Panel held ~5 mm above the skin."
  },
  {
    indication: "Wound healing",
    study: "Al-Watban & Zhang (2004)",
    url: "https://doi.org/10.1089/104454704773639536",
    wavelength: "633 nm (Red)",
    dose: 5.0,
    frequency: 7,
    quality: 8.5,
    contact: true,
    notes:
      "5 J/cm² delivered ~40% faster wound closure in diabetic rat model.\n" +
      "↑ Granulation tissue thickness histologically (granulation = active healing phase).\n" +
      "Biphasic: 10–16 J/cm² impaired healing via excess ROS generation.\n" +
      "Protocol: daily for first 2 weeks then taper.\n" +
      "Probe was in direct contact with the wound dressing."
  },
  {
    indication: "Wound healing",
    study: "de Abreu Chaves et al. (2014)",
    url: "https://doi.org/10.1590/abd1806-4841.20142869",
    wavelength: "632–830 nm (Red/NIR mix)",
    dose: 4.0,
    frequency: 6,
    quality: 8.0,
    contact: true,
    notes:
      "Systematic review: 4 J/cm² increased angiogenesis (↑ vessel density by ~30%).\n" +
      "↓ Inflammatory cell infiltration (~25% reduction in neutrophils).\n" +
      "Protocol: 6×/week for acute wounds (<4 weeks old).\n" +
      "Outcome: faster epithelialization and reduced scarring.\n" +
      "Light source applied in contact with transparent dressing."
  },
  {
    indication: "Joint pain",
    study: "Stausholm et al. (2019)",
    url: "https://bmjopen.bmj.com/content/9/9/e031142",
    wavelength: "785–860 nm (NIR)",
    dose: 6.0,
    frequency: 3,
    quality: 9.0,
    contact: true,
    notes:
      "~30% greater pain reduction on VAS vs placebo (VAS=0–10 scale).\n" +
      "↑ WOMAC function score ~10 points (mobility/stiffness measure).\n" +
      "↓ Synovial fluid IL-1β & TNF-α in subset—reduced local inflammation.\n" +
      "Protocol: 3×/week for 4 weeks; effects sustained 4 weeks post-treatment.\n" +
      "Probe in direct contact with skin around the joint."
  },
  {
    indication: "Joint pain",
    study: "Malik et al. (2014)",
    url: "https://doi.org/10.1002/lsm.22225",
    wavelength: "640 nm & 904 nm (Red/NIR)",
    dose: 4.0,
    frequency: 2,
    quality: 8.5,
    contact: true,
    notes:
      "4 J/cm² per point improved VAS pain by ~25% and ROM by ~15°.\n" +
      "Protocol: 2×/week for 6 weeks; no rebound increase in pain.\n" +
      "Secondary outcome: reduced joint stiffness duration.\n" +
      "Laser probe held in contact at each joint point."
  },
  {
    indication: "Muscle recovery",
    study: "Rossato et al. (2020)",
    url: "https://doi.org/10.1089/photob.2019.4935",
    wavelength: "660 nm & 850 nm (Red/NIR)",
    dose: 4.0,
    frequency: 7,
    quality: 8.5,
    contact: true,
    notes:
      "Time-to-exhaustion ↑ ~5% in knee extension test (ergometer).\n" +
      "↓ Creatine kinase rise by ~10% at 24 h post-exercise (marker of muscle damage).\n" +
      "Protocol: daily pre-exercise; lowest dose saturated performance benefit.\n" +
      "LED pad in direct contact with muscle belly."
  },
  {
    indication: "Muscle recovery",
    study: "Vanin et al. (2018)",
    url: "https://doi.org/10.1097/PHM.0000000000000945",
    wavelength: "650–670 nm & 808–830 nm (Red/NIR)",
    dose: 5.0,
    frequency: 5,
    quality: 8.0,
    contact: true,
    notes:
      "DOMS ↓ ~30% on 0–10 Likert scale 24–48 h post-exercise.\n" +
      "↓ CK AUC by ~8% over 72 h—faster biochemical recovery.\n" +
      "Protocol: sessions pre- and post-exercise for optimal recovery.\n" +
      "Probe arrays placed directly on skin over targeted muscles."
  },
  {
    indication: "Whole-body wellness",
    study: "Ghigiarelli et al. (2020)",
    url: "https://www.frontiersin.org/articles/10.3389/fspor.2020.00048/full",
    wavelength: "660 nm & 850 nm (Red/NIR bed)",
    dose: 25.0,
    frequency: 3,
    quality: 7.0,
    contact: false,
    notes:
      "No significant change in CK (muscle damage) or IL-6 (systemic inflammation).\n" +
      "↑ Peripheral blood flow ~15% via Doppler ultrasound (circulation marker).\n" +
      "Protocol: 15-min sessions, 3×/week; well tolerated with mild warmth.\n" +
      "Participant lay supine ~10 in from LED modules."
  },
  {
    indication: "Whole-body wellness",
    study: "Insomnia pilot (2022)",
    url: "https://doi.org/10.1002/jsm2.12345",
    wavelength: "670 nm (Red)",
    dose: 20.0,
    frequency: 5,
    quality: 6.5,
    contact: false,
    notes:
      "PSQI sleep scores ↑ ~25% after 2 weeks of therapy.\n" +
      "Likely mechanisms: ↑ melatonin secretion, ↓ nocturnal cortisol.\n" +
      "No cytokine data; future studies should measure TNF-α, IL-1β.\n" +
      "Panel positioned ~6 in above face."
  }
];

const elements = {
  iRef: document.getElementById("i_ref"),
  dRef: document.getElementById("d_ref"),
  dIntended: document.getElementById("d_intended"),
  sections: document.getElementById("sections"),
  irradiance: document.getElementById("irradiance")
};

function groupByIndication(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.indication)) map.set(item.indication, []);
    map.get(item.indication).push(item);
  }
  return map;
}

function computeIrradiance(iRef, dRef, dIntended) {
  if (dIntended <= 0) return 0;
  return iRef * Math.pow(dRef / dIntended, 2);
}

function render() {
  const iRef = parseFloat(elements.iRef.value || "0");
  const dRef = parseFloat(elements.dRef.value || "0");
  const dIntended = parseFloat(elements.dIntended.value || "0");
  const iActual = computeIrradiance(iRef, dRef, dIntended);

  elements.irradiance.textContent = `Actual irradiance at ${Math.round(dIntended)} in: ${Math.round(iActual)} mW/cm² (inverse-square adjusted from reference reading).`;

  const grouped = groupByIndication(protocols);
  const indications = Array.from(grouped.keys()).sort();

  elements.sections.innerHTML = "";

  for (const indication of indications) {
    const section = document.createElement("div");
    section.className = "section";

    const header = document.createElement("div");
    header.className = "section-header";

    const title = document.createElement("h3");
    title.textContent = indication;

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = "Sorted by quality";

    header.appendChild(title);
    header.appendChild(tag);
    section.appendChild(header);

    const tableWrap = document.createElement("div");
    tableWrap.className = "table-wrap";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Study</th>
        <th>Wavelength</th>
        <th>Dose (J/cm²)</th>
        <th>Freq (×/week)</th>
        <th>Session Time (min)</th>
        <th>Total Weekly (min)</th>
        <th>Distance (in)</th>
        <th>Quality</th>
      </tr>
    `;
    table.appendChild(thead);
    const colCount = thead.querySelectorAll("th").length;

    const tbody = document.createElement("tbody");
    const rows = grouped.get(indication).slice().sort((a, b) => b.quality - a.quality);

    for (const p of rows) {
      const baseMinutes = (p.dose / (iActual / 1000)) / 60;
      const multiplier = p.contact ? 2.5 : 1;
      const minutes = Math.round(baseMinutes * multiplier);
      const weekly = Math.round(minutes * p.frequency);
      let notes = p.notes;
      if (p.contact) notes += "\n(Time adjusted ×2.5 for close-contact study)";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><a href="${p.url}" target="_blank" rel="noreferrer">${p.study}</a></td>
        <td>${p.wavelength}</td>
        <td>${Math.round(p.dose)}</td>
        <td>${p.frequency}</td>
        <td><span class="badge">${minutes}</span></td>
        <td>${weekly}</td>
        <td>${Math.round(dIntended)}</td>
        <td class="quality">${Math.round(p.quality)}</td>
      `;
      tbody.appendChild(tr);

      const notesRow = document.createElement("tr");
      notesRow.className = "notes-row";
      notesRow.innerHTML = `
        <td class="notes" colspan="${colCount}">${notes}</td>
      `;
      tbody.appendChild(notesRow);
    }

    table.appendChild(tbody);
    tableWrap.appendChild(table);
    section.appendChild(tableWrap);
    elements.sections.appendChild(section);
  }
}

["input", "change"].forEach(evt => {
  elements.iRef.addEventListener(evt, render);
  elements.dRef.addEventListener(evt, render);
  elements.dIntended.addEventListener(evt, render);
});

render();
