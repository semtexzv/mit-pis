package cz.vutbr.pis.proj.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter
import org.springframework.security.web.util.matcher.*
import org.springframework.web.cors.CorsUtils
import javax.servlet.http.HttpServletRequest

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class SecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var authProvider: AuthProvider

    @Autowired
    lateinit var objectMapper: ObjectMapper

    final val PUBLIC_PATTERNS = arrayOf("/api/login", "/api/register", "/api/login/", "/api/register/")
    final val PUBLIC_MATCHERS = PUBLIC_PATTERNS.map { AntPathRequestMatcher(it) }.toTypedArray()


    override fun configure(http: HttpSecurity?) {
        super.configure(http)
        http!!
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .logout().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

        http.authorizeRequests()
                .requestMatchers(nonAuthMatcher).permitAll()
                .requestMatchers(object : RequestMatcher {
                    override fun matches(request: HttpServletRequest?): Boolean {
                        return CorsUtils.isPreFlightRequest(request!!)
                    }
                }).permitAll()
                .requestMatchers(authMatcher).authenticated().and()
                //.anyRequest().authenticated().and()
                .addFilterBefore(createCustomFilter(), AnonymousAuthenticationFilter::class.java);

    }

    val authMatcher: RequestMatcher = AndRequestMatcher(
            AntPathRequestMatcher("/api/**"),
            NegatedRequestMatcher(OrRequestMatcher(*PUBLIC_MATCHERS)))

    val nonAuthMatcher: RequestMatcher = OrRequestMatcher(
            NegatedRequestMatcher(AntPathRequestMatcher("/api/**")),
            OrRequestMatcher(*PUBLIC_MATCHERS))

    override fun configure(web: WebSecurity?) {
        web!!.ignoring().requestMatchers(nonAuthMatcher)
    }


    //Note, we don't register this as a bean as we don't want it to be added to the main Filter chain, just the spring security filter chain
    @Throws(Exception::class)
    protected fun createCustomFilter(): AbstractAuthenticationProcessingFilter {
        //here we define the interfaces which don't need any authorisation
        val filter = AuthFilter(authMatcher, objectMapper)
        filter.setAuthenticationManager(authenticationManagerBean())
        return filter
    }

}