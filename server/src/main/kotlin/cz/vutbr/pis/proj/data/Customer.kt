package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
open class Customer(
        var name: String = "",
        var surname: String = "",
        var title: String = "",
        var info: String = "",

        @Column(name = "assoc_employee_id", nullable = false)
        var assocEmployeeId: Int? = null,

        @Column(name = "brand_id", nullable = false)
        var brandId: Int? = null,

        @ManyToOne(cascade = [CascadeType.MERGE, CascadeType.PERSIST])
        @JoinColumn(name = "assoc_employee_id", insertable = false, updatable = false)
        @JsonIgnore
        var employee: Employee? = null,

        @ManyToOne(cascade = arrayOf(CascadeType.MERGE, CascadeType.PERSIST))
        @JoinColumn(name = "brand_id", referencedColumnName = "id", insertable = false, updatable = false)
        @JsonIgnore
        var brand: Brand? = null,


        @JsonIgnore
        @OneToMany(mappedBy = "id")
        var meetings : List<Meeting>? = null
) : BaseEntity() {

}

