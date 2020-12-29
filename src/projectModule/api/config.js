export function resolveApi (url) {
  if (!url) {
    throw new Error("url cann't be empty!")
  }
  const baseUrl = '/api'
  return baseUrl + url
}
