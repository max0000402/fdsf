export const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const percentFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatDelta = (delta: number) => {
  const formated = percentFormatter.format(delta)
  return `${delta > 0 ? '+' : ''}${formated}%`
}
