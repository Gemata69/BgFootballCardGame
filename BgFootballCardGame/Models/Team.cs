namespace BgFootballCardGame.Models
{
    public class Team
    {
        public int Id { get; set; } // Уникален номер в базата
        public string Name { get; set; } // Име на отбора (пр. "Лудогорец", "ЦСКА")

        // Един отбор има много карти (футболисти)
        public List<Card> Cards { get; set; } = new List<Card>();
    }
}