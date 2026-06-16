// ============================================================================
// DnD 5e - Traduzione Italina
// File: main.js
// ============================================================================

Hooks.once("init", () => {
  const praser = document.createElement("link");
  praser.rel = "stylesheet";
  praser.href = "modules/translate-dnd5e-sdr2-es/styles/praser.css";
  document.head.appendChild(praser);

  const statblock = document.createElement("link");
  statblock.rel = "stylesheet";
  statblock.href = "modules/translate-dnd5e-sdr2-es/styles/statblock.css";
  document.head.appendChild(statblock);
});


// Caricamento altri file javascript
import "./scripts/section-parser.js";
import "./scripts/statblock-parser.js";
import "./scripts/dnd-journal-styles.js";

const DELAY = 800;
const FADE = 550;

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
  Shapechanger: "형태변환자",
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

var alignments = {
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
  "Any Non-Lawful Alignment": "질서가 아닌 모든 성향",
};

var languages = {
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

function getTipoCompleto(actor) {
  const type = actor.system.details.type?.value;
  const subtype = actor.system.details.type?.subtype;

  if (!type) return "";

  const tipo = typeLabels[type] ?? type;

  if (!subtype || subtype === "") {
    return tipo;
  }

  const subs = subtype.split(",").map(s => s.trim());

  const subsTradotti = subs.map(s => subtypeLabels[s] ?? s);

  return `${tipo} (${subsTradotti.join(", ")})`;
}

function roundToTwoDecimals(num) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}
function lbToKg(lb) { if(!lb) return lb; return roundToTwoDecimals(Number(lb) / 2); }
function footsToMeters(ft) { if(!ft) return ft; return roundToTwoDecimals(Number(ft) * 0.3); }
function milesToMeters(mi) { if(!mi) return mi; return roundToTwoDecimals(Number(mi) * 1.5); }

function convertEnabled() {
  return game.settings.get("translate-dnd5e-sdr2-es", "convert");
}
function setEncumbranceData() {
  let convert = convertEnabled();
  game.settings.set("dnd5e", "metricWeightUnits", convert);
}

function getSensiRows(actor) {
  const senses = actor.system.attributes.senses;
  const units = senses.units ?? "ft";

  const rows = [];

  // Sensi standard
  for (const key of ["blindsight", "darkvision", "tremorsense", "truesight", "special"]) {
    const value = senses[key];

    if (!value || value === 0 || value === "") continue;

    const label = senseLabels[key] ?? key;
    rows.push(`<div class="row">${label}: ${value}${units}</div>`);
  }

  // Percezione Passiva
  const passive = actor.system.skills.prc?.passive;
  if (passive) {
    rows.push(`<div class="row">상시 포착: ${passive}</div>`);
  }

  return rows.join("");
}

function getTipo(actor) {
  const raw = actor.system.details.type?.value;
  if (!raw) return "";

  return typeLabels[raw] ?? raw;
}

function getTaglia(actor) {
  const raw = actor.system.traits.size;
  if (!raw) return "";
  return sizeLabels[raw] ?? raw;
}

// v14: FormApplication 전역 제거 대응 — ApplicationV2 폴백. 실제 폼은 렌더하지 않고
// 매크로 주제집만 열고 반환하므로 super.render는 호출하지 않는다.
const _MenuBase = foundry.applications?.api?.ApplicationV2 ?? FormApplication;
class OpenCompendiumMenu extends _MenuBase {
  async render() {
    const pack = game.packs.get("translate-dnd5e-sdr2-es.macro"); // 매크로 주제집 링크
    if (pack) pack.render(true);
    else ui.notifications.error("매크로 주제집을 찾을 수 없습니다!");
    return this;
  }
}

Hooks.once('init', () => {
  // 단위 변환 설정 (기본값 OFF — 피트·파운드 유지)
  game.settings.register("translate-dnd5e-sdr2-es", "convert", {
    name: "자동 단위 변환",
    hint: "임페리얼(피트·파운드) 단위를 미터법으로 자동 변환합니다. 기본값은 꺼짐(피트·파운드 유지).",
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    onChange: convert => setEncumbranceData()
  });
  game.settings.register("translate-dnd5e-sdr2-es", "convertScenes", {
    name: "새 장면 변환",
    hint: "새로 만든 장면에 미터법을 자동 적용합니다.",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  game.settings.register("translate-dnd5e-sdr2-es", "convertActors", {
    name: "새 액터 변환",
    hint: "새로 생성한 액터에 미터법을 자동 적용합니다. 가져오기한 액터에는 적용되지 않으니 주제집의 매크로를 사용하세요.",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  game.settings.register("translate-dnd5e-sdr2-es", "convertItems", {
    name: "새 주문 변환",
    hint: "새로 생성한 주문에 미터법을 자동 적용합니다. 가져오기한 주문에는 적용되지 않으니 주제집의 매크로를 사용하세요.",
    scope: "world",
    type: Boolean,
    default: false,
    config: true
  });
  // 매크로 안내 메뉴
  game.settings.registerMenu("translate-dnd5e-sdr2-es", "infoMacros", {
    name: "매크로 안내",
    label: "매크로 주제집 열기",
    hint: "액터·주문·아이템이 자동 변환되지 않았거나 이전에 생성/가져오기된 경우, 이 모듈 주제집의 매크로를 사용하세요.",
    icon: "fas fa-info-circle",
    type: OpenCompendiumMenu,
    restricted: false
  });

  // 액터 팝업 설정
   game.settings.register("translate-dnd5e-sdr2-es", "enableActorPopout", {
    name: "일지에서 액터 팝업 표시",
    hint: "끄면 일지 링크에 마우스를 올려도 액터 팝업이 표시되지 않습니다.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("translate-dnd5e-sdr2-es", "journalStyle", {
        name: "일지 스타일",
        hint: "일지에 적용할 그래픽 스타일을 선택합니다.",
        scope: "client",
        config: true,
        type: String,
        choices: {
            "default": "시스템 기본",
            "dnd_2024": "D&D 2024 - 기본 규칙서"
        },
        default: "dnd_2024",
        onChange: () => window.location.reload()
    });

  // Babele 컴펜디움 등록은 scripts/babele-register.js(2024 팩)에서 처리.
  // 레거시 2014 팩은 다음 업데이트에서 추가 예정.
});
Hooks.once('init', () => {
  if (typeof Babele !== 'undefined') {
    Babele.get().registerConverters({
      "weight": (value) => convertEnabled() ? lbToKg(value) : value,
      "range": (range) => {
        if (!convertEnabled() || !range) return range;
        if (range.units === "ft") {
          return foundry.utils.mergeObject(range, {
            value: footsToMeters(range.value),
            long: footsToMeters(range.long),
            units: "m"
          });
        }
        if (range.units === "mi") {
          return foundry.utils.mergeObject(range, {
            value: milesToMeters(range.value),
            long: milesToMeters(range.long),
            units: "km"
          });
        }
        return range;
      },
      "movement": (movement) => {
        if (!convertEnabled()) return movement;
        let convert = (v) => v;
        let units = movement.units;
        if (units === 'ft') { convert = footsToMeters; units = "m"; }
        if (units === 'ml') { convert = milesToMeters; units = "m"; }
        return foundry.utils.mergeObject(movement, {
          burrow: convert(movement.burrow),
          climb: convert(movement.climb),
          fly: convert(movement.fly),
          swim: convert(movement.swim),
          walk: convert(movement.walk),
          units: units
        });
      },
      "token": (token) => {
        if (!convertEnabled()) return token;
        return foundry.utils.mergeObject(token, {
          dimSight: footsToMeters(token.dimSight),
          brightSight: footsToMeters(token.brightSight)
        });
      }
    });
  }
});

Hooks.once('ready', () => { setEncumbranceData(); });

// Conversione automatica nuove scene
Hooks.on('createScene', (scene) => {
  if (convertEnabled() && game.settings.get("translate-dnd5e-sdr2-es", "convertScenes")) {
    scene.update({ grid: { units: "m", distance: 1.5 } });
  }
});

// Conversione automatica nuovi attori
Hooks.on('createActor', async (actor) => {
  if (!convertEnabled()) return;
  if (!game.settings.get("translate-dnd5e-sdr2-es", "convertActors")) return;
  if (actor.getFlag("babele", "translated")) return;
  if (actor.getFlag("translate-dnd5e-sdr2-es", "converted")) return;

  let movement = actor.system.attributes.movement;
  let token = actor.prototypeToken;
  let weight = actor.system.traits?.weight;
  let senses = actor.system.attributes.senses;

  if (movement.units === "ft") {
    await actor.update({
      prototypeToken: {
        dimSight: footsToMeters(token.dimSight),
        brightSight: footsToMeters(token.brightSight)
      },
      system: {
        attributes: {
          movement: {
            burrow: footsToMeters(movement.burrow),
            climb: footsToMeters(movement.climb),
            fly: footsToMeters(movement.fly),
            swim: footsToMeters(movement.swim),
            walk: footsToMeters(movement.walk),
            units: 'm'
          },
          senses: {
            darkvision: footsToMeters(senses.darkvision),
            blindsight: footsToMeters(senses.blindsight),
            tremorsense: footsToMeters(senses.tremorsense),
            truesight: footsToMeters(senses.truesight)
          }
        },
        traits: {
          weight: lbToKg(weight)
        }
      }
    });
    await actor.setFlag("translate-dnd5e-sdr2-es", "converted", true);
  }
});

// Conversione automatica nuovi incantesimi
Hooks.on('createItem', async (item) => {
  if (!convertEnabled()) return;
  if (!game.settings.get("translate-dnd5e-sdr2-es", "convertItems")) return;
  if (item.type !== "spell") return;
  if (item.getFlag("translate-dnd5e-sdr2-es", "converted")) return;

  let updates = {};
  let changed = false;

  // Range
  let range = item.system.range;
  if (range?.units === "ft") {
    updates["system.range.value"] = footsToMeters(range.value);
    updates["system.range.units"] = "m";
    changed = true;
  }
  if (range?.units === "mi") {
    updates["system.range.value"] = milesToMeters(range.value);
    updates["system.range.units"] = "km";
    changed = true;
  }

  // Target template
  let template = item.system?.target?.template;
  if (template?.size && template.size > 0) {
    if (!template.units || template.units === "ft" || template.size > 15) {
      updates["system.target.template.size"] = footsToMeters(template.size);
      updates["system.target.template.units"] = "m";
      changed = true;
    }
  }

  if (changed) {
    await item.update(updates);
    await item.setFlag("translate-dnd5e-sdr2-es", "converted", true);
  }
});

// Ordinamento alfabetico delle competenze
async function skillSorting() {
  const lists = document.getElementsByClassName("skills-list");
  for (let list of lists) {
    const competences = list.childNodes;
    let complist = [];
    for (let sk of competences) {
      if (sk.innerText && sk.tagName == "LI") {
        complist.push(sk);
      }
    }
    complist.sort(function(a, b) {
      return (a.innerText > b.innerText) ? 1 : -1;
    });
    for (let sk of complist) {
      list.appendChild(sk);
    }
  }
}

// Applica l’ordinamento quando si apre la scheda attore
Hooks.on("renderActorSheet", async function() {
  skillSorting();
});

console.log("Modulo translate-dnd5e-sdr2-es inizializzato");

Hooks.once("ready", async () => {
  const MODULE_ID = "translate-dnd5e-sdr2-es";
  const VERSION_KEY = "shownVersion";

  // Registra un'impostazione nascosta che memorizza l'ultima versione per cui è stato mostrato il messaggio
  game.settings.register(MODULE_ID, VERSION_KEY, {
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  const module = game.modules.get(MODULE_ID);
  const currentVersion = module?.version ?? "unknown";
  const lastShownVersion = game.settings.get(MODULE_ID, VERSION_KEY);

  // Se la versione è nuova (mai mostrata), crea il messaggio
  if (currentVersion !== lastShownVersion) {
    ChatMessage.create({
      user: game.user.id,
      speaker: { alias: "D&D 5e 한국어 번역" },
      content: `<h4>D&D 5e 한국어 번역에 오신 것을 환영합니다</h4>
                <p><em>현재 버전 ${currentVersion}</em></p><p></p>
                <p>이 모듈은 다음을 제공합니다:</p>
                <ul>
                <li>Foundry VTT용 D&D 5e 시스템 UI 한국어 번역</li>
                <li>D&D 2024 SRD 주제집(주문·몬스터·장비·클래스·기원·규칙·표 등) 한국어 번역</li>
                <li>장면·액터·주문·아이템을 임페리얼↔미터법으로 변환하는 매크로 <em>(모듈 설정에서 켜고 끌 수 있으며, 기본값은 피트·파운드 유지입니다)</em></li>
                <li>일지 UUID 링크에서 액터의 주요 정보를 보여주는 팝업</li>
                <li>D&D 2024 기본 규칙서와 동일한 일지 폰트 스타일</li>
                <li>일지 노트 사이에서 전체 섹션 텍스트를 불러오는 기능 <em>(에디터에 노트/섹션의 UUID를 드래그한 뒤 "@UUID"를 "@Section"으로 바꾸면 해당 섹션 본문을 불러옵니다)</em></li>
                <li>GM 낭독문·GM 메모·인용·D&D 2024 스타일 스탯블록 등 사전 서식 블록 <em>(에디터 전용 메뉴에서 손쉽게 삽입할 수 있습니다)</em></li>
                </ul>
                <p>자세한 내용과 사용법은 <a href="https://github.com/sepi-toolbox/translate-dnd5e-sdr2-es-ko" target="_blank">GitHub</a>을 참고하세요.</p><p></p>
                <p><em>※ 레거시 2014 SRD 주제집 번역은 다음 업데이트에서 추가될 예정입니다.</em></p>
                <p></p>
                <p style="font-size:0.85em;opacity:0.8">원본: LuckyFrico(이탈리아어 번역) · foundryvtt-sinregistrar(스페인어 베이스) · 한국어 번역: sepi-toolbox</p>
                <p></p>`
    });

    await game.settings.set(MODULE_ID, VERSION_KEY, currentVersion);
  }
});

// popup attori su diari
Hooks.on("ready", () => {
  if (!game.settings.get("translate-dnd5e-sdr2-es", "enableActorPopout")) return;
  let hoverTimeout = null;
  let currentLink = null;
  let locked = false;
  let currentPopout = null;

  document.addEventListener("mouseover", event => {
    const link = event.target.closest("a.content-link");
    if (!link) return;

    const uuid = link.dataset.uuid;
    if (!uuid || !uuid.startsWith("Actor.")) return;

    if (currentLink === link) return;
    currentLink = link;

    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(async () => {
      if (locked) return;

      const actor = await fromUuid(uuid);
      if (!actor) return;

      const pop = document.createElement("div");
      pop.classList.add("uuid-hover-popout");
      const bioRaw = actor.system.details?.biography?.value ?? "";
      const _TE = foundry.applications?.ux?.TextEditor?.implementation ?? TextEditor;
      const bioHTML = await _TE.enrichHTML(bioRaw);

      pop.innerHTML = `
        <div class="inner">
        <img src="${actor.img}" />
        <div class="header">
            <h4 class="name">${actor.name}</h4>
        </div>
        <div class="bio">${bioHTML}</div>
        <div class="footer">
          <div class="row">${getTipoCompleto(actor)}</div>
          <div class="row">${getTaglia(actor)}</div>
          <div class="row">${alignments[String(actor.system.details.alignment ?? "").toLowerCase()] ?? actor.system.details.alignment ?? ""}</div>
          ${getSensiRows(actor)}
        </div>
        <div class="hint">마우스 우클릭으로 팝업 고정/해제</div>
        </div>
      `;

      pop.querySelector("img").addEventListener("click", () => {
        const _ImagePopout = foundry.applications?.apps?.ImagePopout ?? ImagePopout;
        new _ImagePopout({ src: actor.img, window: { title: actor.name }, shareable: true }).render(true);
      });

      pop.querySelector(".name").addEventListener("click", () => { 
        actor.sheet.render(true); 
      });

      document.body.appendChild(pop);
      currentPopout = pop;

      const rect = link.getBoundingClientRect();
      pop.style.visibility = "hidden";
      pop.style.display = "block";

      await new Promise(requestAnimationFrame); 
      const popRect = pop.getBoundingClientRect();

      let top = rect.top + (rect.height / 2) - (popRect.height / 2);

      top = Math.max(10, Math.min(top, window.innerHeight - popRect.height - 10));

      let left = rect.left - popRect.width - 15;

      left = Math.max(10, left);

      pop.style.top = `${top + window.scrollY}px`;
      pop.style.left = `${left + window.scrollX}px`;

      pop.style.visibility = "visible";

      requestAnimationFrame(() => pop.classList.add("visible"));

      const onLeave = () => {
        if (locked) return;

        pop.classList.remove("visible");
        pop.classList.add("closing");

        setTimeout(() => {
          pop.remove();
          currentPopout = null;
        }, FADE);

        link.removeEventListener("mouseleave", onLeave);
        currentLink = null;
      };

      link.addEventListener("mouseleave", onLeave);

      pop.addEventListener("contextmenu", e => {
        e.preventDefault();
        locked = !locked;

        if (locked) {
          pop.classList.add("locked");
        } else {
          pop.classList.remove("locked");
          onLeave();
        }
      });

      link.addEventListener("contextmenu", e => {
        e.preventDefault();
        if (!currentPopout) return;

        locked = !locked;

        if (locked) {
          currentPopout.classList.add("locked");
        } else {
          currentPopout.classList.remove("locked");
          onLeave();
        }
      });

    }, DELAY);
  });

  document.addEventListener("mouseout", event => {
    const link = event.target.closest("a.content-link");
    if (!link) return;

    if (!locked) {
      clearTimeout(hoverTimeout);
      currentLink = null;
    }
  });
});

Hooks.once("ready", () => {
    const style = game.settings.get("translate-dnd5e-sdr2-es", "journalStyle");

    if (style === "default") return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/modules/translate-dnd5e-sdr2-es/styles/journal/${style}.css`;

    document.head.appendChild(link);
});
