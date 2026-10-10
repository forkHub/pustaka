@echo off
echo off

@rem C:\xampp\htdocs\io
@rem C:\xampp\htdocs\pustaka\basik

set io_folder=..\..\io\basik

echo publikasi io
echo ================
xcopy hugo\public\*.* %io_folder% /s /y || goto error
echo.

del %io_folder%\basik\.gitIgnore /s /q || goto error

echo selesai
goto end

:error
pause
pause


:end
