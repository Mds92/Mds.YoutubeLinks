﻿using System.ServiceProcess;

namespace YoutubeLinksWindowsService
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            var servicesToRun = new ServiceBase[]
            {
                new YoutubeLinksService()
            };
            ServiceBase.Run(servicesToRun);
        }
    }
}
