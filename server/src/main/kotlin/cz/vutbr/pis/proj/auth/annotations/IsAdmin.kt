package cz.vutbr.pis.proj.auth.annotations

import org.springframework.security.access.prepost.PreAuthorize

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.TYPE)
@Retention(AnnotationRetention.RUNTIME)
@PreAuthorize("hasAuthority('ADMIN')")
public annotation class IsAdmin {

}

