@echo off
echo off

REM echo hapus stg
REM echo =========
REM rd stg_backup /s /q
REM xcopy stg stg_backup /s /q /i || goto error
REM rd stg /s /q || goto error
REM md stg || goto error
REM echo.

call pub_lib.bat || goto error

REM echo update template
REM echo ===============
REM echo belum
REM echo.

REM echo publikasi template
REM echo ===================
REM xcopy template stg\pg\template /s /y /i || goto error
REM echo.

call pub_contoh.bat || goto error

REM call pub_web.bat || goto error

REM call pub_doc.bat || goto error

call pub_pg.bat || goto error

echo selesai
goto end

:error
pause
pause

:end
pause
