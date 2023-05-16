if [[ $VERCEL_GIT_COMMIT_REF == "main" ]]; then
  echo "This is our production branch"
  npm run build
elif [[ $VERCEL_GIT_COMMIT_REF == "master" ]]; then
  echo "This is our production branch"
  npm run build
else
  echo "This is not our production branch"
  npm run build:staging
fi
