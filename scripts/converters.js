import { mergeEffects } from "./converters/merge-effects.js";
import { advancementById } from "./converters/advancement-by-id.js";
import { journalPagesById } from "./converters/journalPagesById.js";
import { journalEntryFullById } from "./converters/journalEntryFullById.js";
import { actorFullById } from "./converters/actorFullById.js";
import { activityNames } from "./converters/activity-names.js";

Hooks.on("init", () => {
  const babele = game?.babele;
  if (!babele?.registerConverters) return;

    babele.registerConverters({
        mergeEffects,
        advancementById,
        journalPagesById,
        journalEntryFullById,
        actorFullById,
        activityNames
    });

    // Babele 기본 Item 매핑(name + system.description.value)에:
    //  - requirements(전제/발동 조건) 필드 추가
    //  - activities(활동) 이름을 사전으로 치환하는 컨버터 추가
    // registered 레이어는 기본 레이어와 필드 단위 병합되므로 name/description은 유지된다.
    if (typeof babele.registerMapping === "function") {
        try {
            babele.registerMapping({
                Item: {
                    requirements: "system.requirements",
                    activities: { path: "system.activities", converter: "activityNames" }
                }
            });
            console.log("[Babele - translate-dnd5e-sdr2-es] Item.requirements/activities 매핑 등록됨");
        } catch (e) {
            console.warn("[Babele - translate-dnd5e-sdr2-es] registerMapping 실패(무시):", e?.message);
        }
    }

    console.log("[Babele - translate-dnd5e-sdr2-es] Converters registered:", Object.keys(babele.converters ?? {}));
});