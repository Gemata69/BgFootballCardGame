using BgFootballCardGame.Models;
using System;
using System.Collections.Generic;

namespace BgFootballCardGame.Game
{
    public class GameEngine
    {
        public PlayerState Player1 { get; set; }
        public PlayerState Player2 { get; set; }
        public int CurrentRound { get; set; } = 1;

        // Конструктор: Когато играта започне, тя изисква всички карти от базата, за да направи тестета
        public GameEngine(List<Card> allAvailableCards)
        {
            Player1 = new PlayerState { Name = "Играч 1" };
            Player2 = new PlayerState { Name = "Играч 2" };

            // Генерираме 40 карти за всяко тесте от наличните карти в базата данни
            Player1.Deck = Generate40CardDeck(allAvailableCards);
            Player2.Deck = Generate40CardDeck(allAvailableCards);

            // Начало на играта: Всеки автоматично тегли по 5 карти
            StartGame();
        }

        // Логика за създаване на тесте от 40 карти
        // Логика за създаване на тесте от точно 40 карти (24 футболисти, 8 капана, 8 спела)
        private List<Card> Generate40CardDeck(List<Card> allCards)
        {
            var rng = new Random();
            var deck = new List<Card>();

            if (allCards == null || allCards.Count == 0) return deck;

            // Разделяме картите по видове
            var footballers = allCards.Where(c => c.Type == CardType.Footballer).ToList();
            var traps = allCards.Where(c => c.Type == CardType.Trap).ToList();
            var spells = allCards.Where(c => c.Type == CardType.Spell).ToList();

            // Помощна функция за дълбоко копиране на карта
            Card CloneCard(Card original) => new Card
            {
                Id = original.Id,
                Name = original.Name,
                Type = original.Type,
                Attack = original.Attack,
                Defense = original.Defense,
                Control = original.Control,
                EffectValue = original.EffectValue,
                Description = original.Description
            };

            // Добавяме точно 24 футболисти (ако са малко в базата, се дублират случайно)
            if (footballers.Any())
                for (int i = 0; i < 24; i++) deck.Add(CloneCard(footballers[rng.Next(footballers.Count)]));

            // Добавяме точно 8 капана
            if (traps.Any())
                for (int i = 0; i < 8; i++) deck.Add(CloneCard(traps[rng.Next(traps.Count)]));

            // Добавяме точно 8 спела
            if (spells.Any())
                for (int i = 0; i < 8; i++) deck.Add(CloneCard(spells[rng.Next(spells.Count)]));

            // Накрая задължително РАЗБЪРКВАМЕ тестето, за да не се теглят първо само футболисти
            return deck.OrderBy(c => rng.Next()).ToList();
        }

        // Първоначално теглене на 5 карти
        public void StartGame()
        {
            for (int i = 0; i < 5; i++)
            {
                DrawCard(Player1);
                DrawCard(Player2);
            }
        }

        // Стартиране на нов рунд - увеличава рунда и всеки тегли по 1 карта
        public void NewRound()
        {
            CurrentRound++;
            DrawCard(Player1);
            DrawCard(Player2);
        }

        // Логика за теглене на единична карта от тестето в ръката
        public void DrawCard(PlayerState player)
        {
            if (player.Deck.Count > 0)
            {
                var card = player.Deck[0]; // Вземаме най-горната карта
                player.Deck.RemoveAt(0);   // Премахваме я от тестето
                player.Hand.Add(card);     // Слагаме я в ръката
            }
        }

        // Логика за ПОСТАВЯНЕ на карта от ръката върху полето
        public bool PlaceCard(PlayerState player, int handCardIndex, int boardSlotIndex, bool isFrontRow)
        {
            // Проверки за сигурност - дали индексът на картата и слота са валидни
            if (handCardIndex < 0 || handCardIndex >= player.Hand.Count) return false;
            if (boardSlotIndex < 0 || boardSlotIndex >= 5) return false;

            var card = player.Hand[handCardIndex];

            if (isFrontRow)
            {
                // На предния ред (0-4) се слагат САМО футболисти и мястото трябва да е празно (null)
                if (card.Type == CardType.Footballer && player.FrontRow[boardSlotIndex] == null)
                {
                    player.FrontRow[boardSlotIndex] = card;
                    player.Hand.RemoveAt(handCardIndex); // Махаме я от ръката
                    return true;
                }
            }
            else
            {
                // На задния ред се слагат Капани или Спелове и мястото също трябва да е празно
                if (card.Type != CardType.Footballer && player.BackRow[boardSlotIndex] == null)
                {
                    player.BackRow[boardSlotIndex] = card;
                    player.Hand.RemoveAt(handCardIndex); // Махаме я от ръката
                    return true;
                }
            }

            return false; // Ако условията не са спазени, ходът е невалиден
        }

        // Логика за провеждане на битка между два слота
        // Подаваме коя статистика търсим за играч 1 и коя за играч 2 (напр. "Attack" срещу "Defense")
        public string ResolveBattle(int slotIndex, string p1StatToUse, string p2StatToUse)
        {
            var p1Card = Player1.FrontRow[slotIndex];
            var p2Card = Player2.FrontRow[slotIndex];

            // Проверяваме дали и двамата имат футболисти на този слот
            if (p1Card == null || p2Card == null)
            {
                return "Няма футболисти и от двете страни за битка на тази позиция!";
            }

            // 1. Вземаме базовите точки, които ще сравняваме
            int p1Value = GetStatValue(p1Card, p1StatToUse);
            int p2Value = GetStatValue(p2Card, p2StatToUse);

            // 2. Проверяваме за КАПАНИ на същия слот (на втория ред)
            var p1Trap = Player1.BackRow[slotIndex];
            var p2Trap = Player2.BackRow[slotIndex];

            // Ако Играч 2 има капан, го активираме
            if (p2Trap != null && p2Trap.Type == CardType.Trap && p2Trap.EffectValue.HasValue)
            {
                // Ако капанът е отрицателен (-5), той удря противника (Играч 1). Ако е положителен, помага на своя играч (Играч 2)
                if (p2Trap.EffectValue < 0) p1Value += p2Trap.EffectValue.Value;
                else p2Value += p2Trap.EffectValue.Value;

                // Капанът е използван - пращаме го на пейката и изчистваме мястото
                Player2.Bench.Add(p2Trap);
                Player2.BackRow[slotIndex] = null;
            }

            // Ако Играч 1 има капан, го активираме по същата логика
            if (p1Trap != null && p1Trap.Type == CardType.Trap && p1Trap.EffectValue.HasValue)
            {
                if (p1Trap.EffectValue < 0) p2Value += p1Trap.EffectValue.Value;
                else p1Value += p1Trap.EffectValue.Value;

                Player1.Bench.Add(p1Trap);
                Player1.BackRow[slotIndex] = null;
            }

            // 3. СРАВНЯВАНЕ НА РЕЗУЛТАТА, ЩЕТИ И ПРАЩАНЕ НА ПЕЙКАТА
            string resultMessage;

            if (p1Value > p2Value)
            {
                int damage = p1Value - p2Value; // Изчисляваме разликата
                Player2.LifePoints -= damage;   // Вадим я от жизнените точки на губещия

                resultMessage = $"{Player1.Name} ПЕЧЕЛИ битката! {p1Card.Name} ({p1Value}) разби {p2Card.Name} ({p2Value}). {Player2.Name} губи {damage} жизнени точки!";
                Player2.Bench.Add(p2Card);
                Player2.FrontRow[slotIndex] = null; // Губещият изчезва от терена
            }
            else if (p2Value > p1Value)
            {
                int damage = p2Value - p1Value; // Изчисляваме разликата
                Player1.LifePoints -= damage;   // Вадим я от жизнените точки на губещия

                resultMessage = $"{Player2.Name} ПЕЧЕЛИ битката! {p2Card.Name} ({p2Value}) разби {p1Card.Name} ({p1Value}). {Player1.Name} губи {damage} жизнени точки!";
                Player1.Bench.Add(p1Card);
                Player1.FrontRow[slotIndex] = null;
            }
            else
            {
                resultMessage = $"РАВЕНСТВО! И двамата футболисти остават на терена. ({p1Value} на {p2Value}). Никой не губи точки.";
            }

            return resultMessage;
        }

        // Помощен метод, който чете правилната статистика (Атака, Защита или Контрол)
        private int GetStatValue(Card card, string statName)
        {
            return statName.ToLower() switch
            {
                "attack" => card.Attack ?? 0,
                "defense" => card.Defense ?? 0,
                "control" => card.Control ?? 0,
                _ => 0
            };
        }
    }
}