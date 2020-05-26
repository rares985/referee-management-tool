# Deployment
# ----------

echo Handling node.js deployment.

# 1. Select node version
selectNodeVersion

# 2. Install NPM packages to repo root
echo "Installing dev and production packages in KUDU repo root."
# Install production dependencies in KUDU repo root. Webpack, Babel, ESLint and others
# are only used at build time, so dev packages must be available here.
eval $NPM_CMD install --no-progress --only=prod
# Force npm to install dev dependencies. Necessary because setting NODE_ENV
# to production will make npm skip dev dependencies on install.
eval $NPM_CMD install --no-progress --only=dev
exitWithMessageOnError "npm install failed"
echo "Finished installing dev and production packages in KUDU repo root."

# 3. Build the app
cd client/
eval $NPM_CMD run build
exitWithMessageOnError "Could not build application"
cd - > /dev/null
echo "Finished building application"

# 4. KuduSync => Copies files to deployment target
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
