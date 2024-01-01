RegisterNetEvent("UIMessage", function(action, data)
  UIMessage(action, data)
end)

RegisterNetEvent("vhud:client:cb", function(data)
  local players = data.players
  local maxClients = data.maxClients
  UIMessage("nui:state:onlineplayers", #players)
  UIMessage("nui:state:maxclients", maxClients)
  Debug("[Script.GrabPlayerCount] Player count sent to the NUI: ", #players)
end)

TriggerEvent("chat:addSuggestions", {
  {
    name = "/hud",
    help = "Toggle the visibility of the HUD."
  },
  {
    name = "/hudsettings",
    help = "Open the HUD settings."
  }
})
