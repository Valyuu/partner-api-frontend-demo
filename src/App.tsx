import FlexContainer from './components/flex-container'
import { Test } from './components/test'

function App() {
  return (
    <FlexContainer variant="row-center" className="h-screen w-full">
      Main
      <Test />
    </FlexContainer>
  )
}
export default App
