import { ButtonGroup, ButtonGroupItem } from '../ButtonGroup'
import CandlestickIcon from '@/assets/candlestick.svg'
import ChartIcon from '@/assets/chart.svg'
import { FC } from 'react'

const dayTicks = 1000 * 60 * 60 * 24
const weekTicks = dayTicks * 7
const monthTicks = dayTicks * 30

interface ChartControlsProps {
  date: number
  changeInterval: (interval: number) => void
  changeType: (type: 'chart' | 'candlestick') => void
}

const formatter = new Intl.DateTimeFormat('ru')

export const ChartControls: FC<ChartControlsProps> = ({
  date,
  changeInterval,
  changeType,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <ButtonGroup defaultValue="day" onChange={(e) => console.log(e)}>
          <ButtonGroupItem value="day">день</ButtonGroupItem>
          <ButtonGroupItem value="week">нед.</ButtonGroupItem>
          <ButtonGroupItem value="month">мес.</ButtonGroupItem>
        </ButtonGroup>
        <div className="text-zinc-400 text-xl font-bold my-auto">
          {formatter.format(date)}
        </div>
        <button className="button" onClick={() => changeInterval(date - dayTicks)}>
          Н
        </button>
        <button className="button" onClick={() => changeInterval(date + dayTicks)}>
          В
        </button>
      </div>
      <ButtonGroup defaultValue="candlestick" onChange={(e) => changeType(e)}>
        <ButtonGroupItem value="chart">
          <ChartIcon />
        </ButtonGroupItem>
        <ButtonGroupItem value="candlestick">
          <CandlestickIcon />
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  )
}
