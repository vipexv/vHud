-- I don't know why i actually even decided to implement "rate limiting" this, but i don't want an exploiter to keep calling this event over and over, feel free to remove the unecessary logic.

-- RateLimit = {}

RegisterNetEvent("vhud:cb", function()
    if not source then
        return Debug("[vhud:cb] Source is null.")
    end

    -- if not RateLimit[tostring(source)] then
    --     RateLimit[tostring(source)] = {}
    -- end

    -- local lastCalled = RateLimit[tostring(source)].lastCalled
    -- local gameTimer = GetGameTimer()


    -- if lastCalled and gameTimer - lastCalled < 30000 then
    -- return Debug(("%s has hit the rate limit."):format(GetPlayerName(source)))
    -- end

    -- RateLimit[tostring(source)].lastCalled = gameTimer
    local maxClients = GetConvar("sv_maxclients", "N/A")

    local data = {
        players = GetPlayers(),
        maxClients = maxClients
    }

    TriggerClientEvent("vhud:client:cb", source, data)
    -- Debug("Rate Limit Table:", json.encode(RateLimit))
end)


if string.lower(Config["Framework"]) == "vrp" then
    local Tunnel = require("vrp/lib/Tunnel")
    local Proxy = require("vrp/lib/Proxy")
    vRP = Proxy.getInterface("vRP")
    vRPclient = Tunnel.getInterface("vRP", "vRP")

    RegisterNetEvent("hud:server:status", function()
        local source = source
        local user_id = vRP.getUserId({ source })

        TriggerClientEvent("hud:client:status:return", source,
            {
                thirst = vRP.getThirst({ user_id }),
                hunger = vRP.getHunger({ user_id }),
                money = vRP.getMoney({ user_id }),
                bank = vRP.getBankMoney({ user_id }),
                job = vRP.getUserGroupByType({ user_id, "job" })
            })
    end)
end
