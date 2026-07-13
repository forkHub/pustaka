echo publikasi web
echo =============
xcopy web\index.html stg /y || goto error
xcopy web\player.html stg\pg /y || goto error
echo.

goto end

:error
exit /b 1

:end
