const connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();

// SIGNAL R enemy playing a card
connection.on("ReceiveCardPlayed", function (playerName, handIndex, boardIndex, isFrontRow) {
    let myName = "@Model.Game.Player1.Name";
    if (playerName !== myName) {
        let targetRowId = isFrontRow ? "enemy-front-row" : "enemy-back-row";
        let slot = document.querySelector("#" + targetRowId + " .enemy-board-slot[data-slot-index='" + boardIndex + "']");
        if (slot) {
            slot.className = "card-slot enemy-board-slot card-back"; // Hidden card
            slot.innerHTML = "";
            let enemyHand = document.getElementById("enemy-hand");
            if (enemyHand.lastElementChild) enemyHand.removeChild(enemyHand.lastElementChild);
        }
    }
});
const playerDatabase = [
    { name: "Mustafa Sangare", team: "Левски", imgUrl: "/images/Mustafa Sangare.png", baseAtk: 88, baseDef: 35, baseCon: 72 },
    { name: "Everton Bala", team: "Левски", imgUrl: "/images/EvertonBala.png", baseAtk: 84, baseDef: 45, baseCon: 78 },
    { name: "Akram Bouras", team: "Левски", imgUrl: "/images/AkramBouras.png", baseAtk: 76, baseDef: 68, baseCon: 82 },
    { name: "Armstrong Oko-Flex", team: "Левски", imgUrl: "/images/OkoFlex.png", baseAtk: 85, baseDef: 40, baseCon: 79 },
    { name: "Radoslav Kirilov", team: "Левски", imgUrl: "/images/кирилов.png", baseAtk: 83, baseDef: 45, baseCon: 80 },
    { name: "Georgi Kostadinov", team: "Левски", imgUrl: "/images/Kostadinov.png", baseAtk: 65, baseDef: 82, baseCon: 85 },
    { name: "Mazire Soula", team: "Левски", imgUrl: "/images/MazireSoula.png", baseAtk: 80, baseDef: 60, baseCon: 86 },
    { name: "Cristian Makoun", team: "Левски", imgUrl: "/images/KristianMakoun.png", baseAtk: 55, baseDef: 84, baseCon: 74 },
    { name: "Aldair", team: "Левски", imgUrl: "/images/Aldair.png", baseAtk: 68, baseDef: 81, baseCon: 76 },
    { name: "Oliver Kamdem", team: "Левски", imgUrl: "/images/Kamdem.png", baseAtk: 65, baseDef: 80, baseCon: 75 },
    { name: "Maicon", team: "Левски", imgUrl: "/images/Maicon.png", baseAtk: 72, baseDef: 80, baseCon: 75 },
    { name: "Kristiyan Dimitrov", team: "Левски", imgUrl: "/images/Kristiyan Dimitrov.png", baseAtk: 62, baseDef: 83, baseCon: 68 },
    { name: "Juan Perea", team: "Левски", imgUrl: "/images/Perea.png", baseAtk: 86, baseDef: 38, baseCon: 70 },
    { name: "Nikola Serafimov", team: "Левски", imgUrl: "/images/Serafimov.png", baseAtk: 50, baseDef: 85, baseCon: 65 },
    { name: "Svetoslav Vutsov", team: "Левски", imgUrl: "/images/Vutsov.png", baseAtk: 15, baseDef: 89, baseCon: 60 }
];

// 40 cards in one deck
function createDeck() {
    let deck = [];

    for (let i = 0; i < 26; i++) {
        let randomPlayer = playerDatabase[Math.floor(Math.random() * playerDatabase.length)];

        deck.push({
            name: randomPlayer.name,
            type: "Footballer",
            atk: randomPlayer.baseAtk + Math.floor(Math.random() * 5),
            def: randomPlayer.baseDef + Math.floor(Math.random() * 5),
            con: randomPlayer.baseCon + Math.floor(Math.random() * 5),
            imgUrl: randomPlayer.imgUrl
        });
    }

    for (let i = 0; i < 2; i++) deck.push({ name: "Стратегия: +2 Карти", type: "Spell", effect: "Draw2" }); 
    for (let i = 0; i < 2; i++) deck.push({ name: "Скаутски Доклад", type: "Spell", effect: "Search" }); 
    for (let i = 0; i < 3; i++) deck.push({ name: "Мотивация", type: "Spell", effect: "+5 Точки" }); 

    for (let i = 0; i < 2; i++) deck.push({ name: "Отрицание на Атака", type: "Trap", effect: "NegateAttack" });
    for (let i = 0; i < 4; i++) deck.push({ name: "Засада", type: "Trap", effect: "-5 Точки" }); // ТУК ПРОМЕНИ 5 на 4
    deck.push({ name: "Автогол", type: "Trap", effect: "Автогол" });

    // Sort deck
    return deck.sort(() => Math.random() - 0.5);
}

let myDeck = createDeck();
let enemyDeck = createDeck();
let myBenchCount = 0;
let enemyBenchCount = 0;
let myActiveTrap = null;

function updateDeckUI() {
    document.getElementById("my-deck-count").innerText = myDeck.length;
    document.getElementById("enemy-deck-count").innerText = enemyDeck.length;
}

function drawCardFromDeck() {
    if (myDeck.length > 0) {
        let card = myDeck.pop();
        addNewCardToHand(card);
        updateDeckUI();
    }
}

function drawInitialHands() {
    let enemyHandContainer = document.getElementById("enemy-hand");
    for (let i = 0; i < 5; i++) {
        drawCardFromDeck();
        enemyDeck.pop();
        enemyHandContainer.innerHTML += '<div class="card-slot card-back"></div>';
    }
    updateDeckUI();
}
drawInitialHands();

// -- STATE VARIABLES --
let currentRound = 1;
let timeLeft = 15;
let countdown;
let selectedCardElement = null;
let selectedCardIndex = null;
let isFrontRowTarget = true;
let isGameStarted = false;
let currentMyStat = "";
let currentEnemyStat = "";
let myLifePoints = 30;
let enemyLifePoints = 30;

// -- DICES & START SEQUENCE --
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
document.getElementById("start-roll-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    this.style.display = "none";

    let myDiceEl = document.getElementById("my-dice");
    let enemyDiceEl = document.getElementById("enemy-dice");
    let statusText = document.getElementById("dice-status-text");

    statusText.innerText = "Ти хвърляш...";
    myDiceEl.classList.add("rolling");
    let rollInterval = setInterval(() => { myDiceEl.innerText = diceFaces[Math.floor(Math.random() * 6)]; }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);
        myDiceEl.classList.remove("rolling");
        let myRoll = Math.floor(Math.random() * 6) + 1;
        myDiceEl.innerText = diceFaces[myRoll - 1];
        myDiceEl.style.color = "#00ff00";

        statusText.innerText = "Противникът хвърля...";
        enemyDiceEl.classList.add("rolling");
        let enemyInterval = setInterval(() => { enemyDiceEl.innerText = diceFaces[Math.floor(Math.random() * 6)]; }, 100);

        setTimeout(() => {
            clearInterval(enemyInterval);
            enemyDiceEl.classList.remove("rolling");
            let enemyRoll = Math.floor(Math.random() * 6) + 1;
            enemyDiceEl.innerText = diceFaces[enemyRoll - 1];
            enemyDiceEl.style.color = "#ff0000";

            isGameStarted = true;
            let finalResultEl = document.getElementById("dice-final-result");

            if (myRoll >= enemyRoll) {
                statusText.innerText = "ТИ ПЕЧЕЛИШ БОНУСА!";
                finalResultEl.innerText = "Изтеглена е 1 бонус карта в твоята ръка.";
                finalResultEl.style.color = "#00ff00";
                drawCardFromDeck();
            } else {
                statusText.innerText = "ПРОТИВНИКЪТ ПЕЧЕЛИ БОНУСА!";
                finalResultEl.innerText = "Противникът изтегли 1 допълнителна карта.";
                finalResultEl.style.color = "#ff0000";
                enemyDeck.pop(); updateDeckUI();
                document.getElementById("enemy-hand").innerHTML += '<div class="card-slot card-back"></div>';
            }

            finalResultEl.style.display = "block";
            document.getElementById("click-to-start-hint").style.display = "block";

        }, 1500);
    }, 1500);
});

document.getElementById("dice-overlay").addEventListener("click", function () {
    if (document.getElementById("click-to-start-hint").style.display === "block") {
        this.style.display = "none";
        startRoundFlow();
    }
});

// -- ROUND & TIMER FLOW --
function startRoundFlow() {
    timeLeft = 15;
    document.getElementById("round-title").innerText = "РУНД " + currentRound;
    document.getElementById("my-hand-container").style.pointerEvents = "auto";

    const stats = ["АТАКА", "ЗАЩИТА", "КОНТРОЛ"];
    currentMyStat = stats[Math.floor(Math.random() * stats.length)];
    currentEnemyStat = stats[Math.floor(Math.random() * stats.length)];

    document.getElementById("battle-condition-text").innerText = `Търси се: Твоята ${currentMyStat} ⚔️ срещу Неговата ${currentEnemyStat}`;
    document.getElementById("battle-condition-banner").style.display = "block";

    const timerElement = document.getElementById("turn-timer");
    timerElement.style.display = "block";
    timerElement.style.color = "#ffd700";

    if (countdown) clearInterval(countdown);

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerText = "ВРЕМЕТО ИЗТЕЧЕ!";
            timerElement.style.color = "red";
            clearHighlights();
            document.getElementById("my-hand-container").style.pointerEvents = "none";

            if (myActiveTrap) {
                document.getElementById("trap-question").innerText = `Искате ли да активирате капана си: ${myActiveTrap.name}?`;
                document.getElementById("trap-prompt-modal").style.display = "block";
            } else {
                executeBattlePhase(false);
            }

        } else {
            timerElement.innerText = "Оставащо време: " + timeLeft + " сек.";
            timeLeft--;
        }
    }, 1000);

    let enemyThinkTime = Math.floor(Math.random() * 3000) + 3000;
    setTimeout(() => {
        if (timeLeft > 0) {
            let enemyFrontRow = document.querySelectorAll("#enemy-front-row .enemy-board-slot:not(.card-back):not(.card-filled)");
            if (enemyFrontRow.length > 0) {
                let randomSlot = enemyFrontRow[Math.floor(Math.random() * enemyFrontRow.length)];
                randomSlot.classList.add("card-back");
                randomSlot.innerHTML = "";
                let enemyHand = document.getElementById("enemy-hand");
                if (enemyHand.lastElementChild) enemyHand.removeChild(enemyHand.lastElementChild);
            }

            if (Math.random() < 0.40) {
                let enemyBackRow = document.querySelectorAll("#enemy-back-row .enemy-board-slot:not(.card-back):not(.card-filled)");
                if (enemyBackRow.length > 0) {
                    let randomBackSlot = enemyBackRow[Math.floor(Math.random() * enemyBackRow.length)];
                    randomBackSlot.classList.add("card-back", "enemy-hidden-spell"); 
                    randomBackSlot.innerHTML = "";
                    let enemyHand = document.getElementById("enemy-hand");
                    if (enemyHand.lastElementChild) enemyHand.removeChild(enemyHand.lastElementChild);
                }
            }
        }
    }, enemyThinkTime);
}

// -- TRAPS & BATTLE PHASE --
document.getElementById("btn-trap-yes").addEventListener("click", function () {
    document.getElementById("trap-prompt-modal").style.display = "none";
    executeBattlePhase(true);
});

document.getElementById("btn-trap-no").addEventListener("click", function () {
    document.getElementById("trap-prompt-modal").style.display = "none";
    executeBattlePhase(false);
});

function executeBattlePhase(userActivatedTrap) {
    let myPlayedCard = document.querySelector("#my-front-row .card-filled");
    let enemyPlayedCard = document.querySelector("#enemy-front-row .card-back, #enemy-front-row .card-filled");

    let details = "";
    let statusTitle = document.getElementById("battle-status");

    let myBasePoints = 0;
    let enemyBasePoints = 0;
    let enemyCardData = null;

    if (enemyPlayedCard) {
        let randomEnemy = playerDatabase[Math.floor(Math.random() * playerDatabase.length)];

        enemyCardData = {
            name: randomEnemy.name,
            atk: randomEnemy.baseAtk + Math.floor(Math.random() * 5),
            def: randomEnemy.baseDef + Math.floor(Math.random() * 5),
            con: randomEnemy.baseCon + Math.floor(Math.random() * 5),
            imgUrl: randomEnemy.imgUrl || "/images/Maicon.png"
        };

        enemyPlayedCard.classList.remove("card-back");
        enemyPlayedCard.classList.add("card-filled", "card-footballer");

        enemyPlayedCard.innerHTML = `
            <div class="card-content">
                <div class="card-title">${enemyCardData.name}</div>
                <div class="card-image-wrapper">
                    <img src="${enemyCardData.imgUrl}" class="card-image" onerror="this.src='/images/Maicon.png'" alt="Enemy Player" />
                </div>
                <div class="card-textbox">
                    <div class="card-description"><b>[Footballer / Effect]</b><br/>Противников играч.</div>
                    <div class="card-stats">
                        <span><span class="stat-label">ATK/</span>${enemyCardData.atk}</span>
                        <span><span class="stat-label">DEF/</span>${enemyCardData.def}</span>
                        <span><span class="stat-label">CON/</span>${enemyCardData.con}</span>
                    </div>
                </div>
            </div>`;
    }

    let isAttackNegated = (userActivatedTrap && myActiveTrap && myActiveTrap.effect === "NegateAttack");

    if (isAttackNegated) {
        statusTitle.innerText = "ЗАЩИТЕН!";
        statusTitle.style.color = "#00aaff";
        details += `🛑 <strong>Активиран капан: Отрицание на Атака!</strong><br/>`;
        details += `<span style="color: #00aaff; font-size: 1.2em;">Атаката е напълно спряна! Ти не губиш жизнени точки, дори и да нямаш футболист.</span><br/><br/>`;

        if (!enemyPlayedCard) {
            enemyLifePoints -= 3;
            details += `⚠️ <strong>Противникът не изигра Футболист!</strong> Той губи 3 жизнени точки!<br/>`;
        }
    }
    else if (!myPlayedCard || !enemyPlayedCard) {
        statusTitle.innerText = "НАРУШЕНИЕ";
        statusTitle.style.color = "#ffaa00";

        if (!myPlayedCard) {
            myLifePoints -= 3;
            details += `⚠️ <strong>Ти не изигра Футболист!</strong> Директно губиш 3 жизнени точки!<br/><br/>`;
        }
        if (!enemyPlayedCard) {
            enemyLifePoints -= 3;
            details += `⚠️ <strong>Противникът не изигра Футболист!</strong> Той губи 3 жизнени точки!<br/>`;
        }
        details += `<span style="color: gray;">Битката се пропуска този рунд.</span>`;
    }
    // Math battle phase
    else {
        let myCardDataStr = myPlayedCard.getAttribute("data-fullcard");
        if (myCardDataStr) {
            let myCardData = JSON.parse(myCardDataStr);
            if (currentMyStat === "АТАКА") myBasePoints = myCardData.atk;
            else if (currentMyStat === "ЗАЩИТА") myBasePoints = myCardData.def;
            else if (currentMyStat === "КОНТРОЛ") myBasePoints = myCardData.con;
        }

        let myPlayedSpell = document.querySelector("#my-back-row .card-filled");
        if (myPlayedSpell) {
            let spellDataStr = myPlayedSpell.getAttribute("data-fullcard");
            if (spellDataStr) {
                let spellData = JSON.parse(spellDataStr);
                if (spellData.effect === "+5 Точки") {
                    myBasePoints += 5;
                    details += `✨ <strong>Активиран спел: Мотивация!</strong> +5 точки за твоя футболист!<br/>`;
                }
            }
        }

        if (currentEnemyStat === "АТАКА") enemyBasePoints = enemyCardData.atk;
        else if (currentEnemyStat === "ЗАЩИТА") enemyBasePoints = enemyCardData.def;
        else if (currentEnemyStat === "КОНТРОЛ") enemyBasePoints = enemyCardData.con;

        let enemyPlayedSpell = document.querySelector("#enemy-back-row .enemy-hidden-spell");
        if (enemyPlayedSpell) {
            if (enemyBasePoints <= myBasePoints || Math.random() < 0.2) {
                let isMotivation = Math.random() < 0.5; 

                enemyPlayedSpell.classList.remove("card-back", "enemy-hidden-spell");
                enemyPlayedSpell.classList.add("card-filled", isMotivation ? "card-spell" : "card-trap");

                if (isMotivation) {
                    enemyBasePoints += 5; 
                    details += `🤖✨ <strong>Противникът обърна Спел: Мотивация!</strong> Той получава +5 точки!<br/>`;
                    enemyPlayedSpell.innerHTML = `<div class="card-content"><div class="card-title">Мотивация</div><div class="card-image-wrapper" style="background: radial-gradient(circle, #777, #222);"><div style="font-size: 5vh;">✨</div></div><div class="card-textbox"><div class="card-description" style="border-bottom: 1px solid #ccc;"><b>[Spell Card]</b></div><div class="card-description">+5 Точки</div></div></div>`;
                } else {
                    myBasePoints -= 5; 
                    details += `🤖🚩 <strong>Противникът активира Капан: Засада!</strong> Твоят футболист губи 5 точки!<br/>`;
                    enemyPlayedSpell.innerHTML = `<div class="card-content"><div class="card-title">Засада</div><div class="card-image-wrapper" style="background: radial-gradient(circle, #555, #111);"><div style="font-size: 5vh;">🚩</div></div><div class="card-textbox"><div class="card-description" style="border-bottom: 1px solid #ccc;"><b>[Trap Card]</b></div><div class="card-description">-5 Точки</div></div></div>`;
                }
            }
        }

        details += `Твоят футболист (${currentMyStat}): ${myBasePoints}<br/>`;
        details += `Противников футболист (${currentEnemyStat}): ${enemyBasePoints}<br/><br/>`;

        if (userActivatedTrap && myActiveTrap && myActiveTrap.effect === "-5 Точки") {
            enemyBasePoints -= 5;
            details += `🚩 <strong>Активира капан: Засада!</strong> Точките на противника падат на ${enemyBasePoints}!<br/><br/>`;
        }

        details += `<hr style="border-color: gray;" />`;
        details += `<strong>КРАЕН РЕЗУЛТАТ: ТИ (${myBasePoints}) ⚔️ ПРОТИВНИК (${enemyBasePoints})</strong>`;

        if (myBasePoints > enemyBasePoints) {
            statusTitle.innerText = "WIN"; statusTitle.style.color = "#00ff00";
            enemyLifePoints -= 3;
            details += `<br/><br/><span style="color: #00ff00; font-size: 1.2em;">🔥 Противникът губи 3 жизнени точки!</span>`;

        } else if (myBasePoints < enemyBasePoints) {

            if (userActivatedTrap && myActiveTrap && myActiveTrap.effect === "Автогол") {
                statusTitle.innerText = "АВТОГОЛ!"; statusTitle.style.color = "#ffaa00";
                enemyLifePoints -= 3; 
                details += `<br/><br/><span style="color: #ffaa00; font-size: 1.2em;">⚽❌ <strong>КАПАН АВТОГОЛ!</strong> Ти губиш битката по точки, НО противникът си отбелязва автогол! Вместо теб, ТОЙ губи 3 жизнени точки!</span>`;
            } else {
                statusTitle.innerText = "DEFEAT"; statusTitle.style.color = "#ff0000";
                myLifePoints -= 3;
                details += `<br/><br/><span style="color: #ff0000; font-size: 1.2em;">🩸 Ти губиш 3 жизнени точки!</span>`;
            }

        } else {
            statusTitle.innerText = "DRAW"; statusTitle.style.color = "#aaaaaa";
            details += `<br/><br/><span style="color: gray; font-size: 1.2em;">⚖️ Равенство! Никой не губи точки.</span>`;
        }
    }

    document.getElementById("battle-math").innerHTML = details;
    document.getElementById("my-lp").innerText = myLifePoints;
    document.getElementById("enemy-lp").innerText = enemyLifePoints;

    let nextBtn = document.getElementById("close-battle-btn");
    if (myLifePoints <= 0 || enemyLifePoints <= 0) {
        nextBtn.innerText = "КРАЙ НА ИГРАТА (Започни отначало)";
        nextBtn.style.backgroundColor = "#ff0000";
        nextBtn.onclick = function () { location.reload(); };
    } else {
        nextBtn.innerText = "Продължи (Картите отиват на Скамейката)";
        nextBtn.onclick = function () {
            document.getElementById("battle-result-modal").style.display = "none";

            let myCardsCleared = 0;
            let enemyCardsCleared = 0;

            document.querySelectorAll(".enemy-board-slot").forEach(slot => {
                if (slot.classList.contains("card-filled") || slot.classList.contains("card-back")) enemyCardsCleared++;
                let index = parseInt(slot.getAttribute("data-slot-index"));
                slot.innerHTML = "Слот " + (index + 1);
                slot.className = "card-slot enemy-board-slot";
            });

            document.querySelectorAll(".my-board-slot").forEach(slot => {
                if (slot.classList.contains("card-filled")) myCardsCleared++;
                let index = parseInt(slot.getAttribute("data-slot-index"));
                slot.innerHTML = "Слот " + (index + 1);
                slot.className = "card-slot my-board-slot";
            });

            if (myCardsCleared > 0) {
                myBenchCount += myCardsCleared;
                document.getElementById("my-gy").classList.add("gy-filled");
                document.getElementById("my-gy").innerHTML = `СКАМЕЙКА<br/>(${myBenchCount})`;
            }
            if (enemyCardsCleared > 0) {
                enemyBenchCount += enemyCardsCleared;
                document.getElementById("enemy-gy").classList.add("gy-filled");
                document.getElementById("enemy-gy").innerHTML = `СКАМЕЙКА<br/>(${enemyBenchCount})`;
            }

            myActiveTrap = null;
            currentRound++;
            drawCardFromDeck();

            if (enemyDeck.length > 0) {
                enemyDeck.pop(); updateDeckUI();
                document.getElementById("enemy-hand").innerHTML += '<div class="card-slot card-back"></div>';
            }
            startRoundFlow();
        };
    }
    document.getElementById("battle-result-modal").style.display = "block";
}

function addNewCardToHand(cardObj) {
    let handContainer = document.getElementById("my-hand-container");
    let newCard = document.createElement("div");

    let cssClass = cardObj.type === "Footballer" ? "card-footballer" :
        cardObj.type === "Spell" ? "card-spell" : "card-trap";

    newCard.className = `card-slot card-filled ${cssClass}`;
    newCard.style.cursor = "pointer";
    newCard.setAttribute("data-type", cardObj.type);
    newCard.setAttribute("data-fullcard", JSON.stringify(cardObj));

    let innerContent = "";

    if (cardObj.type === "Footballer") {
        let imgPath = cardObj.imgUrl || "/images/Maicon.png";
        innerContent = `
            <div class="card-title">${cardObj.name}</div>
            <div class="card-image-wrapper">
                <img src="${imgPath}" class="card-image" onerror="this.src='/images/Maicon.png'" alt="Player" />
            </div>
            <div class="card-textbox">
                <div class="card-description"><b>[Footballer / Effect]</b><br/>Основен играч.</div>
                <div class="card-stats">
                    <span><span class="stat-label">ATK/</span>${cardObj.atk}</span>
                    <span><span class="stat-label">DEF/</span>${cardObj.def}</span>
                    <span><span class="stat-label">CON/</span>${cardObj.con}</span>
                </div>
            </div>`;
    } else {
        let typeTag = cardObj.type === "Spell" ? "[Spell Card]" : "[Trap Card]";
        let currentEmoji = cardObj.type === "Spell" ? "✨" : (cardObj.name === "Засада" ? "🚩" : "🛑");
        let gradient = cardObj.type === "Spell" ? "radial-gradient(circle, #777, #222)" : "radial-gradient(circle, #555, #111)";

        innerContent = `
            <div class="card-title">${cardObj.name}</div>
            <div class="card-image-wrapper" style="background: ${gradient};">
                <div style="font-size: 5vh;">${currentEmoji}</div>
            </div>
            <div class="card-textbox" style="justify-content: flex-start;">
                <div class="card-description" style="margin-bottom: 2px; border-bottom: 1px solid #ccc; padding-bottom: 2px;"><b>${typeTag}</b></div>
                <div class="card-description">${cardObj.effect}</div>
            </div>`;
    }

    newCard.innerHTML = `<div class="card-content">${innerContent}</div>`;
    handContainer.appendChild(newCard);
    reloadHandClickEvents();
}

function clearHighlights() {
    document.querySelectorAll(".my-board-slot").forEach(slot => slot.classList.remove("glow-slot"));
}

function reloadHandClickEvents() {
    document.querySelectorAll(".my-hand .card-slot").forEach((card) => card.replaceWith(card.cloneNode(true)));
    document.querySelectorAll(".my-hand .card-slot").forEach((card, index) => {
        card.addEventListener("click", function () {
            if (!isGameStarted || timeLeft <= 0) return;

            clearHighlights();
            selectedCardElement = this;
            selectedCardIndex = index;

            let cardType = this.getAttribute("data-type");
            let targetRowId = cardType === "Footballer" ? "my-front-row" : "my-back-row";

            document.querySelectorAll("#" + targetRowId + " .my-board-slot:not(.card-filled)").forEach(slot => {
                slot.classList.add("glow-slot");
            });
        });
    });
}

document.querySelectorAll(".my-board-slot").forEach(slot => {
    slot.addEventListener("click", function () {
        if (this.classList.contains("glow-slot") && selectedCardElement !== null) {

            let cardData = JSON.parse(selectedCardElement.getAttribute("data-fullcard"));
            let boardIndex = parseInt(this.getAttribute("data-slot-index"));
            let myName = "@Model.Game.Player1.Name"; 

            connection.invoke("PlayCard", myName, selectedCardIndex, boardIndex, isFrontRowTarget)
                .catch(err => console.error(err.toString()));

            this.className = selectedCardElement.className + " my-board-slot";
            this.classList.remove("glow-slot");
            this.innerHTML = selectedCardElement.innerHTML;
            this.setAttribute("data-fullcard", selectedCardElement.getAttribute("data-fullcard"));

            selectedCardElement.remove();
            selectedCardElement = null;
            clearHighlights();

            if (cardData.type === "Trap") {
                myActiveTrap = cardData;
            }

            if (cardData.type === "Spell" && cardData.effect === "Draw2") {
                alert("✨ Активираш Спел: ТЕГЛЕНЕ НА 2 КАРТИ!");
                drawCardFromDeck();
                drawCardFromDeck();
            }

            if (cardData.type === "Spell" && cardData.effect === "Search") {
                document.getElementById("spell-search-modal").style.display = "block";
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const boardMusic = document.getElementById("board-bg-music");
    const boardBtnMute = document.getElementById("board-btn-mute");
    const boardVolumeSlider = document.getElementById("board-volume-slider");

    let isBoardMuted = false;
    let currentBoardVolume = 0.2; 

    if (boardBtnMute && boardVolumeSlider) {
        boardVolumeSlider.addEventListener("input", function () {
            currentBoardVolume = parseFloat(this.value);

            if (boardMusic && !isBoardMuted) {
                boardMusic.volume = currentBoardVolume;
            }

            if (currentBoardVolume === 0) {
                isBoardMuted = true;
                boardBtnMute.innerHTML = "🔇";
            } else {
                isBoardMuted = false;
                boardBtnMute.innerHTML = "🔊";
            }
        });

        boardBtnMute.addEventListener("click", function () {
            isBoardMuted = !isBoardMuted;

            if (isBoardMuted) {
                if (boardMusic) boardMusic.volume = 0;
                boardBtnMute.innerHTML = "🔇";
                boardVolumeSlider.value = 0;
            } else {
                if (currentBoardVolume === 0) currentBoardVolume = 0.2;
                if (boardMusic) boardMusic.volume = currentBoardVolume;
                boardBtnMute.innerHTML = "🔊";
                boardVolumeSlider.value = currentBoardVolume;
            }
        });
    }

    function startBoardMusic() {
        if (boardMusic && !isBoardMuted) {
            boardMusic.volume = currentBoardVolume;
            boardMusic.play().catch(e => console.log("Музиката изчаква потребителско действие:", e));
        }
        document.removeEventListener("click", startBoardMusic);
    }

    document.addEventListener("click", startBoardMusic);
});

document.getElementById("btn-draw-footballer").addEventListener("click", function () {
    document.getElementById("spell-search-modal").style.display = "none";
    addNewCardToHand({ name: "Изтеглен Скаут", type: "Footballer", atk: 90, def: 85, con: 80 });
    alert("Изтеглихте Футболист! Тестето беше размесено! 🔄");
});

document.getElementById("btn-draw-trap").addEventListener("click", function () {
    document.getElementById("spell-search-modal").style.display = "none";
    addNewCardToHand({ name: "Изтеглен Капан", type: "Trap", effect: "NegateAttack" });
    alert("Изтеглихте Капан! Тестето беше размесено! 🔄");
});

reloadHandClickEvents();