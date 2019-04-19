package cz.vutbr.pis.proj

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.*
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import cz.vutbr.pis.proj.auth.AuthProvider
import cz.vutbr.pis.proj.auth.CustomSecurityService
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.Employee
import cz.vutbr.pis.proj.data.SystemRole
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import cz.vutbr.pis.proj.rest.types.ErrorResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationListener
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.security.authentication.AuthenticationProvider
import java.util.*
import org.springframework.context.annotation.Primary
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Component
class Seeder : ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    lateinit var employyeRepo: EmployeeRepo

    @Autowired
    lateinit var authInfoRepo: AuthInfoRepo

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        val admin = Employee("admin", "admin", "admin", SystemRole.ADMIN)
        employyeRepo.save(admin)


        val ai = AuthInfo(1, admin, ProjApplication.hash("admin"), null, null, null)
        admin.authInfo = ai
        authInfoRepo.save(ai)
        employyeRepo.save(admin)
    }
}


@Configuration
@SpringBootApplication(exclude = arrayOf(RepositoryRestMvcAutoConfiguration::class))
class ProjApplication {

    @Bean
    fun secService(): CustomSecurityService {
        return CustomSecurityService()
    }


    @Bean
    @Primary
    fun objectMapper(): ObjectMapper {

        val builder = Jackson2ObjectMapperBuilder();
        val mod = JavaTimeModule();
        val ser = object : JsonSerializer<LocalDateTime>() {
            override fun serialize(value: LocalDateTime?, gen: JsonGenerator?, serializers: SerializerProvider?) {
                gen!!.writeString(value!!.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            }
        }
        val de = object : JsonDeserializer<LocalDateTime>() {
            override fun deserialize(p: JsonParser?, ctxt: DeserializationContext?): LocalDateTime {
                return LocalDateTime.parse(p!!.valueAsString)
            }
        }
        mod.addSerializer(LocalDateTime::class.java, ser)
        mod.addDeserializer(LocalDateTime::class.java, de)
        builder.modules(mod)
        val mapper = builder.build<ObjectMapper>()
        mapper.registerModule(mod)
        mapper.registerModule(KotlinModule())
        return mapper
    }


    companion object {
        fun hash(x: String?): String? = x
        fun genToken(): String {
            return UUID.randomUUID().toString()
        }

    }

}

fun callError(descr: String, code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): ResponseEntity<ErrorResponse> {
    return ResponseEntity(ErrorResponse(descr), code)
}

fun unauthorized(descr: String) = callError(descr, HttpStatus.UNAUTHORIZED)
fun badReq(descr: String) = callError(descr, HttpStatus.BAD_REQUEST)
fun notFound(descr: String) = callError(descr, HttpStatus.NOT_FOUND)

fun main(args: Array<String>) {
    runApplication<ProjApplication>(*args)
}
