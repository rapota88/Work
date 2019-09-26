using DueDiliger.Common.Attribute;
using DueDiliger.Common.Enums;
using DueDiliger.Common.ViewModels.Global;
using DueDiliger.Common.ViewModels.TaskType;
using DueDiliger.Services.Interfaces;
using DueDiliger.WebAPI.Filters;
using Microsoft.AspNetCore.Mvc;

namespace DueDiliger.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/RelationType/[Action]")]
    [ServiceFilter(typeof(ValidateIsClientFilter))]                     
    public class RelationTypeController : BaseController
    {
        private readonly INRelationTypeService _nRelationTypeService;

        public RelationTypeController(INRelationTypeService nRelationTypeService)
        {
            _nRelationTypeService = nRelationTypeService;
        }

        [HttpPost]
        public IActionResult List([FromBody] GlobalFilteredPaginationIncomeModel model)
        {
            return OkResult(_nRelationTypeService.GetList(model, CurrentUser.CompanyId));
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateNRelationTypeIncomeModel model)
        {
            return OkResult(_nRelationTypeService.Create(model, CurrentUser.CompanyId, CurrentUser.Id));
        }

        [HttpPut]
        public IActionResult Update([FromBody] UpdateNRelationTypeIncomeModel model)
        {
            _nRelationTypeService.Update(model, CurrentUser.CompanyId);

            return OkResult();
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteObjectsIncomeModel model)
        {
            _nRelationTypeService.Delete(model, CurrentUser.CompanyId);

            return OkResult();
        }
    }
}