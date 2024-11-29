export default function(html: string) {
  const element = document.createElement('div')
  element.innerHTML = html
  return element.textContent || ''
}