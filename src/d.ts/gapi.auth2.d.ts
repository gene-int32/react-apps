declare namespace gapi.auth2 {
  /**
   * Performs a one time OAuth 2.0 authorization.
   * @see https://developers.google.com/identity/sign-in/web/reference#gapiauth2authorizeparams_callback
   */
  //   export function authorize(params: AuthorizeConfig, callback: (response: AuthorizeResponse) => void): void;

  /**
   * Returns the GoogleAuth object.
   */
  export function getAuthInstance(): GoogleAuth;

  /**
   * Initializes the GoogleAuth object.
   */
  export function init(config: ClientConfig): Promise<GoogleAuth>;

  /**
   * GoogleAuth is a singleton class that provides methods to allow the user to sign in with a Google account,
   * get the user's current sign-in status, get specific data from the user's Google profile, request additional scopes,
   * and sign out from the current account.
   */
  interface GoogleAuth {
    isSignedIn: {
      /**
       * Returns whether the current user is currently signed in.
       */
      get(): boolean;

      /**
       * Listen for changes in the current user's sign-in state.
       */
      listen(listener: (isSignedIn: boolean) => void): void;
    };

    /**
     * Signs in the user with the options specified to gapi.auth2.init().
     */
    signIn(options?: SignInOptions): Promise<GoogleUser>;

    /**
     * Signs out the current account from the application.
     */
    signOut(): Promise<void>;

    /**
     * Revokes all of the scopes that the user granted.
     */
    disconnect(): void;

    /**
     * Get permission from the user to access the specified scopes offline.
     */
    grantOfflineAccess(options?: OfflineAccessOptions): Promise<{code: string}>;

    /**
     * Attaches the sign-in flow to the specified container's click handler.
     */
    attachClickHandler(
      container: string | HTMLDivElement,
      options: SignInOptions,
      onsuccess: () => void,
      onfailure: () => void
    ): void;

    currentUser: {
      /**
       * Returns a GoogleUser object that represents the current user.
       */
      get(): GoogleUser;

      /**
       * Listen for changes in currentUser.
       */
      listen(listener: (currentUser: GoogleUser) => void): void;
    };
  }

  /**
   * Interface that represents the different configuration parameters for the gapi.auth2.init method.
   */
  interface ClientConfig {
    /**
     * The app's client ID, found and created in the Google Developers Console.
     */
    client_id: string;

    /**
     * The domains for which to create sign-in cookies.
     */
    cookie_policy?: 'single_host_origin' | 'none';

    /**
     * Fetch users' basic profile information when they sign in. Adds 'profile', 'email' and 'openid' to the requested scopes.
     */
    fetch_basic_profile?: boolean;

    /**
     * The G Suite domain to which users must belong to sign in.
     */
    hosted_domain?: string;

    /**
     * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
     */
    redirect_uri?: string;

    /**
     * The scopes to request, as a space-delimited string.
     */
    scope?: string;

    /**
     * The UX mode to use for the sign-in flow. By default, it will open the consent flow in a popup.
     */
    ux_mode?: 'popup' | 'redirect';
  }

  /**
   * Interface that represents the different configuration parameters for the GoogleAuth.signIn(options) method.
   */
  interface SignInOptions {
    /**
     * Forces a specific mode for the consent flow. Optional.
     */
    prompt?: 'consent' | 'select_account' | 'none';

    /**
     * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
     */
    redirect_uri?: string;

    /**
     * The scopes to request, as a space-delimited string, on top of the scopes defined in the gapi.auth2.init params.
     */
    scope?: string;

    /**
     * The UX mode to use for the sign-in flow. By default, it will open the consent flow in a popup.
     */
    ux_mode?: 'popup' | 'redirect';
  }

  /**
   * Interface that represents the different configuration parameters for the GoogleAuth.grantOfflineAccess(options) method.
   */
  interface OfflineAccessOptions {
    /**
     * Forces a specific mode for the consent flow. Optional.
     */
    prompt?: 'consent' | 'select_account';

    /**
     * The scopes to request, as a space-delimited string, on top of the scopes defined in the gapi.auth2.init params.
     */
    scope?: string;
  }

  /**
   * A GoogleUser object represents one user account.
   */
  interface GoogleUser {
    /**
     * Get the user's unique ID string.
     */
    getId(): string;

    /**
     * Returns true if the user is signed in.
     */
    isSignedIn(): boolean;

    /**
     * Get the user's G Suite domain if the user signed in with a G Suite account.
     */
    getHostedDomain(): string;

    /**
     * Get the scopes that the user granted as a space-delimited string.
     */
    getGrantedScopes(): string;

    /**
     * Get the user's basic profile information.
     */
    getBasicProfile(): BasicProfile;

    /**
     * Get the response object from the user's auth session.
     */
    getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;

    /**
     * Forces a refresh of the access token, and then returns a Promise for the new AuthResponse.
     */
    reloadAuthResponse(): Promise<AuthResponse>;

    /**
     * Returns true if the user granted the specified scopes.
     */
    hasGrantedScopes(scopes: string): boolean;

    /**
     * Request additional scopes to the user.
     */
    grant(options: SignInOptions): Promise<GoogleUser>;

    /**
     * Revokes all of the scopes that the user granted for the application.
     */
    disconnect(): void;
  }

  /**
   * You can retrieve the properties of gapi.auth2.BasicProfile with the following methods.
   */
  interface BasicProfile {
    getId(): string;
    getName(): string;
    getGivenName(): string;
    getFamilyName(): string;
    getImageUrl(): string;
    getEmail(): string;
  }

  /**
   * AuthResponse represents the user's auth session.
   */
  interface AuthResponse {
    /**
     * The Access Token granted.
     */
    access_token: string;

    /**
     * The ID Token granted.
     */
    id_token: string;

    /**
     * The scopes granted in the Access Token.
     */
    scope: string;

    /**
     * The number of seconds until the Access Token expires.
     */
    expires_in: number;

    /**
     * The timestamp at which the user first granted the scopes requested.
     */
    first_issued_at: number;

    /**
     * The timestamp at which the Access Token will expire.
     */
    expires_at: number;
  }
}
