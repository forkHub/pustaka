echo ("build")
call tsc -p .\src\tsconfig_doc.jsonc
echo  ("js-doc")
jsdoc doc\blitz_doc.js -d doc_html
pause
