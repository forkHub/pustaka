echo.
echo publikasi contoh dan assets
echo ===========================
xcopy contoh\*.* stg\pg\contoh\ /s /i /y || goto error
echo.

goto end

:error
exit /b 1

:end
