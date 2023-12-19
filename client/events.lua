RegisterNetEvent("UIMessage", function(action, data)
  UIMessage(action, data)
end)

RegisterNetEvent("vhud:client:cb", function(plist)
  UIMessage("nui:state:onlineplayers", #plist)
  Debug("[Script.GrabPlayerCount] Player count sent to the NUI: ", #plist)
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
