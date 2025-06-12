import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Class components
class ClassComponent extends React.Component {
  render() {
    return <h2>Class Component</h2>
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}



const Card = ({title}) => {
	
	const [liked, setLiked] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log(`${title} has been liked: ${liked}`);
	}, [liked]);

	// console.log(count);

  return (
    <div className='card' onClick={() => setCount((prevState) => prevState + 1)}>
      <h3>{title}</h3>

			<h4>{count}</h4>

			<button onClick={() => setLiked((prevState) => !prevState)}>
				{liked ? "Liked" : "Like"}
			</button>
    </div>
  )
}


const App1 = () => {

  return (
		<>
			<h2>Welcome to MovieBox</h2>
			<div className="card-container">
				<Card title="Star Wars" />
				<Card title="Avatar" />
				<Card title="The Lion King" />
			</div>
		</>
  )
}



// export default App
export default App1
