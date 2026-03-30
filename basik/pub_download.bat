@echo off
echo off

call pub_lib.bat || goto error

echo update template
echo ===============
echo belum
echo.

echo publikasi template
echo ===================
xcopy template pub\template /s /y /i || goto error
echo.

echo update pg
echo =========
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

echo publikasi pg
echo ============
xcopy playground\web\*.* pub\editor /s /i /y || goto error
echo.

echo selesai
goto end

:error
pause
pause


:end
