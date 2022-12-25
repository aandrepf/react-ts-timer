// * ARQUIVO SOMENTE PARA DEFINICAO DE TIPOS
import 'styled-components'
import { defaultTheme } from '../styles/theme/default'

type ThemeType = typeof defaultTheme

// * SOBRESCRIPTA DE TIPOS
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
