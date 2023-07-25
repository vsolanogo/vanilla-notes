import { SubmitNoteForm } from "./submitNoteForm"

const CreateNewNoteBtn = () => {
  const el = document.createElement("input")
  el.type = "submit"
  el.value = "Create new note"
  el.className= `btn`

  return {
    get element() {
      return el
    },
  }
}

export const SubmitNewNoteButton = ({ onSubmit }) => {
  const el = document.createElement("div")

  const displayCreationForm = (e) => {
    e.preventDefault()
    el.replaceChildren(
      SubmitNoteForm({
        onRemoveHandler: displayCreateButton,
        onSubmit,
      }).element
    )
  }

  const displayCreateButton = () => {
    const createNewBtnElement = CreateNewNoteBtn().element
    createNewBtnElement.addEventListener("click", displayCreationForm, false)

    el.replaceChildren(createNewBtnElement)
  }

  displayCreateButton()

  return {
    get element() {
      return el
    },
  }
}
