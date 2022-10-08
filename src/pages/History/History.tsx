import React from 'react'
import { HistoryContainer, HistoryList } from './History.styles'

export const History: React.FC = () => {
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
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>há 2 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
