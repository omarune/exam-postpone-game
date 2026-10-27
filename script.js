/**
 * ============================================
 * لعبة "نأجل الامتحان ولا لأ؟"
 * Interactive Funny Exam Postpone Game
 * ============================================
 */

// --- الرسائل الساخرة ---
const sarcasticMessages = [
    "الشارع الوراه 🏃‍♂️",
    "طب ايدك لتوحشك 🔪",
    "آه إيه بس؟ روح احفظ يا بطل! 💪",
    "بيقولك من الغباء فعل الشئ مرتين وانتظار نتيجة مختلفة 🙄",
    "شكلك عايز تسقط السنة دي برضه؟ 😅",
    "الزر ده مش هينفعك، روح ذاكر أحسن 📚",
    "حاول تاني... المرة الجاية هتنجح (مش هتنجح) 😏",
    "انت كده بتضيع وقتك، والامتحان قرب! ⏰",
    "يا عم انت، المذاكرة أحسن من اللف حوالين الزر 😂",
    "الزر ده بيهرب منك زي ما بتتهرب من المذاكرة 🏃",
    "استسلم بقى واضغط (لا) يا بطل 🎯",
    "كل ما تحاول، الامتحان بيقرب أكتر 📅",
    "انت مش هتقدر تمسكه، زي ما مش هتقدر تمسك الدرجة النهائية 😜",
    "روح ذاكر بدل ما تلاحق الزر ده 📝",
    "الزر ده أسرع منك في المذاكرة بردو 😆",
    "حظك وحش النهارده، بكرة الامتحان أحسن 🍀",
    "لأ لأ لأ... مش هينفع 😤",
    "الدنيا لسه بخير، بس الزر ده مش هيتضغط 🌍",
    "انت كده بتعمل رياضة؟ ولا بتجري ورا الزر؟ 🏋️",
    "خلاص استسلم، الامتحان أهم من اللعب 🎓"
];

// --- المتغيرات العامة ---
let yesBtn, noBtn, messageContainer, finalMessage, attemptCounter, attemptCount;
let attempts = 0;
let lastMessageIndex = -1;
let isGameOver = false;
let activeMessages = 0;
const MAX_ACTIVE_MESSAGES = 5;

// --- تهيئة الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    // الحصول على العناصر
    yesBtn = document.getElementById('yesBtn');
    noBtn = document.getElementById('noBtn');
    messageContainer = document.getElementById('messageContainer');
    finalMessage = document.getElementById('finalMessage');
    attemptCounter = document.querySelector('.attempt-counter');
    attemptCount = document.getElementById('attemptCount');

    // إضافة مستمعي الأحداث
    setupEventListeners();

    // منع القائمة المنبثقة على الموبايل
    document.addEventListener('contextmenu', (e) => {
        if (e.target === yesBtn) e.preventDefault();
    });
});

// --- إعداد مستمعي الأحداث ---
function setupEventListeners() {
    // زر "آه" - يهرب عند المحاولة
    yesBtn.addEventListener('pointerenter', handleYesAttempt);
    yesBtn.addEventListener('pointerdown', handleYesAttempt);
    yesBtn.addEventListener('touchstart', handleYesAttempt, { passive: false });
    yesBtn.addEventListener('click', handleYesAttempt);

    // زر "لا" - النهاية السعيدة
    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('pointerdown', handleNoClick);
}

// --- التعامل مع محاولة الضغط على "آه" ---
function handleYesAttempt(e) {
    // منع السلوك الافتراضي
    if (e.type === 'touchstart') {
        e.preventDefault();
    }

    // إذا كانت اللعبة انتهت، لا تفعل شيئاً
    if (isGameOver) return;

    // منع التكرار السريع جداً (حماية الأداء)
    const now = Date.now();
    if (handleYesAttempt.lastAttempt && now - handleYesAttempt.lastAttempt < 100) {
        return;
    }
    handleYesAttempt.lastAttempt = now;

    // تحريك الزر إلى مكان عشوائي
    moveButtonRandomly();

    // إظهار رسالة ساخرة
    showSarcasticMessage();

    // تحديث عداد المحاولات
    attempts++;
    updateAttemptCounter();

    // اهتزاز بسيط على الموبايل (إذا كان مدعوماً)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// --- تحريك الزر إلى مكان عشوائي ---
function moveButtonRandomly() {
    // الحصول على أبعاد النافذة والزر
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnRect = yesBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // حساب المنطقة الآمنة للحركة
    const padding = 20;
    const minX = padding;
    const maxX = windowWidth - btnWidth - padding;
    const minY = padding;
    const maxY = windowHeight - btnHeight - padding;

    // التأكد من أن الزر لا يتداخل مع زر "لا"
    const noBtnRect = noBtn.getBoundingClientRect();
    const safeDistance = 150; // المسافة الآمنة بين الزرين

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
        // توليد موقع عشوائي
        newX = Math.random() * (maxX - minX) + minX;
        newY = Math.random() * (maxY - minY) + minY;

        // التحقق من عدم التداخل مع زر "لا"
        const distanceToNo = Math.hypot(
            newX - noBtnRect.left,
            newY - noBtnRect.top
        );

        if (distanceToNo > safeDistance || attempts >= maxAttempts) {
            break;
        }

        attempts++;
    } while (true);

    // تطبيق الحركة مع أنيميشن سلس
    yesBtn.classList.add('fleeing');
    yesBtn.style.position = 'fixed';
    yesBtn.style.left = newX + 'px';
    yesBtn.style.top = newY + 'px';
    yesBtn.style.zIndex = '100';

    // إزالة كلاس الحركة بعد الانتهاء
    setTimeout(() => {
        yesBtn.classList.remove('fleeing');
    }, 400);
}

// --- إظهار رسالة ساخرة عشوائية ---
function showSarcasticMessage() {
    // حماية من كثرة الرسائل
    if (activeMessages >= MAX_ACTIVE_MESSAGES) {
        // إزالة أقدم رسالة
        const oldestMessage = messageContainer.querySelector('.sarcastic-message');
        if (oldestMessage) {
            removeMessage(oldestMessage);
        }
    }

    // اختيار رسالة عشوائية غير مكررة
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * sarcasticMessages.length);
    } while (randomIndex === lastMessageIndex && sarcasticMessages.length > 1);

    lastMessageIndex = randomIndex;
    const messageText = sarcasticMessages[randomIndex];

    // إنشاء عنصر الرسالة
    const messageEl = document.createElement('div');
    messageEl.className = 'sarcastic-message';
    messageEl.textContent = messageText;

    // تحديد موقع عشوائي للرسالة
    positionMessageRandomly(messageEl);

    // إضافة الرسالة للصفحة
    messageContainer.appendChild(messageEl);
    activeMessages++;

    // إزالة الرسالة تلقائياً بعد 4 ثوانٍ
    setTimeout(() => {
        removeMessage(messageEl);
    }, 4000);
}

// --- تحديد موقع عشوائي للرسالة ---
function positionMessageRandomly(messageEl) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const padding = 30;

    // مناطق آمنة للرسائل (تجنب منتصف الشاشة حيث الأزرار)
    const safeZones = [
        { x: padding, y: padding, w: windowWidth * 0.3, h: windowHeight * 0.25 }, // أعلى اليسار
        { x: windowWidth * 0.7, y: padding, w: windowWidth * 0.3 - padding, h: windowHeight * 0.25 }, // أعلى اليمين
        { x: padding, y: windowHeight * 0.75, w: windowWidth * 0.3, h: windowHeight * 0.25 - padding }, // أسفل اليسار
        { x: windowWidth * 0.7, y: windowHeight * 0.75, w: windowWidth * 0.3 - padding, h: windowHeight * 0.25 - padding }, // أسفل اليمين
        { x: windowWidth * 0.35, y: padding, w: windowWidth * 0.3, h: windowHeight * 0.2 }, // أعلى المنتصف
        { x: windowWidth * 0.35, y: windowHeight * 0.8, w: windowWidth * 0.3, h: windowHeight * 0.2 - padding }, // أسفل المنتصف
    ];

    // اختيار منطقة عشوائية
    const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)];

    // توليد موقع عشوائي داخل المنطقة
    const x = randomZone.x + Math.random() * randomZone.w;
    const y = randomZone.y + Math.random() * randomZone.h;

    // تطبيق الموقع
    messageEl.style.left = x + 'px';
    messageEl.style.top = y + 'px';
}

// --- إزالة رسالة ---
function removeMessage(messageEl) {
    if (!messageEl.parentNode) return;

    // إضافة أنيميشن الاختفاء
    messageEl.classList.add('disappearing');

    // إزالة العنصر بعد انتهاء الأنيميشن
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
            activeMessages--;
        }
    }, 400);
}

// --- تحديث عداد المحاولات ---
function updateAttemptCounter() {
    attemptCount.textContent = attempts;
    attemptCounter.classList.add('visible');

    // أنيميشن بسيط للعداد
    attemptCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        attemptCount.style.transform = 'scale(1)';
    }, 200);
}

// --- التعامل مع الضغط على "لا" ---
function handleNoClick(e) {
    // منع التكرار
    if (isGameOver) return;
    isGameOver = true;

    // إيقاف حركة زر "آه"
    yesBtn.style.transition = 'none';
    yesBtn.style.opacity = '0';
    yesBtn.style.pointerEvents = 'none';

    // إزالة جميع الرسائل الساخرة
    clearAllMessages();

    // إظهار الرسالة النهائية
    showFinalMessage();

    // اهتزاز احتفالي على الموبايل
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

// --- إزالة جميع الرسائل ---
function clearAllMessages() {
    const messages = messageContainer.querySelectorAll('.sarcastic-message');
    messages.forEach(msg => {
        msg.style.transition = 'opacity 0.3s';
        msg.style.opacity = '0';
        setTimeout(() => {
            if (msg.parentNode) {
                msg.parentNode.removeChild(msg);
            }
        }, 300);
    });
    activeMessages = 0;
}

// --- إظهار الرسالة النهائية ---
function showFinalMessage() {
    // إزالة كلاس hidden وإضافة كلاس show
    finalMessage.classList.remove('hidden');

    // تأخير بسيط لبدء أنيميشن الظهور
    setTimeout(() => {
        finalMessage.classList.add('show');
    }, 50);

    // إنشاء تأثير الاحتفال (قصاصات ملونة)
    createConfetti();
}

// --- إنشاء تأثير الاحتفال ---
function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f0932b', '#eb4d4b', '#6c5ce7'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 30);
    }
}

// --- إنشاء قطعة قصاصات ---
function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 1001;
        animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
    `;

    // إضافة أنيميشن CSS مؤقت
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(confetti);

    // إزالة العنصر بعد انتهاء الأنيميشن
    setTimeout(() => {
        confetti.remove();
        style.remove();
    }, 4000);
}

// --- منع التكبير/التصغير على iOS ---
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

// --- منع السحب العرضي على الموبايل ---
document.addEventListener('touchmove', (e) => {
    if (e.target === yesBtn) {
        e.preventDefault();
    }
}, { passive: false });
