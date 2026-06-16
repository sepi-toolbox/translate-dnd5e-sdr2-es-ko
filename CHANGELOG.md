# Changelog

All notable changes to this project will be documented in this file.
The format is based on **Keep a Changelog**, and this project follows a custom versioning scheme:

**MAJOR.FOUNDRY.PATCH**

- **MAJOR** → Breaking structural changes
- **FOUNDRY** → Foundry VTT major compatibility version
- **PATCH** → Improvements, fixes, and incremental updates

---

## [Unreleased]

### Added
- —

---

## [2.0.6] - 2026-06-16

### Fixed
- **스킬 용어 통일** — 혼용되던 스킬명을 정본으로 통일: 감지→**포착**(Perception, 상시 포착과 일치), 동물 다루기→**동물 조련**(Animal Handling), 비전학→**비전**(Arcana). lang 스킬 라벨 + 컴펜디움 스킬 참조 일괄 수정(동사 "감지하다/감지기" 등은 보존). 비전학 94건·감지(스킬) 86건·동물 조련 15건 치환.

---

## [2.0.5] - 2026-06-16

### Changed
- **한국어 번들 폰트 제거, 기본 폰트로 전환** — 본문 나눔명조·UI Pretendard 번들 폰트와 관련 `@font-face`·`font-family` 주입·module.json `fonts` 등록을 제거. 한국어 텍스트는 이제 OS/Foundry 기본 폰트로 렌더된다. (D&D 2024 일지/스탯블록 레이아웃 자체는 유지)

---

## [2.0.4] - 2026-06-16

### Fixed
- **활동(activity) 이름 한국어화** — 아이템 "활동" 탭의 활동 이름(`system.activities[].name`)이 영어로 표시되던 문제 수정(예: "Save"→"내성", "Cast"→"시전"). 734종 활동명 사전(`ACTIVITY_NAME_MAP`)을 만들어 컨버터로 일괄 치환. standalone 아이템 팩은 Babele Item 매핑에 `activities` 필드 컨버터 추가, actors24 임베디드 아이템은 `actorFullById` 컨버터에서 적용. 항목별 per-id 번역이 있으면 우선.

---

## [2.0.3] - 2026-06-16

### Fixed
- **`[[lookup]]` 출력 텍스트 한국어화** — dnd5e의 lookup 인리처는 데이터 enum 값을 그대로 출력하므로(`@target.affects.type`→"creature" 등 영문), 설명문 내 텍스트형 lookup 토큰을 시스템 데이터와 조인해 한국어로 인라인 치환(485건). enum(affects.type→크리처/자신/물체, template.type→구체/원뿔/직선, units→피트/접촉, damage.onSave→절반/없음) + 자유텍스트(affects.special·activation.condition·range.special 282종) 번역. 숫자 lookup(`@save.dc.value` 등)과 `@name`은 동적 유지.
- **"CD" → "DC" 오역 수정** — 스페인어 베이스의 "CD"(Clase de Dificultad)가 한국어 설명에 남아 난이도가 "CD"로 표기되던 문제 563건 수정.

---

## [2.0.2] - 2026-06-16

### Fixed
- **아이템 `requirements`(전제/발동 조건) 번역** — 특성/재주/클래스 기능의 부제로 표시되는 `system.requirements`가 영어로 남던 문제 수정(예: 마족 재생 "Dies outside of Gehanna" → "게헨나 밖에서 죽음"). 66종 고유 조건문을 캔들킵 정본(클래스/종족명 포함)으로 번역해 actors24(임베디드 395)·classes24(81)·origins24(36)·monsterfeatures24(21)·feats24(1) 총 534개 아이템에 주입.
- Babele 기본 Item 매핑에 `requirements` 필드 추가(`registerMapping`), `actorFullById` 컨버터가 임베디드 아이템 `requirements`를 적용하도록 확장.

---

## [2.0.1] - 2026-06-16

### Fixed
- **규칙 용어집 본문 번역** — content24의 규칙 용어집(스킬·상태이상·행동·규칙 용어) 페이지 **본문 386개(~17만 자)가 이름만 번역되고 본문은 영어로 남아 있던 문제** 수정. 스킬 툴팁(예: 기만 "예시: 그럴듯한 거짓말을…"), 상태이상/행동 툴팁이 모두 한국어로 표시됨. HTML 태그·`@UUID`·`&Reference`·`[[roll]]` 토큰 100% 보존, 캔들킵 정본 용어 적용.

---

## [2.0.0] - 2026-06-16

LuckyFrico의 이탈리아어 모듈 구조를 베이스로 전면 개편. 기존 Babele 주제집 번역에 더해 **시스템 UI 전체 + 일지/스탯블록 + 한국어 폰트**를 추가.

### Added
- **시스템 UI 한국어 번역** — dnd5e 시스템 `lang/en.json`(약 3,576개 키) 전체를 한국어로 번역(`lang/ko.json`). 능력치·시트 라벨·상태이상·피해유형·주문학파·설정 등. 캔들킵 2024 SRD 용어집 정본.
- **한국어 폰트** — 본문 나눔명조(Nanum Myeongjo) + UI Pretendard. 라틴 장식 폰트(Bookinsanity 등) 뒤에 폴백으로 추가해 영문/숫자 미감 보존.
- **D&D 2024 일지/스탯블록** — 일지 스타일, `@Statblock`/`@Section` 인리처, 낭독문·GM 메모·인용·스탯블록 ProseMirror 서식 블록, 일지 위 액터 팝업.
- **단위 변환 매크로 4종** — 장면·무기·주문·액터 임페리얼↔미터법 변환(기본 OFF, 피트·파운드 유지).

### Changed
- 모듈 범위 확대: "SRD 2024 Babele 번역" → "시스템 UI + SRD 2024 + 일지/스탯블록".
- 단위 정책: **피트·파운드 유지**(미터 변환은 설정에서 선택).
- `esmodules`에 `main.js` 추가, `styles`·`packs`·`fonts` 등록.

### Fixed
- v14 호환성: `CONFIG.TextEditor`→`CONFIG.ux.TextEditor`, `FormApplication`/`Dialog`→`ApplicationV2`/`DialogV2` 폴백, `mergeObject`/`TextEditor`/`ImagePopout` 네임스페이스화.
- 섹션 파서 `safeSlug`가 한글 제목 앵커를 제거하던 문제 수정(유니코드 문자 보존).
- 설정 `int:` 오타를 `hint:`로 수정해 힌트 노출.

### Note
- 레거시(2014) SRD 주제집 번역은 다음 업데이트 예정.

---

## [1.13.4] - 2026-03-31

### Added
- Spanish vs English consolidation pass (*integración fina v1*) producing a module-ready package per compendium.
- Optional recommendation for `dnd-monster-manual` to resolve remaining external embeds referenced from `dnd5e.content24`.
- Release workflow improvements:
    - Releases are generated as **Draft** by default to allow validation before publication.
    - Automated module packaging using `dev-tools/buildScripts/build_release.py` (git archive–based build).
    - Release asset uploads `dist/translate-dnd5e-sdr2-es.zip`.
    - Explicit `permissions: contents: write` to prevent GitHub Actions permission failures.

### Changed
- Final compendium files consolidated to best-available integrated outputs:
    - `dnd5e.content24.json` ← `dnd5e.content24.es.integracion-fina.v1.json`
        - ES base: `dnd5e.content24.es.mini-correctiva.v2.1.no-key-translation.json`
        - reference overlay: `dnd5e.content24.references.mini-correctiva.v6.external-mm.json`
        - reference paths applied: **135**
        - mismatches: **0**
        - note: `key` values have **not** been translated (by design).
        - note: retains **15** intentional external embeds to `dnd-monster-manual.content` (optional dependency).
    - `dnd5e.actors24.json` ← `dnd5e.actors24.es.integracion-fina.v1.json`
        - ES base: `dnd5e.actors24.es.mini-correctiva.v2.json`
        - overlay references: `dnd5e.actors24.references.mini-correctiva.v2.json`
        - reference paths applied: **28**
        - mismatches: **0**
    - `dnd5e.classes24.json` ← `dnd5e.classes24.es.integracion-fina.v1.json`
        - ES base: `dnd5e.classes24.es.mini-correctiva.v2.json`
        - references overlay: `dnd5e.classes24.references.mini-correctiva.v1.json`
        - reference paths applied: **1**
        - mismatches: **0**
    - `dnd5e.equipment24.json` ← `dnd5e.equipment24.es.mini-correctiva.v2.json`
    - `dnd5e.feats24.json` ← `dnd5e.feats24.es.mini-correctiva.v2.json`
    - `dnd5e.monsterfeatures24.json` ← `dnd5e.monsterfeatures24.es.mini-correctiva.v2.json`
    - `dnd5e.origins24.json` ← `dnd5e.origins24.es.mini-correctiva.v2.json`
    - `dnd5e.spells24.json` ← `dnd5e.spells24.es.mini-correctiva.v2.json`
    - `dnd5e.tables24.json` ← `dnd5e.tables24.es.mini-correctiva.v2.json`
- Babele support:
    - Added/confirmed registration for `dnd5e.equipment24` in the Babele register script (module integration support).

### Fixed
- Final integrity checks after consolidation:
    - `content24`: changes to `key` fields: **0**
    - `content24`: external embeds in `dnd-monster-manual.content`: **15**
    - `actors24`: obsolete references to `phbmobZombie0000`: **0**
    - `actors24`: obsolete references to `phbmobSkeleton00`: **0**
    - `classes24`: obsolete reference to `mh3akteBDiLegqFK`: **0**

### Notes
- `content24` is integrated with the strongest reference fixes available, but retains **15 deliberate external embeds**
  to `dnd-monster-manual.content`; these are intentional and covered via an optional recommendation.

---

## [1.13.3] - 2026-03-02

### Added
- Added Version Links to CHANGELOG.md.

### Changed
- Updated version comparison references to point to v1.13

---
## [1.13.2] - 2026-03-02

### Added
- Added CC-BY 4.0 compliant `LICENSE`.
- Added explicit marketplace legal disclaimers.
- Added non-affiliation statement with Wizards of the Coast.
- Added explicit confirmation that no non-SRD content is included.

### Changed
- Cleaned and normalized `README.md` and `README.en.md` (UTF-8 encoding fix).
- Marketplace-ready documentation structure.
- Updated module version to 1.13.3.

### Fixed
- Fixed UTF-8 encoding issues causing corrupted characters in README.
---

## [1.13.1] - 2026-03-02
### Added
- Added module i18n support via `lang/en.json` and `lang/es.json`.
- Added `languages` section to `module.json` so Foundry can load translations.

### Changed
- `title` and `description` now use localization keys (`TDSRD2.module.name`, `TDSRD2.module.description`).
---

## [1.13.0] - 2026-03-02

### Compatibility
- Foundry VTT v13.x
- dnd5e SRD 5.2.x (2024 rules compatible)

### Added
- Dual installation methods (ZIP + Manifest URL).
- Bilingual README (ES / EN).
- Developer documentation.
- Normalization core v7 structural policy (semantic Spanish Title Case).

### Improved
- Stabilized *mapping-first + converter-second* architecture.
- Full macro preservation (`@UUID`, `&Reference`, `@Embed`, inline rolls).
- Protection of `<table>` blocks and heading elements during normalization.

### Technical
- Converters: `activities`, `mergeEffects`, `advancementById`.
- Forward-compatible structure for future dnd5e system updates.

---

## Version Links

[Unreleased]: https://github.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/compare/v1.13.3...HEAD
[1.13.3]: https://github.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/releases/tag/v1.13.3
[1.13.2]: https://github.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/releases/tag/v1.13.2
[1.13.1]: https://github.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/releases/tag/v1.13.1
[1.13.0]: https://github.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/releases/tag/v1.13.0
