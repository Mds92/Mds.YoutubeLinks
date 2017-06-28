using System;

namespace YoutubeLinks.Common
{
    public static class ExceptionHelper
    {
        public static string GetExceptionMessages(this Exception exception)
        {
            var exceptionMessage = exception.Message;
            exception = exception.InnerException;
            while (exception != null)
            {
                exceptionMessage += $"InnerException: {exception.Message}";
                exception = exception.InnerException;
            }
            return exceptionMessage;
        }
    }
}