namespace BgFootballCardGame.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public CardType Type { get; set; } 

        public int? Attack { get; set; }
        public int? Defense { get; set; }
        public int? Control { get; set; }

        public int? TeamId { get; set; }
        public Team? Team { get; set; }

        public int? EffectValue { get; set; } 
        public string? Description { get; set; } 

        public string? ImageUrl { get; set; } 
    }
}