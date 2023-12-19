RegisterCommand('hud', function()
  HudVisiblity = not HudVisiblity
  ToggleNuiFrame(HudVisiblity)
end, false)

RegisterCommand('hudsettings', function()
  SetNuiFocus(true, true)
  UIMessage("nui:state:settingsui", nil)
end)
