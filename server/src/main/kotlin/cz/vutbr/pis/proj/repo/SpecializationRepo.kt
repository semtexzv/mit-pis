package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.Specialization
import cz.vutbr.pis.proj.data.SpecializationId
import org.springframework.data.jpa.repository.JpaRepository

interface SpecializationRepo : JpaRepository<Specialization,SpecializationId> {




}