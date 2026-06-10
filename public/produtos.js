const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

if (previousButton && nextButton) {
    
    const itens = document.querySelectorAll('.item');
    const dots = document.querySelectorAll('.dot');
    const numberIndicator = document.querySelector('.number');
    const list = document.querySelector('.list');

    let active = 0;
    const total = itens.length; 
    let timer;

    function update(direction) {
        // Busca os elementos ativos apenas no momento da execução
        const currentItem = document.querySelector('.item.active');
        const currentDot = document.querySelector('.dot.active');

        if (currentItem) currentItem.classList.remove('active');
        if (currentDot) currentDot.classList.remove('active');

        if (direction > 0) {
            active = active + 1;
            if (active === total) active = 0;
        } else {
            active = active - 1;
            if (active < 0) active = total - 1;
        }

        if (itens[active]) itens[active].classList.add('active');
        if (dots[active]) dots[active].classList.add('active');
        
        if (numberIndicator) {
            numberIndicator.textContent = String(active + 1).padStart(2, '0');
        }
    }

    // Função para resetar o timer de forma organizada
    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            update(1);
        }, 5000);
    }

    /* Inicialização */
    resetTimer();

    /* Eventos de clique */
    previousButton.addEventListener('click', () => {
        update(-1);
        resetTimer();
    });

    nextButton.addEventListener('click', () => {
        update(1);
        resetTimer();
    });
    // Quando o usuário estiver no mobile.
    let touchStartX = 0;
    let touchEndX = 0;

    // Função que checa a direção do deslize
    function handleGesture() {
    const threshold = 50; // Distância mínima para ser considerado um swipe
    if (touchEndX < touchStartX - threshold) {
        // Deslizou para a esquerda -> Próximo
        update(1);
        resetTimer();
    }
    if (touchEndX > touchStartX + threshold) {
        // Deslizou para a direita -> Anterior
        update(-1);
        resetTimer();
    }
    }

    // Eventos de toque na lista do carrossel
    list.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    });

    list.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
    });
} 