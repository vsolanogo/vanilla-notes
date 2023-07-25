import { v4 as uuidv4 } from "uuid"
import { categoriesList } from "./initialData"
import { appendTo } from "./helper"

export const SubmitNoteForm = ({
  onRemoveHandler,
  id,
  name,
  created,
  category,
  content,
  unsavedData,
  onSubmit,
  isArchived,
}) => {
  let newName = unsavedData?.name ? unsavedData.name : name ? name : ""
  let newCategory = unsavedData?.category
    ? unsavedData.category
    : category
    ? category
    : categoriesList[0]
  let newContent = unsavedData?.content
    ? unsavedData.content
    : content
    ? content
    : ""

  const submitUnsavedData = () => {
    onSubmit({
      id,
      name,
      created,
      category,
      content,
      isOpenForEdit: true,
      isArchived,
      unsavedData: {
        name: newName,
        category: newCategory,
        content: newContent,
      },
    })
  }

  const mainForm = document.createElement("form")
  mainForm.className = "note note__edit"

  const textInput = document.createElement("input")
  textInput.type = "text"
  textInput.placeholder = "Note name"
  textInput.value = newName
  textInput.addEventListener("change", (e) => {
    newName = e.target.value
    if (id) {
      submitUnsavedData()
    }
  })
  appendTo(mainForm, textInput)

  const categoryEl = document.createElement("select")
  categoriesList.forEach((i) => {
    const opt = document.createElement("option")
    opt.value = i
    opt.innerHTML = i
    categoryEl.appendChild(opt)
  })
  categoryEl.value = newCategory
  categoryEl.addEventListener("change", (e) => {
    newCategory = e.target.value
    if (id) {
      submitUnsavedData()
    }
  })
  appendTo(mainForm, categoryEl)

  const contentEl = document.createElement("input")
  contentEl.type = "text"
  contentEl.placeholder = "Note content"
  contentEl.value = newContent
  contentEl.addEventListener("change", (e) => {
    newContent = e.target.value
    if (id) {
      submitUnsavedData()
    }
  })
  appendTo(mainForm, contentEl)

  const submitBtn = document.createElement("button")
  submitBtn.innerHTML = id ? "Submit" : "Submit new note"
  submitBtn.className = `btn`

  submitBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault()
      onSubmit({
        id: id ? id : uuidv4(),
        name: newName,
        created: created ? created : new Date(),
        category: newCategory,
        content: newContent,
        isOpenForEdit: false,
        unsavedData: null,
        isArchived,
      })
      mainForm.remove()
      if (onRemoveHandler) {
        onRemoveHandler()
      }
    },
    false
  )
  appendTo(mainForm, submitBtn)

  const createBtn = document.createElement("button")
  createBtn.innerHTML = `Close`
  createBtn.className = `btn`

  createBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault()
      if (id) {
        onSubmit({
          id,
          name,
          created,
          category,
          content,
          unsavedData: null,
          isArchived,
        })
      } else {
        mainForm.remove()
        if (onRemoveHandler) {
          onRemoveHandler()
        }
      }
    },
    false
  )

  appendTo(mainForm, createBtn)

  return {
    get element() {
      return mainForm
    },
  }
}
