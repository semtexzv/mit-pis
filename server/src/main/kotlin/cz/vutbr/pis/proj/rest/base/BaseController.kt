package cz.vutbr.pis.proj.rest.base

import cz.vutbr.pis.proj.repo.BaseRepository
import cz.vutbr.pis.proj.util.JsonPatcher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.PathVariable


abstract class BaseController<S, D, R : BaseRepository<S, D>> {

    @Autowired
    lateinit var repo: R

    @Autowired
    lateinit var patcher: JsonPatcher

    @GetMapping("")
    open fun getList(): List<S> {
        return repo.findAllProjectedBy()
    }

    @GetMapping("/{id}")
    open fun getOne(@PathVariable("id") id: Int?): D? {
        return repo.getOne(id!!)
    }

    @PostMapping("")
    open fun createOne(@RequestBody data: D): D {
        return repo.save(data);
    }

    @PostMapping("/{id}")
    open fun modifyOne(@PathVariable("id") id: Int?, @RequestBody data: String): D {
        return modifyOneInternal(id, data, null)
    }

    open fun modifyOneInternal(@PathVariable("id") id: Int?, @RequestBody data: String, postPatch: ((D) -> Unit)? = null): D {
        val old = repo.findById(id!!).get();
        val n = patcher.patch(data, old);
        if (postPatch != null) {
            postPatch?.invoke(n)
        }

        return repo.save(n);
    }

    open fun performDelete(id: Int?) {
        return repo.deleteById(id!!);
    }

    @DeleteMapping("/{ids}")
    open fun deleteMany(@PathVariable ids: Array<Int?>) {
        for (i in ids) {
            performDelete(i)
        }
    }
}