using BgFootballCardGame.Models;
using System.Collections.Generic;

namespace BgFootballCardGame.Game
{
    public class PlayerState
    {
        public string Name { get; set; }

        // --- НОВО: Жизнени точки ---
        public int LifePoints { get; set; } = 30;

        // Тестето от 40 карти
        public List<Card> Deck { get; set; } = new List<Card>();

        // Картите, които играчът държи в ръката си в момента
        public List<Card> Hand { get; set; } = new List<Card>();

        // Преден ред: 5 места за Футболисти (използваме масив с фиксиран размер 5)
        public Card[] FrontRow { get; set; } = new Card[5];

        // Заден ред: 5 места за Капани / Спел карти (лице надолу)
        public Card[] BackRow { get; set; } = new Card[5];

        // Пейката (Гробището) – тук отиват победените футболисти и използваните капани
        public List<Card> Bench { get; set; } = new List<Card>();
    }
}