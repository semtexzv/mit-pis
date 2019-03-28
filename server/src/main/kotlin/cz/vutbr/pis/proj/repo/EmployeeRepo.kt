package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.Employee

interface EmployeeRepo : BaseRepository<Employee, Employee> {
    fun findByUsername(login: String): Employee?
}