package cz.vutbr.pis.proj.intialData

import cz.vutbr.pis.proj.ProjApplication
import cz.vutbr.pis.proj.data.*
import cz.vutbr.pis.proj.repo.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.util.*

@Component
class Seeder : ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var employeeRepo: EmployeeRepo

    @Autowired
    lateinit var authInfoRepo: AuthInfoRepo

    @Autowired
    lateinit var brandRepo: BrandRepo

    @Autowired
    lateinit var customerRepo: CustomerRepo

    @Autowired
    lateinit var meetingRepo: MeetingRepo

    @Autowired
    lateinit var specializationRepo: SpecializationRepo

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        setEmployee()
        setBrand()
        setCustomers()
        setMeetings()
        setSepcialization()
    }

    private fun setEmployee() {
        val admin = Employee("admin", "Lukáš", "Bezdeda", SystemRole.ADMIN)
        employeeRepo.save(admin)


        val ai = AuthInfo(1, admin, ProjApplication.hash("admin"), null, null, null)
        admin.authInfo = ai
        authInfoRepo.save(ai)
        employeeRepo.save(admin)

        val manager = Employee("manager", "Ján", "Nekonečný", SystemRole.MANAGER)
        employeeRepo.save(manager)

        val aiManagaer = AuthInfo(2, admin, ProjApplication.hash("manager"), null, null, null)
        manager.authInfo = aiManagaer
        authInfoRepo.save(aiManagaer)
        employeeRepo.save(manager)

        val owner = Employee("owner", "Jozef", "Chriašteľ", SystemRole.OWNER)
        employeeRepo.save(owner)

        val aiOwner = AuthInfo(3, admin, ProjApplication.hash("owner"), null, null, null)
        owner.authInfo = aiOwner
        authInfoRepo.save(aiOwner)
        employeeRepo.save(owner)

        val user = Employee("user", "Daniela", "Tichá", SystemRole.USER)
        employeeRepo.save(user)


        val aiUser = AuthInfo(4, admin, ProjApplication.hash("user"), null, null, null)
        user.authInfo = aiUser
        authInfoRepo.save(aiUser)
        employeeRepo.save(user)

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
        val customer1 = Customer("Ivana", "Môťovská", "Ing.", "platinum member", 2, 8, employeeRepo.getOne(2), brandRepo.getOne(8))

        customerRepo.save(customer1)

        val test = employeeRepo.getOne(2)
        test.customers = listOf(customer1)
        employeeRepo.save(test)


        val customer2 = Customer("Martin", "Lietava", "Bc.", "no member", 4, 9, employeeRepo.getOne(4), brandRepo.getOne(9))
        customerRepo.save(customer2)
        val customer3 = Customer("Ignác", "Miletič", ".", "", 4, 9, employeeRepo.getOne(4), brandRepo.getOne(9))
        customerRepo.save(customer3)

        val employee = employeeRepo.getOne(4).apply {
            this.customers = listOf(customer2, customer3)
        }
        employeeRepo.save(employee)

        val customer4 = Customer("Miroslav", "Mareš", "Phd.", "gold member", 1, 10, employeeRepo.getOne(1), brandRepo.getOne(10))
        customerRepo.save(customer4)

        val employee2 = employeeRepo.getOne(1).apply {
            this.customers = listOf(customer4)
        }

        employeeRepo.save(employee2)

        val customer5 = Customer("Marcel", "Zvolenský", "", "", 3, 7, employeeRepo.getOne(3), brandRepo.getOne(7))
        customerRepo.save(customer5)

        val employee3 = employeeRepo.getOne(3).apply {
            this.customers = listOf(customer5)
        }

        employeeRepo.save(employee3)
    }


    private fun setMeetings() {

        val customer = customerRepo.getOne(20)

        meetingRepo.save(Meeting(report = "Návšteva firmy na obhliadku áut", customerId = 20, customer = customer))
        meetingRepo.save(Meeting(report = "Vyber typu Jaguaru, objednávka No.1234785 ", customerId = 20, customer = customer))


        val customer2 = customerRepo.getOne(21)
        meetingRepo.save(Meeting(report = "Kúpa Škody Octavia", customerId = 21, customer = customer2))
        val customer3 = customerRepo.getOne(22)
        meetingRepo.save(Meeting(report = "Informácie ohľadne Škody superb a leasing", customerId = 22, customer = customer3))
        val customer4 = customerRepo.getOne(23)
        meetingRepo.save(Meeting(report = "Ferrari enzo objednávka No. 456697452", customerId = 23, customer = customer4))
        val customer5 = customerRepo.getOne(24)
        meetingRepo.save(Meeting(report = "Seat toledo informácie", customerId = 24, customer = customer5))
    }

    private fun setSepcialization() {
        val employee1 = employeeRepo.getOne(1)
        val employee2 = employeeRepo.getOne(2)
        val employee3 = employeeRepo.getOne(3)
        val employee4 = employeeRepo.getOne(4)


        val brand1 = brandRepo.getOne(10)
        val brand2 = brandRepo.getOne(8)
        val brand3 = brandRepo.getOne(7)
        val brand4 = brandRepo.getOne(9)

        specializationRepo.save(Specialization(SpecializationId(1, 10), employee1, brand1))
        specializationRepo.save(Specialization(SpecializationId(2, 8), employee2, brand2))
        specializationRepo.save(Specialization(SpecializationId(3, 7), employee3, brand3))
        specializationRepo.save(Specialization(SpecializationId(4, 9), employee4, brand4))
    }

}