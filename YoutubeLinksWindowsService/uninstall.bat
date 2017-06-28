CLS
ECHO Uninstalling YoutubeLinks Service

START %windir%\Microsoft.NET\Framework\v4.0.30319\installutil.exe -u "%~d0%~p0\YoutubeLinksWindowsService.exe"

Pause