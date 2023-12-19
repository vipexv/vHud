RegisterCommand('hud', function()
  Script.visible = not Script.visible
  ToggleNuiFrame(HudVisiblity)
end, false)

RegisterCommand('hudsettings', function()
  SetNuiFocus(true, true)
  UIMessage("nui:state:settingsui", nil)
end)
