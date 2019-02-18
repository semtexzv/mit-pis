package cz.vutbr.pis.proj.repo

import cz.vutbr.pis.proj.data.PersonResource

interface PersonRepo : BaseRepository<PersonResource, PersonResource> {
    fun findByUsername(login: String): PersonResource?
}