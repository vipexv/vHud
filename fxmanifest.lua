fx_version "cerulean"
lua54 'yes'
game 'gta5'

author 'vipex [Discord: vipex.v]'
description 'Remake of the original v-hud.'

ui_page 'web/build/index.html'

shared_scripts {
	"shared/utils.lua",
	"config.lua"
}

client_scripts {
	"client/core.lua",
	"client/cl_utils.lua",
	"client/nui_callbacks.lua",
	"client/events.lua",
	"client/commands.lua",
}

server_scripts {
	"server/core.lua"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}
