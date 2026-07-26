import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [rgbResult, setRgbResult] = useState('rgb(153, 33, 255)')

  const hexToRgb = (hex) => {
    const cleanHex = hex.replace('#', '')
    const bigint = parseInt(cleanHex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgb(${r}, ${g}, ${b})`
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setColor(value)

    if (value.length === 7) {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/

      if (hexRegex.test(value)) {
        setError(false)
        setRgbResult(hexToRgb(value))
      } else {
        setError(true)
      }
    } else {
      setError(false)
    }
  }

  const backgroundColor = error 
    ? '#e94b35' 
    : (color.length === 7 ? color : '#9921ff')

  return (
    <div className="app-background" style={{ backgroundColor }}>
      <label className="container">
        <input 
          type="text" 
          className="input-field" 
          id="colorInput" 
          placeholder="Введите код цвета..." 
          value={color}
          onChange={handleInputChange}
          maxLength={7}
        />

        <span className={`result ${error ? 'error' : ''}`} id="result">
          {error ? 'Ошибка!' : rgbResult}
        </span>
      </label>
    </div>
  )
}

export default App