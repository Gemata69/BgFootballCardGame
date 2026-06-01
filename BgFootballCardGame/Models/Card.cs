namespace BgFootballCardGame.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; } // Име на футболиста или капана
        public CardType Type { get; set; } // Какъв вид е картата

        // Статистики за Футболисти (слагаме въпросителна "?", защото капаните нямат атака/защита)
        public int? Attack { get; set; }
        public int? Defense { get; set; }
        public int? Control { get; set; }

        // Връзка с отбора (само за футболисти)
        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        // Статистики за Капани и Спелове
        public int? EffectValue { get; set; } // Например: -5 (за намаляване на атака)
        public string? Description { get; set; } // Описание: "Намалява атаката на противника с 5"

        // Дизайн на картата
        public string? ImageUrl { get; set; } // Тук по-късно ще сложим пътя до картинката, която ти си нарисувал
    }
}