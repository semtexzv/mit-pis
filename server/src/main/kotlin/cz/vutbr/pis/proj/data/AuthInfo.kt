package cz.vutbr.pis.proj.data

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class AuthInfo(
        @Id
        @Column(name = "person_id")
        var personId: Int = 0,
        @OneToOne(cascade = arrayOf(CascadeType.PERSIST, CascadeType.MERGE), fetch = FetchType.EAGER)
        @JoinColumn(name = "person_id", insertable = false, updatable = false)
        var person: PersonResource? = null,
        var lastToken: String? = null,
        var lastLogin: LocalDateTime? = null,
        var validUntil: LocalDateTime? = null,
        var passHash: String? = null
)