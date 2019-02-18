package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
open class BaseEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        var id: Int = 0,

        @JsonIgnore
        var lastModifiedDate: LocalDateTime? = LocalDateTime.now()

) {
    @get:JsonProperty("lastModified")
    @set:JsonProperty("lastModified")
    var lastModified: String?
        get () {
            return lastModifiedDate?.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        }
        set(value) {
            if (value != null) {
                lastModifiedDate = LocalDateTime.parse(value, DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            }
        }
}