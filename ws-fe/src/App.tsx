import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [status, setStatus] = useState<string>('Connecting...')
  const [messeges, setMesseges] = useState<string[]>([])
console.log(messeges);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')    

    ws.onopen = () => {
      console.log('Connected to server')
      setStatus('Connected to server')
      setWs(ws)
    }

    ws.onmessage = (event) => {
      setMesseges((prevMesseges) => [...prevMesseges, event.data])
      console.log(messeges);
      
      console.log('Message from server:', event.data)
    }

    ws.onclose = () => {
      console.log('Disconnected from server')
      setStatus('Disconnected from server')
    }

    return () => {
      ws.close()
    }
  },[])

  return (
   <>
   <div>
    <h1>{status}</h1>
    <button onClick={() => {
      ws?.send('Hello! Message From Client!!')
    }}>send</button>

    {messeges.map((messege, index) => {
      return <div key={index}>{messege}</div>    
    })}
   </div>
   </>
  )
}

export default App
