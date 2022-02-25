@echo off

echo.
echo Installing Http server
echo.
call npm install --global http-server


echo.
echo Open browser on https://localhost:5112/index.html
echo.
call start "" "https://localhost:5112/index.html"

echo.
echo Running server on port 5112
echo.
call http-server ./ -p 5112 -S -C cert.pem