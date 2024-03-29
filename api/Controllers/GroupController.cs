namespace Books.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly Services.GroupService _groupService;

        public GroupController(Services.GroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public ActionResult<List<Models.Group>> Get() =>
            _groupService.Get();

        [HttpGet("User/{id:length(36)}", Name = "GetUserGroups")]
        public ActionResult<List<Models.Group>> Get(string id)
        {
            var groups = _groupService.Get(id);

            if (groups == null)
            {
                return NotFound();
            }

            return groups;
        }

        [HttpGet("{id:length(24)}", Name = "GetGroup")]
        public ActionResult<Models.Group> GetUserGroup(string id)
        {
            var group = _groupService.GetGroup(id);

            if (group == null)
            {
                return NotFound();
            }

            return group;
        }

        [HttpPost]
        public ActionResult<Models.Group> Create(Models.Group group)
        {
            _groupService.Create(group);

            return CreatedAtRoute("GetUserGroup", new { id = group.Id.ToString() }, group);
        }
    }
}