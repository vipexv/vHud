fx_version "cerulean"
lua54 'yes'
game 'gta5'

author 'vipex [Discord: vipex.v]'
description 'Remake of the original v-hud.'

ui_page 'web/build/index.html'
shared_script '@Lib/init.lua'
client_script "client/**/*"
shared_script "shared/utils.lua"
server_script "server/**/*"



files {
	'web/build/index.html',
	'web/build/**/*',
}
