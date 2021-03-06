package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "customer")
open class Customer(
        var name: String = "",
        var surname: String = "",
        var title: String = "",
        var info: String = "",

        @Column(name = "assoc_employee_id", nullable = false)
        var assocEmployeeId: Int? = null,

        @Column(name = "brand_id", nullable = false)
        var brandId: Int? = null,

        @ManyToOne(cascade = [CascadeType.MERGE], fetch = FetchType.EAGER)
        @JoinColumn(name = "assoc_employee_id", referencedColumnName = "id", insertable = false, updatable = false)
        @JsonIgnore
        var employee: Employee? = null,

        @ManyToOne(cascade = [CascadeType.MERGE])
        @JoinColumn(name = "brand_id", referencedColumnName = "id", insertable = false, updatable = false)
        @JsonIgnore
        var brand: Brand? = null,


        @JsonIgnore
        @OneToMany(mappedBy = "customer")
        var meetings : List<Meeting>? = null
) : BaseEntity() {

}

