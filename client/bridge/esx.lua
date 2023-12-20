local c = Config

if not (string.lower(c["Framework"]) == "esx") then
  return Debug("Prevented the `esx.lua` file from continuing.")
end

Script.framework.object = exports['es_extended']:getSharedObject()
local frameworkOptions = c["Framework Options"]

if not frameworkOptions["Status"] then return end

AddEventHandler('esx_status:onTick', function(data)
  local hunger, thirst
  for i = 1, #data do
    if data[i].name == 'thirst' then thirst = math.floor(data[i].percent) end
    if data[i].name == 'hunger' then hunger = math.floor(data[i].percent) end
  end

  local esxStatus = {
    hunger = hunger,
    thirst = thirst
  }
  UIMessage("nui:data:frameworkStatus", esxStatus)
end)
