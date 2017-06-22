using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace YoutubeLinks.Api
{
    public static class StringHelper
    {
        public static string RemoveArabicChars(string inputString)
        {
            return inputString.Replace("ي", "ی").Replace("ك", "ک");
        }
        public static string ToPersianNumber(this double? input)
        {
            if (!input.HasValue) return string.Empty;
            var inputAsString = input.Value.ToString();
            if (string.IsNullOrEmpty(inputAsString)) return "";

            //۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
            return
                inputAsString.Replace("0", "۰")
                    .Replace("1", "۱")
                    .Replace("2", "۲")
                    .Replace("3", "۳")
                    .Replace("4", "۴")
                    .Replace("5", "۵")
                    .Replace("6", "۶")
                    .Replace("7", "۷")
                    .Replace("8", "۸")
                    .Replace("9", "۹");
        }
        public static string ToEnglishNumber(this string input)
        {
            if (string.IsNullOrEmpty(input)) return "0";

            //۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
            return input.Replace(",", "")
                .Replace("۰", "0")
                .Replace("۱", "1")
                .Replace("۲", "2")
                .Replace("۳", "3")
                .Replace("۴", "4")
                .Replace("۵", "5")
                .Replace("۶", "6")
                .Replace("۷", "7")
                .Replace("۸", "8")
                .Replace("۹", "9");
        }

        public static string FirstCharToUpper(this string inputString)
        {
            if (string.IsNullOrWhiteSpace(inputString)) return "";
            return inputString.First().ToString().ToUpper() + inputString.Substring(1);
        }

        public static string RemoveIllegalCharsForUrl(this string inputString)
        {
            // / ? < > \ : * | ” 
            if (string.IsNullOrWhiteSpace(inputString)) return string.Empty;
            inputString = Regex.Replace(inputString, @"^\s*|\s*$", "");
            inputString = Regex.Replace(inputString, @"\W+", "-");
            inputString = Regex.Replace(inputString, @"-*$|^-*", "").ToEnglishNumber();
            inputString = RemoveArabicChars(inputString);
            inputString = inputString.Replace("--", "-");
            return inputString;
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