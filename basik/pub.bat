@echo off
echo off

echo hapus stg
echo =========
rd stg_backup /s /q
xcopy stg stg_backup /s /q /i || goto error
rd stg /s /q || goto error
md stg || goto error
echo.

call pub_lib.bat || goto error

echo update template
echo ===============
echo belum
echo.

echo publikasi template
echo ===================
xcopy template stg\pg\template /s /y /i || goto error
echo.

echo publikasi contoh dan assets
echo ===========================
xcopy contoh\*.* stg\pg\contoh\ /s /i /y || goto error
echo.

echo publikasi web
echo =============
xcopy web\index.html stg /y || goto error
xcopy web\player.html stg\pg /y || goto error
echo.

echo publikasi doc
echo =============
xcopy doc\site\*.* stg\pg\doc /i /y /s || goto error

call pub_pg.bat || goto error

echo selesai
goto end

:error
pause
pause

:end
pause
