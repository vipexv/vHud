RegisterCommand('hud', function()
  Script.visible = not Script.visible
  ToggleNuiFrame(Script.visible)
end, false)

RegisterCommand('hudsettings', function()
  SetNuiFocus(true, true)
  UIMessage("nui:state:settingsui", nil)
end, false)
