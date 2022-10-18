import { HandPalm, Play } from 'phosphor-react'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cycleMinTime, newCycleFormSchema } from './Home.validator'
import {
  FormContainer,
  HomeContainer,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton,
} from './Home.styles'
import { Countdown } from './Countdown/Countdown'
import { NewCycleFormData } from '../../contexts/CyclesContext.types'
import { useCycles } from '../../contexts/CyclesContext'

export const Home: React.FC = () => {
  const { createNewCycle, interromptCycle, activeCycle } = useCycles()
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleCreateNewCycle = useCallback(
    (data: NewCycleFormData) => {
      createNewCycle(data)
      reset()
    },
    [createNewCycle, reset],
  )

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em:</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={cycleMinTime}
            min={cycleMinTime}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />
          <span>minutos</span>
        </FormContainer>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interromptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
