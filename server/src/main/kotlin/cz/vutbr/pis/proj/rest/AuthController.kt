package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.auth.AuthToken
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import cz.vutbr.pis.proj.rest.types.PasswordResponse
import cz.vutbr.pis.proj.unauthorized
import cz.vutbr.pis.proj.util.BadReqException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/auth_password/")
class AuthController : BaseController<AuthInfo, AuthInfo, AuthInfoRepo>() {

    @GetMapping("/user/{id}")
    fun getPassword(@PathVariable id: Int?): Any = id?.let {
        val token = SecurityContextHolder.getContext().authentication
        val authInfo = repo.getOne(it)
        authInfo.takeIf { info -> info.lastToken == (token as AuthToken).token }?.let { auth ->
            PasswordResponse(auth.passHash!!)
        } ?: unauthorized("Not yours id for get password")
    } ?: BadReqException("Not found password")


}