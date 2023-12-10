import { FC, useCallback } from 'react'
import { useButtonGroup } from './useButtonGroup'
import clsx from 'clsx'
import styles from './ButtonGroupItem.module.css'

interface ButtonGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode
  value: string
}

export const ButtonGroupItem: FC<ButtonGroupItemProps> = ({
  children,
  className,
  value,
  ...props
}) => {
  const groupContext = useButtonGroup()

  const classes = clsx(
    styles.buttonGroupItem,
    'text-base font-medium whitespace-nowrap px-3 py-2.5 rounded-lg flex items-center justify-center',
    className,
    {
      'text-neutral-100 bg-neutral-600 selected': value === groupContext.selected,
      [styles.selected]: value === groupContext.selected,
      'text-black': value !== groupContext.selected,
    },
  )

  const onClick = useCallback(() => {
    groupContext.select(value)
  }, [value, groupContext])

  return (
    <button {...props} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
