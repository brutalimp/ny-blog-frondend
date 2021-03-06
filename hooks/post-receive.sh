#!/bin/bash
TARGET="/home/www/ny-blog-frondend"
GIT_DIR="/home/gitrepo/ny-blog-frontend.git"
APP_NAME="ny-blog-frontend"
BRANCH="master"

echo "post-receive: Triggered."
if [ ! -d "$TARGET" ]; then
  echo "mkdir $TARGET"
  mkdir -p $TARGET
fi
cd $TARGET

echo "post-receive: git check out..."
git --git-dir=$GIT_DIR  --work-tree=$TARGET checkout -f

echo "yarn install" \
&& yarn install \
&& echo "post-receive: building..." \
&& ng build --prod \
&& echo "post-receive: server start" \
&& (pm2 delete $APP_NAME || true ) \
&& pm2 start nginx --name $APP_NAME \
&& echo "post-receive: done."