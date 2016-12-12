import path from 'path';

/**
 * Create a full path based on the populated
 * URI and the basePath defined when the Classy
 * instance was initialized. Returns something like
 * /2.0/campaigns/23456 or /oauth2/auth.
 *
 * @param  {string}  resolvedPath  The populated URI
 * @param  {Boolean} isAuthRequest Determines whether to append basePath
 * @return {string}                The full URI for the upcoming request
 */
export default function _createFullPath(resolvedPath, isAuthRequest) {
  const fullPath = path.join(
      isAuthRequest ? '' : this.basePath,
      resolvedPath
    ).replace(/\\/g, '/');

  const normalizedPath = path.normalize(fullPath);

  return normalizedPath;
}
