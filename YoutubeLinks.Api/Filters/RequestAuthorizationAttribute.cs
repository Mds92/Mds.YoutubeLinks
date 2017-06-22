using System;
using System.Net;
using System.Net.Http;
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
                var domainUri = actionContext.Request.Headers.Referrer;
                if (!CachedParams.AllowdDomains.Contains(domainUri.Host))
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