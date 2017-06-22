using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http.Filters;
using Newtonsoft.Json;

namespace YoutubeLinks.Api.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception;
            var exceptionMessage = exception.Message;
            exception = exception.InnerException;
            while (exception != null)
            {
                exceptionMessage += $"InnerException: {exception.Message}";
                exception = exception.InnerException;
            }
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