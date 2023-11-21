-- No server sided logic so far, the only server sided logic is already setup in the v-admin folder for optimization.
-- lib.callback.register("vhud:sv", function(source)
--     local players = GetPlayers()
--     return #players
-- end)


-- For optimization reasons we are making it so it updates every 90 seconds for all players, since having them trigger the callback can lead to too much load on the server with a huge amount of requests.
CreateThread(function()
    while true do
        local players = GetPlayers()
        TriggerClientEvent("vhud:cl:update", -1, players)
        Wait(10 * 1000)
    end
end)


lib.callback.register('vhud:init:plist', function(source)
    return GetPlayers()
end)
