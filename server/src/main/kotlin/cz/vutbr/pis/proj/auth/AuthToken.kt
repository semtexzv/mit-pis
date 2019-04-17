package cz.vutbr.pis.proj.auth

import cz.vutbr.pis.proj.data.Employee
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority

class GrantedAuthorityImpl(val a: String) : GrantedAuthority {
    override fun getAuthority(): String = a
}

class AuthToken(val token: String, val user: Employee? = null) : AbstractAuthenticationToken(if (user != null) user.sysRole.authorities.map { GrantedAuthorityImpl(it) } else null) {
    override fun getCredentials(): Any {
        return ""
    }

    override fun getPrincipal(): Any {
        return user ?: Any()
    }

}