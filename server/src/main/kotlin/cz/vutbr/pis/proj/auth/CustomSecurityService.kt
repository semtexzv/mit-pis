package cz.vutbr.pis.proj.auth

import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class CustomSecurityService {
    fun currentToken(): AuthToken {
        val token2 = SecurityContextHolder.getContext().authentication;
        val token = token2 as? AuthToken ?: throw BadCredentialsException("Not authorized for this")
        return token
    }

    fun canModifyUser(id: Int?): Boolean {
        return true //  currentToken().user?.id == id
    }

}