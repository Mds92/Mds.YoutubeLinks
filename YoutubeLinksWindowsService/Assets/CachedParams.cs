using System.Collections.Generic;
using YoutubeLinks.Common;

namespace YoutubeLinksWindowsService.Assets
{
    public static class CachedParams
    {
        private static List<string> _folderPaths;
        public static List<string> FolderPaths
        {
            get
            {
                if (_folderPaths != null) return _folderPaths;
                _folderPaths = new List<string>();
                var allowedDomain1 = ConfigurationHelper.GetApplicationSettingValue<string>("FolderPath1");
                _folderPaths.AddRange(new [] { allowedDomain1 });
                return _folderPaths;
            }
        }

        private static int _hourNumber;
        public static int HourNumber
        {
            get
            {
                if (_hourNumber > 0) return _hourNumber;
                _hourNumber = ConfigurationHelper.GetApplicationSettingValue<int>("HourNumber");
                return _hourNumber;
            }
        }
    }
}