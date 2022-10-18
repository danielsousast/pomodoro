import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './contexts/CyclesContext'
import { Router } from './routes/Route'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesProvider>
    </ThemeProvider>
  )
}
