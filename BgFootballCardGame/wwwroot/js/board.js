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
    //Levski 
    { name: "Mustafa Sangare", team: "Левски", imgUrl: "/images/Sangare.png", baseAtk: 88, baseDef: 35, baseCon: 72 },
    { name: "Everton Bala", team: "Левски", imgUrl: "/images/EvertonBala.png", baseAtk: 84, baseDef: 45, baseCon: 78 },
    { name: "Akram Bouras", team: "Левски", imgUrl: "/images/ab47.png", baseAtk: 76, baseDef: 68, baseCon: 82 },
    { name: "Armstrong Oko-Flex", team: "Левски", imgUrl: "/images/okoflex.png", baseAtk: 85, baseDef: 40, baseCon: 79 },
    { name: "Radoslav Kirilov", team: "Левски", imgUrl: "/images/кирилов.png", baseAtk: 83, baseDef: 45, baseCon: 80 },
    { name: "Georgi Kostadinov", team: "Левски", imgUrl: "/images/georgikostadinov.png", baseAtk: 65, baseDef: 82, baseCon: 85 },
    { name: "Mazire Soula", team: "Левски", imgUrl: "/images/MazireSoula.png", baseAtk: 80, baseDef: 60, baseCon: 86 },
    { name: "Cristian Makoun", team: "Левски", imgUrl: "/images/KristianMakoun.png", baseAtk: 55, baseDef: 84, baseCon: 74 },
    { name: "Aldair", team: "Левски", imgUrl: "/images/aldair.png", baseAtk: 68, baseDef: 81, baseCon: 76 },
    { name: "Oliver Kamdem", team: "Левски", imgUrl: "/images/kamdem.png", baseAtk: 65, baseDef: 80, baseCon: 75 },
    { name: "Maicon", team: "Левски", imgUrl: "/images/Maicon.png", baseAtk: 72, baseDef: 80, baseCon: 75 },
    { name: "Kristiyan Dimitrov", team: "Левски", imgUrl: "/images/kd50.png", baseAtk: 62, baseDef: 83, baseCon: 68 },
    { name: "Asen Mitkov", team: "Левски", imgUrl: "/images/am10.png", baseAtk: 86, baseDef: 38, baseCon: 70 },
    { name: "Gasper Trdin", team: "Левски", imgUrl: "/images/trdin.png", baseAtk: 50, baseDef: 85, baseCon: 65 },
    { name: "Svetoslav Vutsov", team: "Левски", imgUrl: "/images/svetoslavvutsov.png", baseAtk: 15, baseDef: 89, baseCon: 60 },

    //Ludogorets 
    { name: "Sergio Padt", team: "Лудогорец", imgUrl: "/images/SergioPadt.png", baseAtk: 12, baseDef: 88, baseCon: 65 },
    { name: "Anton Nedyalkov", team: "Лудогорец", imgUrl: "/images/AntonNedyalkov.png", baseAtk: 60, baseDef: 85, baseCon: 74 },
    { name: "Olivier Verdon", team: "Лудогорец", imgUrl: "/images/OlivierVerdon.png", baseAtk: 45, baseDef: 86, baseCon: 68 },
    { name: "Son", team: "Лудогорец", imgUrl: "/images/Son.png", baseAtk: 70, baseDef: 82, baseCon: 76 },
    { name: "Dinis Almeida", team: "Лудогорец", imgUrl: "/images/DinisAlmeida.png", baseAtk: 50, baseDef: 84, baseCon: 66 },
    { name: "Petar Stanic", team: "Лудогорец", imgUrl: "/images/PetarStanic.png", baseAtk: 75, baseDef: 60, baseCon: 84 },
    { name: "Eric Marcus", team: "Лудогорец", imgUrl: "/images/EricMarcus.png", baseAtk: 82, baseDef: 40, baseCon: 77 },
    { name: "Caio Vidal", team: "Лудогорец", imgUrl: "/images/CaioVidal.png", baseAtk: 84, baseDef: 35, baseCon: 78 },
    { name: "Ivajlo Chochev", team: "Лудогорец", imgUrl: "/images/IvajloChochev.png", baseAtk: 78, baseDef: 72, baseCon: 85 },
    { name: "Bernard Tekpetey", team: "Лудогорец", imgUrl: "/images/BernardTekpetey.png", baseAtk: 86, baseDef: 42, baseCon: 79 },
    { name: "Deroy Duarte", team: "Лудогорец", imgUrl: "/images/DeroyDuarte.png", baseAtk: 72, baseDef: 68, baseCon: 82 },
    { name: "Pedro Naressi", team: "Лудогорец", imgUrl: "/images/PedroNaressi.png", baseAtk: 68, baseDef: 78, baseCon: 83 },
    { name: "Rwan Cruz", team: "Лудогорец", imgUrl: "/images/RwanCruz.png", baseAtk: 87, baseDef: 30, baseCon: 75 },
    { name: "Kwadwo Duah", team: "Лудогорец", imgUrl: "/images/KwadwoDuah.png", baseAtk: 88, baseDef: 32, baseCon: 74 },
    { name: "Yves Erick Bile", team: "Лудогорец", imgUrl: "/images/YvesErickBile.png", baseAtk: 83, baseDef: 38, baseCon: 76 },

    // CSKA
    { name: "Ioannis Pittas", team: "ЦСКА", imgUrl: "/images/IoannisPittas.png", baseAtk: 85, baseDef: 35, baseCon: 75 },
    { name: "Leandro Godoy", team: "ЦСКА", imgUrl: "/images/LeandroGodoy.png", baseAtk: 82, baseDef: 30, baseCon: 72 },
    { name: "Fedor Lapoukhov", team: "ЦСКА", imgUrl: "/images/FedorLapoukhov.png", baseAtk: 15, baseDef: 85, baseCon: 60 },
    { name: "Lumbardh Dellova", team: "ЦСКА", imgUrl: "/images/LumbardhDellova.png", baseAtk: 45, baseDef: 82, baseCon: 70 },
    { name: "Teodor Ivanov", team: "ЦСКА", imgUrl: "/images/TeodorIvanov.png", baseAtk: 40, baseDef: 75, baseCon: 65 },
    { name: "James Etoo", team: "ЦСКА", imgUrl: "/images/JamesEtoo.png", baseAtk: 62, baseDef: 78, baseCon: 80 },
    { name: "Leo Pereira", team: "ЦСКА", imgUrl: "/images/LeoPereira.png", baseAtk: 78, baseDef: 40, baseCon: 75 },
    { name: "Bruno Jordao", team: "ЦСКА", imgUrl: "/images/BrunoJordao.png", baseAtk: 70, baseDef: 70, baseCon: 82 },
    { name: "Isaac Solet", team: "ЦСКА", imgUrl: "/images/IsaacSolet.png", baseAtk: 65, baseDef: 75, baseCon: 78 },
    { name: "Max Ebong", team: "ЦСКА", imgUrl: "/images/MaxEbong.png", baseAtk: 74, baseDef: 65, baseCon: 80 },
    { name: "Petko Panayotov", team: "ЦСКА", imgUrl: "/images/PetkoPanayotov.png", baseAtk: 68, baseDef: 60, baseCon: 75 },
    { name: "Mohamed Brahimi", team: "ЦСКА", imgUrl: "/images/MohamedBrahimi.png", baseAtk: 78, baseDef: 45, baseCon: 72 },
    { name: "Alejandro Piedrahita", team: "ЦСКА", imgUrl: "/images/AlejandroPiedrahita.png", baseAtk: 76, baseDef: 50, baseCon: 74 },
    { name: "Angelo Martino", team: "ЦСКА", imgUrl: "/images/AngeloMartino.png", baseAtk: 65, baseDef: 78, baseCon: 76 },
    { name: "Adrian Lapena", team: "ЦСКА", imgUrl: "/images/AdrianLapena.png", baseAtk: 50, baseDef: 80, baseCon: 68 },

    // Lokomotiv Plovdiv
    { name: "Dimitar Iliev", team: "Локомотив Пловдив", imgUrl: "/images/DimitarIliev.png", baseAtk: 84, baseDef: 40, baseCon: 82 },
    { name: "Joel Zwarts", team: "Локомотив Пловдив", imgUrl: "/images/JoelZwarts.png", baseAtk: 79, baseDef: 35, baseCon: 70 },
    { name: "Petar Zovko", team: "Локомотив Пловдив", imgUrl: "/images/PetarZovko.png", baseAtk: 12, baseDef: 78, baseCon: 60 },
    { name: "Adrian Cova", team: "Локомотив Пловдив", imgUrl: "/images/AdrianCova.png", baseAtk: 60, baseDef: 72, baseCon: 68 },
    { name: "Andrei Chindris", team: "Локомотив Пловдив", imgUrl: "/images/AndreiChindris.png", baseAtk: 45, baseDef: 76, baseCon: 65 },
    { name: "Kaloyan Kostov", team: "Локомотив Пловдив", imgUrl: "/images/KaloyanKostov.png", baseAtk: 40, baseDef: 70, baseCon: 62 },
    { name: "Parvizdzhon Umarbaev", team: "Локомотив Пловдив", imgUrl: "/images/ParvizdzhonUmarbaev.png", baseAtk: 72, baseDef: 60, baseCon: 80 },
    { name: "Catalin Itu", team: "Локомотив Пловдив", imgUrl: "/images/CatalinItu.png", baseAtk: 68, baseDef: 65, baseCon: 74 },
    { name: "Sevi Idriz", team: "Локомотив Пловдив", imgUrl: "/images/SeviIdriz.png", baseAtk: 65, baseDef: 55, baseCon: 68 },
    { name: "Julien Lamy", team: "Локомотив Пловдив", imgUrl: "/images/JulienLamy.png", baseAtk: 76, baseDef: 40, baseCon: 72 },
    { name: "Francisko Politano", team: "Локомотив Пловдив", imgUrl: "/images/FranciskoPolitano.png", baseAtk: 75, baseDef: 45, baseCon: 70 },
    { name: "Efe Ali", team: "Локомотив Пловдив", imgUrl: "/images/EfeAli.png", baseAtk: 45, baseDef: 74, baseCon: 65 },
    { name: "Martin Atanasov", team: "Локомотив Пловдив", imgUrl: "/images/MartinAtanasov.png", baseAtk: 70, baseDef: 50, baseCon: 68 },
    { name: "Miha Trdan", team: "Локомотив Пловдив", imgUrl: "/images/MihaTrdan.png", baseAtk: 68, baseDef: 62, baseCon: 72 },
    { name: "Todor Pavlov", team: "Локомотив Пловдив", imgUrl: "/images/TodorPavlov.png", baseAtk: 40, baseDef: 75, baseCon: 64 },
    { name: "Lucas Ryan", team: "Локомотив Пловдив", imgUrl: "/images/LucasRyan.png", baseAtk: 65, baseDef: 70, baseCon: 68 },

    // Botev Plovdiv
    { name: "Daniel Naumov", team: "Ботев Пловдив", imgUrl: "/images/DanielNaumov.png", baseAtk: 15, baseDef: 85, baseCon: 65 },
    { name: "Antonine Conte", team: "Ботев Пловдив", imgUrl: "/images/AntonineConte.png", baseAtk: 50, baseDef: 80, baseCon: 70 },
    { name: "Gabriel Noga", team: "Ботев Пловдив", imgUrl: "/images/GabrielNoga.png", baseAtk: 45, baseDef: 78, baseCon: 65 },
    { name: "Nikola Soldo", team: "Ботев Пловдив", imgUrl: "/images/NikolaSoldo.png", baseAtk: 48, baseDef: 77, baseCon: 66 },
    { name: "Simeon Petrov", team: "Ботев Пловдив", imgUrl: "/images/SimeonPetrov.png", baseAtk: 40, baseDef: 75, baseCon: 62 },
    { name: "Emerson Rodriguez", team: "Ботев Пловдив", imgUrl: "/images/EmersonRodriguez.png", baseAtk: 78, baseDef: 40, baseCon: 74 },
    { name: "Nikola Iliev", team: "Ботев Пловдив", imgUrl: "/images/NikolaIliev.png", baseAtk: 80, baseDef: 45, baseCon: 76 },
    { name: "Todor Nedelev", team: "Ботев Пловдив", imgUrl: "/images/TodorNedelev.png", baseAtk: 82, baseDef: 50, baseCon: 88 },
    { name: "Samuel Kalu", team: "Ботев Пловдив", imgUrl: "/images/SamuelKalu.png", baseAtk: 80, baseDef: 42, baseCon: 75 },
    { name: "Ederson Silva", team: "Ботев Пловдив", imgUrl: "/images/EdersonSilva.png", baseAtk: 75, baseDef: 55, baseCon: 70 },
    { name: "Ifenna Dorgu", team: "Ботев Пловдив", imgUrl: "/images/IfennaDorgu.png", baseAtk: 76, baseDef: 48, baseCon: 72 },
    { name: "Aleksa Maras", team: "Ботев Пловдив", imgUrl: "/images/AleksaMaras.png", baseAtk: 82, baseDef: 35, baseCon: 70 },
    { name: "Franklin Mascote", team: "Ботев Пловдив", imgUrl: "/images/FranklinMascote.png", baseAtk: 70, baseDef: 74, baseCon: 72 },
    { name: "Henrique Jocu", team: "Ботев Пловдив", imgUrl: "/images/HenriqueJocu.png", baseAtk: 65, baseDef: 72, baseCon: 76 },
    { name: "Lucas Araujo", team: "Ботев Пловдив", imgUrl: "/images/LucasAraujo.png", baseAtk: 68, baseDef: 60, baseCon: 75 },

    // Cherno More
    { name: "Kristian Tomov", team: "Черно море", imgUrl: "/images/KristianTomov.png", baseAtk: 15, baseDef: 82, baseCon: 60 },
    { name: "Zhivko Atanasov", team: "Черно море", imgUrl: "/images/ZhivkoAtanasov.png", baseAtk: 40, baseDef: 80, baseCon: 65 },
    { name: "Asen Donchev", team: "Черно море", imgUrl: "/images/AsenDonchev.png", baseAtk: 55, baseDef: 75, baseCon: 70 },
    { name: "Ertan Tombak", team: "Черно море", imgUrl: "/images/ErtanTombak.png", baseAtk: 60, baseDef: 78, baseCon: 68 },
    { name: "Rosen Stefanov", team: "Черно море", imgUrl: "/images/RosenStefanov.png", baseAtk: 35, baseDef: 76, baseCon: 62 },
    { name: "Jorge Padilla", team: "Черно море", imgUrl: "/images/JorgePadilla.png", baseAtk: 50, baseDef: 74, baseCon: 66 },
    { name: "Celso Sidney", team: "Черно море", imgUrl: "/images/CelsoSidney.png", baseAtk: 65, baseDef: 70, baseCon: 70 },
    { name: "Georgi Lazarov", team: "Черно море", imgUrl: "/images/GeorgiLazarov.png", baseAtk: 72, baseDef: 45, baseCon: 68 },
    { name: "Nikolay Zlatev", team: "Черно море", imgUrl: "/images/NikolayZlatev.png", baseAtk: 75, baseDef: 40, baseCon: 70 },
    { name: "Asen Chandarov", team: "Черно море", imgUrl: "/images/AsenChandarov.png", baseAtk: 70, baseDef: 65, baseCon: 82 },
    { name: "Vasil Panayotov", team: "Черно море", imgUrl: "/images/VasilPanayotov.png", baseAtk: 68, baseDef: 68, baseCon: 80 },
    { name: "Andreas Calcan", team: "Черно море", imgUrl: "/images/AndreasCalcan.png", baseAtk: 78, baseDef: 42, baseCon: 75 },
    { name: "Berk Beyhan", team: "Черно море", imgUrl: "/images/BerkBeyhan.png", baseAtk: 65, baseDef: 60, baseCon: 70 },
    { name: "João Bandaro", team: "Черно море", imgUrl: "/images/JoaoBandaro.png", baseAtk: 74, baseDef: 45, baseCon: 72 },
    { name: "Dimitar Tonev", team: "Черно море", imgUrl: "/images/DimitarTonev.png", baseAtk: 76, baseDef: 50, baseCon: 78 },

    // Slavia Sofia
    { name: "Levi Ntumba", team: "Славия", imgUrl: "/images/LeviNtumba.png", baseAtk: 15, baseDef: 80, baseCon: 60 },
    { name: "Jordan Varela", team: "Славия", imgUrl: "/images/JordanVarela.png", baseAtk: 50, baseDef: 76, baseCon: 68 },
    { name: "David Malembana", team: "Славия", imgUrl: "/images/DavidMalembana.png", baseAtk: 40, baseDef: 78, baseCon: 64 },
    { name: "Diego Ferraresso", team: "Славия", imgUrl: "/images/DiegoFerraresso.png", baseAtk: 68, baseDef: 70, baseCon: 75 },
    { name: "Nikola Savić", team: "Славия", imgUrl: "/images/NikolaSavic.png", baseAtk: 38, baseDef: 75, baseCon: 62 },
    { name: "Emil Stoev", team: "Славия", imgUrl: "/images/EmilStoev.png", baseAtk: 76, baseDef: 45, baseCon: 74 },
    { name: "Kristiyan Balov", team: "Славия", imgUrl: "/images/KristiyanBalov.png", baseAtk: 65, baseDef: 55, baseCon: 68 },
    { name: "Iliyan Stefanov", team: "Славия", imgUrl: "/images/IliyanStefanov.png", baseAtk: 80, baseDef: 48, baseCon: 78 },
    { name: "Roberto Raychev", team: "Славия", imgUrl: "/images/RobertoRaychev.png", baseAtk: 74, baseDef: 40, baseCon: 70 },
    { name: "Kristiyan Stoyanov", team: "Славия", imgUrl: "/images/KristiyanStoyanov.png", baseAtk: 62, baseDef: 65, baseCon: 72 },
    { name: "Yanis Guermouche", team: "Славия", imgUrl: "/images/YanisGuermouche.png", baseAtk: 78, baseDef: 35, baseCon: 72 },
    { name: "Lyubomir Kostov", team: "Славия", imgUrl: "/images/LyubomirKostov.png", baseAtk: 66, baseDef: 60, baseCon: 68 },
    { name: "Ivan Minchev", team: "Славия", imgUrl: "/images/IvanMinchev.png", baseAtk: 70, baseDef: 55, baseCon: 82 },
    { name: "Vladimir Medved", team: "Славия", imgUrl: "/images/VladimirMedved.png", baseAtk: 75, baseDef: 40, baseCon: 70 },
    { name: "Mouhamed Dosso", team: "Славия", imgUrl: "/images/MouhamedDosso.png", baseAtk: 68, baseDef: 65, baseCon: 72 },

    // Botev Vratsa
    { name: "Mitchy Ntelo", team: "Ботев Враца", imgUrl: "/images/MitchyNtelo.png", baseAtk: 80, baseDef: 35, baseCon: 70 },
    { name: "Martin Petkov", team: "Ботев Враца", imgUrl: "/images/MartinPetkov.png", baseAtk: 78, baseDef: 40, baseCon: 72 },
    { name: "Marin Orlinov", team: "Ботев Враца", imgUrl: "/images/MarinOrlinov.png", baseAtk: 15, baseDef: 78, baseCon: 60 },
    { name: "Tamimou Ouorou", team: "Ботев Враца", imgUrl: "/images/TamimouOuorou.png", baseAtk: 40, baseDef: 76, baseCon: 62 },
    { name: "Sainey Sanyang", team: "Ботев Враца", imgUrl: "/images/SaineySanyang.png", baseAtk: 60, baseDef: 74, baseCon: 68 },
    { name: "Martin Stoychev", team: "Ботев Враца", imgUrl: "/images/MartinStoychev.png", baseAtk: 55, baseDef: 72, baseCon: 65 },
    { name: "Ivan Goranov", team: "Ботев Враца", imgUrl: "/images/IvanGoranov.png", baseAtk: 62, baseDef: 75, baseCon: 70 },
    { name: "Milen Stoev", team: "Ботев Враца", imgUrl: "/images/MilenStoev.png", baseAtk: 45, baseDef: 72, baseCon: 64 },
    { name: "José Gallegos", team: "Ботев Враца", imgUrl: "/images/JoseGallegos.png", baseAtk: 68, baseDef: 60, baseCon: 74 },
    { name: "Kristiyan Malinov", team: "Ботев Враца", imgUrl: "/images/KristiyanMalinov.png", baseAtk: 72, baseDef: 68, baseCon: 82 },
    { name: "Radoslav Tsonev", team: "Ботев Враца", imgUrl: "/images/RadoslavTsonev.png", baseAtk: 74, baseDef: 60, baseCon: 84 },
    { name: "Martin Smolenski", team: "Ботев Враца", imgUrl: "/images/MartinSmolenski.png", baseAtk: 76, baseDef: 45, baseCon: 78 },
    { name: "Daniel Genov", team: "Ботев Враца", imgUrl: "/images/DanielGenov.png", baseAtk: 78, baseDef: 40, baseCon: 72 },
    { name: "Iliya Yurukov", team: "Ботев Враца", imgUrl: "/images/IliyaYurukov.png", baseAtk: 65, baseDef: 70, baseCon: 76 },
    { name: "Kassim Hadji", team: "Ботев Враца", imgUrl: "/images/KassimHadji.png", baseAtk: 70, baseDef: 60, baseCon: 70 },

    // Arda Kardzhali
    { name: "Anatoli Gospodinov", team: "Арда", imgUrl: "/images/AnatoliGospodinov.png", baseAtk: 12, baseDef: 83, baseCon: 60 },
    { name: "Calal Huseinov", team: "Арда", imgUrl: "/images/CalalHuseinov.png", baseAtk: 45, baseDef: 76, baseCon: 64 },
    { name: "Gustavo Cascardo", team: "Арда", imgUrl: "/images/GustavoCascardo.png", baseAtk: 58, baseDef: 74, baseCon: 68 },
    { name: "Dimitar Velkovski", team: "Арда", imgUrl: "/images/DimitarVelkovski.png", baseAtk: 60, baseDef: 75, baseCon: 70 },
    { name: "Martin Paskalev", team: "Арда", imgUrl: "/images/MartinPaskalev.png", baseAtk: 42, baseDef: 77, baseCon: 65 },
    { name: "Emil Viyachki", team: "Арда", imgUrl: "/images/EmilViyachki.png", baseAtk: 40, baseDef: 78, baseCon: 63 },
    { name: "Plamen Krachunov", team: "Арда", imgUrl: "/images/PlamenKrachunov.png", baseAtk: 38, baseDef: 76, baseCon: 60 },
    { name: "Wilson Samaké", team: "Арда", imgUrl: "/images/WilsonSamake.png", baseAtk: 81, baseDef: 32, baseCon: 70 },
    { name: "Georgi Nikolov", team: "Арда", imgUrl: "/images/GeorgiNikolov.png", baseAtk: 83, baseDef: 35, baseCon: 72 },
    { name: "Birsent Karagaren", team: "Арда", imgUrl: "/images/BirsentKaragaren.png", baseAtk: 82, baseDef: 45, baseCon: 76 },
    { name: "Antonio Vutov", team: "Арда", imgUrl: "/images/AntonioVutov.png", baseAtk: 76, baseDef: 50, baseCon: 84 },
    { name: "Andre Shinyashiki", team: "Арда", imgUrl: "/images/AndreShinyashiki.png", baseAtk: 79, baseDef: 38, baseCon: 73 },
    { name: "Serkan Yusein", team: "Арда", imgUrl: "/images/SerkanYusein.png", baseAtk: 70, baseDef: 65, baseCon: 81 },
    { name: "Lachezar Kotev", team: "Арда", imgUrl: "/images/LachezarKotev.png", baseAtk: 68, baseDef: 72, baseCon: 79 },
    { name: "Atanas Kabov", team: "Арда", imgUrl: "/images/AtanasKabov.png", baseAtk: 77, baseDef: 42, baseCon: 74 },

    // CSKA 1948
    { name: "Dimitar Sheytanov", team: "ЦСКА 1948", imgUrl: "/images/DimitarSheytanov.png", baseAtk: 14, baseDef: 80, baseCon: 62 },
    { name: "Diego Medina", team: "ЦСКА 1948", imgUrl: "/images/DiegoMedina.png", baseAtk: 55, baseDef: 74, baseCon: 68 },
    { name: "Lasha Dvali", team: "ЦСКА 1948", imgUrl: "/images/LashaDvali.png", baseAtk: 45, baseDef: 81, baseCon: 66 },
    { name: "Benaissa Benamar", team: "ЦСКА 1948", imgUrl: "/images/BenaissaBenamar.png", baseAtk: 42, baseDef: 77, baseCon: 64 },
    { name: "Ognjen Gašević", team: "ЦСКА 1948", imgUrl: "/images/OgnjenGasevic.png", baseAtk: 58, baseDef: 73, baseCon: 67 },
    { name: "Georgi Rusev", team: "ЦСКА 1948", imgUrl: "/images/GeorgiRusev.png", baseAtk: 83, baseDef: 40, baseCon: 78 },
    { name: "Borislav Tsonev", team: "ЦСКА 1948", imgUrl: "/images/BorislavTsonev.png", baseAtk: 75, baseDef: 55, baseCon: 83 },
    { name: "Marto Boychev", team: "ЦСКА 1948", imgUrl: "/images/MartoBoychev.png", baseAtk: 68, baseDef: 58, baseCon: 74 },
    { name: "Elias Franco", team: "ЦСКА 1948", imgUrl: "/images/EliasFranco.png", baseAtk: 64, baseDef: 70, baseCon: 75 },
    { name: "Petar Vitanov", team: "ЦСКА 1948", imgUrl: "/images/PetarVitanov.png", baseAtk: 62, baseDef: 76, baseCon: 78 },
    { name: "Bernardo Couto", team: "ЦСКА 1948", imgUrl: "/images/BernardoCouto.png", baseAtk: 76, baseDef: 38, baseCon: 72 },
    { name: "Brian Sobrero", team: "ЦСКА 1948", imgUrl: "/images/BrianSobrero.png", baseAtk: 78, baseDef: 32, baseCon: 70 },
    { name: "Atanas Iliev", team: "ЦСКА 1948", imgUrl: "/images/AtanasIliev.png", baseAtk: 82, baseDef: 35, baseCon: 71 },
    { name: "Mamadou Diallo", team: "ЦСКА 1948", imgUrl: "/images/MamadouDiallo.png", baseAtk: 77, baseDef: 36, baseCon: 68 },
    { name: "José Martínez", team: "ЦСКА 1948", imgUrl: "/images/JoseMartinez.png", baseAtk: 40, baseDef: 79, baseCon: 65 },

    // Dunav Ruse
    { name: "Preslav Bachev", team: "Дунав Русе", imgUrl: "/images/PreslavBachev.png", baseAtk: 76, baseDef: 32, baseCon: 68 },
    { name: "Ibrahim Keita", team: "Дунав Русе", imgUrl: "/images/IbrahimKeita.png", baseAtk: 78, baseDef: 30, baseCon: 66 },
    { name: "Hyusein Kelyovluev", team: "Дунав Русе", imgUrl: "/images/HyuseinKelyovluev.png", baseAtk: 72, baseDef: 45, baseCon: 70 },
    { name: "Borislav Marinov", team: "Дунав Русе", imgUrl: "/images/BorislavMarinov.png", baseAtk: 74, baseDef: 35, baseCon: 67 },
    { name: "Georgi Kitanov", team: "Дунав Русе", imgUrl: "/images/GeorgiKitanov.png", baseAtk: 12, baseDef: 79, baseCon: 58 },
    { name: "Kamen Hadzhiev", team: "Дунав Русе", imgUrl: "/images/KamenHadzhiev.png", baseAtk: 45, baseDef: 76, baseCon: 64 },
    { name: "Mario Dilchovski", team: "Дунав Русе", imgUrl: "/images/MarioDilchovski.png", baseAtk: 15, baseDef: 72, baseCon: 55 },
    { name: "Áquila", team: "Дунав Русе", imgUrl: "/images/Aquila.png", baseAtk: 50, baseDef: 74, baseCon: 66 },
    { name: "Stojan Predev", team: "Дунав Русе", imgUrl: "/images/StojanPredev.png", baseAtk: 38, baseDef: 72, baseCon: 60 },
    { name: "Krasimir Todorov", team: "Дунав Русе", imgUrl: "/images/KrasimirTodorov.png", baseAtk: 68, baseDef: 55, baseCon: 73 },
    { name: "Eliseé Sou", team: "Дунав Русе", imgUrl: "/images/EliseeSou.png", baseAtk: 55, baseDef: 70, baseCon: 68 },
    { name: "Bilal El Bakkali Salah", team: "Дунав Русе", imgUrl: "/images/BilalElBakkaliSalah.png", baseAtk: 66, baseDef: 58, baseCon: 72 },
    { name: "Dimitar Todorov", team: "Дунав Русе", imgUrl: "/images/DimitarTodorov.png", baseAtk: 58, baseDef: 68, baseCon: 65 },
    { name: "Radoslav Apostolov", team: "Дунав Русе", imgUrl: "/images/RadoslavApostolov.png", baseAtk: 70, baseDef: 62, baseCon: 75 },

    // Lokomotiv Sofia
    { name: "Martin Velichkov", team: "Локомотив София", imgUrl: "/images/MartinVelichkov.png", baseAtk: 12, baseDef: 81, baseCon: 60 },
    { name: "Ryan Bidounga", team: "Локомотив София", imgUrl: "/images/RyanBidounga.png", baseAtk: 40, baseDef: 78, baseCon: 64 },
    { name: "Messie Biatoumoussoka", team: "Локомотив София", imgUrl: "/images/MessieBiatoumoussoka.png", baseAtk: 42, baseDef: 79, baseCon: 62 },
    { name: "Angel Lyaskov", team: "Локомотив София", imgUrl: "/images/AngelLyaskov.png", baseAtk: 58, baseDef: 74, baseCon: 68 },
    { name: "Bozhidar Katsarov", team: "Локомотив София", imgUrl: "/images/BozhidarKatsarov.png", baseAtk: 60, baseDef: 75, baseCon: 72 },
    { name: "Reyan Daskalov", team: "Локомотив София", imgUrl: "/images/ReyanDaskalov.png", baseAtk: 55, baseDef: 74, baseCon: 70 },
    { name: "Jordon Ibe", team: "Локомотив София", imgUrl: "/images/JordonIbe.png", baseAtk: 80, baseDef: 35, baseCon: 75 },
    { name: "Dominik Yankov", team: "Локомотив София", imgUrl: "/images/DominikYankov.png", baseAtk: 76, baseDef: 45, baseCon: 84 },
    { name: "Krasimir Miloshev", team: "Локомотив София", imgUrl: "/images/KrasimirMiloshev.png", baseAtk: 72, baseDef: 62, baseCon: 78 },
    { name: "Erol Dost", team: "Локомотив София", imgUrl: "/images/ErolDost.png", baseAtk: 65, baseDef: 68, baseCon: 74 },
    { name: "Spas Delev", team: "Локомотив София", imgUrl: "/images/SpasDelev.png", baseAtk: 82, baseDef: 40, baseCon: 76 },
    { name: "Ante Aralica", team: "Локомотив София", imgUrl: "/images/AnteAralica.png", baseAtk: 81, baseDef: 32, baseCon: 68 },
    { name: "Georgi Minchev", team: "Локомотив София", imgUrl: "/images/GeorgiMinchev.png", baseAtk: 84, baseDef: 30, baseCon: 70 },
    { name: "Simeon Slavchev", team: "Локомотив София", imgUrl: "/images/SimeonSlavchev.png", baseAtk: 68, baseDef: 72, baseCon: 77 },
    { name: "Krasimir Stanoev", team: "Локомотив София", imgUrl: "/images/KrasimirStanoev.png", baseAtk: 66, baseDef: 64, baseCon: 74 },

    // Septemvri Sofia
    { name: "Yanko Georgiev", team: "Септември София", imgUrl: "/images/YankoGeorgiev.png", baseAtk: 14, baseDef: 79, baseCon: 58 },
    { name: "Valentine Ozornwafor", team: "Септември София", imgUrl: "/images/ValentineOzornwafor.png", baseAtk: 38, baseDef: 77, baseCon: 60 },
    { name: "Mateo Stamatov", team: "Септември София", imgUrl: "/images/MateoStamatov.png", baseAtk: 60, baseDef: 72, baseCon: 66 },
    { name: "Kubrat Onashchi", team: "Септември София", imgUrl: "/images/KubratOnashchi.png", baseAtk: 70, baseDef: 42, baseCon: 68 },
    { name: "Robin Schouten", team: "Септември София", imgUrl: "/images/RobinSchouten.png", baseAtk: 56, baseDef: 74, baseCon: 67 },
    { name: "Dominik Ivkić", team: "Септември София", imgUrl: "/images/DominikIvkic.png", baseAtk: 40, baseDef: 76, baseCon: 62 },
    { name: "Nicolas Fontaine", team: "Септември София", imgUrl: "/images/NicolasFontaine.png", baseAtk: 73, baseDef: 48, baseCon: 72 },
    { name: "Ayoub Abou", team: "Септември София", imgUrl: "/images/AyoubAbou.png", baseAtk: 68, baseDef: 60, baseCon: 78 },
    { name: "Galin Ivanov", team: "Септември София", imgUrl: "/images/GalinIvanov.png", baseAtk: 81, baseDef: 42, baseCon: 84 },
    { name: "Valon Hamdiu", team: "Септември София", imgUrl: "/images/ValonHamdiu.png", baseAtk: 64, baseDef: 70, baseCon: 73 },
    { name: "Krasian Kolev", team: "Септември София", imgUrl: "/images/KrasianKolev.png", baseAtk: 72, baseDef: 55, baseCon: 77 },
    { name: "Bertrand Fourrier", team: "Септември София", imgUrl: "/images/BertrandFourrier.png", baseAtk: 77, baseDef: 30, baseCon: 68 },
    { name: "Frantzety Herard", team: "Септември София", imgUrl: "/images/FrantzetyHerard.png", baseAtk: 75, baseDef: 35, baseCon: 70 },
    { name: "Faiz Mattoir", team: "Септември София", imgUrl: "/images/FaizMattoir.png", baseAtk: 76, baseDef: 38, baseCon: 71 },
    { name: "Edney Ribeiro", team: "Септември София", imgUrl: "/images/EdneyRibeiro.png", baseAtk: 78, baseDef: 32, baseCon: 69 },

    // Spartak Varna
    { name: "Maksym Kovalyov", team: "Спартак Варна", imgUrl: "/images/MaksymKovalyov.png", baseAtk: 13, baseDef: 82, baseCon: 61 },
    { name: "Mateo Jurić-Petrašilo", team: "Спартак Варна", imgUrl: "/images/MateoJuricPetrasilo.png", baseAtk: 42, baseDef: 75, baseCon: 64 },
    { name: "Dimo Krastev", team: "Спартак Варна", imgUrl: "/images/DimoKrastev.png", baseAtk: 50, baseDef: 78, baseCon: 72 },
    { name: "Ilker Budinov", team: "Спартак Варна", imgUrl: "/images/IlkerBudinov.png", baseAtk: 62, baseDef: 73, baseCon: 68 },
    { name: "Angel Granchov", team: "Спартак Варна", imgUrl: "/images/AngelGranchov.png", baseAtk: 38, baseDef: 76, baseCon: 60 },
    { name: "Deyan Lozev", team: "Спартак Варна", imgUrl: "/images/DeyanLozev.png", baseAtk: 65, baseDef: 74, baseCon: 71 },
    { name: "Boris Ivanov", team: "Спартак Варна", imgUrl: "/images/BorisIvanov.png", baseAtk: 66, baseDef: 60, baseCon: 70 },
    { name: "Tailson", team: "Спартак Варна", imgUrl: "/images/Tailson.png", baseAtk: 79, baseDef: 36, baseCon: 74 },
    { name: "Xandy", team: "Спартак Варна", imgUrl: "/images/Xandy.png", baseAtk: 77, baseDef: 40, baseCon: 72 },
    { name: "Emil Yanchev", team: "Спартак Варна", imgUrl: "/images/EmilYanchev.png", baseAtk: 55, baseDef: 72, baseCon: 68 },
    { name: "Jota Lopes", team: "Спартак Варна", imgUrl: "/images/JotaLopes.png", baseAtk: 74, baseDef: 45, baseCon: 75 },
    { name: "Saad Moukachar", team: "Спартак Варна", imgUrl: "/images/SaadMoukachar.png", baseAtk: 68, baseDef: 58, baseCon: 73 },
    { name: "Tsvetelin Chunchukov", team: "Спартак Варна", imgUrl: "/images/TsvetelinChunchukov.png", baseAtk: 80, baseDef: 34, baseCon: 69 },
    { name: "Tales", team: "Спартак Варна", imgUrl: "/images/Tales.png", baseAtk: 76, baseDef: 35, baseCon: 70 },
    { name: "Daniel Ivanov", team: "Спартак Варна", imgUrl: "/images/DanielIvanov.png", baseAtk: 72, baseDef: 50, baseCon: 73 }
];

// 40 cards in one deck
function createDeck() {
    let deck = [];

    for (let i = 0; i < 26; i++) {
        let randomPlayer = playerDatabase[Math.floor(Math.random() * playerDatabase.length)];

        deck.push({
            name: randomPlayer.name,
            type: "Footballer",
            atk: randomPlayer.baseAtk,
            def: randomPlayer.baseDef,
            con: randomPlayer.baseCon,
            imgUrl: randomPlayer.imgUrl
        });
    }

    for (let i = 0; i < 2; i++) deck.push({ name: "Penalty", type: "Spell", effect: "Draw2", desc: "Активирай тази карта, за да изтеглиш 2 допълнителни карти от тестето си.", img: "/images/+2.png" });
    for (let i = 0; i < 2; i++) deck.push({ name: "Scout", type: "Spell", effect: "Search", desc: "Изтегли на случаен принцип 1 Футболист, Магия или Капан от тестето и го добави в ръката си.", img: "/images/search.png" });
    for (let i = 0; i < 3; i++) deck.push({ name: "Assist", type: "Spell", effect: "+5 Точки", desc: "Избери 1 твой Футболист на терена. Той получава +5 Точки към атаката си.", img: "/images/+5.png" });

    for (let i = 0; i < 2; i++) deck.push({ name: "Tackle", type: "Trap", effect: "NegateAttack", desc: "Може да се активира дори без играч на терена. Спира вражеската атака и предпазва жизнените ти точки!", img: "/images/negate attack.png" });
    for (let i = 0; i < 4; i++) deck.push({ name: "Offside", type: "Trap", effect: "-5 Точки", desc: "Активирай по време на атака. Намалява силата на вражеския Футболист с -5 Точки.", img: "/images/-5.png" });
    deck.push({ name: "Owngoal", type: "Trap", effect: "Автогол", desc: "Изисква твой Футболист на терена. Обръща вражеската атака и противникът понася всички щети!", img: "/images/autogoal.png" });

    return deck.sort(() => Math.random() - 0.5);
}

let myDeck = [];
let savedCustomDeck = localStorage.getItem("myCustomDeck");

if (savedCustomDeck) {
    let parsedDeck = JSON.parse(savedCustomDeck);

    // Transform the cards to match exactly what the game expects
    myDeck = parsedDeck.map(card => {
        if (card.type === "Footballer") {
            return {
                name: card.name,
                type: "Footballer",
                atk: card.baseAtk, 
                def: card.baseDef, 
                con: card.baseCon, 
                imgUrl: card.imgUrl
            };
        } else {
            return {
                name: card.name,
                type: card.type,
                effect: card.effect,
                desc: card.desc,
                img: card.imgUrl 
            };
        }
    });

    // Shuffle the deck so every game is different
    myDeck = myDeck.sort(() => Math.random() - 0.5);
    console.log("Successfully loaded custom Deck of 40 cards!");
} else {
    // Fallback: If the player enters without using the Deck Builder, provide a default deck
    myDeck = createDeck();
    console.log("Loaded automatically generated Deck (player has no custom deck).");
}

// The enemy currently always plays with a randomly generated valid deck
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
let timeLeft = 30;
let countdown;
let selectedCardElement = null;
let selectedCardIndex = null;
let isFrontRowTarget = true;
let isGameStarted = false;
let currentMyStat = "";
let currentEnemyStat = "";
let myLifePoints = 30;
let enemyLifePoints = 30;
let isSelectingTrap = false;

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
    timeLeft = 30;
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

            let hasTrapOnField = false;
            document.querySelectorAll("#my-back-row .my-board-slot").forEach(slot => {
                let data = slot.getAttribute("data-fullcard");
                if (data && JSON.parse(data).type === "Trap" && slot.classList.contains("card-back")) {
                    hasTrapOnField = true;
                }
            });

            if (hasTrapOnField) {
                document.getElementById("trap-question").innerText = "Имате поставен капан! Искате ли да активирате някой от тях?";
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

    isSelectingTrap = true;

    document.getElementById("battle-condition-text").innerText = "КЛИКНИ ВЪРХУ КАПАНА, КОЙТО ИСКАШ ДА АКТИВИРАШ!";
    document.getElementById("battle-condition-banner").style.display = "block";

    document.querySelectorAll("#my-back-row .my-board-slot").forEach(slot => {
        let data = slot.getAttribute("data-fullcard");
        if (data && JSON.parse(data).type === "Trap" && slot.classList.contains("card-back")) {
            slot.classList.add("glow-slot");
        }
    });
});

document.getElementById("btn-trap-no").addEventListener("click", function () {
    document.getElementById("trap-prompt-modal").style.display = "none";
    myActiveTrap = null;
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
            atk: randomEnemy.baseAtk,
            def: randomEnemy.baseDef,
            con: randomEnemy.baseCon,
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

        if (enemyLifePoints <= 0 && myLifePoints > 0) {
            nextBtn.innerText = "🏆 ПОБЕДА! Вземи награда!";
            nextBtn.style.backgroundColor = "#28a745"; 

            nextBtn.onclick = function () {
                //Coins
                let myCoins = parseInt(localStorage.getItem("myCoins")) || 0;
                myCoins += 30;
                localStorage.setItem("myCoins", myCoins);

                alert(`🎉 Поздравления! Ти победи и печелиш +30 Coins! \nТекущ баланс: ${myCoins} Coins 💰`);

                window.location.href = "/Index"; 
            };
        }
        else {
            nextBtn.innerText = "КРАЙ НА ИГРАТА (Започни отначало)";
            nextBtn.style.backgroundColor = "#ff0000";
            nextBtn.onclick = function () { location.reload(); };
        }

    } else {
        nextBtn.innerText = "Продължи (Картите отиват на Скамейката)";
        nextBtn.onclick = function () {
            document.getElementById("battle-result-modal").style.display = "none";

            let myCardsCleared = 0;
            let enemyCardsCleared = 0;

            document.querySelectorAll(".enemy-board-slot").forEach(slot => {
                if (slot.classList.contains("card-filled")) {
                    enemyCardsCleared++;
                    let index = parseInt(slot.getAttribute("data-slot-index"));
                    slot.innerHTML = "Слот " + (index + 1);
                    slot.className = "card-slot enemy-board-slot";
                }
            });

            document.querySelectorAll(".my-board-slot").forEach(slot => {
                let shouldClear = false;
                let dataStr = slot.getAttribute("data-fullcard");

                if (dataStr) {
                    let cardObj = JSON.parse(dataStr);
                    if (cardObj.type === "Footballer") shouldClear = true;
                    if (slot.classList.contains("used-this-turn")) shouldClear = true;
                }

                if (shouldClear) {
                    myCardsCleared++;
                    let index = parseInt(slot.getAttribute("data-slot-index"));
                    slot.innerHTML = "Слот " + (index + 1);
                    slot.className = "card-slot my-board-slot";
                    slot.removeAttribute("data-fullcard");
                    slot.removeAttribute("data-innerhtml");
                    slot.removeAttribute("data-cssclass");
                }
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
            <div class="card-image-wrapper" style="width: 100%; height: 12vh; overflow: hidden; display: flex; justify-content: center; align-items: center; background-color: #eee;">
                <img src="${imgPath}" class="card-image" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block;" onerror="this.src='/images/Maicon.png'" alt="Player" />
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

        let gradient = cardObj.type === "Spell"
            ? "radial-gradient(circle, #20B2AA, #006666)"
            : "radial-gradient(circle, #C71585, #660066)";

        let currentEmoji = cardObj.type === "Spell" ? "✨" : (cardObj.name === "Засада" ? "🚩" : "🛑");

        let visualContent = cardObj.img
            ? `<img src="${cardObj.img}" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="${cardObj.name}" />`
            : `<div style="font-size: 5vh; display: flex; align-items: center; justify-content: center; height: 100%;">${currentEmoji}</div>`;

        innerContent = `
            <div class="card-title" style="position: relative; z-index: 10; font-weight: bold; color: white; text-align: center; background: rgba(255,255,255,0.15); padding: 2px 0;">${cardObj.name}</div>
            <div class="card-image-wrapper" style="background: ${gradient}; overflow: hidden; height: 12vh; width: 100%; display: flex; justify-content: center; align-items: center; padding: 0;">
                ${visualContent}
            </div>
            <div class="card-textbox" style="justify-content: flex-start; padding: 2px;">
                <div class="card-description" style="margin-bottom: 1px; border-bottom: 1px solid #ccc; padding-bottom: 1px; font-size: 0.85vh;"><b>${typeTag}</b></div>
                <div class="card-description" style="font-size: 0.75vh; line-height: 1; letter-spacing: -0.2px; text-align: left; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical;">${cardObj.desc}</div>
            </div>`;
    }

    newCard.innerHTML = `<div class="card-content">${innerContent}</div>`;
    handContainer.appendChild(newCard);

    newCard.addEventListener("mouseenter", function () {
        showPreview(this.innerHTML, this.style.cssText, this.className);
    });

    newCard.addEventListener("mouseleave", function () {
        hidePreview();
    });

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

        card.addEventListener("mouseenter", function () {
            showPreview(this.innerHTML, this.style.cssText, this.className);
        });

        card.addEventListener("mouseleave", function () {
            hidePreview();
        });
    });
}

document.querySelectorAll(".my-board-slot").forEach(slot => {

    slot.addEventListener("mouseenter", function () {
        let savedHTML = this.getAttribute("data-innerhtml");
        let savedClass = this.getAttribute("data-cssclass");

        if (savedHTML) {
            showPreview(savedHTML, "", savedClass);
        }
    });

    slot.addEventListener("mouseleave", function () {
        hidePreview();
    });

    slot.addEventListener("click", function () {

        if (this.classList.contains("glow-slot") && selectedCardElement !== null) {

            let cardData = JSON.parse(selectedCardElement.getAttribute("data-fullcard"));
            let boardIndex = parseInt(this.getAttribute("data-slot-index"));
            let myName = "@Model.Game.Player1.Name";

            connection.invoke("PlayCard", myName, selectedCardIndex, boardIndex, isFrontRowTarget)
                .catch(err => console.error(err.toString()));

            this.setAttribute("data-fullcard", JSON.stringify(cardData));
            this.setAttribute("data-innerhtml", selectedCardElement.innerHTML);
            this.setAttribute("data-cssclass", selectedCardElement.className);

            if (cardData.type === "Trap" || (cardData.type === "Spell" && cardData.name !== "Assist")) {
                this.className = "card-slot my-board-slot card-back";
                this.innerHTML = "";
            } else {
                this.className = selectedCardElement.className + " my-board-slot";
                this.innerHTML = selectedCardElement.innerHTML;
            }

            this.classList.remove("glow-slot");
            selectedCardElement.remove();
            selectedCardElement = null;
            clearHighlights();

            if (cardData.type === "Spell" && cardData.effect === "Draw2") {
                alert("✨ Активираш Спел: ТЕГЛЕНЕ НА 2 КАРТИ!");
                drawCardFromDeck();
                drawCardFromDeck();
                this.classList.add("used-this-turn"); 
            }
            if (cardData.type === "Spell" && cardData.effect === "Search") {
                document.getElementById("spell-search-modal").style.display = "block";
                this.classList.add("used-this-turn"); 
            }

            if (cardData.type === "Spell" && cardData.name === "Assist") {
                this.classList.add("used-this-turn");
            }
        }

        else if (isSelectingTrap && this.classList.contains("glow-slot")) {
            let cardData = JSON.parse(this.getAttribute("data-fullcard"));

            isSelectingTrap = false;
            document.getElementById("battle-condition-banner").style.display = "none";
            clearHighlights();

            this.className = this.getAttribute("data-cssclass") + " my-board-slot used-this-turn";
            this.innerHTML = this.getAttribute("data-innerhtml");

            myActiveTrap = cardData;
            executeBattlePhase(true);
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

    let randomPlayer = playerDatabase[Math.floor(Math.random() * playerDatabase.length)];
    addNewCardToHand({
        name: randomPlayer.name,
        type: "Footballer",
        atk: randomPlayer.baseAtk,
        def: randomPlayer.baseDef,
        con: randomPlayer.baseCon,
        imgUrl: randomPlayer.imgUrl
    });

    alert("Изтеглихте Футболист (" + randomPlayer.name + ")! Тестето беше размесено! 🔄");
});

document.getElementById("btn-draw-trap").addEventListener("click", function () {
    document.getElementById("spell-search-modal").style.display = "none";

    let trapCards = [
        { name: "Tackle", type: "Trap", effect: "NegateAttack", desc: "Може да се активира дори без играч на терена. Спира вражеската атака и предпазва жизнените ти точки!", img: "/images/negate attack.png" },
        { name: "Offside", type: "Trap", effect: "-5 Точки", desc: "Активирай по време на атака. Намалява силата на вражеския Футболист с -5 Точки.", img: "/images/-5.png" },
        { name: "Owngoal", type: "Trap", effect: "Автогол", desc: "Изисква твой Футболист на терена. Обръща вражеската атака и противникът понася всички щети!", img: "/images/autogoal.png" }
    ];
    let randomTrap = trapCards[Math.floor(Math.random() * trapCards.length)];

    addNewCardToHand(randomTrap);
    alert("Изтеглихте Капан (" + randomTrap.name + ")! Тестето беше размесено! 🔄");
});


function showPreview(cardHTML, cardStyle, cardClasses) {
    const previewPanel = document.getElementById("card-preview-panel");
    if (!previewPanel) return;

    previewPanel.innerHTML = cardHTML;
    previewPanel.className = cardClasses;
    previewPanel.style.cssText = cardStyle;

    previewPanel.style.width = "100%";
    previewPanel.style.height = "100%";
    previewPanel.style.margin = "0";
    previewPanel.style.transform = "none";
    previewPanel.style.display = "block";

    const textElements = previewPanel.querySelectorAll('.card-description');
    textElements.forEach(el => {
        el.style.fontSize = "14px";
        el.style.lineHeight = "1.2";
        el.style.webkitLineClamp = "unset";
    });

    const titleElement = previewPanel.querySelector('.card-title');
    if (titleElement) titleElement.style.fontSize = "18px";

    const imageWrapper = previewPanel.querySelector('.card-image-wrapper');
    if (imageWrapper) {
        imageWrapper.style.height = "160px"; 
        imageWrapper.style.maxHeight = "none";
        imageWrapper.style.padding = "0";
    }

    const image = previewPanel.querySelector('img');
    if (image) {
        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover"; 
        image.style.aspectRatio = "unset";
        image.style.display = "block";
    }
}



function hidePreview() {
    const previewPanel = document.getElementById("card-preview-panel");
    if (previewPanel) previewPanel.style.display = "none";
}

// --- HAMBURGER MENU & LEAVE GAME LOGIC ---

document.getElementById("hamburger-btn").addEventListener("click", function () {
    let dropdown = document.getElementById("dropdown-content");
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
});

document.addEventListener("click", function (event) {
    let menu = document.getElementById("game-options-menu");
    let dropdown = document.getElementById("dropdown-content");
    if (!menu.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

document.getElementById("btn-leave-game").addEventListener("click", function () {
if (confirm("Сигурни ли сте, че искате да излезете от играта?")) {
    window.location.href = "/Index";
} else {
    document.getElementById("dropdown-content").style.display = "none";
}
});

reloadHandClickEvents();