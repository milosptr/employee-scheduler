export function formatPrice(value) {
  if (!value) return '0'
  return parseInt(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
