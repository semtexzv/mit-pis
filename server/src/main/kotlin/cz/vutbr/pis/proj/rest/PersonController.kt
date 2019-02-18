package cz.vutbr.pis.proj.rest

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.PersonResource
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.PersonRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import cz.vutbr.pis.proj.util.BadReqException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/person")
class PersonController : BaseController<PersonResource, PersonResource, PersonRepo>() {


    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var authRepo: AuthInfoRepo

    @PostMapping("/")
    override fun createOne(@RequestBody data: PersonResource): PersonResource {


        var old = repo.findByUsername(data.username)
        if (old != null) {
            throw BadReqException("Login already exists")
        }
        var p = PersonResource();
        p.username = data.username;

        try {
            p = repo.saveAndFlush(p)
        } catch (e: Exception) {
            throw BadReqException("Login already exists")
        }

        var a = authRepo.findById(p.id).orElseGet { null };
        if (a == null) {
            a = AuthInfo();
        }
        a.personId = p.id
        p = repo.getOne(p.id)
        return p;
    }


    @GetMapping("/{id}")
    override fun getOne(@PathVariable id: Int?): PersonResource? {
        val x = super.getOne(id)

        return x;
    }

    @PostMapping("/{id}")
    @PreAuthorize("@secService.canModifyUser(#id)")
    override fun modifyOne(@PathVariable id: Int?, @RequestBody data: String): PersonResource {
        val map: HashMap<String, Any> = objectMapper.readValue(data);

        return super.modifyOneInternal(id, data) {
            if (map.containsKey("oldPassword") && map.containsKey("newPassword")) {
                val auth = authRepo.findById(id!!).orElse(null);
                if (auth != null && auth.passHash == ProjApplication.hash(map["oldPassword"] as String)) {
                    auth.passHash = ProjApplication.hash(map["newPassword"] as String);
                }
            }
        }
    }

}