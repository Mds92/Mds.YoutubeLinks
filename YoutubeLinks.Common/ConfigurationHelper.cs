using System;
using System.Configuration;

namespace YoutubeLinks.Common
{
    public class ConfigurationHelper
    {
        private static string GetApplicationSettingValue(string key)
        {
            var value = ConfigurationManager.AppSettings[key];
            return string.IsNullOrEmpty(value) ? string.Empty : value;
        }

        public static T GetApplicationSettingValue<T>(string key)
        {
            return GetApplicationSettingValue(key, default(T));
        }

        private static T GetApplicationSettingValue<T>(string key, T defaultValue)
        {
            if (string.IsNullOrEmpty(GetApplicationSettingValue(key)))
                return defaultValue;
            try
            {
                var temp = Convert.ChangeType(GetApplicationSettingValue(key), typeof(T));
                return (T)temp;
            }
            catch (Exception ex)
            {
                throw new Exception($"Can not convert string to '{typeof(T).FullName}' type.", ex);
            }
        }
    }
}