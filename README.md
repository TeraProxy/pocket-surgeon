##### :heavy_exclamation_mark: Status :heavy_exclamation_mark:
Should work on all regions as long as the opcodes are mapped but I personally only test modules on NA with Caali's tera-proxy: https://discord.gg/maqBmJV  

##### :heavy_exclamation_mark: Installation for Caali's tera-proxy :heavy_exclamation_mark:
1) Download pocket-surgeon: https://github.com/TeraProxy/pocket-surgeon/archive/master.zip
2) Extract the contents of the zip file into "\tera-proxy\bin\node_modules\"
3) Done! (the module will auto-update when a new version is released)

##### :heavy_exclamation_mark: Installation for PinkiePie's tera-proxy :heavy_exclamation_mark:
1) Update your tera-data: https://github.com/meishuu/tera-data
2) Download pocket-surgeon: https://github.com/TeraProxy/pocket-surgeon/archive/master.zip
3) Download tera-game-state: https://github.com/hackerman-caali/tera-game-state/archive/master.zip
4) Extract the contents of both zip files into "\tera-proxy\bin\node_modules\"
5) Done!
6) Check back here once in a while for updates (do NOT overwrite surgeries.json or you will lose your saved effects/voice!)

If you enjoy my work and wish to support future development, feel free to drop me a small donation: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=A3KBZUCSEQ5RJ&lc=US&item_name=TeraProxy&curency_code=USD&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)

# pocket-surgeon
A tera-proxy module able to change visual effects and voice of your character (client-side).  
Changes to your character are saved on your hard drive and reloaded on next login.  
This is a rewrite of my original Surgeon module without race and gender change emulation since changing those client side will lead to out-of-sync animations (it was a fun proof of concept though).

![Screenshot](https://i.imgur.com/TVy99nG.png)

## Usage  
While in game, open a proxy chat session by typing "/proxy" or "/8" in chat and hitting the space bar.  
This serves as the script's command interface.  
The following commands are supported:  

* surgeon height [x] - changes your height to x, default is 0, e.g. "surgeon height -3"
* surgeon chest [x] - changes your chest to x, default is 0, e.g. "surgeon chest -3"
* surgeon thighs [x] - changes your thighs to x, default is 0, e.g. "surgeon thighs -3"
* surgeon voice [0-5] - changes your voice pitch, e.g. "surgeon voice 1"
* surgeon reset - resets your changes, relog afterwards to get your original voice back
* surgeon [effect] - toggle an effect on and off, see below for valid effects

Any other input, starting with "cosplay", will return a summary of above commands in the chat.

## Effects
* murder - Murderous Intent (outfit turns black, red eyes)
* uncnoc - Uncommon (blue) Noctenium (blue lightning around your right hand)
* mwing - Murderous Intent + Darkan's Wings
* purify - Argon Purification Potion (orange aura around your right arm)
* hearts - Aroma of Sweet Pumpkin Pie (aura of hearts)
* overpower - Overpower (orange lightning around your right hand)
* sniperseye - Sniper's Eye (swirly aura around your left hand)
* tenacious - Aura of the Tenacious (green light on your right hand)
* merciless - Aura of the Merciless (blue light on your right hand)
* akeron - Akeron's Blessing (rotating aura around your right hand)
* wings - Dark World-Dragon's Energy (dark branch-like wing effect)
* darkswirl - Dark swirl-like aura around your character
* wind - Rotating wind aura with leaves around your character
* burning - Flame aura around your character
* healing - Healing aura around your character
* head - Big head
* confidence - Self-confidence (show underwear)
* reaping - Shadow Reaping (dark black-red aura)
* focus - Focus (lightning around your character)
* ragnarok - Ragnarok (character gets a vivid bright orange effect)
* kelfire - Kelsaik's fire debuff
* kelice - Kelsaik's ice debuff
* lachelith - Lachelith's curse debuff
* darkan - Darkan's Wings
* swirl - Your character gets a rotating orange-yellow aura
* marrow - Marrow Brooch

## Safety
Whatever you send to the proxy chat in game is intercepted client-side. The chat is NOT sent to the server.  
All changes are only present on your client. Nothing gets changed on the server.  

## Credits  
Thanks to Pentagon for some of the abnormality IDs -> https://github.com/codeagon

## Changelog
<details>

### 1.0.0
* [~] Initial Release

</details>