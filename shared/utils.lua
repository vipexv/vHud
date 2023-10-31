---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function UIMessage(action, data)
  SendNUIMessage({
    action = action,
    data = data
  })
end

---@class ZoneInfo
---@field blip table
---@field cancelDistance number
---@field cooldown integer
---@field drawText table
---@field hacking boolean
---@field interactButton integer
---@field interactDistance number
---@field label string
---@field marker table
---@field name string
---@field requireGun boolean
---@field requiredPolice integer
---@field rewardAmount table
---@field timeToRob integer
---@field vec3 vector3
---@field viewDistance number

-- function ShowHelpText(coords, text)
--   AddTextEntry('HelpText', text)
--   SetFloatingHelpTextWorldPosition(1, coords)
--   SetFloatingHelpTextStyle(1, 1, 2, -1, 3, 0)
--   BeginTextCommandDisplayHelp('HelpText')
--   EndTextCommandDisplayHelp(2, false, false, -1)
-- end

function ShowFloatingText(coords, msg)
  AddTextEntry('floatingTextNotification', msg)
  ---@diagnostic disable-next-line: missing-parameter
  SetFloatingHelpTextWorldPosition(1, coords)
  SetFloatingHelpTextStyle(1, 1, 2, -1, 3, 0)
  BeginTextCommandDisplayHelp('floatingTextNotification')
  EndTextCommandDisplayHelp(2, false, false, -1)
end

local currentResourceName = GetCurrentResourceName()

function AddBlip(coords, text, sprite, colour, scale, removeBlip)
  local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
  SetBlipSprite(blip, sprite)
  SetBlipColour(blip, colour)
  SetBlipDisplay(blip, 2)
  SetBlipAlpha(blip, 255)
  SetBlipScale(blip, scale)
  SetBlipAsShortRange(blip, false)
  PulseBlip(blip)
  BeginTextCommandSetBlipName("STRING")
  AddTextComponentString(text)
  EndTextCommandSetBlipName(blip)
  if removeBlip then
    SetTimeout(600 * 1000, function()
      RemoveBlip(blip)
      print(("(DEBUG) Blip removed after 600 seconds since the removeBlip boolean was set to true once the AddBlip function was called."))
    end)
  end
  return blip
end

local debugIsEnabled = true

function Debug(...)
  if not debugIsEnabled then return end
  local args <const> = { ... }

  local appendStr = ''
  for _, v in ipairs(args) do
    appendStr = appendStr .. ' ' .. tostring(v)
  end
  local msgTemplate = '^3[%s]^0%s'
  local finalMsg = msgTemplate:format(currentResourceName, appendStr)
  print(finalMsg)
end
