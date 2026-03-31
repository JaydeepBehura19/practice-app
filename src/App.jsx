import Header from './components/Header'
import TestComponent from './components/TestComponent'

function App() {
  // getting current year
  const year = new Date().getFullYear()

  return (
    <div>
      <Header />
      <h1>Hello World</h1>
      <p>Current year: {year}</p>

      <TestComponent />

      <p>Learning React step by step</p>
    </div>
  )
}

export default App