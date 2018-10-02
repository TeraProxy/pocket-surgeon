// Version 1.0.2

'use strict'

const path = require('path'),
	fs = require('fs'),
	id = require('./id')

module.exports = function pocketsurgeon(mod) {

	let fakeAbnormalities = {},
		voice = -1

	// ################### //
	// ### Save & Load ### //
	// ################### //

	let presets = {}, 
		presetTimeout = null,
		presetLock = false

	try { presets = require('./surgeries') }
	catch(e) { 
		presets = {} 
		presetSave()
	}

	function presetUpdate() {
		if(!presets[mod.game.me.name]) presets[mod.game.me.name] = {}
		if(fakeAbnormalities) presets[mod.game.me.name].abnormalities = fakeAbnormalities
		presets[mod.game.me.name].voice = voice

		clearTimeout(presetTimeout)
		presetTimeout = setTimeout(presetSave, 1000)
	}

	function presetSave() {
		if(presetLock) {
			presetUpdate()
			return
		}
		presetLock = true
		fs.writeFile(path.join(__dirname, 'surgeries.json'), JSON.stringify(presets, null, 4), err => {
			presetLock = false
		})
	}

	// ############# //
	// ### Hooks ### //
	// ############# //

	mod.game.on('enter_game', () => {
		if(presets[mod.game.me.name]) {
			mod.hookOnce('S_ABNORMALITY_BEGIN', 'raw', () => {
				fakeAbnormalities = presets[mod.game.me.name].abnormalities

				restoreEffect()

				if(presets[mod.game.me.name].voice > -1) {
					voice = presets[mod.game.me.name].voice
					voiceChange(voice)
				}
			})
		}
	})

	// ################# //
	// ### Functions ### //
	// ################# //

	function voiceChange(pitch) {
		if(pitch < 0) voice = 0
		else if(mod.game.me.gender == 'male' && pitch > 5) voice = 5
		else if(mod.game.me.gender == 'female' && pitch > 4) voice = 4 // females have 1 voice less
		else voice = pitch

		mod.toClient('S_CHANGE_VOICE_USE_QAC', 1, {
			voice: voice
		})
	}

	function resetMe() {
		Object.keys(fakeAbnormalities).forEach(abnormality => {
			removeAppearanceChange(abnormality, fakeAbnormalities[abnormality])
		})
		voice = -1
	}

	function restoreEffect() {
		Object.keys(fakeAbnormalities).forEach(abnormality => {
			applyAppearanceChange(abnormality, fakeAbnormalities[abnormality])
		})
	}

	function applyAppearanceChange(id, stacks) {
		fakeAbnormalities[id] = stacks

		mod.toClient('S_ABNORMALITY_BEGIN', 3, {
			target: mod.game.me.gameId,
			source: mod.game.me.gameId,
			id: id,
			duration: 864000000,
			unk: 0,
			stacks: stacks,
			unk2: 0,
			unk3: 0
		})
	}

	function removeAppearanceChange(id, stacks) {
		delete fakeAbnormalities[id]

		mod.toClient('S_ABNORMALITY_END', 1, {
			target: mod.game.me.gameId,
			id: id
		})
	}

	// ################ //
	// ### Commands ### //
	// ################ //

	mod.command.add('surgeon', (cmd, value) => {
		switch (cmd) {
			case 'head':
			case 'murder':
			case 'uncnoc':
			case 'mwing':
			case 'purify':
			case 'hearts':
			case 'overpower':
			case 'sniperseye':
			case 'tenacious':
			case 'merciless':
			case 'akeron':
			case 'wings':
			case 'darkswirl':
			case 'wind':
			case 'burning':
			case 'healing':
			case 'confidence':
			case 'reaping':
			case 'focus':
			case 'ragnarok':
			case 'kelfire':
			case 'kelice':
			case 'lachelith':
			case 'darkan':
			case 'swirl':
			case 'marrow':
				if(fakeAbnormalities.hasOwnProperty(id[cmd])) removeAppearanceChange(id[cmd], 1)
				else applyAppearanceChange(id[cmd], 1)
				presetUpdate()
				break
			case 'height':
			case 'chest':
			case 'thighs':
				if(value) {
					if(Number(value) === 0) removeAppearanceChange(id[cmd], 4)
					else applyAppearanceChange(id[cmd], Number(value) + 4)
					presetUpdate()
				}
				else mod.command.message('Please enter a value, e.g. "surgeon ' + cmd + ' -3"')
				break
			case 'voice':
				if(value) {
					voiceChange(Number(value))
					presetUpdate()
				}
				else mod.command.message('Please enter a value, e.g. "surgeon voice 1"')
				break
			case 'reset':
				resetMe()
				presetUpdate()
				break
			default:
				mod.command.message('Commands:\n'
								+ ' "surgeon height [x]" (changes your height to x, default is 0, e.g. "surgeon height -3"),\n'
								+ ' "surgeon chest [x]" (changes your chest to x, default is 0, e.g. "surgeon chest -3"),\n'
								+ ' "surgeon thighs [x]" (changes your thighs to x, default is 0, e.g. "surgeon thighs -3"),\n'
								+ ' "surgeon voice [0-5]" (changes your voice pitch, e.g. "surgeon voice 1"),\n'
								+ ' "surgeon reset" (resets your changes, relog afterwards to get your original voice back),\n'
								+ ' "surgeon [effect]" (toggle an effect on and off, check readme for effects)'
				)
				break
		}
	})
}