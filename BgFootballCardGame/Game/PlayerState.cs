using BgFootballCardGame.Models;
using System.Collections.Generic;

namespace BgFootballCardGame.Game
{
    public class PlayerState
    {
        public string Name { get; set; }

        public int LifePoints { get; set; } = 30;

        public List<Card> Deck { get; set; } = new List<Card>();

        public List<Card> Hand { get; set; } = new List<Card>();

        public Card[] FrontRow { get; set; } = new Card[5];

        public Card[] BackRow { get; set; } = new Card[5];

        public List<Card> Bench { get; set; } = new List<Card>();
    }
}