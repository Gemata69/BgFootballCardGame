document.addEventListener("DOMContentLoaded", function () {
    // Intro Animation Logic
    const ball = document.getElementById("anim-ball");
    const text = document.getElementById("anim-text");
    const introScreen = document.getElementById("intro-screen");
    const mainMenu = document.getElementById("main-menu");

    setTimeout(() => { ball.classList.add("kick-ball"); }, 600);
    setTimeout(() => { text.classList.add("show-text"); }, 1800);
    setTimeout(() => {
        introScreen.style.opacity = "0";
        mainMenu.style.opacity = "1";
        setTimeout(() => { introScreen.style.display = "none"; }, 1000);
    }, 4500);

    // CARD SHOWCASE GENERATOR
    const sampleCards = [
        { type: "Footballer", name: "Mustafa Sangare", img: "/images/Sangare.png", atk: 88, def: 35, con: 72 },
        { type: "Footballer", name: "Maicon", img: "/images/Maicon.png", atk: 72, def: 80, con: 75 },
        { type: "Spell", name: "Стратегия: +2", effect: "Теглиш 2 карти" },
        { type: "Trap", name: "Отрицание", effect: "Спира атаката" },
        { type: "Footballer", name: "Radoslav Kirilov", img: "/images/Kirilov.png", atk: 83, def: 45, con: 80 },
        { type: "Footballer", name: "Svetoslav Vutsov", img: "/images/Vutsov.png", atk: 15, def: 89, con: 60 },
        { type: "Spell", name: "Скаутски Доклад", effect: "Търсиш играч" },
        { type: "Trap", name: "Засада", effect: "-5 Точки на врага" }
    ];

    function generateCardHTML(card) {
        if (card.type === "Footballer") {
            let imgPath = card.img || "/images/Maicon.png";
            return `
                        <div class="card-slot card-footballer">
                            <div class="card-content">
                                <div class="card-title">${card.name}</div>
                                <img src="${imgPath}" class="card-image" onerror="this.src='/images/Maicon.png'" alt="Player" />
                                <div class="card-stats">
                                    <div class="stat-item"><span class="stat-label">ATT</span>${card.atk}</div>
                                    <div class="stat-item"><span class="stat-label">DEF</span>${card.def}</div>
                                    <div class="stat-item"><span class="stat-label">CON</span>${card.con}</div>
                                </div>
                            </div>
                        </div>`;
        } else {
            let cssClass = card.type === "Spell" ? "card-spell" : "card-trap";
            return `
                        <div class="card-slot ${cssClass}">
                            <div class="card-content">
                                <div class="card-title">${card.name}</div>
                                <div class="card-stats" style="display: block; text-align: center; padding: 10px 5px; height: 10vh;">
                                    Ефект:<br/><span style="color:#ffd700;">${card.effect}</span>
                                </div>
                            </div>
                        </div>`;
        }
    }

    let cardsHTML = sampleCards.map(generateCardHTML).join("");
    let endlessHTML = cardsHTML + cardsHTML + cardsHTML + cardsHTML;

    document.getElementById("row-top").innerHTML = endlessHTML;

    let reversedCardsHTML = sampleCards.slice().reverse().map(generateCardHTML).join("");
    let endlessReversedHTML = reversedCardsHTML + reversedCardsHTML + reversedCardsHTML + reversedCardsHTML;
    document.getElementById("row-bottom").innerHTML = endlessReversedHTML;
});