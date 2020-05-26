# Deployment
# ----------

echo Handling node.js deployment.

# 1. Select node version
selectNodeVersion

# 2. Install NPM packages to repo root to run Typings, TSC and Gulp tasks
echo "Installing npm packages in KUDU repo root."
eval $NPM_CMD install
exitWithMessageOnError "npm install failed"
echo "Finished installing npm packages in KUDU repo root."

# 3. KuduSync => Copies files to deployment target
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh;node_modules;"
  exitWithMessageOnError "Kudu Sync failed"
fi

# 4. Install npm packages to deployment target
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  eval $NPM_CMD install
  exitWithMessageOnError "npm site root install failed"
  cd - > /dev/null
fi