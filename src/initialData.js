import { v4 as uuidv4 } from "uuid"
export const TASK = "Task"
export const RANDOM_THOUGHT = "Random Thought"
export const IDEA = "Idea"
export const categoriesList = [TASK, RANDOM_THOUGHT, IDEA]

export const initialData = [
  {
    id: uuidv4(),
    name: "test name",
    created: new Date(1643618202000),
    category: RANDOM_THOUGHT,
    content: "test content 5/5/2002",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: true,
  },
  {
    id: uuidv4(),
    name: "test name2",
    created: new Date(1643684526000),
    category: RANDOM_THOUGHT,
    content: "test content2 5/13/2022 10/10/2002 10/10/2009",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: false,
  },
  {
    id: uuidv4(),
    name: "test name4",
    created: new Date(1603681095000),
    category: TASK,
    content: "test content4",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: false,
  },
  {
    id: uuidv4(),
    name: "test name3",
    created: new Date(1643681095000),
    category: IDEA,
    content: "test content3",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: false,
  },
  {
    id: uuidv4(),
    name: "test name5",
    created: new Date(1649681095000),
    category: RANDOM_THOUGHT,
    content: "test content5",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: false,
  },
  {
    id: uuidv4(),
    name: "test name6",
    created: new Date(1649683095000),
    category: RANDOM_THOUGHT,
    content: "test content6",
    isOpenForEdit: false,
    unsavedData: null,
    isArchived: true,
  },
]
