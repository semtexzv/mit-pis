// import React from 'react'
// import cls from 'layout.less'
import ProjectRepository from 'storages/ProjectRepository'

export default (value, row, column) => {
  const id = +value
  if (!id) return ''
  const project = ProjectRepository.getById(id)
  if (!project) return ''
  return project.name
}
