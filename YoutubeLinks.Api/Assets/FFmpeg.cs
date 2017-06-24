using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Web;
using ZetaLongPaths;

namespace YoutubeLinks.Api
{
    public static class FFmpeg
    {
        private static string _ffmpegPath;
        private static string FFmpegPath
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(_ffmpegPath)) return _ffmpegPath;
                _ffmpegPath = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "Assets/ffmpeg.exe");
                return _ffmpegPath;
            }
        }

        public static void MergeVideoAudio(string videoFilePath, string audioFilePath, string destinationFilePath, Action<string> action)
        {
            if (!File.Exists(FFmpegPath))
                throw new Exception("Convertor not found");

            var directoryPath = ZlpPathHelper.GetDirectoryPathNameFromFilePath(destinationFilePath);
            if (!ZlpIOHelper.DirectoryExists(directoryPath))
                ZlpIOHelper.CreateDirectory(directoryPath);

            const int timeoutInMiliSeconds = 2 * 60 * 60 * 1000; // 2 hours

            var arguments = $"-i \"{videoFilePath}\" -i \"{audioFilePath}\" -c copy \"{destinationFilePath}\"";
            using (var process = new Process())
            {
                process.StartInfo.FileName = FFmpegPath;
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
                        action?.Invoke($"'{destinationFilePath}' Successfully Merged");
                        return;
                    }
                    if (!process.HasExited)
                        process.Kill();

                    action?.Invoke($"Error in merging '{destinationFilePath}'");
                }
            }
        }
    }
}
