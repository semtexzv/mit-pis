import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {
  frontendLanguages,
  defaultItemsPerListPage,
  itemPerListPageOptions
} from 'config'
import cloneDeep from 'lodash/cloneDeep'
import keycode from 'keycode'
import Table, {
  TableBody,
  TableFooter,
  TableCell,
  TablePagination,
  TableRow
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import EnhancedTableHead from 'components/helpers/EnhancedTableHead'
import EnhancedTableToolbar from 'components/helpers/EnhancedTableToolbar'
import DeleteConfirmationDialog from 'containers/common/DeleteConfirmationDialog'
import moment from 'moment'
import 'moment/locale/cs'

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      order: props.defaultOrderByTrend,
      orderBy: props.defaultOrderBy,
      selected: [],
      page: 0,
      itemsOnPage: defaultItemsPerListPage,
      filter: false,
      extraFilters: {}
    }
  }

  handleRequestSort(e, property) {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick(e, checked) {
    const data = this.props.getData(this.state, this.props)
    if (checked) {
      this.setState({ selected: data.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  handleFilter(filter) {
    this.setState({filter})
  }

  handleKeyDown(event, id) {
    if (keycode(event) === 'space') {
      this.handleClick(event, id)
    }
  }

  handleClick(event, id) {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1
  }

  resetSelection() {
    this.setState({ selected: [] })
  }

  handleConfirmDelete(dialogState, dialogProps) {
    const callback = (res) => {
      this.resetSelection()
    }
    this.props.confirmDelete(dialogState, dialogProps, callback)
  }

  getPaginatedData(data) {
    const {page, itemsOnPage} = this.state
    return data.slice(page * itemsOnPage, page * itemsOnPage + itemsOnPage)
  }

  render() {
    /* DEV */console.time('List->render()')/* /DEV */
    const { order, orderBy, selected, filter } = this.state
    const {
      getData,
      getDetailAction,
      getAddAction,
      getDeleteAction,
      title,
      deleteInProgress,
      getDetailDialog,
      getExtraFilters,
      deleteDialogOpen
    } = this.props
    const data = getData(this.state, this.props)
    const paginatedData = this.getPaginatedData(data)
    const columnData = this.getColumnData()
    const detailAction = getDetailAction(this.state, this.props)
    const addAction = getAddAction(this.state, this.props)
    const deleteAction = getDeleteAction(this.state, this.props)
    const DetailDialog = getDetailDialog(this.state, this.props)
    const extraFilters = getExtraFilters(this.state, this.props, ::this.setState, data)

    return (
      <Paper className={cls.list} square elevation={1}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          filter={filter}
          deleteAction={deleteAction}
          onFilter={::this.handleFilter}
        />
        {extraFilters && (
          <div className={cls.extraFilters}>
            {extraFilters}
          </div>
        )}
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            columnData={columnData}
            onSelectAllClick={::this.handleSelectAllClick}
            onRequestSort={::this.handleRequestSort}
          />
          <TableBody>
            {paginatedData.map((item, index) => {
              const isSelected = this.isSelected(item.id)
              const c = cls.tableRow + (isSelected ? ' ' + cls.selected : '')
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={item.id}
                  selected={isSelected}
                  className={c}
                >
                  <TableCell padding='none' className={cls.tableCell} padding='checkbox' onClick={e => this.handleClick(e, item.id)}>
                    <Checkbox color="default" checked={isSelected} />
                  </TableCell>
                  {columnData.map((column, colIndex) => {
                    const value = this.parseValue(item, column)
                    return (
                      <TableCell
                        key={column.name}
                        className={cls.tableCell + ' ' + cls.data}
                        padding={column.padding || 'default'}
                        numeric={column.numeric}
                        onClick={e => detailAction(e, item)}
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
          {this.renderFooter(data)}
        </Table>
        {typeof addAction === 'function' && (
          <Button className={cls.addButton} variant="fab" color="secondary" onClick={e => addAction(e)}>
            <AddIcon />
          </Button>
        )}
        <DetailDialog />
        {deleteDialogOpen && <DeleteConfirmationDialog loading={deleteInProgress} confirm={::this.handleConfirmDelete} />}
      </Paper>
    )
  }

  parseValue(item, column) {
    let value = item[column.name]
    if (column.datetime) {
      if (!value || !value.length || !moment(value).isValid()) return ''
      value = moment(value).format(column.datetime)
    } else if (column.timeAgo) {
      if (!value) return ''
      if (typeof value === 'object' && value && typeof value[6] !== 'undefined') {
        // fix time format from api
        value[6] = 0
        value[1]--
      }
      value = moment(value).fromNow()
    }
    if (column.maxLength && value && value.length > column.maxLength) {
      value = (
        <span title={value}>
          {value.substr(0, column.maxLength - 3)}
          &hellip;
        </span>
      )
    }
    if (typeof column.renderer === 'function') {
      value = column.renderer(value, item, column)
    }
    return value
  }

  getColumnData() {
    const {getColumnData, language} = this.props
    let columnData = cloneDeep(getColumnData(this.state, this.props))
    // internationalize columns, if translations are on
    for (let i in columnData) {
      if (columnData[i].translation) {
        columnData[i].name += '_' + language
        columnData[i].label += ' (' + frontendLanguages[language] + ')'
      }
    }
    return columnData
  }

  setPage(page) {
    this.setState({page})
  }

  setItemsOnPage(itemsOnPage) {
    this.setState({itemsOnPage})
  }

  renderFooter(data) {
    const { getExtraFooterContent } = this.props
    const count = data.length
    const labelDisplayedRows = ({ from, to, count }) => `zobrazeno ${from}-${to} z ${count}`
    const labelRowsPerPage = <span>Položek na stránku:</span>
    const extraContent = getExtraFooterContent(this.state, this.props)
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            count={count}
            labelDisplayedRows={labelDisplayedRows}
            labelRowsPerPage={labelRowsPerPage}
            rowsPerPage={this.state.itemsOnPage}
            rowsPerPageOptions={itemPerListPageOptions}
            page={this.state.page}
            onChangePage={(e, page) => this.setPage(page)}
            onChangeRowsPerPage={e => this.setItemsOnPage(e.target.value)}
          />
        </TableRow>
        {extraContent !== null && (
          <TableRow>
            <TableCell colSpan="50">
              {extraContent}
            </TableCell>
          </TableRow>
        )}
      </TableFooter>
    )
  }

  componentDidMount() {
    /* DEV */console.timeEnd('List->render()')/* /DEV */
  }
  componentDidUpdate() {
    /* DEV */console.timeEnd('List->render()')/* /DEV */
  }
}
