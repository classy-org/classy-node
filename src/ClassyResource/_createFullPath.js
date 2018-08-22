/**
 * Create a full path based on the populated
 * URI and the basePath defined when the Classy
 * instance was initialized. Returns something like
 * /2.0/campaigns/23456 or /oauth2/auth.
 *
 * @param  {string}   resolvedPath     The populated URI
 * @param  {Boolean}  isAuthRequest    Determines whether to append basePath
 * @param  {string?}  basePathOverride Base path to use instead of the current resource's or
 *                                     global default
 *
 * @return {string}                The full URI for the upcoming request
 */
export default function _createFullPath(resolvedPath, isAuthRequest, basePathOverride) {
  return ((isAuthRequest ? '' : ((basePathOverride || this.basePath) + '/')) + resolvedPath)
    .replace(/\/+/g, '/');
}
