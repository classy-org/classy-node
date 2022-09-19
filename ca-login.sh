echo "Make sure you are sourcing (rather than running) this script in order to load the token into the current environment"
echo "Fetching codeartifact token..."
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain registry --domain-owner 197565871292 --query authorizationToken --output text --region us-east-1 "$@"`
echo "Done."
