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

        public GameEngine(List<Card> allAvailableCards)
        {
            Player1 = new PlayerState { Name = "Играч 1" };
            Player2 = new PlayerState { Name = "Играч 2" };

            Player1.Deck = Generate40CardDeck(allAvailableCards);
            Player2.Deck = Generate40CardDeck(allAvailableCards);

            StartGame();
        }

        private List<Card> Generate40CardDeck(List<Card> allCards)
        {
            var rng = new Random();
            var deck = new List<Card>();

            if (allCards == null || allCards.Count == 0) return deck;

            var footballers = allCards.Where(c => c.Type == CardType.Footballer).ToList();
            var traps = allCards.Where(c => c.Type == CardType.Trap).ToList();
            var spells = allCards.Where(c => c.Type == CardType.Spell).ToList();

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

            if (footballers.Any())
                for (int i = 0; i < 24; i++) deck.Add(CloneCard(footballers[rng.Next(footballers.Count)]));

            if (traps.Any())
                for (int i = 0; i < 8; i++) deck.Add(CloneCard(traps[rng.Next(traps.Count)]));

            if (spells.Any())
                for (int i = 0; i < 8; i++) deck.Add(CloneCard(spells[rng.Next(spells.Count)]));

            return deck.OrderBy(c => rng.Next()).ToList();
        }

        public void StartGame()
        {
            for (int i = 0; i < 5; i++)
            {
                DrawCard(Player1);
                DrawCard(Player2);
            }
        }

        public void NewRound()
        {
            CurrentRound++;
            DrawCard(Player1);
            DrawCard(Player2);
        }

        public void DrawCard(PlayerState player)
        {
            if (player.Deck.Count > 0)
            {
                var card = player.Deck[0]; 
                player.Deck.RemoveAt(0);   
                player.Hand.Add(card);    
            }
        }

        public bool PlaceCard(PlayerState player, int handCardIndex, int boardSlotIndex, bool isFrontRow)
        {
            if (handCardIndex < 0 || handCardIndex >= player.Hand.Count) return false;
            if (boardSlotIndex < 0 || boardSlotIndex >= 5) return false;

            var card = player.Hand[handCardIndex];

            if (isFrontRow)
            {
                if (card.Type == CardType.Footballer && player.FrontRow[boardSlotIndex] == null)
                {
                    player.FrontRow[boardSlotIndex] = card;
                    player.Hand.RemoveAt(handCardIndex); 
                    return true;
                }
            }
            else
            {
                if (card.Type != CardType.Footballer && player.BackRow[boardSlotIndex] == null)
                {
                    player.BackRow[boardSlotIndex] = card;
                    player.Hand.RemoveAt(handCardIndex); 
                    return true;
                }
            }

            return false; 
        }

        public string ResolveBattle(int slotIndex, string p1StatToUse, string p2StatToUse)
        {
            var p1Card = Player1.FrontRow[slotIndex];
            var p2Card = Player2.FrontRow[slotIndex];

            if (p1Card == null || p2Card == null)
            {
                return "Няма футболисти и от двете страни за битка на тази позиция!";
            }

            int p1Value = GetStatValue(p1Card, p1StatToUse);
            int p2Value = GetStatValue(p2Card, p2StatToUse);

            var p1Trap = Player1.BackRow[slotIndex];
            var p2Trap = Player2.BackRow[slotIndex];

            if (p2Trap != null && p2Trap.Type == CardType.Trap && p2Trap.EffectValue.HasValue)
            {
                if (p2Trap.EffectValue < 0) p1Value += p2Trap.EffectValue.Value;
                else p2Value += p2Trap.EffectValue.Value;

                Player2.Bench.Add(p2Trap);
                Player2.BackRow[slotIndex] = null;
            }

            if (p1Trap != null && p1Trap.Type == CardType.Trap && p1Trap.EffectValue.HasValue)
            {
                if (p1Trap.EffectValue < 0) p2Value += p1Trap.EffectValue.Value;
                else p1Value += p1Trap.EffectValue.Value;

                Player1.Bench.Add(p1Trap);
                Player1.BackRow[slotIndex] = null;
            }

            string resultMessage;

            if (p1Value > p2Value)
            {
                int damage = p1Value - p2Value; 
                Player2.LifePoints -= damage;   

                resultMessage = $"{Player1.Name} ПЕЧЕЛИ битката! {p1Card.Name} ({p1Value}) разби {p2Card.Name} ({p2Value}). {Player2.Name} губи {damage} жизнени точки!";
                Player2.Bench.Add(p2Card);
                Player2.FrontRow[slotIndex] = null;
            }
            else if (p2Value > p1Value)
            {
                int damage = p2Value - p1Value; 
                Player1.LifePoints -= damage;   

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