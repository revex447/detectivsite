const gameState = {
    name: "Марлоу",
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
        text: "Она рассказывает, что её муж, крупный банкир, не вернулся вчера с работы. Перед исчезновением он оставил на столе странную записку со словами 'Они знают'.",
        location: "Офис детектива",
        clue: "📄 Записка банкира",
        choices: [
            { text: "Поехать в банк, где он работал", nextNode: 'bank_office' },
            { text: "Обыскать его домашний кабинет", nextNode: 'husband_house' }
        ]
    },
    refuse_case: {
        text: "Вы вежливо отказываетесь. Женщина уходит. Вы остаетесь наедине со своим дешевым остывшим кофе. Конец истории.",
        location: "Офис детектива",
        choices: [
            { text: "Вернуться в главное меню", nextNode: 'MAIN_MENU' }
        ]
    },
    bank_office: {
        text: "В кабинете банка идеальный порядок, но сейф приоткрыт. Внутри вы находите разорванный авиабилет в один конец и визитку цветочного магазина.",
        location: "Кабинет банка",
        clue: "✈️ Авиабилет",
        choices: [
            { text: "Допросить секретаршу банка", nextNode: 'ask_secretary' },
            { text: "Проверить адрес цветочного магазина", nextNode: 'flower_shop' }
        ]
    },
    husband_house: {
        text: "В доме банкира вы замечаете, что в гардеробе не хватает одного большого чемодана. На полу лежит чек из подпольного казино 'Олимп'.",
        location: "Дом банкира",
        clue: "🪙 Чек из казино",
        choices: [
            { text: "Отправиться в казино 'Олимп'", nextNode: 'casino_entrance' },
            { text: "Расспросить соседей дома", nextNode: 'ask_neighbors' }
        ]
    },
    ask_secretary: {
        text: "Секретарша начинает сильно нервничать и признается, что банкир тайно общался с неизвестным человеком в сером плаще на подземной парковке.",
        location: "Кабинет банка",
        choices: [
            { text: "Спуститься на парковку банка", nextNode: 'parking_lot' },
            { text: "Обыскать рабочий стол секретарши", nextNode: 'search_secretary_desk' }
        ]
    },
    flower_shop: {
        text: "Флорист вспоминает, что банкир заказывал редкие черные розы для известной певицы из клуба 'Олимп'.",
        location: "Цветочный магазин",
        clue: "🌹 Информация о розах",
        choices: [
            { text: "Направиться в клуб 'Олимп'", nextNode: 'casino_entrance' }
        ]
    },
    ask_neighbors: {
        text: "Пожилой сосед утверждает, что видел, как прошлой ночью двое мужчин насильно заталкивали банкира в черный фургон.",
        location: "Улица у дома",
        choices: [
            { text: "Искать следы фургона во дворах", nextNode: 'search_van' },
            { text: "Вызвать полицию на помощь", nextNode: 'call_police' }
        ]
    },
    parking_lot: {
        text: "На подземной парковке вы находите следы торможения и потерянные дорогие часы банкира с разбитым стеклом.",
        location: "Подземная парковка",
        clue: "⌚ Разбитые часы",
        choices: [
            { text: "Изучить камеры видеонаблюдения", nextNode: 'watch_cameras' }
        ]
    },
    search_secretary_desk: {
        text: "В столе секретарши вы находите скрытый диктофон. На записи слышны угрозы от владельца казино 'Олимп'.",
        location: "Кабинет банка",
        clue: "📼 Диктофонная запись",
        choices: [
            { text: "Поехать в казино 'Олимп'", nextNode: 'casino_entrance' }
        ]
    },
    casino_entrance: {
        text: "Вы стоите перед неоновыми дверями казино 'Олимп'. Охрана на входе требует специальный пропуск или крупную сумму денег.",
        location: "Вход в казино",
        choices: [
            { text: "Попробовать подкупить охрану", nextNode: 'bribe_guard' },
            { text: "Найти черный ход через переулок", nextNode: 'back_door' }
        ]
    },
    search_van: {
        text: "В заброшенном переулке вы находите тот самый черный фургон. Двери заперты, но внутри горит свет.",
        location: "Темный переулок",
        choices: [
            { text: "Взломать замок фургона отмычкой", nextNode: 'lockpick_van' },
            { text: "Затаиться и ждать в засаде", nextNode: 'wait_ambush' }
        ]
    },
    call_police: {
        text: "Полиция приезжает, но коррумпированный капитан забирает ваши улики и приказывает вам закрыть рот. Вы проиграли дело.",
        location: "Участок полиции",
        choices: [
            { text: "Начать сначала", nextNode: 'MAIN_MENU' }
        ]
    },
    watch_cameras: {
        text: "На видеозаписи виден номер фургона и лицо одного из похитителей — это известный вышибала из казино 'Олимп'.",
        location: "Комната охраны",
        clue: "📷 Фото похитителя",
        choices: [
            { text: "Идти прямо в казино", nextNode: 'casino_entrance' }
        ]
    },
    bribe_guard: {
        text: "Вы отдаете последние деньги. Охранник пропускает вас в VIP-зал, где за дальним столом сидит бледный банкир в окружении бандитов.",
        location: "VIP-зал казино",
        choices: [
            { text: "Устроить заварушку и отвлечь их", nextNode: 'make_distraction' },
            { text: "Сесть за их стол под видом игрока", nextNode: 'play_poker' }
        ]
    },
    back_door: {
        text: "Через черный ход вы проникаете на кухню казино. Переодевшись в форму официанта, вы берете поднос со стаканами.",
        location: "Кухня казино",
        choices: [
            { text: "Войти в закрытую VIP-комнату", nextNode: 'vip_room_waiter' }
        ]
    },
    lockpick_van: {
        text: "Дверь поддается. Внутри фургона вы находите связанного банкира. Он жив, но напуган. Вы спасли его! Дело раскрыто.",
        location: "Фургон",
        choices: [
            { text: "Победа! Вернуться в меню", nextNode: 'MAIN_MENU' }
        ]
    },
    wait_ambush: {
        text: "Из фургона выходят трое громил. Вас замечают и сильно избивают. Вы очнулись на свалке без документов. Дело провалено.",
        location: "Свалка",
        choices: [
            { text: "Начать сначала", nextNode: 'MAIN_MENU' }
        ]
    },
    make_distraction: {
        text: "Вы переворачиваете стол с рулеткой. Началась массовая драка. В суматохе вы хватаете банкира и выводите его через окно. Успех!",
        location: "Улица",
        choices: [
            { text: "Победа! Вернуться в меню", nextNode: 'MAIN_MENU' }
        ]
    },
    play_poker: {
        text: "Вы проигрываете блеф. Босс мафии понимает, кто вы такой, и делает знак охране. Вас выводят в подвал. Это плохой конец.",
        location: "Подвал казино",
        choices: [
            { text: "Начать сначала", nextNode: 'MAIN_MENU' }
        ]
    },
    vip_room_waiter: {
        text: "Вы заносите напитки. Банкир ставит на кон последние деньги банка. Вы незаметно шепчете ему, что пришли спасти его.",
        location: "VIP-зал казино",
        choices: [
            { text: "Подстроить отключение света в здании", nextNode: 'cut_power' }
        ]
    },
    cut_power: {
        text: "Свет гаснет. Вы во тьме хватаете банкира, выбегаете на улицу и прыгаете в такси. Банкир спасен и готов дать показания против мафии!",
        location: "Безопасное место",
        choices: [
            { text: "Блестящая победа! В меню", nextNode: 'MAIN_MENU' }
        ]
    }
};

function startGame() {
    const nameInput = document.getElementById('detective-name').value.trim();
    gameState.name = nameInput ? nameInput : "Марлоу";
    
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    document.getElementById('game-title').textContent = `🕵️‍♂️ Детектив: ${gameState.name}`;
    
    gameState.clues = [];
    updateScreen('start');
}

function toMainMenu() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
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