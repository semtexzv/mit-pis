import React, { Component } from 'react'
import cls from 'layout.less'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import Loader from 'components/helpers/Loader'
import cloneDeep from 'lodash/cloneDeep'
import { getFullName } from 'helpers'
import Paper from 'material-ui/Paper'

const RASCI = ['R', 'A', 'S', 'C', 'I']

export default class DetailDialogMatrix extends Component {
  matrix = {}
  pristine = true

  render() {
    const {loading, getPerson, getRole, getProjectParticipants, getProjectWorkUnits} = this.props

    const matrix = this.props.getMatrix(this.props)
    if (loading && this.pristine || matrix === null) {
      return <Loader />
    }
    const participants = getProjectParticipants(this.props)
    const workUnits = getProjectWorkUnits(this.props)
    this.matrix = matrix

    return (
      <div className={cls.matrixTab}>
        <Paper className={cls.list} square elevation={1}>
          <Table>
            <TableHead>
              <TableRow className={cls.tableHeadRow}>
                <TableCell padding='none' className={cls.tableHeadCell + ' ' + cls.tableLegendCel}>
                  {loading && <Loader size={32} />}
                </TableCell>
                {participants.map(p => {
                  const person = getPerson(p.id)
                  const roles = p.roleIds.map(rid => getRole(rid))
                  const roleString = roles.reduce((res, role) => (res && (res + ', ')) + role, '')
                  return (
                    <TableCell key={p.id} title={roleString} padding='dense' className={cls.tableHeadCell}>
                      {getFullName(person)}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {workUnits.map(wunit => {
                const rasciRow = matrix.data[wunit.id] || {}
                return (
                  <TableRow
                    key={wunit.id}
                    className={cls.tableRow}
                    tabIndex="-1"
                  >
                    <TableCell padding='dense' className={cls.tableCell + ' ' + cls.tableLegendCell} onClick={e => this.handleClick(e)}>
                      {wunit.name}
                    </TableCell>
                    {participants.map(p => {
                      const cell = rasciRow[p.id] || {}
                      const { values: rasci = [] } = cell
                      return (
                        <TableCell key={p.id} padding='dense' className={cls.tableCell}>
                          {RASCI.map(a => {
                            const set = rasci.indexOf(a) >= 0
                            const c = cls.rasciLetter + ' ' + (set ? cls.rasciLetterSet : cls.rasciLetterUnset)
                            const event = set ? e => this.unsetRASCI(wunit.id, p.id, a) : e => this.setRASCI(wunit.id, p.id, a)
                            return (
                              <span key={a} className={c} onClick={event}>
                                {a}
                              </span>
                            )
                          })}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }

  setRASCI(wid, pid, letter) {
    const { updateMatrix } = this.props
    let newMatrix = cloneDeep(this.matrix)
    if (typeof newMatrix.data[wid] === 'undefined') {
      newMatrix.data[wid] = {}
    }
    if (typeof newMatrix.data[wid][pid] === 'undefined') {
      newMatrix.data[wid][pid] = {values: []}
    }
    // only one R in a row
    if (letter === 'R') {
      const pids = Object.keys(newMatrix.data[wid])
      pids.forEach(pid => {
        newMatrix.data[wid][pid].values = newMatrix.data[wid][pid].values.filter(a => a !== 'R')
      })
    }
    newMatrix.data[wid][pid].values.push(letter)
    this.pristine = false
    updateMatrix(this.props, newMatrix)
  }

  unsetRASCI(wid, pid, letter) {
    const { updateMatrix } = this.props
    let newMatrix = cloneDeep(this.matrix)
    if (typeof newMatrix.data[wid] === 'undefined') {
      newMatrix.data[wid] = {}
    }
    if (typeof newMatrix.data[wid][pid] === 'undefined') {
      newMatrix.data[wid][pid] = {values: []}
    }
    newMatrix.data[wid][pid].values = newMatrix.data[wid][pid].values.filter(a => a !== letter)
    this.pristine = false
    updateMatrix(this.props, newMatrix)
  }
}
