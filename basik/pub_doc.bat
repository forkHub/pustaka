@echo off
echo off

echo publikasi doc
echo =============
xcopy doc\site\*.* stg\pg\doc /i /y /s || goto error

echo selesai
goto end

:error
pause
pause

:end
