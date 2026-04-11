@echo off
echo off

echo publikasi stg
echo ================
xcopy stg\*.* ..\..\io\ /s /i /y || goto error
echo.

echo selesai
goto end

:error
pause
pause


:end
