import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [rgbResult, setRgbResult] = useState('rgb(153, 33, 255)')

  const hexToRgb = (hex) => {
    let cleanHex = hex.replace('#', '')
    let bigint = parseInt(cleanHex, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255
    return `rgb(${r}, ${g}, ${b})`
  }

  useEffect(() => {
    const validColor = (color.length === 7 && !error) ? color : '#9921ff'
    document.body.style.backgroundColor = validColor
  }, [color, error])

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

  return (
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

      {error ? (
        <span className="result error" id="result">
          Ошибка: неверный формат HEX
        </span>
      ) : (
        <span className="result" id="result">
          {rgbResult}
        </span>
      )}
    </label>
  )
}

export default App