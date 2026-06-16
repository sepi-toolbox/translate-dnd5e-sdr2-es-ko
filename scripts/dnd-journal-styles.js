// ============================================================================
// DnD 5e - Traduzione Italina
// File: dnd-journal-styles.js
// ============================================================================

console.log("DND5E-IT | Journal Styles attivo");

export const MODULE_ID = "translate-dnd5e-sdr2-es";

function insertHTML(view, htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = ProseMirror.DOMParser.fromSchema(view.state.schema).parseSlice(doc.body);
  const transaction = view.state.tr.replaceSelection(fragment);
  view.dispatch(transaction);
}

Hooks.once("init", () => {
  console.log("DND5E-IT | Carico CSS Journal Styles");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `modules/${MODULE_ID}/styles/dnd-journal-styles.css`;
  document.head.appendChild(link);
});


Hooks.on("getProseMirrorMenuDropDowns", (menu, dropdowns) => {
  dropdowns.dndJournal = {
    title: "D&D 서식 블록",
    action: "dnd-it-blocks",
    entries: [
      {
        title: "낭독문",
        description: "플레이어에게 읽어줄 서술 블록",
        action: "dnd-it-readaloud",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
            `modules/${MODULE_ID}/templates/readaloud.html`
          );
          insertHTML(menu.view, html);
        }
      },
      {
        title: "GM 메모",
        description: "던전 마스터용 안내 상자를 삽입",
        action: "dnd-it-gm-hint",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
            `modules/${MODULE_ID}/templates/gm-hint.html`
          );
          insertHTML(menu.view, html);
        }
      },
      {
        title: "인용문",
        description: "인용을 위한 상자를 삽입",
        action: "dnd-it-cite",
        cmd: async () => {
          const html = await foundry.applications.handlebars.renderTemplate(
            `modules/${MODULE_ID}/templates/epigrafe.html`
          );
          insertHTML(menu.view, html);
        }
      }
    ]
  };

  // GM에게만 표시
  if (game.user.isGM) {
    dropdowns.dndJournal.entries.push({
      title: "스탯블록",
      description: "액터를 선택해 스탯블록을 자동 삽입",
      action: "dnd-it-statblock",
      cmd: async () => {
        const actors = game.actors.contents;
        const content = `
            <div class="form-group">
              <label>액터 선택:</label>
              <select id="dnd-it-statblock-select">
                ${actors.map(a => `<option value="${a.uuid}">${a.name}</option>`).join("")}
              </select>
            </div>
          `;
        // v14: V1 Dialog 제거 대응 — DialogV2 우선, 폴백으로 V1 Dialog
        const DV2 = foundry.applications?.api?.DialogV2;
        if (DV2) {
          const uuid = await DV2.prompt({
            window: { title: "스탯블록 삽입" },
            content,
            ok: {
              label: "삽입",
              callback: (event, button) => button.form.elements["dnd-it-statblock-select"].value
            },
            rejectClose: false
          });
          if (uuid) insertHTML(menu.view, `<p>@Statblock[${uuid}]</p>`);
        } else {
          new Dialog({
            title: "스탯블록 삽입",
            content,
            buttons: {
              ok: {
                label: "삽입",
                callback: html => {
                  const uuid = html.find("#dnd-it-statblock-select").val();
                  insertHTML(menu.view, `<p>@Statblock[${uuid}]</p>`);
                }
              },
              cancel: { label: "취소" }
            }
          }).render(true);
        }
      }
    });
  }
});

Hooks.once("ready", () => {
  console.log("DND5E-IT | Journal Styles pronto");
});
