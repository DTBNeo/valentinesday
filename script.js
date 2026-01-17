/* ============================================
   VALENTINE'S DAY WEBSITE - JAVASCRIPT
   ============================================ */

export function initializeWebsite(config) {
    let currentQuestion = 1;
    let isNoButtonEscaping = false;

    // Set page title and basic config
    document.getElementById('pageTitle').textContent = config.pageTitle;
    applyConfigToDOM(config);
    createFloatingEmojis(config);
    initializeMusicPlayer(config);

    // Question 1 - Do you like me?
    document.getElementById('q1Yes').addEventListener('click', () => {
        showSecretAnswer(config.questions.first.secretAnswer);
        setTimeout(() => {
            currentQuestion = 2;
            switchQuestion(1, 2);
        }, 2000);
    });

    document.getElementById('q1No').addEventListener('click', () => {
        makeNoButtonEscape();
    });

    // Question 2 - Love Meter
    const loveMeter = document.getElementById('loveMeter');
    const lovePercentage = document.getElementById('lovePercentage');
    const loveMessage = document.getElementById('loveMessage');

    loveMeter.addEventListener('input', () => {
        const percentage = parseInt(loveMeter.value);
        lovePercentage.textContent = percentage + '%';
        updateLoveMessage(percentage, config.loveMessages);
    });

    document.getElementById('q2Next').addEventListener('click', () => {
        currentQuestion = 3;
        switchQuestion(2, 3);
    });

    // Question 3 - Will you be my Valentine?
    document.getElementById('q3Yes').addEventListener('click', () => {
        switchQuestion(3, null);
        showCelebration(config);
        createHeartExplosion(config);
    });

    document.getElementById('q3No').addEventListener('click', () => {
        makeNoButtonEscape();
    });

    // Reset Button
    document.getElementById('resetBtn').addEventListener('click', () => {
        resetWebsite();
    });

    // Functions
    function applyConfigToDOM(config) {
        // Apply colors
        document.body.style.background = `linear-gradient(135deg, ${config.colors.backgroundStart} 0%, ${config.colors.backgroundEnd} 100%)`;
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.backgroundColor = config.colors.buttonBackground;
            btn.style.color = 'white';
        });

        // Apply question texts
        document.getElementById('q1Text').textContent = config.questions.first.text;
        document.getElementById('q1Yes').textContent = config.questions.first.yesBtn;
        document.getElementById('q1No').textContent = config.questions.first.noBtn;

        document.getElementById('q2Text').textContent = config.questions.second.text;
        document.getElementById('loveMeterStartText').textContent = config.questions.second.startText;
        document.getElementById('q2Next').textContent = config.questions.second.nextBtn;

        document.getElementById('q3Text').textContent = config.questions.third.text;
        document.getElementById('q3Yes').textContent = config.questions.third.yesBtn;
        document.getElementById('q3No').textContent = config.questions.third.noBtn;

        // Apply celebration content
        document.getElementById('celebrationTitle').textContent = config.celebration.title;
        document.getElementById('celebrationMessage').textContent = config.celebration.message;
        document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

        // Apply text color
        document.querySelectorAll('h1').forEach(el => {
            el.style.color = config.colors.textColor;
        });
    }

    function createFloatingEmojis(config) {
        const container = document.getElementById('floatingEmojisContainer');
        const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
        
        for (let i = 0; i < 15; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji ' + (i % 2 === 0 ? 'hearts' : 'bears');
            emoji.textContent = allEmojis[i % allEmojis.length];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = Math.random() * 100 + '%';
            emoji.style.animationDuration = config.animations.floatDuration;
            emoji.style.setProperty('--float-distance', config.animations.floatDistance);
            
            container.appendChild(emoji);
        }
    }

    function initializeMusicPlayer(config) {
        const musicBtn = document.getElementById('musicBtn');
        const bgMusic = document.getElementById('bgMusic');

        bgMusic.src = config.music.musicUrl;
        bgMusic.volume = config.music.volume;
        musicBtn.textContent = config.music.startText;

        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(err => {
                    console.log('Autoplay prevented or error:', err);
                });
                musicBtn.textContent = config.music.stopText;
            } else {
                bgMusic.pause();
                musicBtn.textContent = config.music.startText;
            }
        });

        // Try to autoplay if enabled
        if (config.music.autoplay && config.music.musicUrl !== 'YOUR_CLOUDINARY_URL_HERE') {
            bgMusic.play().catch(err => {
                console.log('Autoplay blocked by browser');
            });
        }
    }

    function switchQuestion(from, to) {
        const fromQuestion = document.getElementById(`question${from}`);
        if (fromQuestion) {
            fromQuestion.classList.remove('active');
        }
        
        if (to) {
            const toQuestion = document.getElementById(`question${to}`);
            toQuestion.classList.add('active');
        }
    }

    function updateLoveMessage(percentage, loveMessages) {
        const loveMessage = document.getElementById('loveMessage');
        
        if (percentage > 5000) {
            loveMessage.textContent = loveMessages.extreme;
        } else if (percentage > 1000) {
            loveMessage.textContent = loveMessages.high;
        } else if (percentage > 100) {
            loveMessage.textContent = loveMessages.normal;
        } else {
            loveMessage.textContent = 'And beyond! 🥰';
        }
    }

    function showSecretAnswer(answer) {
        const modal = document.getElementById('secretModal');
        document.getElementById('secretAnswer').textContent = answer;
        modal.classList.add('active');
        
        setTimeout(() => {
            modal.classList.remove('active');
        }, 2000);
    }

    function makeNoButtonEscape() {
        if (currentQuestion === 1) {
            const noBtn = document.getElementById('q1No');
            escapeButton(noBtn);
        } else if (currentQuestion === 3) {
            const noBtn = document.getElementById('q3No');
            escapeButton(noBtn);
        }
    }

    function escapeButton(button) {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        button.style.position = 'relative';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
        button.style.transition = 'all 0.3s ease';
    }

    function showCelebration(config) {
        const celebration = document.getElementById('celebration');
        celebration.classList.add('active');
    }

    function createHeartExplosion(config) {
        const heartEmojis = config.floatingEmojis.hearts;
        const container = document.querySelector('.heart-explosion-container');
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-explosion';
                heart.textContent = heartEmojis[i % heartEmojis.length];
                heart.style.fontSize = (1.5 * config.animations.heartExplosionSize) + 'rem';
                heart.style.left = (Math.random() * 60 - 30) + '%';
                container.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2000);
            }, i * 100);
        }
    }

    function resetWebsite() {
        currentQuestion = 1;
        switchQuestion(3, null);
        document.getElementById('celebration').classList.remove('active');
        document.getElementById('loveMeter').value = 100;
        document.getElementById('lovePercentage').textContent = '100%';
        document.getElementById('loveMessage').textContent = 'And beyond! 🥰';
        
        // Reset button positions
        const q1No = document.getElementById('q1No');
        const q3No = document.getElementById('q3No');
        q1No.style.position = 'static';
        q1No.style.left = '0';
        q1No.style.top = '0';
        q3No.style.position = 'static';
        q3No.style.left = '0';
        q3No.style.top = '0';
        
        switchQuestion(null, 1);
    }
}
