package cz.vutbr.pis.proj.auth

import cz.vutbr.pis.proj.repo.EmployeeRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class CustomSecurityService {

    @Autowired
    lateinit var employeeRepo: EmployeeRepo

    fun currentToken(): AuthToken {
        val token2 = SecurityContextHolder.getContext().authentication;
        val token = token2 as? AuthToken ?: throw BadCredentialsException("Not authorized for this")
        return token
    }

    fun canModifyUser(id: Int?): Boolean {
        val token = currentToken();

        return id?.let { id ->
            (token.user?.sysRole?.ordinal ?: 0) >= (employeeRepo?.getOne(id)?.sysRole?.ordinal ?: 10)
        } ?: false || currentToken().user?.id == id
    }

}