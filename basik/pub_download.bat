@echo off
echo off

call pub_lib.bat || goto error
call pub_contoh.bat || goto error
call pub_pg.bat || goto error

echo publish basic
echo =============
echo.
cd pg2 || goto error
del .gitignore || goto error
7z a -r -tzip basik_v02 .\*.* || goto error
copy basik_v02.zip "G:\My Drive\basik" /b /v /y	|| goto error
del basik_v02.zip || goto error
cd..
rd pg2 /s /q || goto error

echo selesai
goto end

:error
pause
pause

:end
pause
