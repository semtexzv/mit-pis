package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
open class Customer(
        var name: String = "",
        var surname: String = "",
        var title : String = "",
        var info : String = "",

        @ManyToOne(cascade = arrayOf(CascadeType.MERGE, CascadeType.PERSIST))
        @JoinColumn(name = "assoc_employee_id", insertable = false, updatable = false)
        @JsonIgnore
        var qualification: Employee? = null,

        @ManyToOne(cascade = arrayOf(CascadeType.MERGE, CascadeType.PERSIST))
        @JoinColumn(name = "brand_id", insertable = false, updatable = false)
        @JsonIgnore
        var brand: Brand? = null
) : BaseEntity() {

}

