package cz.vutbr.pis.proj.rest

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.Employee
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import cz.vutbr.pis.proj.util.BadReqException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/employee")
class EmployeeController : BaseController<Employee, Employee, EmployeeRepo>() {


    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var authRepo: AuthInfoRepo

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
        return super.modifyOne(id, data);
    }

}