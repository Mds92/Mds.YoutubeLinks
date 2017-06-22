using System.Web.Http;
using YoutubeLinks.Api.Filters;

namespace YoutubeLinks.Api.Controllers
{
    [CustomExceptionFilter]
    public class BaseController : ApiController
    {
    }
}
