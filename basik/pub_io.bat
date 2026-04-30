@echo off
echo off

@rem C:\xampp\htdocs\io
@rem C:\xampp\htdocs\pustaka\basik

set io_folder=..\..\io\basik

echo publikasi stg
echo ================
xcopy stg\*.* %io_folder% /s /y || goto error
echo.

echo selesai
goto end

:error
pause
pause


:end
