import produce from 'immer'
import { Cycle } from '../types/CyclesTypes'

export const CycleActionTypes = {
  ADD: 'ADD_NEW_CYCLE',
  INTERRUPT: 'INTERREUPT_CYCLE',
  FINISH: 'FINISH_CYCLE',
}

interface CyclesState {
  cycles: Cycle[]
  activeCycle: Cycle | null
}

export function cyclesReduxer(state: CyclesState, action: any) {
  switch (action.type) {
    case CycleActionTypes.ADD: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycle = action.payload.newCycle
      })
    }
    case CycleActionTypes.INTERRUPT: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycle?.id,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycle = null
      })
    }
    case CycleActionTypes.FINISH: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycle?.id,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycle = null
      })
    }
    default:
      return state
  }
}
