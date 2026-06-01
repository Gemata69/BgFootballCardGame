using BgFootballCardGame.Data;
using BgFootballCardGame.Game;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;

namespace BgFootballCardGame.Pages
{
    public class BoardModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        // Пазим състоянието на играта
        public GameEngine Game { get; set; }

        public BoardModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
            // Вземаме всички налични карти от базата данни
            var allCards = _context.Cards.ToList();

            // Стартираме нова игра (засега се стартира нова при всяко презареждане на страницата)
            Game = new GameEngine(allCards);
        }
    }
}