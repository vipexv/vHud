-- ox_lib solution.
-- lib.callback.register('vhud:init:plist', function(source)
--     return GetPlayers()
-- end)

-- Standalone
RegisterNetEvent("vhud:cb", function()
    TriggerClientEvent("vhud:client:cb", source, GetPlayers())
end)
