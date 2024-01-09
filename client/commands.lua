RegisterCommand('hud', function()
  Script.visible = not Script.visible
  ToggleNuiFrame(Script.visible)
end, false)

RegisterCommand('hudsettings', function()
  SetNuiFocus(true, true)
  UIMessage("nui:state:settingsui", nil)
end, false)

RegisterCommand("testMapPos", function()
  SetScriptGfxAlign(string.byte('L'), string.byte('B'))
  local minimapTopX, minimapTopY = GetScriptGfxPosition(-0.0045, 0.002 + (-0.188888))
  ResetScriptGfxAlign()

  local w, h = GetActiveScreenResolution()

  print(w * minimapTopX, h * minimapTopY)
  UIMessage("nui:state:minimapPos", {
    x = w * minimapTopX,
    y = h * minimapTopY
  })
end, false)
