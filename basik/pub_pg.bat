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
echo.

echo publikasi pg
echo ============
xcopy playground\web\*.* hugo\public\pg /s /i /y || goto error
xcopy playground\web\*.* pg2 /s /i /y || goto error
del pg2\.gitIgnore /s /q || goto error
echo =========
echo.

goto end

:error
exit /b 1

:end
