using System.Collections.Generic;

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
                _allowdDomains.Add(allowedDomain1);
                return _allowdDomains;
            }
        }
    }
}