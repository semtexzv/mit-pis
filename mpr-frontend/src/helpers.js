export function getFullName(objectWithNameAndSurname, defaultName = '') {
  if (!objectWithNameAndSurname) return defaultName
  const {name, surname} = objectWithNameAndSurname
  if (name && surname) {
    return name + ' ' + surname
  } else {
    return name || surname || defaultName
  }
}
