export const appendTo = (parent, newElement) => {
  if (!(parent instanceof Element) || !(newElement instanceof Element)) {
    throw new Error(`Arguments should be DOM elements`)
  }

  return parent.appendChild(newElement)
}
