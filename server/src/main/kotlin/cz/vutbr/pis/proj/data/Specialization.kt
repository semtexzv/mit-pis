package cz.vutbr.pis.proj.data

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonInclude
import java.io.Serializable
import javax.persistence.*

@JsonInclude(JsonInclude.Include.NON_NULL)
@Embeddable
class SpecializationId(
        @Column(name = "employee_id")
        var employeeId: Int = 0,
        @Column(name = "brand_id")
        var brandId: Int = 0) : Serializable {

}

@Entity
class Specialization(
        @EmbeddedId
        var id: SpecializationId = SpecializationId(0, 0),


        @ManyToOne(cascade = [CascadeType.MERGE])
        @JoinColumn(name = "employee_id", insertable = false, updatable = false)
        @JsonIgnore
        var employee: Employee? = null,

        @ManyToOne(cascade = [CascadeType.MERGE])
        @JoinColumn(name = "brand_id", insertable = false, updatable = false)
        @JsonIgnore
        var brand: Brand? = null
) {

}