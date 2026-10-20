@echo off
echo off

set io_folder=D:\xampp4\htdocs\io\basik

pushd %io_folder%
call python -m http.server
popd

goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause
