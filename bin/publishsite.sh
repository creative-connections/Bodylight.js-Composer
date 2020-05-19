#git subtree push --prefix build/virtualbody origin gh-pages
#using https://github.com/X1011/git-directory-deploy
export GIT_DEPLOY_DIR=dist
export GIT_DEPLOY_REPO=https://github.com/creative-connections/Bodylight.js-Components.git
./deploy.sh
