using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace YoutubeLinks.Api.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class RequestAuthorizationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                var ipAddressString = ((HttpContextWrapper)actionContext.Request.Properties["MS_HttpContext"]).Request.UserHostName;
                if (!CachedParams.AllowdDomains.Contains(ipAddressString))
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                base.OnAuthorization(actionContext);
            }
            catch
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }
    }
}