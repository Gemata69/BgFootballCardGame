using BgFootballCardGame.Models;

namespace BgFootballCardGame.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Проверява дали вече има отбори. Ако има, спира дотук (вече е пълна).
            if (context.Teams.Any())
            {
                return;
            }

            // 1. Създаваме отборите (Сложил съм 4 за пример, ти ще добавиш останалите до 16)
            var teams = new Team[]
            {
                new Team { Name = "Лудогорец" },
                new Team { Name = "ЦСКА-София" },
                new Team { Name = "Черно море" },
                new Team { Name = "Левски" }
            };

            context.Teams.AddRange(teams);
            context.SaveChanges(); // Запазваме отборите, за да получат ID-та

            // 2. Създаваме картите (Футболисти, Капани, Спелове)
            var cards = new Card[]
            {
                // -- Футболисти --
                new Card { Name = "Играч 1 (Лудогорец)", Type = CardType.Footballer, Attack = 85, Defense = 50, Control = 80, TeamId = teams[0].Id },
                new Card { Name = "Играч 2 (ЦСКА)", Type = CardType.Footballer, Attack = 81, Defense = 75, Control = 70, TeamId = teams[1].Id },
                
                // -- Капани (За задния ред, без TeamId, защото могат да се ползват от всички) --
                new Card { Name = "Спъване", Type = CardType.Trap, EffectValue = -5, Description = "Намалява атаката на противника с 5." },
                new Card { Name = "Здрава защита", Type = CardType.Trap, EffectValue = 5, Description = "Увеличава защитата на твоя играч с 5." },

                // -- Спелове --
                new Card { Name = "Треньорски съвет", Type = CardType.Spell, EffectValue = 1, Description = "Изтегли 1 допълнителна карта от тестето." }
            };

            context.Cards.AddRange(cards);
            context.SaveChanges(); // Запазваме картите
        }
    }
}