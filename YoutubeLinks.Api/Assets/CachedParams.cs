using System.Collections.Generic;
using YoutubeLinks.Common;

namespace YoutubeLinks.Api
{
    public static class CachedParams
    {
        private static List<string> _allowdDomains;
        public static List<string> AllowdDomains
        {
            get
            {
                if (_allowdDomains != null) return _allowdDomains;
                _allowdDomains = new List<string>();
                var allowedDomain1 = ConfigurationHelper.GetApplicationSettingValue<string>("AllowedDomain1");
                var allowedDomain2 = ConfigurationHelper.GetApplicationSettingValue<string>("AllowedDomain2");
                var allowedDomain3 = ConfigurationHelper.GetApplicationSettingValue<string>("AllowedDomain3");
                var allowedDomain4 = ConfigurationHelper.GetApplicationSettingValue<string>("AllowedDomain4");
                _allowdDomains.AddRange(new [] { allowedDomain1, allowedDomain2, allowedDomain3, allowedDomain4 });
                return _allowdDomains;
            }
        }
    }
}