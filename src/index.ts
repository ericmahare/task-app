import {v4 as uuidv4} from 'uuid';

type Task = {
  id: string
  title: string
  completedAt: Date
  completed: boolean
}

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.getElementById("form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

const tasks = getTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", (e) => {
  e.preventDefault()
  if(input?.value == "" || input?.value == null) return
  const task: Task = {
    id: uuidv4(),
    title: input.value,
    completedAt: new Date(),
    completed: false
  }
  tasks.push(task)
  addListItem(task)
  input.value = ""
})


function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  checkbox.addEventListener("change", ()=>{
    task.completed = checkbox.checked
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  saveTasks()
}

function saveTasks() {
  const data = JSON.stringify(tasks)
  localStorage.setItem("tasks",data)
}

function getTasks(): Task[] {
  const data = localStorage.getItem('tasks')
  if(data === null) return []
  return JSON.parse(data)
}

