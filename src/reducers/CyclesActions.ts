import { Cycle } from '../types/CyclesTypes'
import { CycleActionTypes } from './CyclesReducer'

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleActionTypes.ADD,
    payload: {
      newCycle,
    },
  }
}

export function finishCycleAction() {
  return {
    type: CycleActionTypes.FINISH,
  }
}

export function interruptCycleAction() {
  return {
    type: CycleActionTypes.INTERRUPT,
  }
}
