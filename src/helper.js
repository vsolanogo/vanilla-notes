export const appendTo = (parent, newElement) => {
  if (!(parent instanceof Element) || !(newElement instanceof Element)) {
    throw new Error(`Arguments should be DOM elements`)
  }

  try {
    return parent.appendChild(newElement)
  } catch (error) {
    console.error("Error occurred during appendChild:", error.message)
    return null
  }
}

export const getDates = (str) => {
  const a = str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g)
  return a ? a : ""
}
