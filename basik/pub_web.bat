echo publikasi web
echo =============

REM xcopy web\*.html stg /y || goto error
REM xcopy web\*.css stg /y || goto error
REM echo.

goto end

:error
exit /b 1

:end
pause