package cz.vutbr.pis.proj.data

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class AuthInfo(
        @Id
        @Column(name = "employee_id")
        var employeeId: Int = 0,

        @OneToOne(cascade = arrayOf(CascadeType.PERSIST, CascadeType.MERGE), fetch = FetchType.EAGER)
        @JoinColumn(name = "employee_id", insertable = false, updatable = false)
        var employee: Employee? = null,


        var passHash: String? = null,

        var lastToken: String? = null,
        var lastLogin: LocalDateTime? = null,
        var validUntil: LocalDateTime? = null
)