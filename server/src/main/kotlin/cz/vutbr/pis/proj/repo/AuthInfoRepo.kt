package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.AuthInfo
import org.springframework.data.jpa.repository.JpaRepository

interface AuthInfoRepo : JpaRepository<AuthInfo, Int> {
    fun findByLastToken(login: String): AuthInfo?
}