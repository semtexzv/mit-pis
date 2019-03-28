package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Meeting(
        @JsonIgnore
        var date: LocalDateTime? = LocalDateTime.now(),
        var report : String = "",

        @ManyToOne(cascade = arrayOf(CascadeType.MERGE, CascadeType.PERSIST))
        @JoinColumn(name = "customer_id", insertable = false, updatable = false)
        @JsonIgnore
        var customer : Customer? = null
) : BaseEntity() {

}