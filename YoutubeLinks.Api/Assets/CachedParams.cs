﻿using System.Collections.Generic;

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
                _allowdDomains.AddRange(new [] { allowedDomain1, allowedDomain2 });
                return _allowdDomains;
            }
        }
    }
}