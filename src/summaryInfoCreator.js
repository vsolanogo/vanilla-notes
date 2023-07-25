export const SummaryInfoCreator = ({ category, active, archived }) => {
  const el = document.createElement("div")
  el.className = "note note__summary"
  el.innerHTML = `
      <div>${category}</div>
      <div>${active}</div>
      <div>${archived}</div>
      `

  return {
    get element() {
      return el
    },
  }
}
