import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/CyclesActions'
import { cyclesReduxer } from '../reducers/CyclesReducer'
import { Cycle } from '../types/CyclesTypes'
import { NewCycleFormData } from './CyclesContext.types'

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | null
  finishCycle: () => void
  createNewCycle: (params: NewCycleFormData) => void
  interromptCycle: () => void
  amountsSecondsPassed: number
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}

interface CyclesProviderProps {
  children: ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReduxer, {
    cycles: [],
    activeCycle: null,
  })
  const { activeCycle, cycles } = cyclesState
  const [amountsSecondsPassed, setAmountSecondsPassed] = useState(0)

  const finishCycle = useCallback(() => {
    dispatch(finishCycleAction())
    setAmountSecondsPassed(0)
  }, [])

  const interromptCycle = () => {
    dispatch(interruptCycleAction())
  }

  function createNewCycle(data: NewCycleFormData) {
    const newCycleId = new Date().getTime().toString()
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        finishCycle,
        createNewCycle,
        interromptCycle,
        amountsSecondsPassed,
        setAmountSecondsPassed,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

function useCycles(): CyclesContextData {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { CyclesProvider, useCycles }
