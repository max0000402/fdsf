import styles from './StockList.module.css'
import { StockItem } from './StockItem'
import { FC, useCallback, useState } from 'react'
import { IStock } from '@/models/stock'
import { ButtonGroupProvider } from '../ButtonGroup/ButtonGroupContext'

interface StockListProps {
  stocks: IStock[]
  onChange?: (id: string | null) => void
}

export const StockList: FC<StockListProps> = ({ stocks, onChange }) => {
  const [selected, setSelected] = useState<string | null>('YNDX')

  const select = useCallback(
    (id: string | null) => {
      setSelected(id)
      onChange?.(id)
    },
    [onChange],
  )

  return (
    <div className="items-stretch flex flex-col my-auto max-lg:mt-10 min-w-[350px]">
      <div className="items-stretch flex justify-between gap-4 py-4">
        <div className="text-white text-3xl font-bold whitespace-nowrap justify-center items-stretch bg-neutral-600 p-2.5 rounded-lg">
          CAT
        </div>
        <div className="text-zinc-700 text-xl font-bold my-auto">
          Расшифровка Если
          <br /> Нужна
        </div>
      </div>

      <div className="justify-end items-center flex w-full flex-col mt-6 rounded-3xl bg-stone-50 px-5 py-2">
        <div className="text-black text-3xl font-bold whitespace-nowrap self-stretch justify-center pl-6 pr-16 py-6 rounded-3xl items-start">
          Акции
        </div>

        <ButtonGroupProvider selected={selected} onChange={select}>
          <div className={styles.stocks}>
            {stocks.map((el) => (
              <StockItem key={el.shortName} stock={el} />
            ))}
          </div>
        </ButtonGroupProvider>
      </div>
    </div>
  )
}
