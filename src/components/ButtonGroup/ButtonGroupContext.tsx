import { FC, ReactNode, createContext } from 'react'

interface IButtonGroupContext {
  selected: string | null
  select: (id: string | null) => void
}

export const ButtonGroupContext = createContext<IButtonGroupContext>({
  selected: null,
  select: () => {},
})

interface ButtonGroupProviderProps {
  children: ReactNode
  selected?: string | null
  onChange: (id: string | null) => void
}

export const ButtonGroupProvider: FC<ButtonGroupProviderProps> = ({
  children,
  selected,
  onChange,
}) => {
  const value = selected ?? null

  return (
    <ButtonGroupContext.Provider value={{ selected: value, select: onChange }}>
      {children}
    </ButtonGroupContext.Provider>
  )
}
