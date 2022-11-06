import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import { useCycles } from '../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './Countdown.styles'

export const Countdown: React.FC = () => {
  const {
    activeCycle,
    finishCycle,
    setAmountSecondsPassed,
    amountsSecondsPassed,
  } = useCycles()
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const totalInSeconds = useMemo(() => {
    return activeCycle ? activeCycle?.minutesAmount * 60 : 0
  }, [activeCycle])

  const currentSeconds = useMemo(() => {
    return activeCycle ? totalInSeconds - amountsSecondsPassed : 0
  }, [activeCycle, amountsSecondsPassed, totalInSeconds])

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (difference >= totalInSeconds) {
          finishCycle()
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, finishCycle, setAmountSecondsPassed, totalInSeconds])

  useEffect(() => {
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmounts = currentSeconds % 60
    const newMinutes = String(minutesAmount).padStart(2, '0')
    const newSeconds = String(secondsAmounts).padStart(2, '0')
    setMinutes(newMinutes)
    setSeconds(newSeconds)
    if (activeCycle) {
      document.title = `Pomodoro ${newMinutes}:${newSeconds}`
    }
  }, [activeCycle, amountsSecondsPassed, currentSeconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
