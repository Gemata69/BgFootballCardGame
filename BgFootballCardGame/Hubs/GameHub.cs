using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BgFootballCardGame.Hubs
{
    public class GameHub : Hub
    {
        public async Task PlayCard(string player, int handIndex, int boardIndex, bool isFrontRow)
        {
            await Clients.All.SendAsync("ReceiveCardPlayed", player, handIndex, boardIndex, isFrontRow);
        }
    }
}