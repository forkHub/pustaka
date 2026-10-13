@echo off
echo off

set io_folder=D:\xampp4\htdocs\io\basik

pushd hugo
call hugo build || goto error
xcopy public\*.* %io_folder% /s /i /y || goto error
popd

rem start server
rem download package
rem package
rem 

goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause