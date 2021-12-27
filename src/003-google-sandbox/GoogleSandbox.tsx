import React, {useEffect, useState, useRef} from 'react';
import './GoogleSandbox.scss';

import GoogleService from '../services/google/GoogleService';

/**
 * User model.
 */
interface User {
  email: string;
  id: string;
  name: string;
}

/**
 *
 * Auth component props.
 */
interface AuthProps {
  isSignedIn: boolean;
  user: User | null;
}

const GoogleClientConfig: gapi.auth2.ClientConfig = {
  client_id: '581855884595-ddjefr77cp7oaqqu5v2m63ieiq0urtjc.apps.googleusercontent.com',
  scope: 'openid profile email',
};

/**
 * Google Auth instance.
 */
let GoogleAuth: gapi.auth2.GoogleAuth;

/**
 * Auth component.
 */
const Auth = ({isSignedIn, user}: AuthProps) => {
  const signIn = () => GoogleAuth.signIn();

  const signOut = () => GoogleAuth.signOut();

  return isSignedIn ? (
    <button className="button" onClick={signOut}>
      <div className="button__inner">
        {user?.name}
        <i className="fas fa-sign-out-alt fa-sm button__icon-right"></i>
      </div>
    </button>
  ) : (
    <button className="button" onClick={signIn}>
      <div className="button__inner">
        <i className="fab fa-google fa-sm button__icon-left"></i>Sign In with Google
      </div>
    </button>
  );
};

const GoogleSandbox = () => {
  const previewRef = useRef<HTMLPreElement>(null);

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const isAuthorized = (scopes: string) => {
    return GoogleAuth ? GoogleAuth.currentUser.get().hasGrantedScopes(scopes) : false;
  };

  useEffect(() => {
    GoogleService.installGapi().then(async () => {
      await GoogleService.load('client:auth2');
      GoogleAuth = await gapi.auth2.init(GoogleClientConfig);

      GoogleAuth.isSignedIn.listen(async (isSignedIn) => setIsSignedIn(isSignedIn));
      setIsSignedIn(isAuthorized('profile'));
    });
  }, []);

  useEffect(() => {
    if (isSignedIn && GoogleAuth) {
      const user = GoogleAuth.currentUser.get().getBasicProfile();

      setUser({
        email: user.getEmail(),
        id: user.getId(),
        name: user.getName(),
      });
      previewAuthResponse();
    } else {
      setUser(null);
    }
  }, [isSignedIn]);

  useEffect(() => {
    !user && preview(user);
  }, [user]);

  const preview: <T = unknown>(data: T, parser?: (data: T) => unknown) => void = (data, parser = (data) => data) => {
    if (previewRef.current) {
      previewRef.current.textContent = JSON.stringify(parser(data), null, 2);
    }
  };

  /**
   * Preview User Info.
   */
  const previewUserInfo = async () => {
    const resourceName = 'people/me';

    const {result} = await gapi.client.request({
      path: `https://people.googleapis.com/v1/${resourceName}`,
      params: {
        personFields: 'emailAddresses,names,phoneNumbers,photos',
      },
    });

    preview(result);
  };

  /**
   * Preview Auth Response.
   */
  const previewAuthResponse = () => preview(GoogleAuth.currentUser.get().getAuthResponse(), parseAuthResponse);

  const parseAuthResponse = (data: gapi.auth2.AuthResponse) => {
    const tokenData = data.id_token.split('.');

    return {
      ...data,
      scope: data.scope.split(' '),
      id_token: JSON.parse(atob(tokenData[1])),
      expires_at: new Date(data.expires_at).toTimeString().slice(0, 8),
    };
  };

  /**
   * Revoke granted access.
   */
  const revokeAccess = () => GoogleAuth.disconnect();

  return (
    <div className="page google-sandbox-page">
      <div className="google-sandbox">
        <div className="headline-5 google-sandbox__headline mb">Google Sandbox</div>
        <div className="mb">
          <Auth isSignedIn={isSignedIn} user={user} />
          {isSignedIn && (
            <>
              <button className="button ml" onClick={previewUserInfo}>
                <div className="button__inner">User Info</div>
              </button>
              <button className="button ml" onClick={previewAuthResponse}>
                <div className="button__inner">Auth Response</div>
              </button>
              <button className="button ml" onClick={revokeAccess}>
                <div className="button__inner">Revoke Access</div>
              </button>
            </>
          )}
        </div>
        <pre className="preview" ref={previewRef}></pre>
      </div>
    </div>
  );
};

export default GoogleSandbox;
