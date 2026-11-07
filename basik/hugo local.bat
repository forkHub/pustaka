@echo off
echo off

pushd hugo
hugo server || goto error
popd

goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause
