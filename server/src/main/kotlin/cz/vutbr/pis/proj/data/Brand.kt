package cz.vutbr.pis.proj.data

import javax.persistence.*

@Entity
@Table(name = "brand")
class Brand(
       var name: String = ""
): BaseEntity()