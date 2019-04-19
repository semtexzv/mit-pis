package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.*
import cz.vutbr.pis.proj.auth.AuthToken
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.Employee
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import cz.vutbr.pis.proj.rest.types.ErrorResponse
import cz.vutbr.pis.proj.rest.types.LoginData
import cz.vutbr.pis.proj.rest.types.LoginResponse
import cz.vutbr.pis.proj.rest.types.RegisterData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api")
class LoginController {

    @Autowired
    lateinit var employeeRepo: EmployeeRepo

    @Autowired
    lateinit var authRepo: AuthInfoRepo

    @RequestMapping("/login", method = [RequestMethod.POST])
    fun login(@RequestBody data: LoginData?): Any {

        if (data == null) {
            return badReq("No data provided")
        }

        if (data.username.isBlank()) {
            return badReq("No login provided")
        }

        if (data.password.isBlank()) {
            return badReq("Not password provided")
        }

        val person = employeeRepo.findByUsername(data.username) ?: return badReq("Login not found");

        val auth: AuthInfo? = person.authInfo ?: return badReq("Problem with auth")

        auth!!.passHash?.let {
            it.takeIf { pass -> data.password == pass }?.let {
                auth.lastLogin = LocalDateTime.now()
                val token = ProjApplication.genToken()
                auth.lastToken = token

                if (data.remember) {
                    auth.validUntil = LocalDateTime.now().plusDays(14)
                } else {
                    auth.validUntil = LocalDateTime.now().plusHours(4)
                }
                authRepo.save(auth)
                return LoginResponse(token)
            } ?: return badReq("Bad password!")
        } ?: return badReq("Problem with auth")
    }

    @RequestMapping("/logout", method = arrayOf(RequestMethod.GET))
    fun logout(): Any {
        val token2 = SecurityContextHolder.getContext().authentication;
        val token = token2 as? AuthToken
        if (token == null) {
            return unauthorized("Not authorized to logout")
        }

        val auth = authRepo.findByLastToken(token.token);

        if (auth == null) {
            return unauthorized("Auth token not found")
        }

        auth.lastToken = null;
        authRepo.save(auth);
        return ErrorResponse("Sucess logging out");
    }

    @RequestMapping("/register", method = arrayOf(RequestMethod.POST))
    fun register(@RequestBody data: RegisterData?): Any {
        if (data == null) {
            return badReq("Missing body")
        }

        var old = employeeRepo.findByUsername(data.username)
        if (old != null) {
            return badReq("Login already exists")
        }
        var p = Employee();
        p.username = data.username

        try {
            p = employeeRepo.saveAndFlush(p)
        } catch (e: Exception) {
            return badReq("Login already exists")
        }

        var a = AuthInfo();
        a.passHash = ProjApplication.hash(data.password)
        a.employeeId = p.id
        a.employee = p;
        p = employeeRepo.getOne(p.id)
        authRepo.save(a)
        employeeRepo.save(p)


        return ResponseEntity(employeeRepo.findById(p.id), HttpStatus.CREATED)
    }


    data class PassData(var password: String? = null)

    @PostMapping("/password")
    fun changePassword(@RequestBody data: PassData?): Any {
        if (data == null) {
            return badReq("Invalid data provided")
        }
        val token2 = SecurityContextHolder.getContext().authentication;
        val token = token2 as? AuthToken

        if (token?.user?.id == null) {
            return unauthorized("User not found")
        }
        val auth = authRepo.findById(token.user.id).orElseGet { null }

        if (auth == null) {
            return badReq("Auth info not found");
        }

        auth.passHash = ProjApplication.hash(data.password);
        authRepo.save(auth);
        logout();
        return ErrorResponse("Password changed")
    }

    data class MeRes(val id: Int)

    @GetMapping("/me")
    fun me(): Any {
        val token2 = SecurityContextHolder.getContext().authentication;
        val token = token2 as? AuthToken
        return MeRes(token!!.user!!.id);
    }


}