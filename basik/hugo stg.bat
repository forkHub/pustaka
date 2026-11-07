@echo off
echo off

set io_folder=D:\xampp4\htdocs\io\basik_stg

pushd hugo
call hugo build || goto error
xcopy public\*.* %io_folder% /s /i /y || goto error
popd

goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause