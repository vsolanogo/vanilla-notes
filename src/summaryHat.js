export const SummaryHat = () => {
  const el = document.createElement("div")
  el.className = "note note__summary note__hat"
  el.innerHTML = `
      <div>Note Category</div>
      <div>Active</div>
      <div>Archived</div>
      `

  return {
    get element() {
      return el
    },
  }
}
