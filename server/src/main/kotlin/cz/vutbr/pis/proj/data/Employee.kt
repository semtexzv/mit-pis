package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
class Employee(
        @Column
        var username: String = "",
        var name: String = "",
        var surname: String = "",

        /*
        var street: String = "",
        var houseNumber: String = "",
        var city: String = "",
        var postalCode: String = "",
        var country: String = "",

        var phone: String = "",
        var email: String = "",

*/
        var sysRole: SystemRole = SystemRole.USER,

        @JsonIgnore
        @OneToOne(mappedBy = "employee")
        var authInfo: AuthInfo? = null


) : BaseEntity() {

}
