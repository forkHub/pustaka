echo publikasi web
echo =============

xcopy web\*.html stg /y || goto error
xcopy web\*.css stg /y || goto error
echo.

goto end

:error
exit /b 1

:end
pause