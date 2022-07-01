#!/bin/zsh

echo "-----------deploy start------------"
git pull
pnpm run build
rm -rf ../thankslyh
mv ./thankslyh ../
echo "-----------deploy end------------"
