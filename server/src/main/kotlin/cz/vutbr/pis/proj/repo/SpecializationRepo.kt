package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.Specialization
import org.springframework.data.jpa.repository.JpaRepository

interface SpecializationRepo: BaseSpecialization<Specialization, Specialization> {

}