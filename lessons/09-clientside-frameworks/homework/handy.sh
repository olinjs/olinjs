#!/bin/bash
if [[ $# -gt 0 ]]
  then
    infile=$1
  else
    infile="app.js"
fi
echo "Installing node app dependencies for $infile..."
cat $infile | grep -v "[\.\/]" | grep -Po "(?<=require\([\"']).+(?=[\"']\))" | while read module
do
  echo "Found dependency $module"
  npm install --save $module
done
echo "All done!"
