export const appendTo = (parent, newElement) => {
  if (!(parent instanceof Element) || !(newElement instanceof Element)) {
    throw new Error(`Arguments should be DOM elements`)
  }

  return parent.appendChild(newElement)
}

export const getDates = (str) => {
  const a = str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g)
  return a ? a : ""
}
