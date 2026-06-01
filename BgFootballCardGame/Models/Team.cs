namespace BgFootballCardGame.Models
{
    public class Team
    {
        public int Id { get; set; } 
        public string Name { get; set; } 
        public List<Card> Cards { get; set; } = new List<Card>();
    }
}