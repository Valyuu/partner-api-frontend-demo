export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const addMoney = (a: number, b: number): number => {
  return (a * 100 + b * 100) / 100
}
