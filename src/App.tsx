import styles from './App.module.css'
import { ChartControls } from './components/stock-chart'
import { ChartView } from './components/stock-chart/ChartView'
import { StockHeader } from './components/stock-header'
import { StockList } from './components/stock-list'
import yandex from '@/assets/yandex.png'
import { IStock } from './models/stock'
import { useState } from 'react'

const stocks: IStock[] = [
  {
    name: 'Газпром',
    shortName: 'GAZP',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/RU0007661625x640.png',
  },
  {
    name: 'Сбер',
    shortName: 'SBER',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/sber3x640.png',
  },
  {
    name: 'Лукойл',
    shortName: 'LKOH',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/RU0009024277x640.png',
  },
  {
    name: 'Сургутнефтегаз',
    shortName: 'SNGS',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/RU0008926258x640.png',
  },
  {
    name: 'Северсталь',
    shortName: 'CHMF',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/RU0009046510x640.png',
  },
  {
    name: 'Яндекс',
    shortName: 'YNDX',
    delta: 0.57,
    price: 2340,
    img: yandex,
  },
  {
    name: 'Норильский никель',
    shortName: 'GMKN',
    delta: 0.57,
    price: 2340,
    img: 'https://invest-brands.cdn-tinkoff.ru/nornikelx640.png',
  },
]

function App() {
  const [selected, setSelected] = useState<string>('YNDX')
  const [date, setDate] = useState(new Date('2022-12-12').getTime())

  const [type, setType] = useState<'chart' | 'candlestick'>('candlestick')

  return (
    <div className="justify-center bg-white container">
      <div className="gap-10 flex max-lg:flex-col max-lg:items-stretch max-lg:gap-5">
        <StockList stocks={stocks} onChange={(e) => setSelected(e)} />
        <div className="flex flex-col grow gap-3">
          <StockHeader stock={stocks.find((el) => el.shortName === selected)!} />
          <ChartControls
            changeType={(e) => setType(e)}
            date={date}
            changeInterval={(e) => setDate(e)}
          />
          <ChartView type={type} shortName={selected} minDate={date} />
        </div>

        <p>placeholder</p>
      </div>
    </div>
  )
}

export default App
