package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.data.Specialization
import cz.vutbr.pis.proj.data.SpecializationId
import cz.vutbr.pis.proj.repo.BrandRepo
import cz.vutbr.pis.proj.repo.EmployeeRepo
import cz.vutbr.pis.proj.repo.SpecializationRepo
import cz.vutbr.pis.proj.rest.base.BaseSpecializationController
import cz.vutbr.pis.proj.rest.types.ErrorResponse
import cz.vutbr.pis.proj.rest.types.SpecializationData
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/specialization")
class SpecializationController: BaseSpecializationController<Specialization, Specialization, SpecializationRepo>() {

    @Autowired
    lateinit var employeeRepo: EmployeeRepo

    @Autowired
    lateinit var brandRepo: BrandRepo

    @PostMapping("/add")
    fun addSpecialization(@RequestBody data: SpecializationData?): Any {

      data?.let {
         val employee = employeeRepo.getOne(data.employeeId)
          val brand = brandRepo.getOne(data.brandId)
          val specialization = Specialization(SpecializationId(data.employeeId, data.brandId), employee, brand )

          repo.save(specialization)

          return repo.getOne(specialization.id)
        } ?: return ErrorResponse("No data")


    }


}