@echo off
echo off

echo update to hosting
echo publikasi pg
xcopy stg\*.* ..\..\io /s /i /y || goto error
echo =========
echo.

echo selesai
goto end

:error
pause


:end
