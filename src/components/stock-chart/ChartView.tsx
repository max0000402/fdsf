import { fetcher, formatDate } from '@/utils/misc'
import { ApexOptions } from 'apexcharts'
import { FC, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import useSWR from 'swr'

interface ChartViewProps {
  minDate: number
  shortName: string
  type: 'chart' | 'candlestick'
}

export const ChartView: FC<ChartViewProps> = ({ shortName, minDate, type }) => {
  const { data } = useSWR(
    `/api/v1/${shortName.toLocaleLowerCase()}?date=${formatDate(
      minDate,
    )}&till_date=${formatDate(minDate + 1000 * 60 * 60 * 24)}`,
    fetcher,
    {
      refreshInterval: 0,
    },
  )

  const series = useMemo<
    {
      name: string
      data: Array<[number, number]>
    }[]
  >(() => {
    if (!data) return [{ name: 'Series 1', data: [] }]
    return [
      {
        name: 'Series 1',
        data: data.map((el) => [
          new Date(`${el.tradedate} ${el.tradetime}`).getTime(),
          [el.pr_open, el.pr_close, el.pr_high, el.pr_low],
        ]),
      },
    ]
  }, [data])

  const lineSeries = useMemo<
    {
      name: string
      data: Array<{
        x: number
        y: number
      }>
    }[]
  >(() => {
    if (!data) return [{ name: 'Series 1', data: [] }]
    return [
      {
        name: 'Series 1',
        data: data.map((el) => ({
          x: new Date(`${el.tradedate} ${el.tradetime}`).getTime(),
          y: [el.pr_open, el.pr_close, el.pr_high, el.pr_low],
        })),
      },
    ]
  }, [data])

  const options = useMemo(() => {
    if (type === 'candlestick') {
      return {
        chart: {
          id: 'candlestick',
        },
        xaxis: {
          type: 'datetime',
        },
      }
    }

    return {
      chart: {
        id: 'line',
      },
      xaxis: {
        type: 'datetime',
      },
    }
  }, [type])

  // const options: ApexOptions = {
  //   chart: {
  //     id: 'basic-bar',
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //   },
  // }

  return (
    <div className="h-full">
      <Chart
        options={options}
        series={type === 'candlestick' ? series : lineSeries}
        type={type === 'candlestick' ? 'candlestick' : 'line'}
        height="100%"
      />
    </div>
  )
}
