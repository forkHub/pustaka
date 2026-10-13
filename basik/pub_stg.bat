@echo off
echo off

echo.
echo update pg
echo ==============
pushd contoh\packager || goto error
call node packager.js || goto error
popd
copy assets\*.* playground\web\asset || goto error
copy build\*.* playground\web\editor\lib || goto error
copy contoh\packager\demo.json playground\web\editor\js\demo.js || goto error
xcopy contoh\*.* playground\web\contoh /s /i /y || goto error
echo.

echo minify
echo ======
cd basik
call min.bat || goto error
cd ..

echo =================================
echo update library 
echo =================================
copy build\*.* playground\web\editor\lib || goto error
echo ==============
echo.

echo publikasi pg ke stg
echo ===================
set io_folder=D:\xampp4\htdocs\io\basik
xcopy playground\web\*.* %io_folder% /s /i /y || goto error
del %io_folder%\.gitIgnore /s /q || goto error
set io_folder=
echo =========
echo.

call hugo.bat

goto end

:error
pause
exit /b 1

:end
pause
