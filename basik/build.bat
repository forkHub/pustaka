echo ("build")
call tsc -p .\src\tsconfig.json
echo  ("minify")
minify .\build\basik.js > .\build\basik.min.js
pause
pause