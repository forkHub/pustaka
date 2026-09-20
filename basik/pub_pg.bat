@echo off
echo off

echo.
echo update pg
echo ==============
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

echo publikasi pg
echo ============
xcopy playground\web\*.* hugo\public\pg /s /i /y || goto error
xcopy playground\web\*.* pg2 /s /i /y || goto error
echo =========
echo.

goto end

:error
exit /b 1

:end
