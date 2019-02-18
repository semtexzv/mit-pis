import { connect } from 'react-redux'
import ContainedComponent from 'components/common/ConfirmationDialog'
import {dismissDeleteDialog} from 'actions/MainActions'
import {detailTypes} from 'config'

const mapStateToProps = (state) => {
  const cnt = state.main.deleteDialogIdList.length
  return {
    idList: state.main.deleteDialogIdList,
    title: 'Odstranit ' + (cnt < 5 && cnt > 1 ? (cnt + ' položky') : cnt === 1 ? 'položku' : (cnt + ' položek')) + '?',
    confirmButtonTitle: 'Odstranit',
    dismissButtonTitle: 'Zpět',
    confirmButtonColor: 'secondary',
    open: state.main.deleteDialogOpen !== detailTypes.NONE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismiss: (state, props) => {
      dispatch(dismissDeleteDialog())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
