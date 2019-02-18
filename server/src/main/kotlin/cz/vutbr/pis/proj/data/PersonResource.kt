package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity

class PersonResource(
        @Column
        var username: String = "",

        var name: String = "",
        var surname: String = "",

        var street: String = "",
        var houseNumber: String = "",
        var city: String = "",
        var postalCode: String = "",
        var country: String = "",

        var phone: String = "",
        var email: String = "",

        @JsonIgnore
        var sysRole: SystemRole = SystemRole.USER,

        @JsonIgnore
        @OneToOne(mappedBy = "person")
        var authInfo: AuthInfo? = null


) : BaseEntity() {

}


interface PersonSimpleView {
    val id: String
    val name: String
}