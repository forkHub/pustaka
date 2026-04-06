@echo off
echo off

call pub_lib.bat || goto error

echo update pg
echo =========
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

echo publikasi pg
echo ============
xcopy playground\web\*.* pub\ /s /i /y || goto error
echo.

echo selesai
goto end

:error
pause
pause

:end
