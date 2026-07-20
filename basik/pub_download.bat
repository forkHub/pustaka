@echo off
echo off

echo.
cd stg || goto error
7z a -r -tzip basik_v02 pg\*.* || goto error
copy basik_v02.zip "G:\My Drive\basik" /b /v /y	|| goto error
del basik_v02.zip
cd..

echo selesai
goto end

:error
pause
pause

:end
pause
