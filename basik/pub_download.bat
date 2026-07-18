@echo off
echo off

echo.
cd stg || goto error
7z a -r -tzip basik_v02 pg\*.* || goto error
cd..

echo selesai
goto end

:error
pause
pause

:end
pause
