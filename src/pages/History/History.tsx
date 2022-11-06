import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/esm/locale'
import React from 'react'
import { useCycles } from '../../contexts/CyclesContext'
import { Cycle } from '../../types/CyclesTypes'
import { HistoryContainer, HistoryList } from './History.styles'

export const History: React.FC = () => {
  const { cycles } = useCycles()

  const getStatus = (cycle: Cycle) => {
    if (cycle.finishedDate) return 'Concluído'
    if (cycle.interruptedDate) return 'Interrompido'

    return 'Em andamento'
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>{getStatus(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
