using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http.Filters;
using Newtonsoft.Json;
using YoutubeLinks.Common;

namespace YoutubeLinks.Api.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception;
            var exceptionMessage = exception.GetExceptionMessages();
            context.Response = new HttpResponseMessage
            {
                Content = new StringContent(
                    JsonConvert.SerializeObject(new
                    {
                        ErrorMessage = exceptionMessage
                    }),
                    Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.InternalServerError
            };
        }
    }
}