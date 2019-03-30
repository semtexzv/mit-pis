package cz.vutbr.pis.proj.rest

import cz.vutbr.pis.proj.data.Meeting
import cz.vutbr.pis.proj.repo.MeetingRepo
import cz.vutbr.pis.proj.rest.base.BaseController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/meeting")
class MeetingController : BaseController<Meeting,Meeting, MeetingRepo> () {

}