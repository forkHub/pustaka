@echo off
echo off

call pub_lib.bat || goto error

echo publikasi template
echo ===================
xcopy template stg\pg\template /s /y /i || goto error
echo.

echo publikasi contoh
echo ================
xcopy contoh\*.* stg\pg\contoh\ /s /i /y

echo publikasi web
echo.
xcopy web\*.* stg /y || goto error

echo update pg
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

echo publikasi pg
xcopy playground\web\*.* stg\pg /s /i /y || goto error
echo =========
echo.

echo selesai
goto end

:error
pause


:end
