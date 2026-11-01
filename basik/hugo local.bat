@echo off
echo off

hugo server || goto error

goto end

:error
echo.
pause
exit /b 1

:end
echo.
pause
