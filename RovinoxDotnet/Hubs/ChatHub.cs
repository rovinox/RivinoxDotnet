
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Models;
using RovinoxDotnet.Service;

namespace RovinoxDotnet.Hubs
{
    //[Authorize]
       public class ChatHub(IDictionary<string, UserConnection> connections
       //, AuthenticatedUserService authenticatedUserService
        //UserManager<AppUser> userManager
        ) : Hub
    {
        private readonly string _botUser = "MyChat Bot";
        private readonly IDictionary<string, UserConnection> _connections = connections;
        // private readonly AuthenticatedUserService _authenticatedUserService = authenticatedUserService;
        //  private readonly UserManager<AppUser> _userManager = userManager;

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            var context = Context;
            // var userId = _authenticatedUserService.UserId;
                    // var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }

}