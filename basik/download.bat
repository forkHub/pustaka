@echo off
echo off

echo publish basic
echo =============
echo.
xcopy playground\web\*.* pg2 /s /i /y || goto error
cd pg2 || goto error
del .gitIgnore /s /q || goto error
7z a -r -tzip basik_v02 .\*.* || goto error
copy basik_v02.zip "G:\My Drive\basik" /b /v /y	|| goto error
del basik_v02.zip || goto error
cd.. || goto error
rd pg2 /s /q || goto error
goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause
