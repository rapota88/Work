using DueDiliger.Common.Models;
using DueDiliger.Common.Models.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DueDiliger.WebAPI.Controllers
{
    /// <remarks>
    /// While creating new Controller, remember to add <c>CustomFeatureMatrixModuleAuthorizeAttribute</c>
    /// to enable Feature Matrix authorization and state which Module it belongs to.
    /// Also, to customize or add authorization requirements, use <c>CustomFeatureMatrixAuthorizeAttribute</c> on Controller's Actions.
    /// </remarks>
    public class BaseController : Controller
    {
        protected CurrentUserData CurrentUser;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            CurrentUser = new CurrentUserData(User.Claims);

            base.OnActionExecuting(context);
        }

        protected OkObjectResult OkResult(object value)
        {
            return Ok(new ApiResponse(value));
        }

        protected OkObjectResult OkResult()
        {
            return Ok(new ApiResponse());
        }
    }
}