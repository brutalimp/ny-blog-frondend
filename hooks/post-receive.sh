#!/bin/bash
TARGET="/home/www/ny-blog-frondend"
GIT_DIR="/home/gitrepo/ny-blog-frondend.git"
APP_NAME="ny-blog-frontend"
BRANCH="master"

echo "post-receive: Triggered."
if [ ! -d "$TARGET" ]; then
  echo "mkdir $TARGET"
  mkdir $TARGET
fi
cd $TARGET

echo "post-receive: git check out..."
git --git-dir=$GIT_DIR  --work-tree=$TARGET checkout -f

echo "npm install" \
&& npm install \
&& echo "post-receive: building..." \
&& ng build --prod \
&& echo "post-receive: server start" \
&& cd dist \
&& (pm2 delete $APP_NAME || true ) \
&& pm2 start http-server --name $APP_NAME -- -p 80 \
&& echo "post-receive: done."