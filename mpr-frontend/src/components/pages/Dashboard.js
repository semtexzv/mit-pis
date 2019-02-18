import React, { PureComponent } from 'react'
import PageWrapper from 'containers/common/PageWrapper'
import cls from 'layout.less'
import {getFullName} from 'helpers'
// import Button from 'material-ui/Button'
import Box from 'containers/common/Box'
import Loader from 'components/helpers/Loader'
import PageContent from 'containers/common/PageContent'
// import { NavLink } from 'react-router-dom'
// import cls from 'layout.less'

export default class Dashboard extends PureComponent {
  render() {
    const {loggedUserId, personLoading, projectLoading, getProjects, getPeople, getPerson} = this.props
    const projects = getProjects()
    const people = getPeople()

    const projectCount = projects.length
    const runningProjectCount = projects.filter(item => item.status === 'ACTIVE').length
    const user = getPerson(loggedUserId)
    const personsCount = people.length
    const averageCount = projectCount ? projects.reduce((acc, item) => acc + item.participants.length, 0) / projectCount : 0
    return (
      <PageWrapper title="Přehled" heading="Přehled systému">
        <PageContent title="Aplikace pro správu lidských zdrojů a projektů">
          Vytvářejte projekty, spravujte lidské zdroje, rozřazujte role a rozdělujte práci.
        </PageContent>
        <PageContent title="">
          {!personLoading && user ? (
            <Box title="Přihlášený uživatel">
              Jméno: <span className={cls.highlight}>{getFullName(user)}</span><br/>
              Adresa: <span className={cls.highlight}>{user.street} {user.houseNumber}, {user.city}, {user.country}</span>
            </Box>
          ) : <Loader />}
          {!projectLoading ? (
            <Box title="Projekty">
              Počet projektů: <strong className={cls.highlight}>{projectCount}</strong> <br/>
              Počet aktivních projektů: <strong className={cls.highlight}>{runningProjectCount}</strong>
            </Box>
          ) : <Loader />}
          {!projectLoading && !personLoading ? (
            <Box title="Uživatelé">
              Počet uživatelů: <strong className={cls.highlight}>{personsCount}</strong> <br/>
              Průměrný počet uživatelů na projekt: <strong className={cls.highlight}>{averageCount}</strong>
            </Box>
          ) : <Loader />}
        </PageContent>
      </PageWrapper>
    )
  }
}
