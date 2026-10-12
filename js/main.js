document.addEventListener('DOMContentLoaded', function() {
    // 언어 선택기 요소
    const languageSelect = document.getElementById('languageSelect');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 저장된 언어 설정 불러오기
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ja';
    
    // 초기 언어 설정
    languageSelect.value = savedLanguage;
    updateContent(savedLanguage);
    
    // 언어 변경 이벤트 리스너
    languageSelect.addEventListener('change', function(e) {
        const selectedLanguage = e.target.value;
        updateContent(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage);
        document.documentElement.lang = selectedLanguage;
    });

    // 햄버거 메뉴 클릭 이벤트
    hamburgerMenu.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        hamburgerMenu.innerHTML = navContainer.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // 메뉴 링크 클릭시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 화면 크기가 변경될 때 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navContainer.classList.remove('active');
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // 비디오 로드 개선
    const video = document.querySelector('.main-video');
    if (video) {
        // 비디오 메타데이터 로드 완료 시
        video.addEventListener('loadedmetadata', function() {
            video.style.display = 'block';
            // 첫 프레임으로 이동
            video.currentTime = 0;
        });
        
        // 비디오 로드 완료 시
        video.addEventListener('canplay', function() {
            video.style.display = 'block';
            // 첫 프레임으로 이동
            video.currentTime = 0;
        });
        
        // 페이지 로드 시 비디오 준비
        video.load();
    }

});

// 페이지 콘텐츠 업데이트 함수
function updateContent(language) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            if (key === 'main.message' || key === 'main.desc') {
                element.innerHTML = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = language;
    
    // 폰트 우선순위 조정
    const fontFamilies = {
        ja: "'Noto Sans JP'",
        ko: "'Noto Sans KR'",
        zh: "'Noto Sans SC'",
        en: "'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC'"
    };
    
    document.body.style.fontFamily = `${fontFamilies[language]}, sans-serif`;
} 