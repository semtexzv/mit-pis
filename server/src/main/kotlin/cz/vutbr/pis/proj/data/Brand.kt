package cz.vutbr.pis.proj.data

import javax.persistence.Entity

@Entity
class Brand(
        var name : String = ""
) : BaseEntity() {

}