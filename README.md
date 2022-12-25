## Timer App

Projeto de um aplicativo usando React com Typescript.

## Resources

- React with Vite (lastest version) using node 18.9.0
- [Styles Components](https://www.npmjs.com/package//styled-components)

## Start Project

Create a new project

```bash
npm create vite@latest
```

## Styled Components

É uma ferramenta de estilização usando um conceito de CSS escrevendo no formato de sintaxe Javascript
Como ela é flagada com `DT` temos que instalar as typagens da lib separadamente (@types)

```bash
npm i -D @types/styled-components
```

```typescript
import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

// * props é o que foi passado no atributo do componente que usa ButtonContainer
export const ButtonContainer = styles.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    ${(props) =>
      css`
        background-color: ${buttonVariants[props.variant]};
      `}
`;

/**
interface ButtonProps {
    variant?: ButtonVariant;
}

export function Button({variant = 'primary'}: ButtonProps) {
    return <ButtonContainer variant={props.variant}>Enviar</ButtonContainer>
}
*/
```

## Configurando Temas

Com o Styled Components, nós conseguimos criar temas para estilizar nossa aplicação de formas diferentes de acordo com o tema escolhido e, são controlados por Typescript/Javascript.

```jsx
// Com o ThemeProvider definimos um tema escolhido e a partir dele pegamos as estilizações
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
    </ThemeProvider>
  );
}

/*export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  // AQUI O TEMA PEGA A VARIANT DEFINIDA NO COMPONENT E PASSA PARA O THEME DEFINIDDO
  // NO ThemeProvider e retorna a cor 
  background-color: ${(props) => props.theme[props.variant]};
  color: ${(props) => props.theme.white};
`;*/
```

## Tipagem de Temas

Para trazer uma melhor integração com o TypeScript, podemos sobrescrever a tipagem padrão de tema do Styled Components, utilizando o `defaultTheme` que foi criado anteriormente.

Criamos uma pasta **@types** com um arquivo _styles.d.ts_ onde esse `d` significa que o arquivo é somente para definição de tipos do typescript.

```typescript
// * ARQUIVO SOMENTE PARA DEFINICAO DE TIPOS
import "styled-components";
import { defaultTheme } from "../styles/theme/default";

type ThemeType = typeof defaultTheme;

// * SOBRESCRIPTA DE TIPOS
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
```

## Estilos Globais

Podemos usar styled-components para criar estilos globais da aplicação. Para isso usamos uma função **createGlobalStyle**, onde dentro dela colocamos todas os estilos gerais da aplicação, isso dentro de um arquivo js/ts.

```typescript
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    AQUI DENTRO IRÁ TODO ESTILO GLOBAL DA APLICAÇÃO
    Podemos usar as props.theme para buscar os estilos definidos dentro de defaultTheme definido como tema padrão da aplicação.
    ex.: 
    body {
        background: ${(props) => props.theme["gray-900"]};
        color: ${(props) => props.theme["gray-300"]};
    }
`;
```

Com esses estilos globais construidos, devemos importar `GlobalStyle` como um componente e inserir dentro de `ThemeProvider`

```javascript
// Aqui vemos GlobalStyle importado dentro de ThemeProvider
// para que os seus estilos sejam aplicados
<ThemeProvider theme={defaultTheme}>
  <Button variant="primary" />
  <Button variant="secondary" />
  <Button variant="danger" />
  <Button variant="success" />
  <Button />

  <GlobalStyle />
</ThemeProvider>
```

## ESLint

Vem da palavra Ecmascript Linting , significa que o código segue os padrões estipulados pelos criadores do projeto.

O ESLint possui uma enorme lista de rules (regras) que você pode configurar, e todas estão disponíveis através desse link da documentação oficial: [ESLint Rules](https://eslint.org/docs/rules/)

Nesse projeto, vamos utilizar o plugin de padrões que é utilizado na Rocketseat, sem a necessidade de fazer uma série de configurações manuais.

Caso queira ver as configurações utilizadas nesse plugin, você pode acessar o repositório oficial com o código dessas configurações para o React: [Rocketseat ESLint Config](https://github.com/Rocketseat/eslint-config-rocketseat/blob/main/react.js)

Usamos um comando para verificar o funcionamento do Eslint

```bash
npx eslint src --ext .tsx,.ts
```

Usamos os comandos para fixar todos de uma vez

```bash
npx eslint src --ext .tsx,.ts --fix
```

## Layout de Rotas

Criamos uma pasta *layouts* onde contem um componente `DefaultLayout` que conté a estrutura que se repete na aplicação e um componente do react router DOM chamado **Outlet** e com ele ele sabe onde o conteudo das paginas deve ser exatamente posicionado.

Para aplicar esse DefaultLayout precisamos envolver as Routes com outro `Route` definindo um path para `/` e o element com *DefaultLayout* no arquivo de Router.

## Controlled vs Uncontrolled Forms

Quando se trabalha com forms, podemos tratar de 2 formas, a *controlled* e a *uncontrolled*

Controlled, mantemos em tempo real a info do input no estado. Os benefícios, conseguimos ter acesso ao valor e refletir alterações baseados no valor. As devantagens, é que o React precisa recalcular todo componente a cada alteração do estado. Muito usado para formulários simples(login, cadastro ou forms com poucos campos).

Uncontrolled, busca a info do input somente quando precisar dela. As vantagens estam alinhadas com ganho de performance, visto que, não buscamos em tempo real a info, mas isso gera desvantegem no controle das alterações visuais. Usado para forms muito complexos (como dashboards)

## React Hook Form

é uma lib do react que consegue usar o controlled e uncontrolled da melhor forma. Usamos ela em conjunto com a **zod**, para fazer validação de formularios e para que isso funcione instalamos a outra lib **@hookform/resolvers** que engloba varias funcionalidades da lib zod e muitas outras.

```typescript
// CRIA NOSSOS SCHEMAS COM AS VALIDAÇOES DO FORM
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos!')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos!'),
})

// typeof para referenciar uma vairavel JS no TS
// zod.infer cria uma tipagem pelo schema na variavel anterior
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// useForm é como se tivessemos criando um novo form na aplicação
// e register indica quais campos terão esse form e retorna alguns métodos de input que usamos no JS para manipulação dos campos
const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0,
  },
})

// A funcao watch ela observa o campo definido no parametro (CONTROLLED FORM)
const task = watch('task')

// e usamos o {...} (spread operator) para indicar no input que estamos tendo acesso a esses métodos
<TaskInput
  type="text"
  id="task"
  list="task-suggestions"
  placeholder="De um nome para seu projeto"
  {...register('task')}
/>
```

## o hook useEffect

É um hook (adicionam funcionamentos ao componente). Sempre iniciam com a palavra *use*

O useState, onde armazena variaveis que quando tem o valor alterado, ele renderiza o componente novamente com o novo valor.

O useEffect, vem de side effect (efeito colateral), onde ela atua após uma ação anterior.Permite vizualizar mudanças na variavel e executa uma função. Com ele a vantagem que temos é que podemos indicar quais variaveis monitorar.

Ele executa no inicio que o componente renderizar pela primeira vez.

Um outro detalhe é que, se quisermos chamar apenas uma vez algo, criamos um useEffect com o array de dependencias **vazio**. Por exemplo, podemos usar um fetch para fazer uma chamada para uma API.

*Sempre que possível, não usar o useEffect para atualizar um novo state*

O useEffect pode retornar uma function com uma responsabilidade quando o useEffect executou novamente e precisamos resetar algo do effect anterior.

## Prop Drilling no React

Prop Drilling acontece quando temos muitas propriedades apenas para comunicação entre componentes e isso é um problema quando temos mais de 2 propriedades por componente.

Para resolver isso temos o conceito de `Context API` o qual permite compartilhamento de informações entre varios componentes ao mesmo tempo. Não precisa de propriedades, pois são informações globais que todos os componentes tem acesso e assim todos eles podem ser atualizados.

## Contexto No React

Os dados precisam estar no componente mais externo aos subcomponentes que precisam daquela informação.

```tsx
// CRIAMOS O CONTEXTO
const CyclesContext = createContext({} as any)

// NO COMPONENTE MAIS EXTERNO
const [activeCycle, setActiveCycle] = useState(0)

<CycleContext.Provider value={{ activeCycle, setActiveCycle }}>
  // SUBCOMPONENTES QUE PRECISAM DAS INFOS
</CycleContext.Provider>
```
Devemos tomar muito cuidado com envio de funções ou propriedades de libs externas para os contextos, pois se mudar a lib, vai quebrar o código

## Contexto entre Rotas

O Contexto deve estar por volta de todas as nossas Rotas definidas em App

```jsx
// * Contexto criado em uma pasta contexts
<CyclesContextProvider>
  <Router />
</CyclesContextProvider>
```

## Reducer de Ciclos

Usamos o hook **useReducer** para armazenar infos mais complexas principalmente quando precisamos alterar elas.

É muito comum no React quando usamos `dispatch`, ao inves de enviar a info crua, enviamos um objeto com as propriedades **type** que indica qual ação queremos usar e um **payload** que é um objeto com os dados da info

```jsx
// state = valor do estado em tempo real
  // action = qual ação está que está querendo realizar para alterar o estado
  // dispatch = dispara uma função para ativar a action
  // Dessa forma poderemos ter varios estados que não necessariamente pertencem ao mesmo assunto
  const [cyclesState, dispatch] = useReducer(
  (state: CyclesState, action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      default:
        return state
    }
  },
  {
    cycles: [],
    activeCycleId: null,
  },
)
```

```jsx
dispatch({
  type: 'ADD_NEW_CYCLE',
  payload: {
    data: newCycle,
  },
})
```
## Immer

Uma lib para trabalhar com dados imutaveis.