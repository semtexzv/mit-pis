package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.SpecializationId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.NoRepositoryBean

@NoRepositoryBean
interface BaseSpecialization<S, D> : JpaRepository<D, SpecializationId> {

    fun findAllProjectedBy(): List<S>


}


