@echo off
echo off

call pub_lib.bat || goto error

echo publikasi template
echo ===================
xcopy template stg\template /s /y /i || goto error
echo.

echo update contoh index.html
echo ========================
copy template\index.html contoh\dasar\dasar_animasi\index.html || goto error
copy template\index.html contoh\dasar\drag\index.html || goto error
copy template\index.html contoh\dasar\drag_remote\index.html || goto error
copy template\index.html contoh\dasar\drag_rotasi\index.html || goto error
copy template\index.html contoh\dasar\keyboard\index.html || goto error
copy template\index.html contoh\dasar\mouse\index.html || goto error
copy template\index.html contoh\dasar\muat_image\index.html || goto error
copy template\index.html contoh\dasar\rotate_remote\index.html || goto error
copy template\index.html contoh\dasar\sound\index.html || goto error
copy template\index.html contoh\dasar\tabrakan\index.html || goto error
copy template\index.html contoh\dasar\ubin\index.html || goto error
copy template\index.html contoh\menengah\buat_image\index.html || goto error
copy template\index.html contoh\menengah\doodle\index.html || goto error
copy template\index.html contoh\menengah\platformer\index.html || goto error
echo.

echo publikasi contoh
echo ================
xcopy contoh\*.* stg\contoh\ /s /i /y

echo publikasi web
echo.
xcopy web\*.* stg /y || goto error

echo update pg
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
