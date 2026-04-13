@echo off
echo off

set io_folder=D:\xampp4\htdocs\io\basik

echo publikasi stg
echo ================
xcopy stg\*.* %io_folder% /s /i /y || goto error
echo.

echo selesai
goto end

:error
pause
pause


:end
