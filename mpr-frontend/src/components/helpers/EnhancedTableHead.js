import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

export default class EnhancedTableHead extends PureComponent {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render() {
    const { onSelectAllClick, order, orderBy, columnData } = this.props

    return (
      <TableHead>
        <TableRow className={cls.tableRow}>
          <TableCell padding='checkbox' className={cls.tableHeadCell}>
            <Checkbox color="default" onChange={onSelectAllClick} />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.name}
                numeric={column.numeric}
                padding={column.padding || 'default'}
                className={cls.tableHeadCell}
              >
                <TableSortLabel
                  active={orderBy === column.name}
                  direction={order || 'asc'}
                  onClick={this.createSortHandler(column.name)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}
