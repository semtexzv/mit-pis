package cz.vutbr.pis.proj.rest

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.auth.CustomSecurityService
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.Employee
import cz.vutbr.pis.proj.data.Meeting
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import cz.vutbr.pis.proj.repo.MeetingRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import cz.vutbr.pis.proj.unauthorized
import cz.vutbr.pis.proj.util.BadReqException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/employee")
class EmployeeController : BaseController<Employee, Employee, EmployeeRepo>() {


    @Autowired
    lateinit var secService : CustomSecurityService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var authRepo: AuthInfoRepo

    @Autowired
    lateinit var meetingRepo : MeetingRepo

    @PostMapping("/")
    override fun createOne(@RequestBody data: Employee): Employee {


        var old = repo.findByUsername(data.username)
        if (old != null) {
            throw BadReqException("Login already exists")
        }
        var p = Employee();
        p.username = data.username;

        try {
            p = repo.saveAndFlush(p)
        } catch (e: Exception) {
            throw BadReqException("Login already exists")
        }

        var a = authRepo.findById(p.id).orElseGet { null };
        if (a == null) {
            a = AuthInfo();
        }
        a.employeeId = p.id
        p = repo.getOne(p.id)
        return p;
    }


    @GetMapping("/{id}")
    override fun getOne(@PathVariable id: Int?): Employee? {
        val x = super.getOne(id)

        return x;
    }

    @PostMapping("/{id}")
    @PreAuthorize("@secService.canModifyUser(#id)")
    override fun modifyOne(@PathVariable id: Int?, @RequestBody data: String): Employee {
        val currentRole = secService.currentToken().user?.sysRole!!;

        val changed = super.modifyOne(id, data)
        val new = repo.getOne(id!!)

        if(new.sysRole.ordinal > currentRole.ordinal) {

            throw BadReqException("Cant change role to higher than current user")
        }
        return changed
    }

    @GetMapping("/{id}/meetings")
    fun getMeetings(@PathVariable id: Int?): List<Meeting>? {
        val user = getOne(id)
        return listOf()
        //return user!!.customers?.map{ it?.meetings ?: listOf() }?.flatten() ?: listOf()
    }

}