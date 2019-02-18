// Sorting date stucture ASC
export const sortByDateASC = (obj1, obj2) => {
  if (obj1.date.date === obj2.date.date) return 0
  if (obj1.date.date > obj2.date.date) return 1
  if (obj1.date.date < obj2.date.date) return -1
}

// Sorting date stucture DESC
export const sortByDateDESC = (obj1, obj2) => {
  if (obj1.date.date === obj2.date.date) return 0
  if (obj1.date.date > obj2.date.date) return -1
  if (obj1.date.date < obj2.date.date) return 1
}
