package cz.vutbr.pis.proj.auth

import cz.vutbr.pis.proj.data.Employee
import org.springframework.security.authentication.AbstractAuthenticationToken

class AuthToken(val token: String, val user: Employee? = null) : AbstractAuthenticationToken(if (user != null) arrayListOf(user.sysRole) else null) {
    override fun getCredentials(): Any {
        return ""
    }

    override fun getPrincipal(): Any {
        return ""
    }

}