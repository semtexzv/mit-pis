package cz.vutbr.pis.proj.auth

import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class AuthProvider : AuthenticationProvider {

    @Autowired
    lateinit var employeeRepo: EmployeeRepo

    @Autowired
    lateinit var authInfoRepo: AuthInfoRepo


    override fun authenticate(authentication: Authentication?): Authentication? {
        val token = authentication as AuthToken?
        if (token == null) {
            throw BadCredentialsException("Invalid token - " + token);
        }

        val info = authInfoRepo.findByLastToken(token.token);
        if (info == null) {
            throw BadCredentialsException("Token not found")
        }
        if(info.validUntil == null || info.validUntil!!.isBefore(LocalDateTime.now())){
            throw BadCredentialsException("Token Expired")
        }
        val person = info.person;
        val res = AuthToken(token.token, person)
        return res;
    }

    override fun supports(authentication: Class<*>?): Boolean {
        return AuthToken::class.java.isAssignableFrom(authentication);
    }
}