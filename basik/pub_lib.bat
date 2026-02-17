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

echo selesai
goto end

:error
pause
exit /b 1

:end
pause
