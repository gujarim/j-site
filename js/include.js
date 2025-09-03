// head에 삽입 (CSS용)
async function includeHeadSafe(file) {
    try {
        // 1. file(경로)에서 HTML 파일 요청
        const res = await fetch(file);

        // 2. 서버 응답이 정상(200 OK)인지 확인
        if (!res.ok) {
            console.warn(`파일 불러오기 실패: ${file}`);
            return;
        }

        // 3. 응답 내용을 문자열(HTML)로 변환
        const html = await res.text();

        // 4. <head> 태그 안의 마지막 부분에 HTML 삽입
        document.head.insertAdjacentHTML("beforeend", html);

    } catch (e) {
        // 5. 네트워크 오류 등 예외 처리
        console.error("includeHeadSafe 오류:", e);
    }
}

// body 영역 공통 include
async function includeHTMLSafe(id, file) {
    try {
        // 1. file(경로)에서 HTML 파일 불러오기
        const res = await fetch(file);

        // 2. 요청 실패한 경우 (404, 500 등)
        if (!res.ok) {
            console.warn(`파일 불러오기 실패: ${file}`);
            return;
        }

        // 3. 응답 본문을 문자열(html)로 변환
        const html = await res.text();

        // 4. DOM에서 id에 해당하는 요소 찾기
        const target = document.getElementById(id);
        if (!target) {
            console.warn(`대상 요소 없음: #${id}`);
            return;
        }

        // 5. 찾은 요소를 html 문자열로 교체
        target.outerHTML = html;

    } catch (e) {
        // 6. 네트워크 에러 등 치명적 예외 처리
        console.error("includeHTMLSafe 오류:", e);
    }
}

// body 끝에 삽입 (JS용)
function loadCommonJSSafe(files) {
    files.forEach(file => {
        // 1. <script> 태그 생성
        const script = document.createElement("script");

        // 2. 불러올 JS 파일 경로 지정
        script.src = file;

        // 3. defer 속성 설정 → HTML parsing 끝나고 실행
        script.defer = true; // body 끝에서 실행

        // 4. <body>에 script 태그 삽입
        document.body.appendChild(script);
    });
}

// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
    includeHeadSafe("layout/css.html");

    includeHTMLSafe("header", "layout/header.html");
    includeHTMLSafe("nav", "layout/nav.html");
    includeHTMLSafe("footer", "layout/footer.html");

    loadCommonJSSafe(["js/ui-content.js"]);
});