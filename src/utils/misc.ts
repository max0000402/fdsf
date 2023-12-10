export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

export const formatDate = (date: Date | number) => {
  if (typeof date === 'number') date = new Date(date)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
