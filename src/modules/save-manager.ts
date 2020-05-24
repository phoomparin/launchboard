import {applySnapshot, getSnapshot} from 'mobx-state-tree'

import {board} from '../store'

const CONFIG_KEY = 'launchboard.config'

export function save() {
  const saveString = JSON.stringify(getSnapshot(board))
  localStorage.setItem(CONFIG_KEY, saveString)

  return saveString
}

export function load() {
  const saveString = localStorage.getItem(CONFIG_KEY)
  if (!saveString) return

  const snapshot = JSON.parse(saveString)
  applySnapshot(board, snapshot)

  board.slots.forEach(s => board.setupSlot(s.slot))
  board.sounds.forEach(s => board.addSound(s.name, s.src))
}