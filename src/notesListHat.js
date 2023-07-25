export const NotesListHat = ({
  onArchiveAll,
  onDeleteUnarchived,
  onUnarchiveAll,
  onDeleteArchived,
}) => {
  const el = document.createElement("div")
  el.className = "note note__hat"
  el.innerHTML = `
      <div>Name</div>
      <div>Created</div>
      <div>Category</div>
      <div>Content</div>
      <div>Dates</div>
      <div></div>
      `

  const archiveAll = document.createElement("button")
  archiveAll.innerHTML = onArchiveAll ? `Archive` : `Unarchive`
  archiveAll.className = `btn`
  archiveAll.addEventListener("click", (e) => {
    onArchiveAll && onArchiveAll()
    onUnarchiveAll && onUnarchiveAll()
    e.preventDefault()
  })

  const delBtn = document.createElement("button")
  delBtn.innerHTML = `Delete`
  delBtn.className = `btn`
  delBtn.addEventListener("click", (e) => {
    onDeleteArchived && onDeleteArchived()
    onDeleteUnarchived && onDeleteUnarchived()
    e.preventDefault()
  })

  el.appendChild(archiveAll)
  el.appendChild(delBtn)

  return {
    get element() {
      return el
    },
  }
}
