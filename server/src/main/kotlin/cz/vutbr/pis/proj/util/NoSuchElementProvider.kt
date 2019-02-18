package cz.vutbr.pis.proj.util

import cz.vutbr.pis.proj.badReq
import cz.vutbr.pis.proj.notFound
import cz.vutbr.pis.proj.rest.types.ErrorResponse
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import javax.persistence.EntityNotFoundException


@ControllerAdvice
class NoSuchElementProvider : ResponseEntityExceptionHandler() {
    @ExceptionHandler(value = arrayOf(NoSuchElementException::class, EmptyResultDataAccessException::class, EntityNotFoundException::class))
    fun handle(e: Throwable, req: WebRequest): ResponseEntity<ErrorResponse> {
        e.printStackTrace()
        return notFound(e.message ?: "?")
    }

    @ExceptionHandler(BadReqException::class)
    fun handleBR(e: Throwable, req: WebRequest): ResponseEntity<ErrorResponse> {
        return badReq(e.message ?: "")
    }
    /*
    @ExceptionHandler(Throwable::class)
    fun handleIOException(ex: IOException, request: HttpServletRequest): String {
        return "every thing you asked for: $request"
    }
    */

}