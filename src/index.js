import { initialData } from "./initialData"
import { NoteCreator } from "./noteCreator"
import { SubmitNoteForm } from "./submitNoteForm"
import { SubmitNewNoteButton } from "./submitNewNoteButton"
import { SummaryInfoCreator } from "./summaryInfoCreator"
import { NotesListHat } from "./notesListHat"
import { SummaryHat } from "./summaryHat"
import {
  TASKS_LIST_ID,
  NEW_FORM_CREATOR_WRAPPER_ID,
  SUMMARY_LIST_ID,
  ARCHIVED_TASKS_LIST_ID,
  boostrapComponents,
} from "./bootstrapComponents"

boostrapComponents()

function Observable() {
  this.observerList = []
  this.notifyObservers = function () {
    this.observerList.forEach(function (observer) {
      observer.update()
    })
  }
  this.addObserver = function (observer) {
    this.observerList.push(observer)
  }
}

function Data(list) {
  Observable.call(this)
  this.list = list
  this.getList = function () {
    return this.list
  }
  this.setList = function (list) {
    this.list = list
    this.notifyObservers()
  }
  this.addToList = function (newElement) {
    this.list = [...this.list, newElement]
    this.notifyObservers()
  }
  this.removeFromList = function (id) {
    this.list = this.list.filter((i) => i.id !== id)
    this.notifyObservers()
  }
  this.openForEditHandler = function (id) {
    this.list = this.list.map((i) =>
      i.id === id ? { ...i, isOpenForEdit: true } : i
    )
    this.notifyObservers()
  }
  this.updateElement = function (i) {
    this.list = this.list.map((j) => (i.id === j.id ? i : j))
    this.notifyObservers()
  }
  this.archiveHandler = function (id) {
    this.list = this.list.map((i) =>
      i.id === id ? { ...i, isArchived: true } : i
    )
    this.notifyObservers()
  }
  this.unarchiveHandler = function (id) {
    this.list = this.list.map((i) =>
      i.id === id ? { ...i, isArchived: false } : i
    )
    this.notifyObservers()
  }
  this.archiveAllHandler = function () {
    this.list = this.list.map((i) => ({ ...i, isArchived: true }))
    this.notifyObservers()
  }
  this.deleteUnarchivedHandler = function () {
    this.list = this.list.filter((i) => i.isArchived)
    this.notifyObservers()
  }
  this.unarchiveAllHandler = function () {
    this.list = this.list.map((i) => ({ ...i, isArchived: false }))
    this.notifyObservers()
  }
  this.deleteArchivedHandler = function () {
    this.list = this.list.filter((i) => !i.isArchived)
    this.notifyObservers()
  }
}

function Observer(observable) {
  this.observable = observable
  this.observable.addObserver(this)
  this.update = function () {}
}

function NotesList(observable) {
  Observer.call(this, observable)

  this.update = function () {
    const generatedNodes = this.observable
      .getList()
      .filter((i) => !i.isArchived)
      .sort((i, j) => Number(i.created) - Number(j.created))
      .map((i) => {
        if (i.isOpenForEdit) {
          return SubmitNoteForm({
            ...i,
            onSubmit: (i) => {
              this.observable.updateElement(i)
            },
          }).element
        }

        return NoteCreator({
          ...i,
          onRemoveHandler: () => {
            this.observable.removeFromList(i.id)
          },
          onOpenForEdit: () => {
            this.observable.openForEditHandler(i.id)
          },
          onArchive: () => {
            this.observable.archiveHandler(i.id)
          },
        }).element
      })

    document.getElementById(TASKS_LIST_ID).replaceChildren(
      ...[
        ...[
          NotesListHat({
            onArchiveAll: () => {
              this.observable.archiveAllHandler()
            },
            onDeleteUnarchived: () => {
              this.observable.deleteUnarchivedHandler()
            },
          }).element,
        ],
        ...generatedNodes,
      ]
    )
  }
}

function NewFormCreator(observable) {
  Observer.call(this, observable)

  document.getElementById(NEW_FORM_CREATOR_WRAPPER_ID).replaceChildren(
    SubmitNewNoteButton({
      onSubmit: (newElement) => {
        this.observable.addToList(newElement)
      },
    }).element
  )

  this.update = function () {}
}

function SummaryTable(observable) {
  Observer.call(this, observable)
  this.update = function () {
    const summary = this.observable.getList().reduce((acc, val) => {
      if (!acc[val.category]) {
        return {
          ...acc,
          [val.category]: {
            active: val.isArchived ? 0 : 1,
            archived: val.isArchived ? 1 : 0,
          },
        }
      }

      return {
        ...acc,
        [val.category]: {
          active: val.isArchived
            ? acc[val.category].active
            : 1 + acc[val.category].active,
          archived: val.isArchived
            ? 1 + acc[val.category].archived
            : acc[val.category].archived,
        },
      }
    }, {})

    const generatedNodes = Object.keys(summary).map(
      (i) =>
        SummaryInfoCreator({
          category: i,
          active: summary[i].active,
          archived: summary[i].archived,
        }).element
    )

    document
      .getElementById(SUMMARY_LIST_ID)
      .replaceChildren(...[SummaryHat({}).element, ...generatedNodes])
  }
}

function ArchviedNotesList(observable) {
  Observer.call(this, observable)

  this.update = function () {
    const generatedNodes = this.observable
      .getList()
      .filter((i) => i.isArchived)
      .sort((i, j) => Number(i.created) - Number(j.created))
      .map((i) => {
        if (i.isOpenForEdit) {
          return SubmitNoteForm({
            ...i,
            onSubmit: (i) => {
              this.observable.updateElement(i)
            },
          }).element
        }

        return NoteCreator({
          ...i,
          onRemoveHandler: () => {
            this.observable.removeFromList(i.id)
          },
          onOpenForEdit: () => {
            this.observable.openForEditHandler(i.id)
          },
          onUnarchive: () => {
            this.observable.unarchiveHandler(i.id)
          },
        }).element
      })

    document.getElementById(ARCHIVED_TASKS_LIST_ID).replaceChildren(
      ...[
        ...[
          NotesListHat({
            onUnarchiveAll: () => {
              this.observable.unarchiveAllHandler()
            },
            onDeleteArchived: () => {
              this.observable.deleteArchivedHandler()
            },
          }).element,
        ],
        ...generatedNodes,
      ]
    )
  }
}

const data = new Data(initialData)
new NotesList(data)
new NewFormCreator(data)
new SummaryTable(data)
new ArchviedNotesList(data)
data.setList(initialData)
