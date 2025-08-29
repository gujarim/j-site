//탭(이중탭, 탭 안에 탭)
const tab = () => {
    const tabWraps = document.querySelectorAll('.tab-wrap');

    tabWraps.forEach(tabWrap => {
        const tabs = tabWrap.querySelectorAll(':scope > ul[role="tablist"] > li > [role="tab"]');

        tabs.forEach(tab => {
            // 클릭 이벤트
            tab.addEventListener('click', () => {
                activateTab(tabWrap, tab);
            });

            // 키보드 방향키 이벤트
            tab.addEventListener('keydown', e => {
                const currentTab = e.target;
                const tabList = Array.from(tabWrap.querySelectorAll(':scope > ul[role="tablist"] > li > [role="tab"]'));
                let index = tabList.indexOf(currentTab);
                let newIndex = index;

                if (e.key === 'ArrowRight') {   
                    newIndex = (index + 1) % tabList.length;
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (index - 1 + tabList.length) % tabList.length;
                }

                if (newIndex !== index) {
                    const newTab = tabList[newIndex];
                    newTab.focus();
                    activateTab(tabWrap, newTab);
                }
            });
        });
    });

    function activateTab(scope, newTab) {
        // 직계 탭만 선택
        const tabs = scope.querySelectorAll(':scope > ul[role="tablist"] > li > [role="tab"]');

        // 직계 패널만 선택 (중첩 탭 영향 안받음)
        const panels = scope.querySelectorAll(':scope > .panels > [role="tabpanel"]');

        tabs.forEach(tab => {
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
            tab.parentElement.classList.remove('on');
        });

        panels.forEach(panel => {
            panel.classList.remove('on');
        });

        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');
        newTab.parentElement.classList.add('on');

        const panelId = newTab.getAttribute('aria-controls');
        const panel = scope.querySelector(`#${panelId}`);
        if (panel) {
            panel.classList.add('on');
        }

        newTab.focus();
    }
};

window.addEventListener('load', () => {
    tab();
})