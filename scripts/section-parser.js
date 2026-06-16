// ============================================================================
// DnD 5e - Traduzione Italina
// File: section-praser.js
// ============================================================================

console.log("SECTION PARSER FILE LOADED");

function safeSlug(text) {
    // \ud55c\uae00 \ub4f1 \uc720\ub2c8\ucf54\ub4dc \ubb38\uc790\ub97c \ubcf4\uc874\ud574\uc57c \ud55c\uae00 \uc81c\ubaa9 \uc575\ucee4\uac00 \ub9e4\uce6d\ub41c\ub2e4.
    // (NFD \ubd84\ud574\ub294 \ud55c\uae00 \uc74c\uc808\uc744 \uc790\ubaa8\ub85c \ucabc\uac1c\ubbc0\ub85c \uc0ac\uc6a9\ud558\uc9c0 \uc54a\uc74c)
    return String(text)
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/^-+/, "")
        .replace(/^[0-9]/, "sec-$&");
}

Hooks.once("init", () => {
    console.log("SECTION PARSER INIT HOOK");
    // v14: CONFIG.TextEditor \uc81c\uac70 \u2192 CONFIG.ux.TextEditor \ud3f4\ubc31
    (CONFIG.ux?.TextEditor ?? CONFIG.TextEditor).enrichers.push({
        pattern: /@Section\[(.*?)\](?:{(.*?)})?/g,
        enricher: async (match, options) => {

            console.log("DND SECTION PARSER TRIGGERED", match);

            const raw = match[1].trim();
            const label = match[2] ?? "";
            let [uuid, anchor] = raw.split("#");
            if (anchor) anchor = safeSlug(anchor);


            const doc = await fromUuid(uuid);

            if (!doc) {
                const broken = document.createElement("span");
                broken.classList.add("broken-link");
                broken.innerHTML = `<i class="fas fa-unlink"></i> ${label || raw}`;
                return broken;
            }

            let html = "";
            if (doc.type === "text" && doc.text?.content) {
                html = doc.text.content;
            } else if (doc.pages && doc.pages.size > 0) {
                const firstPage = doc.pages.contents[0];
                html = firstPage.text?.content ?? "";
            }

            if (!anchor) {
                const wrapper = document.createElement("div");
                wrapper.classList.add("section-block");

                const finalHTML = `
                    <div class="section-content">
                        ${label ? `<h2 class="section-title">${label}</h2>` : ""}
                        ${html}
                    </div>

                    <div class="section-link">
                        @UUID[${uuid}]{원본 노트 열기}
                    </div>
                `;

                wrapper.innerHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(finalHTML, { async: true });
                return wrapper;
            }

            const temp = document.createElement("div");
            temp.innerHTML = html;

            [...temp.querySelectorAll("h1, h2, h3, h4, h5, h6")].forEach(h => {
                if (!h.id) {
                    h.id = safeSlug(h.textContent);
                } 
            });

            // 한글 id도 안전하게 매칭하도록 속성 셀렉터 사용
            const header = temp.querySelector(`h1[id="${anchor}"], h2[id="${anchor}"], h3[id="${anchor}"], h4[id="${anchor}"], h5[id="${anchor}"], h6[id="${anchor}"]`);

            if (!header) {
                const missing = document.createElement("span");
                missing.classList.add("broken-link");
                missing.innerHTML = `<i class="fas fa-unlink"></i> 섹션을 찾을 수 없습니다: ${anchor}`;
                return missing;
            }

            const level = parseInt(header.tagName.substring(1));
            const sectionNodes = [header.cloneNode(true)];

            let next = header.nextElementSibling;
            while (next && !(next.tagName.match(/^H[1-6]$/) && parseInt(next.tagName.substring(1)) <= level)) {
                sectionNodes.push(next.cloneNode(true));
                next = next.nextElementSibling;
            }

            const extractedHTML = sectionNodes.map(n => n.outerHTML).join("\n");

            const wrapper = document.createElement("div");
            wrapper.classList.add("section-block");

            const finalHTML = `
                <div class="section-content">
                    ${extractedHTML}
                </div>

                <div class="section-link">
                    @UUID[${uuid}]{Apri nota originale}
                </div>
            `;

            wrapper.innerHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(finalHTML, { async: true });
            return wrapper;
        }
    });

});