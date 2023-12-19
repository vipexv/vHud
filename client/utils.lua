function ToggleNuiFrame(shouldShow)
  Debug("HudVisiblity variable:", shouldShow)
  UIMessage('setVisible', shouldShow)
  Script.init()
  Script.GrabPlayerCount()
end
