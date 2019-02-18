package cz.vutbr.pis.proj.data

import org.springframework.security.core.GrantedAuthority

enum class SystemRole : GrantedAuthority {
    USER,
    ADMIN;

    override fun getAuthority(): String {
        return this.toString()
    }
}