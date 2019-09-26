using DueDiliger.Common.Enums;
using DueDiliger.Common.Exceptions;
using DueDiliger.Common.StaticResource;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace DueDiliger.WebAPI.Filters
{
    public class ValidateIsClientFilter : Attribute, IActionFilter
    {
      
        public ValidateIsClientFilter()
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var stringUserId = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtClaimIdentifiers.Id)?.Value;

            if (string.IsNullOrEmpty(stringUserId))
            {
                return;
            }

            var companyType = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtClaimIdentifiers.CompanyType)?.Value;

            if (companyType == null)
            {
                return;
            }

            var companyIsClient = context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtClaimIdentifiers.CompanyIsClient)?.Value;

            switch ((CompanyType)Enum.Parse(typeof(CompanyType), companyType))
            {
                case CompanyType.Manager:
                    return;
                case CompanyType.Investor:
                {
                    var isClient = false;
                    var companyIsRegistered = false;

                    if (!bool.TryParse(companyIsClient, out isClient))
                    {
                        throw new AccessDeniedException();
                    }

                    var isSharedFiles = bool.Parse(context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtClaimIdentifiers.IsSharedFiles)?.Value);
                    bool.TryParse(context.HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtClaimIdentifiers.CompanyIsRegistered)?.Value, out companyIsRegistered);

                    if (!companyIsRegistered && !isSharedFiles && !isClient)
                    {
                        throw new AccessDeniedException();
                    }

                    break;
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {}
    }
}
