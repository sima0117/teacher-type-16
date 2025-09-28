document.addEventListener("DOMContentLoaded", function() {
    // --- ヘッダーとフッターを読み込む機能 ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('../_header.html')
            .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
            .then(data => {
                headerPlaceholder.innerHTML = data;
            }).catch(error => console.error('Error loading header:', error));
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('../_footer.html')
            .then(response => response.ok ? response.text() : Promise.reject('Footer not found'))
            .then(data => {
                footerPlaceholder.innerHTML = data;
            }).catch(error => console.error('Error loading footer:', error));
    }

    // --- ▼▼▼ 相性解説文を自動で挿入する機能 ▼▼▼ ---
    const resultPage = document.getElementById('result-page');
    // compatDataが定義されていて、結果ページである場合のみ実行
    if (typeof compatData !== 'undefined' && resultPage) {
        const selfType = resultPage.dataset.selfType;
        const descriptionElements = document.querySelectorAll('.compat-description');

        descriptionElements.forEach(el => {
            const compatType = el.dataset.compatType;
            const partnerType = el.dataset.partnerType;

            // キーをアルファベット順に並べて生成
            const key = [selfType, partnerType].sort().join('_');

            // データオブジェクトから解説文を取得して挿入
            if (compatData.teacherTeacher[compatType] && compatData.teacherTeacher[compatType][key]) {
                el.innerHTML = compatData.teacherTeacher[compatType][key];
            } else {
                el.innerHTML = "解説文が見つかりませんでした。";
            }
        });
    }
});