
export const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0
})

export const dateFormat = new Intl.DateTimeFormat('TWD', {
    dateStyle: 'full'
})