@echo off
echo off

call pub_lib.bat || goto error

echo update pg
echo =========
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
echo.

del pub\*.* /s /q || goto error
rd pub /s /q || goto error

echo publikasi pg
echo ============
xcopy playground\web\*.* pub\basik /s /i /y || goto error
echo.

cd pub || goto error
7z a -r -tzip basik_v02 basik\*.* || goto error
cd..

echo selesai
goto end

:error
pause
pause

:end
