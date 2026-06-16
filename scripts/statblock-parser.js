// ============================================================================
// D&D 5e - 한국어 번역 (statblock 파서)
// File: statblock-parser.js
// ============================================================================

console.log("STATBLOCK: file caricato");

const damageTypes = {
  acid: "산성",
  bludgeoning: "타격",
  cold: "냉기",
  fire: "화염",
  force: "역장",
  lightning: "번개",
  necrotic: "사령",
  piercing: "관통",
  poison: "독성",
  psychic: "정신",
  radiant: "광휘",
  slashing: "참격",
  thunder: "천둥"
};

const conditionTypes = {
  blinded: "실명",
  charmed: "매혹",
  deafened: "실청",
  frightened: "공포",
  grappled: "붙잡힘",
  incapacitated: "행동불능",
  invisible: "투명",
  paralyzed: "마비",
  petrified: "석화",
  poisoned: "중독",
  prone: "넘어짐",
  restrained: "포박",
  stunned: "기절",
  unconscious: "무의식",
  exhaustion: "탈진"
};

const subtypeLabels = {
  "Any Race": "모든 종족",
  Asimar: "아시마르",
  Bugbear: "버그베어",
  Centaur: "켄타우로스",
  Changeling: "체인질링",
  Deepgnome: "딥 노움",
  Duergar: "두에르가르",
  Eladrin: "엘라드린",
  Firbolg: "피르볼그",
  Genasi: "제나시",
  Githyanki: "기스양키",
  Githzerai: "기스제라이",
  Goblin: "고블린",
  Goliath: "골리앗",
  Harengon: "하렌곤",
  Hobgoblin: "홉고블린",
  Kalashtar: "칼라쉬타르",
  Kenku: "켄쿠",
  Kobold: "코볼드",
  Lizardfolk: "리저드포크",
  Minotaur: "미노타우로스",
  Orc: "오크",
  Satyr: "사티로스",
  Seaelf: "바다 엘프",
  Shadarkai: "샤다르카이",
  Shifter: "시프터",
  Tabaxi: "타바시",
  Tiefling: "티플링",
  Tortle: "토틀",
  Triton: "트리톤",
  Yuanti: "유안티",
  Warforged: "워포지드",
  Gnome: "노움",
  Dwarf: "드워프",
  Elf: "엘프",
  Halfling: "하플링",
  Human: "인간",
  Dragonborn: "드래곤본",
  Demon: "데몬",
  Devil: "데빌",
  Yugoloth: "유고로스",
  Zombie: "좀비",
  Skeleton: "스켈레톤",
  Vampire: "뱀파이어",
  Lycanthrope: "라이칸스로프",
  Werewolf: "웨어울프",
  Wererat: "웨어랫",
  Werebear: "웨어베어",
  Merfolk: "머포크",
  Giant: "거인",
  Goblinoid: "고블리노이드",
  Shapechanger: "형태변환자"
};

const senseLabels = {
  blindsight: "맹안시",
  darkvision: "암시야",
  tremorsense: "진동감지",
  truesight: "진시야",
  special: "특수"
};

const typeLabels = {
  aberration: "기괴체",
  beast: "야수",
  celestial: "천족",
  construct: "구조물",
  dragon: "용",
  elemental: "정령",
  fey: "요정",
  fiend: "마족",
  giant: "거인",
  humanoid: "인간형",
  monstrosity: "괴물체",
  ooze: "점액류",
  plant: "식물",
  undead: "언데드"
};

const sizeLabels = {
  tiny: "초소형",
  sm: "소형",
  med: "중형",
  lg: "대형",
  huge: "거대형",
  grg: "초대형"
};

const alignments = {
  "chaotic evil": "혼돈 악",
  "chaotic neutral":"혼돈 중립",
  "chaotic good":"혼돈 선",
  "neutral evil":"중립 악",
  "true neutral":"중립",
  "neutral":"중립",
  "neutral good":"중립 선",
  "lawful evil":"질서 악",
  "lawful neutral":"질서 중립",
  "lawful good":"질서 선",
  "chaotic good evil":"혼돈 선/악",
  "lawful chaotic evil":"질서/혼돈 악",
  "unaligned":"무성향",
  "any non-lawful": "질서가 아닌 임의",
  "any": "임의",
  "Any Alignment": "모든 성향",
  "Any Non-Lawful Alignment": "질서가 아닌 모든 성향"
};

const languages = {
  "giant eagle": "자이언트 이글",
  "worg":"워그",
  "winter wolf":"윈터 울프",
  "sahuagin":"사후아긴",
  "giant owl, understands but cannot speak all but giant owl":"자이언트 아울, 모두 이해하지만 자이언트 아울 외에는 말하지 못함",
  "giant elk but can't speak them":"자이언트 엘크, 다만 말하지는 못함",
  "understands infernal but can't speak it":"인페르날을 이해하지만 말하지 못함",
  "understands draconic but can't speak":"드라코닉을 이해하지만 말하지 못함",
  "understands common but doesn't speak it":"공용어를 이해하지만 말하지 못함",
  "understands abyssal but can't speak":"애비설을 이해하지만 말하지 못함",
  "understands all languages it knew in life but can't speak":"생전에 알던 모든 언어를 이해하지만 말하지 못함",
  "understands commands given in any language but can't speak":"어떤 언어로 내린 명령도 이해하지만 말하지 못함",
  "(can't speak in rat form)":"(쥐 형태에서는 말하지 못함)",
  "(can't speak in boar form)":"(멧돼지 형태에서는 말하지 못함)",
  "(can't speak in bear form)":"(곰 형태에서는 말하지 못함)",
  "(can't speak in tiger form)":"(호랑이 형태에서는 말하지 못함)",
  "any one language (usually common)":"아무 언어 1종 (보통 공용어)",
  "any two languages":"아무 언어 2종",
  "any four languages":"아무 언어 4종",
  "5 other languages":"다른 언어 5종",
  "any, usually common":"임의, 보통 공용어",
  "one language known by its creator":"창조자가 아는 언어 1종",
  "the languages it knew in life":"생전에 알던 언어",
  "those it knew in life":"생전에 알던 언어",
  "all it knew in life":"생전에 알던 언어",
  "any it knew in life":"생전에 알던 언어",
  "all, telepathy 120 ft.":"모두, 정신감응 120피트",
  "telepathy 60 ft.":"정신감응 60피트",
  "telepathy 60ft. (works only with creatures that understand abyssal)":"정신감응 60피트 (애비설을 이해하는 크리처에게만)",
  "telepathy 120 ft.":"정신감응 120피트",
  "but can't speak":"다만 말하지 못함",
  "but can't speak it":"다만 말하지 못함",
  "choice":"선택",
  "understands the languages of its creator but can't speak":"창조자의 언어를 이해하지만 말하지 못함",
  "understands common and giant but can't speak":"공용어와 자이언트어를 이해하지만 말하지 못함",
  "cannot speak": "말하지 못함"
};

// ------------------------------------------------------------
//  HOOKS JOURNAL
// ------------------------------------------------------------

const JOURNAL_HOOKS = [
  "renderJournalSheet",
  "renderJournalPageSheet",
  "renderJournalTextPageSheet",
  "renderJournalEntryPageSheet",
  "renderJournalImagePageSheet",
  "renderJournalEntrySheet5e"
];

for (const hook of JOURNAL_HOOKS) {
  Hooks.on(hook, (app, html) => {
    console.log("STATBLOCK: hook triggered =", hook);
    statblockProcess(app, html);
  });
}

// ------------------------------------------------------------
//  PROCESSORE PRINCIPALE
// ------------------------------------------------------------

function statblockProcess(app, html) {
  console.log("STATBLOCK: statblockProcess triggered");

  if (!html) return;

  const root = html[0] ?? html;
  if (!root || !root.querySelector) return;

  const content = root.querySelector(
    ".journal-page-content, .journal-entry-page, .editor-content, .journal-entry-content"
  );

  console.log("STATBLOCK: content =", content);
  if (!content) return;

  const text = content.innerHTML;
  const matches = [...text.matchAll(/@Statblock\[(.*?)\](?:{(.*?)})?/g)];

  console.log("STATBLOCK: matches =", matches);
  if (!matches.length) return;

  for (const match of matches) {
    const query = match[1].trim();
    console.log("STATBLOCK: query =", query);

    const actor =
      fromUuidSync(query) ||
      game.actors.get(query) ||
      game.actors.getName(query);

    console.log("STATBLOCK: actor =", actor);
    if (!actor) continue;

    const block = renderStatblock(actor);
    content.innerHTML = content.innerHTML.replace(match[0], block);
  }
}

// ------------------------------------------------------------
//  RENDERER STATBLOCK
// ------------------------------------------------------------

function renderStatblock(actor) {
  const s = actor.system;
  const abilities = s.abilities;

  // 능력치 수정치 / 내성 (숫자·객체 모두 처리)
  function abilityRow(key, label) {
  const abil = abilities[key];
  const score = abil.value ?? 10;
  const mod = abil.mod ?? Math.floor((score - 10) / 2);

  const save = abil.save?.value ?? mod;

  return `
    <tr>
      <th>${label}</th>
      <td>${score}</td>
      <td class="modifier">
        <a class="sb-roll-ability" data-ability="${key}" data-uuid="${actor.uuid}">
        ${mod >= 0 ? "+" : ""}${mod}
      </a>
      </td>
      <td class="modifier">
        <a class="sb-roll-save" data-ability="${key}" data-uuid="${actor.uuid}">
        ${save >= 0 ? "+" : ""}${save}
        </a>
      </td>
    </tr>
  `;
}


  const skillsBlock = renderSkills(actor);
  const defenses = renderDefenses(s.traits);
  const sensesBlock = renderSenses(s.attributes.senses, actor);
  const languagesBlock = renderLanguagesBlock(s.traits.languages);
  const crpbBlock = renderCRPB(s.details.cr, s.attributes.prof);

  return `
  <div class="mon-stat-block-2024">
    <div class="mon-stat-block-2024__container">
    <div class="mon-stat-block-2024__header">
      <div class="mon-stat-block-2024__name">
        <a class="mon-stat-block-2024__name-link" data-uuid="${actor.uuid}">
          ${actor.name}
        </a>
      </div>
    </div>

    <div class="mon-stat-block-2024__portrait">
      <img src="${actor.img}" alt="${actor.name}">
    </div>

    <div class="mon-stat-block-2024__meta">
      ${translateSizeLabel(s.traits.size)} ${translateTypeLabel(s.details.type?.value)}, ${translateAlignmentLabel(s.details.alignment)}
    </div>

    <div class="mon-stat-block-2024__attributes">
      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">AC</span>
        <span class="mon-stat-block-2024__attribute-value">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.ac.value}
          </span>
          ${s.attributes.ac.label ? `<span class="mon-stat-block-2024__attribute-data-extra">(${s.attributes.ac.label})</span>` : ""}
        </span>&nbsp;&nbsp;
        <span class="mon-stat-block-2024__attribute-label">선제권</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.init?.total >= 0 ? "+" : ""}${s.attributes.init?.total ?? 0}
          </span>
        </span>
      </div>

      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">HP</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${s.attributes.hp.value}
          </span>
          <span class="mon-stat-block-2024__attribute-data-extra">
            (${hpFormula(s)})
          </span>
        </span>
      </div>

      <div class="mon-stat-block-2024__attribute">
        <span class="mon-stat-block-2024__attribute-label">속도</span>
        <span class="mon-stat-block-2024__attribute-data">
          <span class="mon-stat-block-2024__attribute-data-value">
            ${renderSpeed(s.attributes.movement)}
          </span>
        </span>
      </div>
    </div>

    <div class="mon-stat-block-2024__stats">
      <table class="stat-table physical">
        <thead>
          <tr>
            <th></th><th></th><th>수정</th><th>내성</th>
          </tr>
        </thead>
        <tbody>
          ${abilityRow("str", "근력")}
          ${abilityRow("dex", "민첩")}
          ${abilityRow("con", "건강")}
        </tbody>
      </table>
      <table class="stat-table mental">
        <thead>
          <tr>
            <th></th><th></th><th>수정</th><th>내성</th>
          </tr>
        </thead>
        <tbody>
          ${abilityRow("int", "지능")}
          ${abilityRow("wis", "지혜")}
          ${abilityRow("cha", "매력")}
        </tbody>
      </table>
    </div>

    <div class="mon-stat-block-2024__tidbits">
      ${skillsBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">기술</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${skillsBlock.replace('<div class="sb-block"><strong>기술</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}

      ${sensesBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">감각</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${sensesBlock.replace('<div class="sb-block"><strong>감각</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}

      ${defenses.di ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">피해 면역</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.di}
    </span>
  </div>` : ""}

${defenses.dr ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">피해 저항</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.dr}
    </span>
  </div>` : ""}

${defenses.dv ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">피해 취약</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.dv}
    </span>
  </div>` : ""}

${defenses.ci ? `
  <div class="mon-stat-block-2024__tidbit">
    <span class="mon-stat-block-2024__tidbit-label">상태 면역</span>
    <span class="mon-stat-block-2024__tidbit-data">
      ${defenses.ci}
    </span>
  </div>` : ""}


      ${languagesBlock ? `
      <div class="mon-stat-block-2024__tidbit">
        <span class="mon-stat-block-2024__tidbit-label">언어</span>
        <span class="mon-stat-block-2024__tidbit-data">
          ${languagesBlock.replace('<div class="sb-block"><strong>언어</strong> ', "").replace("</div>", "")}
        </span>
      </div>` : ""}

      ${crpbBlock ? `
      <div class="mon-stat-block-2024__tidbit-container">
        <div class="mon-stat-block-2024__tidbit">
          <span class="mon-stat-block-2024__tidbit-label">CR</span>
          <span class="mon-stat-block-2024__tidbit-data">
            ${crpbBlock.replace('<div class="sb-block"><strong>CR</strong> ', "").replace("</div>", "")}
          </span>
        </div>
      </div>` : ""}
    </div>
    </div>
  </div>
  `;
}

// ------------------------------------------------------------
//  보조 함수
// ------------------------------------------------------------

function hpFormula(s) {
  if (s.attributes.hp.formula) return s.attributes.hp.formula;
  const hd = s.attributes.hd;
  if (hd?.max && hd?.denomination) {
    const avg = Math.floor((hd.denomination + 1) / 2);
    const bonus = s.attributes.hp.max - (hd.max * avg);
    const bonusStr = bonus ? (bonus >= 0 ? ` + ${bonus}` : ` - ${Math.abs(bonus)}`) : "";
    return `${hd.max}d${hd.denomination}${bonusStr}`;
  }
  return `${s.attributes.hp.max}`;
}

function renderSpeed(m) {
  const u = m.units || "ft";
  const parts = [];
  if (m.walk) parts.push(`${m.walk} ${u}`);
  if (m.fly) parts.push(`비행 ${m.fly} ${u}`);
  if (m.swim) parts.push(`수영 ${m.swim} ${u}`);
  if (m.climb) parts.push(`등반 ${m.climb} ${u}`);
  if (m.burrow) parts.push(`굴착 ${m.burrow} ${u}`);
  return parts.join(", ");
}

function renderAbilitiesAndSaves(a) {
  const order = ["str", "dex", "con", "int", "wis", "cha"];
  const labels = { str: "근력", dex: "민첩", con: "건강", int: "지능", wis: "지혜", cha: "매력" };

  const rows = order.map(k => {
    const v = a[k].value;
    const mod = a[k].mod ?? Math.floor((v - 10) / 2);
    const save = a[k].save ?? mod;
    return `
      <div class="sb-ability-row">
        <div class="sb-ability-name">${labels[k]}</div>
        <div class="sb-ability-val">${v} (${mod >= 0 ? "+" : ""}${mod})</div>
        <div class="sb-ability-save">내성 ${save >= 0 ? "+" : ""}${save}</div>
      </div>
    `;
  }).join("");

  return `
  <div class="sb-abilities-wrap">
    <div class="sb-abilities-title">능력치와 내성 굴림</div>
    <div class="sb-abilities">${rows}</div>
  </div>`;
}

function renderSkills(actor) {
  const skills = actor.system.skills;

  const list = Object.entries(skills)
    .filter(([_, v]) => v.proficient > 0)
    .map(([k, v]) => {
      const label = CONFIG.DND5E.skills[k]?.label ?? k;
      return `
        <a class="sb-roll-skill" data-skill="${k}" data-uuid="${actor.uuid}">
        ${label} ${v.total >= 0 ? "+" : ""}${v.total}
        </a>
      `;
    })
    .join(", ");

  return list ? `<div class="sb-block"><strong>기술</strong> ${list}</div>` : "";
}

function renderDefenses(t) {
  const di = Array.from(t.di?.value ?? []).map(v => damageTypes[v] ?? v);
  const dr = Array.from(t.dr?.value ?? []).map(v => damageTypes[v] ?? v);
  const dv = Array.from(t.dv?.value ?? []).map(v => damageTypes[v] ?? v);
  const ci = Array.from(t.ci?.value ?? []).map(v => conditionTypes[v] ?? v);

  return {
    di: di.length ? di.join(", ") : "",
    dr: dr.length ? dr.join(", ") : "",
    dv: dv.length ? dv.join(", ") : "",
    ci: ci.length ? ci.join(", ") : ""
  };
}

function renderSenses(s, actor) {
  const u = s.units || "ft";
  const parts = [];
  if (s.blindsight) parts.push(`${senseLabels.blindsight} ${s.blindsight} ${u}`);
  if (s.darkvision) parts.push(`${senseLabels.darkvision} ${s.darkvision} ${u}`);
  if (s.tremorsense) parts.push(`${senseLabels.tremorsense} ${s.tremorsense} ${u}`);
  if (s.truesight) parts.push(`${senseLabels.truesight} ${s.truesight} ${u}`);

  const passive = actor.system.skills.prc?.passive;
  if (passive !== undefined) parts.push(`상시 포착 ${passive}`);

  return `<div class="sb-block"><strong>감각</strong> ${parts.join(", ")}</div>`;
}

function renderLanguagesBlock(traitsLang) {
  if (!traitsLang) return "";
  const labels = traitsLang.labels?.languages ?? [];
  const custom = traitsLang.custom ? [traitsLang.custom] : [];
  const all = [...labels, ...custom];
  if (!all.length) return "";
  return `<div class="sb-block"><strong>언어</strong> ${all.join(", ")}</div>`;
}


function renderCRPB(cr, pb) {
  return `<div class="sb-block"><strong>CR</strong> ${cr ?? "-"} (PB ${pb >= 0 ? "+" : ""}${pb})</div>`;
}

// ------------------------------------------------------------
//  번역 헬퍼
// ------------------------------------------------------------

function translateSizeLabel(size) {
  return sizeLabels[size] || size || "";
}

function translateTypeLabel(type) {
  return typeLabels[type] || type || "크리처";
}

function translateAlignmentLabel(a) {
  if (!a) return "";
  return alignments[a.toLowerCase()] || a;
}

Hooks.on("ready", () => {
  document.addEventListener("click", async event => {
    const link = event.target.closest(".mon-stat-block-2024__name-link");
    if (!link) return;

    const uuid = link.dataset.uuid;
    if (!uuid) return;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.sheet.render(true);
  });
});

// --- 스탯블록 굴림 리스너 ---
Hooks.on("ready", () => {

  // --- 내성 굴림 ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-save");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const ability = el.dataset.ability;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollSavingThrow({ ability }, {}, {});
  });

  // --- 능력 판정 ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-ability");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const ability = el.dataset.ability;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollAbilityCheck({ ability }, {}, {});
  });

  // --- 기술 판정 ---
  document.addEventListener("click", async event => {
    const el = event.target.closest(".sb-roll-skill");
    if (!el) return;

    const uuid = el.dataset.uuid;
    const skill = el.dataset.skill;

    const actor = await fromUuid(uuid);
    if (!actor) return;

    actor.rollSkill({ skill }, {}, {});
  });

});
