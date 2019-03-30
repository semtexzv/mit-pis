package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.data.Brand
import cz.vutbr.pis.proj.repo.BrandRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/brand")
class BrandController : BaseController<Brand, Brand, BrandRepo>() {

}