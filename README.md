# 🇰🇷 D&D 5e 한국어 번역 (시스템 UI + SRD 2024)

> **한국어 번역 모듈** — [LuckyFrico의 이탈리아어 번역 모듈](https://github.com/LuckyFrico/dnd5e-it-translation-foundryVTT) 구조를 베이스로, foundryvtt-sinregistrar의 스페인어 SRD 2024 Babele 번역을 결합해 한국어로 만든 비공식 모듈입니다.
>
> **설치 매니페스트 URL** (Foundry → 모듈 설치 → 하단 URL 입력란):
> ```
> https://raw.githubusercontent.com/sepi-toolbox/translate-dnd5e-sdr2-es-ko/main/module.json
> ```
>
> - **요구 사항**: `dnd5e` 시스템 + [Babele](https://gitlab.com/riccisi/foundryvtt-babele) 모듈. Foundry UI 언어를 **한국어**로 설정해야 적용됩니다.
> - **포함 내용**
>   - **시스템 UI 전체 한국어화** — 능력치·시트 라벨·상태이상·피해유형·주문학파·설정 등 dnd5e 인터페이스(약 3,576개 키).
>   - **D&D 2024 SRD 주제집 Babele 번역** — 주문·몬스터/NPC·장비·클래스 기능·몬스터 특성·기원·규칙 일지·재주·무작위표.
>   - **D&D 2024 스타일 일지 & 스탯블록** — 한국어 폰트(본문 나눔명조 + UI Pretendard), 낭독문/GM 메모/인용/스탯블록 서식 블록, 일지 섹션·액터 팝업.
>   - **단위 변환 매크로** — 임페리얼↔미터법(기본값은 피트·파운드 유지, 설정에서 전환).
> - **용어 정본**: Candlekeep D&D 5e 2024 SRD 한국어 용어집.
> - 모듈 ID는 원본과 동일(`translate-dnd5e-sdr2-es`)하여 원본 스페인어판과 **동시 설치할 수 없습니다**.
> - ⚠️ 레거시(2014) SRD 주제집 번역은 다음 업데이트에서 추가될 예정입니다.
> - 콘텐츠 라이선스: 아래 원문(CC-BY 4.0) 동일.

---

<details>
<summary>원본 README (Español / English)</summary>

# 🇪🇸 D&D 5e SRD 2024 -- Español (Babele)

![Foundry v13](https://img.shields.io/badge/Foundry-v13-green) ![dnd5e
5.2.x](https://img.shields.io/badge/dnd5e-5.2.x-blue) ![Babele
Required](https://img.shields.io/badge/Babele-required-orange) ![SRD
5.2.1](https://img.shields.io/badge/SRD-5.2.1-lightgrey)

### Este módulo no está afiliado a Wizards of the Coast.
### Este módulo no incluye contenido fuera del SRD.

Este módulo contiene traducciones de material publicado bajo la licencia **Creative Commons Attribution 4.0 International License (CC-BY 4.0)**.

Dungeons & Dragons SRD 5.2.1 © Wizards of the Coast LLC.

---

## 📦 Descripción

Traducción al español de los compendios oficiales del **SRD 5.2.x (compatible con reglas 2024)** del sistema **dnd5e** para Foundry VTT.

Implementado mediante **Babele** con arquitectura:

Mapping First → Converter Second → Normalization Layer

------------------------------------------------------------------------

## 📦 Contenido del Módulo

Este módulo proporciona traducciones estructuradas para los siguientes compendios del sistema dnd5e:

| Compendio |   Estado   |
|----------|:----------:|
| Clases   |     ✅      |
| Conjuros    |     ✅      |
| Dotes    |     ✅      |
| Equipo    |     ✅      |
| Rasgos de monstruos    |     ✅      |
| Actores (Monstruos, PNJ, Premades)    |     ✅      |
| Orígenes    |     ✅      |
| Tablas    |     ✅      |
| Reglas (Journal Entries)    |     ✅      |

------------------------------------------------------------------------

## 🧠 Arquitectura Técnica

Mapping First → Converter Second → Normalization Layer

### Convertidores

-   activities
-   mergeEffects
-   advancementById

### Normalización v7

-   Glosario EN→ES canónico
-   Protección de macros (@UUID, &Reference, @Embed, \[\[/r ...\]\])
-   Protección de
    ```{=html}
    <table>
    ```
    y `<h1-6>`{=html}
-   Title Case semántico en campos estructurales

------------------------------------------------------------------------

## 📂 Estructura
```
translate-dnd5e-sdr2-es/ 
├── module.json
├── scripts/
├── compendiums/
└── normalization/
```

------------------------------------------------------------------------

## ⚙️ Requisitos

-   Foundry VTT v13+
-   Sistema dnd5e SRD 5.2.x
-   Babele

------------------------------------------------------------------------

## 🚀 Instalación

### 🔹 Opción 1 — Descargar ZIP

1. Ir a la sección **Releases** del repositorio.
2. Descargar el fichero `.zip` de la **última versión** o de la **versión deseada**.
3. Descomprimir en:

   FoundryVTT/Data/modules/

4. Activar el módulo desde Foundry.
5. Activar la traducción desde Babele.

---

### 🔹 Opción 2 — Instalación directa desde Foundry (URL)

1. En Foundry, ir a **Add-on Modules → Install Module → Install from Manifest URL**.
2. Introducir la siguiente URL:

   https://raw.githubusercontent.com/foundryvtt-sinregistrar/translate-dnd5e-sdr2-es/main/module.json

4. Instalar el módulo.
4. Activarlo y habilitar la traducción desde Babele.

------------------------------------------------------------------------

## 📜 Licencia

Este proyecto contiene exclusivamente material publicado bajo **Creative Commons Attribution 4.0 (CC-BY 4.0)**.

No incluye contenido propietario fuera del SRD.

---

## 📜 Changelog

Consulta: **CHANGELOG.md**

## 👤 Autor

foundryvtt-sinregistrar

</details>
