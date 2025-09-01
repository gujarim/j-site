// head에 삽입 (CSS용)
async function includeHead(file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        document.head.insertAdjacentHTML("beforeend", html);
    } catch (e) {
        console.error(e);
    }
}

// body 영역 공통 include
async function includeHTML(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        const target = document.getElementById(id);
        if (!target) return;
        target.outerHTML = html;
    } catch (e) {
        console.error(e);
    }
}

// body 끝에 삽입 (JS용)
function loadCommonJS(files) {
    files.forEach(file => {
        const script = document.createElement("script");
        script.src = file;
        script.defer = true; // defer 옵션으로 body 끝에서 실행
        document.body.appendChild(script);
    });
}

// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
    includeHead("/layout/css.html");

    includeHTML("header", "/layout/header.html");
    includeHTML("nav", "/layout/nav.html");
    includeHTML("footer", "/layout/footer.html");

    loadCommonJS(["/js/ui-content.js"]); // 여러 JS 파일 삽입
});