package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.data.Customer
import cz.vutbr.pis.proj.repo.CustomerRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/customer")
class CustomerController : BaseController<Customer,Customer,CustomerRepo>() {

}