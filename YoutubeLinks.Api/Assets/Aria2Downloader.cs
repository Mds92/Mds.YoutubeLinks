using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using ZetaLongPaths;

namespace YoutubeLinks.Api
{
    public static class Aria2Downloader
    {
        private static string _aria2Path;
        private static string Aria2Path
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(_aria2Path)) return _aria2Path;
                _aria2Path = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "Assets/aria2c.exe");
                return _aria2Path;
            }
        }

        public static void DownloadFile(string fileUrlToDownload, string destinationAbsoluteFileName, string proxy, int maxDownloadLimitInKiloBytes, Action<string> action)
        {
            if (!File.Exists(Aria2Path))
                throw new Exception("Downloader not found");

            var fileName = ZlpPathHelper.GetFileNameFromFilePath(destinationAbsoluteFileName);
            var directoryPath = ZlpPathHelper.GetDirectory(destinationAbsoluteFileName);
            if (!ZlpIOHelper.DirectoryExists(directoryPath))
                ZlpIOHelper.CreateDirectory(directoryPath);

            const int timeoutInMiliSeconds = 2 * 60 * 60 * 1000; // 2 hours

            var myUri = new Uri(fileUrlToDownload);
            var host = myUri.Host;

            var currentProcess = Process.GetCurrentProcess();

            var arguments =
                "--header=\"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\" " +
                $"--max-download-limit={maxDownloadLimitInKiloBytes}K " +
                $"--user-agent=\"Mozilla/5.0 {Guid.NewGuid()}\" " +
                " --allow-overwrite=true -x4 -s4 ";
            arguments += $" --referer=\"{host}\"";
            //arguments += string.Format(" --conf-path=\"{0}\"", UploadedPaths.AbsoluteAria2ConfigPath);
            //arguments += string.Format(" --log=\"{0}\"", UploadedPaths.AbsoluteAria2LogFilePath);
            arguments += string.Format(" --connect-timeout={0} --timeout={0}", 20);
            arguments += $" --stop-with-process={currentProcess.Id}";
            arguments += $" --dir \"{directoryPath}\"";
            arguments += $" --out \"{fileName}\" \"{fileUrlToDownload}\"";
            if (!string.IsNullOrWhiteSpace(proxy))
                arguments += $" --all-proxy={proxy}";

            using (var process = new Process())
            {
                process.StartInfo.FileName = Aria2Path;
                process.StartInfo.Arguments = arguments;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;

                using (var outputWaitHandle = new AutoResetEvent(false))
                using (var errorWaitHandle = new AutoResetEvent(false))
                {
                    process.OutputDataReceived += (sender, e) =>
                    {
                        try
                        {
                            if (e.Data == null)
                                outputWaitHandle.Set();
                            else
                                action?.Invoke(e.Data);
                        }
                        catch (Exception ex)
                        {
                            action?.Invoke($"{ex.Message} <br /> {ex.InnerException?.Message ?? string.Empty}");
                        }
                    };
                    process.ErrorDataReceived += (sender, e) =>
                    {
                        try
                        {
                            if (e.Data == null)
                                errorWaitHandle.Set();
                            else
                                action?.Invoke(e.Data);
                        }
                        catch (Exception ex)
                        {
                            action?.Invoke($"{ex.Message} <br /> {ex.InnerException?.Message ?? string.Empty}");
                        }
                    };

                    process.Start();

                    process.BeginErrorReadLine();
                    process.BeginOutputReadLine();

                    if (process.WaitForExit(timeoutInMiliSeconds) &&
                        (outputWaitHandle.WaitOne(timeoutInMiliSeconds) || errorWaitHandle.WaitOne(timeoutInMiliSeconds)))
                    {
                        if (!process.HasExited)
                            process.Kill();
                        action?.Invoke($"'{fileUrlToDownload}' Successfully Downloaded");
                        return;
                    }
                    if (!process.HasExited)
                        process.Kill();

                    action?.Invoke($"Error in Downloading '{fileUrlToDownload}'");
                }
            }
        }

        public static Tuple<long, string> GetFileSizeInBytesWithMimeType(string fileUrl, string proxy, Action<string> action)
        {
            if (!File.Exists(Aria2Path))
                throw new Exception("Downloader not found");

            const int timeoutInMiliSeconds = 5 * 1000; // 5 seconds

            var arguments = $"--dry-run=true --user-agent=\"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11\" \"{fileUrl}\"";
            if (!string.IsNullOrWhiteSpace(proxy))
                arguments += $" --all-proxy={proxy}";

            using (var process = new Process())
            {
                process.StartInfo.FileName = Aria2Path;
                process.StartInfo.Arguments = arguments;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;

                var lengthString = "0";

                using (var outputWaitHandle = new AutoResetEvent(false))
                using (var errorWaitHandle = new AutoResetEvent(false))
                {
                    process.OutputDataReceived += (sender, e) =>
                    {
                        try
                        {
                            if (e.Data == null)
                                outputWaitHandle.Set();
                            else if (e.Data.Contains("Length"))
                                lengthString = e.Data;
                            action?.Invoke(e.Data);
                        }
                        catch
                        {
                            // ignored
                        }
                    };
                    process.ErrorDataReceived += (sender, e) =>
                    {
                        try
                        {
                            if (e.Data == null)
                                errorWaitHandle.Set();
                            else if (e.Data.Contains("Length"))
                                lengthString = e.Data;
                            action?.Invoke(e.Data);
                        }
                        catch
                        {
                            // ignored
                        }
                    };

                    process.Start();

                    process.BeginOutputReadLine();
                    process.BeginErrorReadLine();

                    process.WaitForExit(timeoutInMiliSeconds);
                    outputWaitHandle.WaitOne(timeoutInMiliSeconds);
                    errorWaitHandle.WaitOne(timeoutInMiliSeconds);

                    if (process.WaitForExit(timeoutInMiliSeconds) &&
                        (outputWaitHandle.WaitOne(timeoutInMiliSeconds) || errorWaitHandle.WaitOne(timeoutInMiliSeconds)))
                    {
                        if (!process.HasExited)
                            process.Kill();

                        return GetFileSizeInBytesWithMimeType(lengthString);
                    }

                    if (!process.HasExited)
                        process.Kill();

                    if (!lengthString.ToLower().Contains("length"))
                        throw new Exception("در عملیات دریافت اطلاعات نوع و سایز فایل خطایی رخ داده، دوباره تلاش کنید");

                    return GetFileSizeInBytesWithMimeType(lengthString);
                }
            }
        }

        public static void ChangeConfigProxy(string proxy)
        {
            if (!File.Exists(Aria2Path))
                throw new Exception("Downloader not found");

            const string comment = "# Configuration file for aria2c by Mohammad Dayyan";
            proxy = $"all-proxy={proxy}";

            using (File.Open(Aria2Path, FileMode.OpenOrCreate)) { }
            File.WriteAllLines(Aria2Path, new[] { comment, proxy }, Encoding.ASCII);
        }

        private static Tuple<long, string> GetFileSizeInBytesWithMimeType(string lengthString)
        {
            var length = long.Parse(Regex.Match(lengthString, @"(?<=\s)\d+").Value);
            var mimeType = Regex.Match(lengthString, @"(?<=\[)[^\]]*").Value;

            return new Tuple<long, string>(length, mimeType.ToLower());
        }
    }
}
