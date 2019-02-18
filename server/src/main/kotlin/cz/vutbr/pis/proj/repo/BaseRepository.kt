package cz.vutbr.pis.proj.repo

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.NoRepositoryBean

@NoRepositoryBean
interface BaseRepository<S, D> : JpaRepository<D, Int> {

    fun findAllProjectedBy(): List<S>


}