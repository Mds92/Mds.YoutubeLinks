using System;
using System.Linq;
using System.Text;

namespace YoutubeLinks.Api
{
    public static class StringHelper
    {
        public static string FirstCharToUpper(this string inputString)
        {
            if (string.IsNullOrWhiteSpace(inputString)) return "";
            return inputString.First().ToString().ToUpper() + inputString.Substring(1);
        }

        public static string ToBase64(this string inputString)
        {
            if (string.IsNullOrWhiteSpace(inputString)) return "";
            var plainTextBytes = Encoding.UTF8.GetBytes(inputString);
            return Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64ToPlainText(this string inputString)
        {
            if (string.IsNullOrWhiteSpace(inputString)) return "";
            var base64EncodedBytes = Convert.FromBase64String(inputString);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}