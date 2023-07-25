import { v4 as uuidv4 } from "uuid"
import { appendTo } from "./helper"

export const TASKS_LIST_ID = uuidv4()
export const NEW_FORM_CREATOR_WRAPPER_ID = uuidv4()
export const SUMMARY_LIST_ID = uuidv4()
export const ARCHIVED_TASKS_LIST_ID = uuidv4()

export const boostrapComponents = () => {
  const tasksList = document.createElement("div")
  tasksList.id = TASKS_LIST_ID
  tasksList.className = "notes-wrapper"
  appendTo(document.body, tasksList)

  const SubmitNewFormWrapper = document.createElement("div")
  SubmitNewFormWrapper.id = NEW_FORM_CREATOR_WRAPPER_ID
  SubmitNewFormWrapper.className = "notes-wrapper"
  appendTo(document.body, SubmitNewFormWrapper)

  const summaryList = document.createElement("div")
  summaryList.id = SUMMARY_LIST_ID
  summaryList.className = "notes-wrapper"
  appendTo(document.body, summaryList)

  const archivedTasksList = document.createElement("div")
  archivedTasksList.id = ARCHIVED_TASKS_LIST_ID
  archivedTasksList.className = "notes-wrapper"
  appendTo(document.body, archivedTasksList)
}
