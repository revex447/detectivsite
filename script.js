const gameState = {
    clues: [],
    currentStep: 'start'
};
const storyNodes = {
    start: {
        text: "Вы сидите в своем офисе. За окном идет дождь. Вдруг дверь открывается, и на пороге появляется заплаканная женщина. «Мой муж исчез», — говорит она.",
        location: "Офис детектива",
        choices: [
            { text: "Выслушать ее историю", nextNode: 'listen_story' },
            { text: "Отказать и продолжить пить кофе", nextNode: 'refuse_case' }
        ]
    },
    listen_story: {
        text: "Она рассказывает, что её муж, крупный банкир, не вернулся вчера с работы. Перед исчезновением он оставил на столе странную записку со словами 'Они знают'. Вы решаете начать поиски.",
        location: "Офис детектива",
        clue: "📄 Записка банкира: 'Они знают'",
        choices: [
            { text: "Поехать в банк, где он работал", nextNode: 'bank_office' },
            { text: "Обыскать его домашний кабинет", nextNode: 'husband_house' }
        ]
    },
    refuse_case: {
        text: "Вы вежливо отказываетесь. Женщина уходит. Вы остаетесь наедине со своим дешевым остывшим кофе. Расследование завершено, так и не начавшись.",
        location: "Офис детектива",
        choices: [
            { text: "Вернуться в главное меню", nextNode: 'MAIN_MENU' }
        ]
    },
    bank_office: {
        text: "В кабинете банка идеальный порядок, но сейф приоткрыт. Внутри вы находите разорванный авиабилет в один конец.",
        location: "Кабинет банка",
        clue: "✈️ Разорванный авиабилет",
        choices: [
            { text: "Допросить секретаршу", nextNode: 'ask_secretary' },
            { text: "Поехать осмотреть его дом", nextNode: 'husband_house' }
        ]
    },
    husband_house: {
        text: "В доме банкира вы замечаете, что в гардеробе не хватает одного большого чемодана. Похоже, побег планировался заранее.",
        location: "Дом банкира",
        clue: "🧳 Пустое место для чемодана",
        choices: [
            { text: "Сопоставить все найденные улики", nextNode: 'solve_case' }
        ]
    },
    ask_secretary: {
        text: "Секретарша начинает сильно нервничать и признается, что банкир тайно переводил миллионы на оффшорные счета.",
        location: "Кабинет банка",
        choices: [
            { text: "Сопоставить все найденные улики", nextNode: 'solve_case' }
        ]
    },
    solve_case: {
        text: "Сложив пазл, вы понимаете: банкир инсценировал похищение, чтобы сбежать с деньгами. Вы перехватываете его прямо в VIP-терминале аэропорта. Дело блестяще раскрыто!",
        location: "Аэропорт",
        choices: [
            { text: "Завершить расследование", nextNode: 'MAIN_MENU' }
        ]
    }
};
function startGame() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    gameState.clues = [];
    updateScreen('start');
}
function toMainMenu() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}
function toggleRules() {
    const modal = document.getElementById('info-modal');
    modal.classList.toggle('hidden');
}
function updateScreen(nodeKey) {
    if (nodeKey === 'MAIN_MENU') {
        toMainMenu();
        return;
    }
    const node = storyNodes[nodeKey];
    gameState.currentStep = nodeKey;
    document.getElementById('story-text').textContent = node.text;
    document.getElementById('location').textContent = `Локация: ${node.location}`;
    if (node.clue && !gameState.clues.includes(node.clue)) {
        gameState.clues.push(node.clue);
    }
    const cluesList = document.getElementById('clues-list');
    cluesList.innerHTML = '';
    if (gameState.clues.length === 0) {
        cluesList.innerHTML = '<li>Список пуст</li>';
    } else {
        gameState.clues.forEach(clue => {
            const li = document.createElement('li');
            li.textContent = clue;
            cluesList.appendChild(li);
        });
    }
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = choice.text;
        button.onclick = () => updateScreen(choice.nextNode);
        choicesContainer.appendChild(button);
    });
}