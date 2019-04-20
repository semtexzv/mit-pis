package cz.vutbr.pis.proj.intialData

import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.data.AuthInfo
import cz.vutbr.pis.proj.data.Employee
import cz.vutbr.pis.proj.data.SystemRole
import cz.vutbr.pis.proj.repo.AuthInfoRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component

@Component
class Seeder : ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var employyeRepo: EmployeeRepo

    @Autowired
    lateinit var authInfoRepo: AuthInfoRepo

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
       setEmployee()


    }

    private fun setEmployee(){
        val admin = Employee("admin", "admin", "admin", SystemRole.ADMIN)
        employyeRepo.save(admin)


        val ai = AuthInfo(1, admin, ProjApplication.hash("admin"), null, null, null)
        admin.authInfo = ai
        authInfoRepo.save(ai)
        employyeRepo.save(admin)

        val manager = Employee("manager", "manager", "manager", SystemRole.MANAGER)
        employyeRepo.save(manager)

        val aiManagaer = AuthInfo(2, admin, ProjApplication.hash("manager"), null, null, null)
        manager.authInfo = aiManagaer
        authInfoRepo.save(aiManagaer)
        employyeRepo.save(manager)

        val owner = Employee("owner", "owner", "owner", SystemRole.OWNER)
        employyeRepo.save(owner)

        val aiOwner = AuthInfo(3, admin, ProjApplication.hash("owner"), null, null, null)
        owner.authInfo = aiOwner
        authInfoRepo.save(aiOwner)
        employyeRepo.save(owner)

        val user = Employee("user", "user", "user", SystemRole.USER)
        employyeRepo.save(user)


        val aiUser = AuthInfo(4, admin, ProjApplication.hash("user"), null, null, null)
        user.authInfo = aiUser
        authInfoRepo.save(aiUser)
        employyeRepo.save(user)

    }

}