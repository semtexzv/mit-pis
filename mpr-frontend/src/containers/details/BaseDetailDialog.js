import {dismissDetailDialog} from 'actions/MainActions'
import {detailTypes} from 'config'
import {detailActions} from 'definitions'
import {extractObjectMethods} from 'lib/tools'
import DetailDialogForm from 'components/details/DetailDialogForm'

const ENTITY = detailTypes.NONE
const REPOSITORY = null

/**
* HOW TO
* 1. extend BaseDetailDialog in your container, eg. PageDetailDialog
* 2. override functions, at least getFormDefinitons
* 3. import getBaseStateToPropsMappings and add your own mappings
* 4. import createMapDispatchToProps and use it to connect your class as mapDispatchToProps
* examples below
*/

export class BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY
  dispatch = null // filled before connect

  /*
  spec:
  name (string)
  type (string)
  label (string)
  required (bool)
  fullwidth (bool)
  nl2br (bool): if you dont want to use WYSIWYG for a textarea
  translation (bool)
  defaultValue (mixed)
  ... others via specs for TextField (like helperText) or other types of fields
  */
  getFormDefinitons(state, props) {
    // example definitions
    return [
      // {name: 'name', type: 'text', label: 'Název', required: true, translation: true},
      // {name: 'titlePicture', type: 'image', label: 'Titulní obrázek', onUpload: onTitlePictureFileUpload},
      // {name: 'dateFrom', type: 'date', label: 'Datum konání', required: true},
      // {name: 'timeFrom', type: 'time', label: 'Čas začátku'},
      // {name: 'photogalleryId', type: 'select', label: 'Fotogalerie', options: [{value: 1, label: 'QWERTY 2016'}, {value: 2, label: "Fotky Hradišťan 2015"}]},
      // {name: 'active', type: 'checkbox', label: 'Aktivní', defaultValue: true}
    ]
  }

  // return object with keys according to getFormDefinitons
  getData(state, props, id) {
    return this.repository.getDetail(id)
  }

  dismiss(state, props) {
    this.dispatch(dismissDetailDialog())
  }

  confirm(state, props) {
    const callback = (res) => {
      this.dispatch(dismissDetailDialog())
    }
    let data = state.values
    if (!data.language) data.language = props.language
    if (props.action === detailActions.EDIT) {
      this.repository.update(props.id, data, null, callback)
    } else if (props.action === detailActions.CREATE) {
      this.repository.insert(data, callback)
    }
  }

  /**
  * return an object with tab titles as keys, and Component classes as implementations
  * Components get full props plus 'formValues', 'formDefinitions' and 'onFormChange'
  * With only one tab no tab menu is rendered
  */
  getTabs(state, props) {
    return {
      'Informace': DetailDialogForm
    }
  }
}

// example file upload
// function onTitlePictureFileUpload(file, changeHandler) {
//   const callback = (res) => {
//     const url = res.data
//     changeHandler('titlePicture', url)
//   }
//   REPOSITORY.uploadFile(file, 'event-title-picture', callback)
// }

// example mapStateToProps
// const mapStateToProps = (state) => {
//   return assign(getBaseStateToPropsMappings(state), {
//     title: state.main.detailDialogAction === detailActions.CREATE ? 'Přidat položku' : 'Detail položky',
//     confirmButtonTitle: state.main.detailDialogAction === detailActions.CREATE ? 'Vytvořit' : 'Uložit',
//     open: state.main.detailDialogOpen === ENTITY,
//     loading: state.dataSyncing.news
//   })
// }

export function getBaseStateToPropsMappings(state) {
  return {
    confirmButtonTitle: state.main.detailDialogAction === detailActions.CREATE ? 'Vytvořit' : 'Uložit',
    action: state.main.detailDialogAction,
    id: state.main.detailDialogId,
    language: state.main.frontendLanguage,
    dataVersion: state.main.dataVersion
  }
}

export function createMapDispatchToProps(className) {
  const mapDispatchToProps = (dispatch) => {
    const instance = new className()
    instance.dispatch = dispatch
    const mappings = extractObjectMethods(instance)
    return mappings
  }
  return mapDispatchToProps
}

// example how to write connect
// export default connect(
//   mapStateToProps,
//   createMapDispatchToProps(BaseDetailDialog)
// )(DetailDialog)
