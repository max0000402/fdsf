import { FC, ReactElement, useCallback, useState } from 'react'
import { ButtonGroupItem } from './ButtonGroupItem'
import { ButtonGroupProvider } from './ButtonGroupContext'

interface ButtonGroupProps {
  children: ReactElement<typeof ButtonGroupItem>[]
  value?: string
  defaultValue?: string
  onChange?: (id: string | null) => void
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  value,
  defaultValue,
  onChange,
}) => {
  const defaultSelected = value ? value : defaultValue ?? null

  const [selected, setSelected] = useState<string | null>(defaultSelected)

  const select = useCallback(
    (id: string | null) => {
      if (!value) {
        setSelected(id)
      }
      onChange?.(id)
    },
    [onChange, value],
  )

  return (
    <ButtonGroupProvider selected={selected} onChange={select}>
      <div className="bg-neutral-100 flex justify-between gap-5 pl-3 pr-6 py-2 rounded-xl max-md:justify-center max-md:pr-5 w-fit">
        {children}
      </div>
    </ButtonGroupProvider>
  )
}
