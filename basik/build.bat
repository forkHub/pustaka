echo ("build")
tsc -p .\src\tsconfig.json
echo  ("minify")
minify .\build\basik.js > .\doc\basik.min.js
pause
