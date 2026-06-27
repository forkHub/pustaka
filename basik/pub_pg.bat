@echo off
echo off

echo update pg
echo ==============
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

echo publikasi pg
echo ============
xcopy playground\web\*.* stg\pg /s /i /y || goto error
echo =========
echo.

goto end

:error
exit /b 1

:end
