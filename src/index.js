import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const products = [
  { name: 'Adhesive Bandage', price: 120 },
  { name: 'Medicine', price: 850 },
  { name: 'Recov-R: 50mg', price: 800 },
  { name: 'Recov-R: 100mg', price: 1600 },
  { name: 'Takemedic', price: 3400 },
  { name: 'Moist Katsu Bun', price: 2000 },
  { name: 'Moon Dango', price: 800 },
  { name: 'Takemedic-All', price: 12900 },
  { name: 'Takemedic-All V', price: 3600 },
  { name: 'Takemedic-All Z', price: 8400 },
  { name: 'Healing IV', price: 1800 },
  { name: 'Rejuvenating IV', price: 3600 }
]

ReactDOM.render(<App products={products} />, document.getElementById('root'))
registerServiceWorker()
