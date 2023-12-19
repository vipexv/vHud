function ToggleNuiFrame(shouldShow)
  Debug("HudVisiblity variable:", shouldShow)
  UIMessage('setVisible', shouldShow)
  VHud.init()
  VHud.GrabPlayerCount()
end
