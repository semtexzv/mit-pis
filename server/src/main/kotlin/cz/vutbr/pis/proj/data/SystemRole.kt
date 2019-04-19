package cz.vutbr.pis.proj.data

import org.springframework.security.core.GrantedAuthority

enum class SystemRole(vararg val authorities: String) {
    USER("USER"),
    MANAGER("USER", "MANAGER"),
    ADMIN("USER", "MANAGER", "ADMIN"),
    OWNER("USER", "MANAGER", "ADMIN", "OWNER");


}