@echo off
echo off

echo minify
echo ======
cd basik
call min.bat || goto error
cd ..

echo =================================
echo update library 
echo =================================
copy build\*.* template\lib || goto error
copy build\*.* playground\web\editor\lib || goto error
echo ==============
echo.

echo =================
echo update contoh lib
echo =================
echo.
echo dasar:
copy build\*.* contoh\dasar\dasar_animasi\lib || goto error
copy build\*.* contoh\dasar\drag\lib || goto error
copy build\*.* contoh\dasar\drag_remote\lib || goto error
copy build\*.* contoh\dasar\drag_rotasi\lib || goto error
copy build\*.* contoh\dasar\keyboard\lib || goto error
copy build\*.* contoh\dasar\mouse\lib || goto error
copy build\*.* contoh\dasar\muat_image\lib || goto error
copy build\*.* contoh\dasar\rotate_remote\lib || goto error
copy build\*.* contoh\dasar\sound\lib || goto error
copy build\*.* contoh\dasar\tabrakan\lib || goto error
copy build\*.* contoh\dasar\ubin\lib || goto error
echo.
echo menengah:
copy build\*.* contoh\menengah\buat_image\lib || goto error
copy build\*.* contoh\menengah\doodle\lib || goto error
copy build\*.* contoh\menengah\platformer\lib || goto error
echo.
echo =====================
echo.

echo selesai
goto end

:error
pause
exit /b 1

:end
pause
