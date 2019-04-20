package cz.vutbr.pis.proj.intialData

import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.data.*
import cz.vutbr.pis.proj.repo.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.*

@Component
class Seeder : ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var employyeRepo: EmployeeRepo

    @Autowired
    lateinit var authInfoRepo: AuthInfoRepo

    @Autowired
    lateinit var brandRepo: BrandRepo

    @Autowired
    lateinit var customerRepo: CustomerRepo

    @Autowired
    lateinit var meetingRepo: MeetingRepo

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        setEmployee()
        setBrand()
        setCustomers()
        setMeetings()
    }

    private fun setEmployee() {
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

    private fun setBrand() {
        brandRepo.save(Brand("Audi"))
        brandRepo.save(Brand("BMW"))
        brandRepo.save(Brand("Seat"))
        brandRepo.save(Brand("Jaguar"))
        brandRepo.save(Brand("Škoda"))
        brandRepo.save(Brand("Ferrari"))
        brandRepo.save(Brand("Lexus"))
        brandRepo.save(Brand("Mercedes"))
        brandRepo.save(Brand("Hyundai"))
        brandRepo.save(Brand("Honda"))
        brandRepo.save(Brand("Peugeot"))
        brandRepo.save(Brand("Fiat"))
        brandRepo.save(Brand("Renault"))
        brandRepo.save(Brand("Volkswagen"))
        brandRepo.save(Brand("Opel"))
    }

    private fun setCustomers() {
        val customer1 = Customer("test", "customer1", "", "", 1, 5, employyeRepo.getOne(1),brandRepo.getOne(5) )

        customerRepo.save(
         customer1
        )

        val test = employyeRepo.getOne(1)
        test.customers = listOf(customer1)
        employyeRepo.save(test)

    }

    private fun setMeetings(){

        val customer = customerRepo.getOne(20)

        meetingRepo.save(Meeting(report = "test test report", customerId = 20, customer = customer ))
        meetingRepo.save(Meeting(report = "test chbwufchuw fwefeqwfgwerg", customerId = 20, customer = customer ))
        meetingRepo.save(Meeting(report = "test chbfwerfqef c knerjgeklfjnelk ", customerId = 20, customer = customer ))
        meetingRepo.save(Meeting(report = "Loren ipsum", customerId = 20, customer = customer ))


    }

}