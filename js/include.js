// head에 삽입 (CSS용)
async function includeHeadSafe(file) {
    try {
        const res = await fetch(file);
        if (!res.ok) {
            console.warn(`[includeHead] 파일 없음: ${file}`);
            return;
        }
        const html = await res.text();
        document.head.insertAdjacentHTML("beforeend", html);
        console.log(`[includeHead] 삽입 완료: ${file}`);
    } catch (e) {
        console.error(`[includeHead] 에러: ${file}`, e);
    }
}

// body 영역 공통 include
async function includeHTMLSafe(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) {
            console.warn(`[includeHTML] 파일 없음: ${file}`);
            return;
        }
        const html = await res.text();
        const target = document.getElementById(id);
        if (!target) {
            console.warn(`[includeHTML] 대상 없음: ${id}`);
            return;
        }
        target.outerHTML = html;
        console.log(`[includeHTML] 삽입 완료: ${file} -> #${id}`);
    } catch (e) {
        console.error(`[includeHTML] 에러: ${file}`, e);
    }
}

// body 끝에 삽입 (JS용)
function loadCommonJSSafe(files) {
    files.forEach(file => {
        const script = document.createElement("script");
        script.src = file;
        script.defer = true; // body 끝에서 실행
        script.onload = () => console.log(`[loadCommonJS] 로드 완료: ${file}`);
        script.onerror = () => console.warn(`[loadCommonJS] 로드 실패: ${file}`);
        document.body.appendChild(script);
    });
}

// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
    includeHeadSafe("/layout/css.html");

    includeHTMLSafe("header", "/layout/header.html");
    includeHTMLSafe("nav", "/layout/nav.html");
    includeHTMLSafe("footer", "/layout/footer.html");

    loadCommonJSSafe(["/js/ui-content.js"]);
});