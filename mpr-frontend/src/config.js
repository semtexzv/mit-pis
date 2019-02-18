// API
// @TODO: add endpoints
export const API_ENDPOINT_PROD = 'http://ec2-18-196-86-128.eu-central-1.compute.amazonaws.com:8080/api/'
export const API_ENDPOINT_STAGE = 'http://localhost:8080/'
// export const API_ENDPOINT_DEV = 'http://localhost:8080/api/'
export const API_ENDPOINT_DEV = 'http://ec2-18-196-86-128.eu-central-1.compute.amazonaws.com:8080/api/'
const local = window.location.hostname === 'localhost'
const staging = window.location.href.match(/-staging/)
export const API_ENDPOINT = local ? API_ENDPOINT_DEV : staging ? API_ENDPOINT_STAGE : API_ENDPOINT_PROD
export const ENABLE_PROXY = false // enables use of proxy.php in built apps

// theme basics (see https://material.io/color/)
export const primaryColor = '#212121'
export const primaryColors = {
  main: primaryColor,
  light: '#484848',
  dark: '#000000',
  contrastText: '#ffffff'
}
export const secondaryColor = '#18ffff'
export const secondaryColors = {
  main: secondaryColor,
  light: '#76ffff',
  dark: '#00cbcc',
  contrastText: '#000000'
}
export const backgroundColor = '#0a0a0a'
export const foregroundColor = '#ffffff'
export const dockedMenuBarTheshold = 640

export const detailTypes = {
  NONE: 0,
  PERSON: 1,
  PROJECT: 2,
  QUALIFICATION: 3,
  WORK_UNIT: 4,
  ROLE: 5
}
export const frontendLanguages = {
  cs: 'čeština'
}
// IDs conform with DB !
export const codelists = {
  role: 1
}
// conform with DB !
export const states = {
  A: 'Aktivní',
  D: 'Smazaný'
}

export const projectStates = {
  ARCHIVED: 'Archivovaný',
  WAITING: 'Pozastavený',
  ACTIVE: 'Aktivní',
  FINISHED: 'Dokončený'
}

export const defaultFrontendLanguage = 'cs'
export const tokenExpirationMinutes = 60
export const tokenRememberExpirationMinutes = 60 * 24 * 14
export const defaultItemsPerListPage = 10
export const itemPerListPageOptions = [10, 20, 50, 100, 1000]
