call hugo_stg.bat || goto error
call pg_stg.bat || goto error
call download.bat || goto error

:error
echo.
pause
exit /b 1

:end
echo.
pause