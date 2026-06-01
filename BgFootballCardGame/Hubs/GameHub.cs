using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BgFootballCardGame.Hubs
{
    // Класът задължително наследява Hub от SignalR
    public class GameHub : Hub
    {
        // Този метод ще се вика от JavaScript, когато играч постави карта
        public async Task PlayCard(string player, int handIndex, int boardIndex, bool isFrontRow)
        {
            // Засега само изпращаме съобщението обратно до всички свързани браузъри (играчи)
            // По-късно тук ще свържем логиката с нашия GameEngine
            await Clients.All.SendAsync("ReceiveCardPlayed", player, handIndex, boardIndex, isFrontRow);
        }
    }
}