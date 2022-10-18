import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { NewCycleFormData } from './CyclesContext.types'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId: string | null
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState('')
  const [amountsSecondsPassed, setAmountSecondsPassed] = useState(0)

  const finishCycle = useCallback(() => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
    setAmountSecondsPassed(0)
  }, [activeCycleId])

  const interromptCycle = () => {
    setActiveCycleId('')
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }

  const activeCycle = useMemo(() => {
    return cycles?.find((cycle) => cycle.id === activeCycleId)
  }, [activeCycleId, cycles])

  function createNewCycle(data: NewCycleFormData) {
    console.log('teste')
    const newCycleId = new Date().getTime().toString()
    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycleId)
    setAmountSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycleId,
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
