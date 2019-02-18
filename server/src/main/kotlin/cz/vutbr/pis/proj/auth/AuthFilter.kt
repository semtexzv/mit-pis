package cz.vutbr.pis.proj.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.util.matcher.RequestMatcher
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AuthFilter(matcher: RequestMatcher?, val mapper: ObjectMapper) : AbstractAuthenticationProcessingFilter(matcher) {
    companion object {
        val TOKEN_HEADER = "Authorization"
    }

    override fun doFilter(req: ServletRequest?, res: ServletResponse?, chain: FilterChain?) {
        val token = (req as HttpServletRequest)?.getHeader(TOKEN_HEADER)

        if (token.isNullOrBlank()) {
            chain!!.doFilter(req, res);
            return;
        }

        this.setAuthenticationSuccessHandler { request, response, authentication ->
            chain!!.doFilter(request, response)
        }

        super.doFilter(req, res, chain)
    }

    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication? {
        var token = request?.getHeader(TOKEN_HEADER);

        if (token.isNullOrBlank()) {
            return null;
        }
        if(token!!.contains( ' ')) {
            token = token.split(' ')[1]
        }

        val at = AuthToken(token!!)
        at.details = authenticationDetailsSource.buildDetails(request);
        return authenticationManager.authenticate(at)
    }


    data class Msg(val message: String)

    override fun unsuccessfulAuthentication(request: HttpServletRequest?, response: HttpServletResponse, failed: AuthenticationException?) {
        //super.unsuccessfulAuthentication(request, response, failed)
        val resp = Msg(failed?.message ?: "?");

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        mapper.writeValue(response.outputStream, resp)
    }
}