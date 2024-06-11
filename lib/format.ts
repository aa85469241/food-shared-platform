
export const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'TWD'
})

export const dateFormat = new Intl.DateTimeFormat('TWD', {
    dateStyle: 'full'
})