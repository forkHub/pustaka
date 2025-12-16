echo ("minify")
@REM call tsc -p .\tsconfig.json
@REM echo  ("minify")
@REM minify .\build\basik.js > .\build\basik.min.js
node .\minify.js .\build\basik.js .\build\basik.min.js
copy .\build\basik.min.js ..\build\basik.min.js /y
pause
pause