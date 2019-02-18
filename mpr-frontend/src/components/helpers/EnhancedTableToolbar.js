import React, { PureComponent } from 'react'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchIcon from '@material-ui/icons/Search'
import cls from 'layout.less'

export default class EnhancedTableHead extends PureComponent {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { numSelected, title } = this.props
    const c = cls.toolbar + (numSelected > 0 ? ' ' + cls.highlight : '')

    return (
      <Toolbar className={c}>
        <div className={cls.title}>
          {numSelected > 0
            ? <Typography variant="subheading" className={cls.selection}>{this.getItemsText(numSelected)}</Typography>
            : <Typography variant="title" className={cls.name}>{title}</Typography>}
        </div>
        <div className={cls.spacer} />
        {this.renderActions()}
      </Toolbar>
    )
  }

  renderActions() {
    const { numSelected, deleteAction, filter, onFilter } = this.props
    const filterActive = filter !== false
    return (
      <div className={cls.actions}>
        {numSelected > 0 && (
          <IconButton aria-label="Odstranit" onClick={deleteAction}>
            <DeleteIcon />
          </IconButton>
        )}
        {!filterActive && (
          <IconButton className={cls.filterIcon} aria-label="Filtrovat výpis" onClick={() => onFilter('')}>
            <SearchIcon />
          </IconButton>
        )}
        <div className={cls.filterExpander + (filterActive ? ' ' + cls.expanded : '')}>
          {filterActive && (
            <TextField className={cls.textField} placeholder='Filtrovat výpis' value={filter} onChange={(e) => onFilter(e.target.value)} onBlur={::this.onFilterBlur} autoFocus />
          )}
        </div>
      </div>
    )
  }

  getItemsText(num) {
    if (num === 0) {
      return 'Nevybrána žádná položka'
    } else if (num === 1) {
      return 'Vybrána jedna položka'
    } else if (num < 5) {
      return 'Vybrány ' + num + ' položky'
    } else {
      return 'Vybráno ' + num + ' položek'
    }
  }

  onFilterBlur(e) {
    const { filter, onFilter } = this.props
    if (filter === '') {
      onFilter(false)
    }
  }
}
