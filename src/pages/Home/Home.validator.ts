import * as zod from 'zod'

export const cycleMinTime = 1

export const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(cycleMinTime, 'O ciclo deve ser no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser no máximo 60 minutos'),
})
