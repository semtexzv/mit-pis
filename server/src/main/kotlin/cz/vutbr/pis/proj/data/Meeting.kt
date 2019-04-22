package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "meeting")
class Meeting(

        var date: LocalDateTime? = LocalDateTime.now(),
        var report: String = "",

        @Column(name = "customer_id")
        var customerId: Int? = null,

        @ManyToOne(cascade = [CascadeType.MERGE])
        @JoinColumn(name = "customer_id", insertable = false, updatable = false)
        @JsonIgnore
        var customer: Customer? = null
) : BaseEntity()