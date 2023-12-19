-- I don't know why i actually even decided to implement "rate limiting" this, but i don't want an exploiter to keep calling this event over and over, feel free to remove the unecessary logic.

RateLimit = {}

RegisterNetEvent("vhud:cb", function()
    if not source then
        return Debug("[vhud:cb] Source is null.")
    end

    if not RateLimit[tostring(source)] then
        RateLimit[tostring(source)] = {}
    end

    local lastCalled = RateLimit[tostring(source)].lastCalled
    local gameTimer = GetGameTimer()


    if lastCalled and gameTimer - lastCalled < 30000 then
        return Debug(("%s has hit the rate limit."):format(GetPlayerName(source)))
    end

    if lastCalled then
        Debug("Time left:", gameTimer - lastCalled)
    end

    RateLimit[tostring(source)].lastCalled = gameTimer
    TriggerClientEvent("vhud:client:cb", source, GetPlayers())
    Debug("Rate Limit Table:", json.encode(RateLimit))
end)
