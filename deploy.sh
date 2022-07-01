#!/bin/zsh

echo "-----------deploy start------------"
git pull
npm run build
rm -rf ../thankslyh
mv ./thankslyh ../
echo "-----------deploy end------------"
