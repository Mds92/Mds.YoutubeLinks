using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.ServiceProcess;
using System.Threading.Tasks;
using YoutubeLinks.Common;
using YoutubeLinksWindowsService.Assets;
using Timer = System.Timers.Timer;
using ZetaLongPaths;

namespace YoutubeLinksWindowsService
{
    public partial class YoutubeLinksService : ServiceBase
    {
        private readonly Timer _timer = new Timer();

        public YoutubeLinksService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            try
            {
#if DEBUG
                Debugger.Launch();
#endif 

                _timer.Enabled = true;
                _timer.Interval = (int)new TimeSpan(0, 1, 0).TotalMilliseconds;
                _timer.Elapsed += Timer1_Tick;
                _timer.Start();
#if DEBUG
                Timer1_Tick(null, null);
#endif 
            }
            catch (Exception e)
            {
                Trace.Write(e.GetExceptionMessages());
                Stop();
            }
        }

        protected override void OnStop()
        {
            _timer.Stop();
        }

        private void Timer1_Tick(object sender, EventArgs e)
        {
            try
            {
                var folderPaths = CachedParams.FolderPaths;
                var tasks = new List<Task>();
                foreach (var folderPath in folderPaths)
                {
                    tasks.Add(Task.Run(() =>
                    {
                        DeleteRedundantFiles(folderPath);
                    }));
                }
                Parallel.ForEach(tasks, task => task.Wait());
            }
            catch (Exception exception)
            {
                Trace.Write(exception.GetExceptionMessages());
            }

#if DEBUG
            _timer.Stop();
#endif 
        }

        private void DeleteRedundantFiles(string folderPath)
        {
            var before3HoursDateTime = DateTime.Now.AddHours(-3);
            var directoryInfo = new ZlpDirectoryInfo(folderPath);
            var fileInfoes = directoryInfo.GetFiles("*.*", SearchOption.AllDirectories);
            foreach (var zlpFileInfo in fileInfoes)
            {
                Trace.Write(zlpFileInfo.LastAccessTime);
                if (zlpFileInfo.LastAccessTime >= before3HoursDateTime) continue;
                try
                {
#if !DEBUG
                    zlpFileInfo.Delete();
#endif
                }
                catch (Exception e)
                {
                    Trace.Write(e.GetExceptionMessages());
                }
            }
        }
    }
}
