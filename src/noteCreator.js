const getDates = (str) => {
  const a = str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g)
  return a ? a : ""
}

export const NoteCreator = ({
  id,
  name,
  created,
  category,
  content,
  onRemoveHandler,
  onOpenForEdit,
  onArchive,
  onUnarchive,
  isArchived,
}) => {
  const el = document.createElement("div")
  el.className = "note"

  const displayDefaultView = () => {
    el.innerHTML = `
      <div>${name}</div>
      <div>${created.toLocaleString("en-us", {
        month: "long",
        year: "numeric",
        day: "numeric",
      })}</div>
      <div>${category}</div>
      <div>${content}</div>
      <div>
      ${getDates(content)}
      </div>
      `

    const editBtn = document.createElement("button")
    editBtn.innerHTML = `Edit`
    editBtn.className = `btn`
    editBtn.addEventListener("click", (e) => {
      e.preventDefault()
      onOpenForEdit()
    })

    const archiveBtn = document.createElement("button")
    archiveBtn.className = `btn`
    archiveBtn.innerHTML = isArchived ? `Unarchive` : `Archive`

    archiveBtn.addEventListener("click", (e) => {
      e.preventDefault()
      isArchived ? onUnarchive() : onArchive()
    })

    const delBtn = document.createElement("button")
    delBtn.className = `btn`
    delBtn.innerHTML = `Delete`
    delBtn.addEventListener("click", (e) => {
      e.preventDefault()
      onRemoveHandler(id)
    })

    el.appendChild(editBtn)
    el.appendChild(archiveBtn)
    el.appendChild(delBtn)
  }

  displayDefaultView()

  return {
    get element() {
      return el
    },
  }
}
