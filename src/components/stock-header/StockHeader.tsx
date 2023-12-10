import { IStock } from '@/models/stock'
import { FC } from 'react'
import { StockItem } from '../stock-list'
import styles from './StockHeader.module.css'

interface StockHeaderProps {
  stock: IStock
}

export const StockHeader: FC<StockHeaderProps> = ({ stock }) => {
  return (
    <div className="border-b-zinc-400 border-b border-solid">
      <StockItem stock={stock} className={styles.stock} />
    </div>
  )
}
