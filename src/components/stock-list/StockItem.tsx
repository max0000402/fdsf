import { FC } from 'react'
import { clsx } from 'clsx'
import type { IStock } from '@/models/stock'
import { currencyFormatter, formatDelta } from '@/utils/internalization'
import { useButtonGroup } from '../ButtonGroup/useButtonGroup'
import useSWR from 'swr'
import { fetcher, formatDate } from '@/utils/misc'

interface StockProps {
  stock: IStock
  className?: string
}

export const StockItem: FC<StockProps> = ({ stock, className }) => {
  const now = formatDate(new Date())
  const { data } = useSWR(
    `/api/v1/${stock.shortName.toLowerCase()}?date=2022-12-12&till_date=${now}`,
    fetcher,
    {
      refreshInterval: 5 * 1000 * 60,
    },
  )

  const context = useButtonGroup()

  const deltaStyle = clsx('text-base whitespace-nowrap mt-2', {
    'text-lime-500': stock.delta > 0,
    'text-red-600': stock.delta < 0,
  })

  const wrapperStyle = clsx(
    'items-center flex w-full gap-6 p-4 cursor-pointer',
    className,
    {
      'rounded-xl': !className,
      'bg-white': context.selected !== stock.shortName,
      'bg-neutral-700 text-white': context.selected === stock.shortName,
    },
  )

  return (
    <div className={wrapperStyle} onClick={() => context.select(stock.shortName)}>
      <img
        loading="lazy"
        src={stock.img}
        className="rounded-full aspect-square object-contain object-center w-11 justify-center items-center overflow-hidden shrink-0 max-w-full"
      />
      <div className="justify-between items-stretch self-stretch flex gap-5 w-full">
        <div className="justify-center items-stretch flex grow basis-[0%] flex-col">
          <h1 className="text-base font-bold whitespace-nowrap uppercase">
            {stock.shortName}
          </h1>
          <h2 className="text-base font-normal whitespace-nowrap mt-2 capitalize">
            {stock.name}
          </h2>
        </div>
        <div className="justify-center items-stretch flex flex-col">
          <span className="text-base whitespace-nowrap">
            {!!data && data.length > 0
              ? currencyFormatter.format(
                  (data.at(-1).pr_high + data.at(-1).pr_low) / 2,
                )
              : currencyFormatter.format(stock.price)}
          </span>
          <span className={deltaStyle}>{formatDelta(stock.delta)}</span>
        </div>
      </div>
    </div>
  )
}
