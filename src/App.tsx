import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesContextProvider } from './contexts/CyclesContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

// * É muito importante que o GlobalStyle esteja dentro do ThemeProvider
// * O BrowserRouter precisa estar em volta do Router
export function App() {
  return (
    // * Theme Provider é um contexto que passa o defaultTheme para todos os componentes
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
