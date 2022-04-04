import React, {createRef, FunctionComponent, useEffect, useState} from 'react';
import {Helmet, HelmetProvider, HelmetTags} from 'react-helmet-async';

const googleUrl = 'https://accounts.google.com/gsi/client';

export interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleButtonParams {
  onCredentialResponse: (response: GoogleCredentialResponse) => void;
}

// Inspired from: https://gist.github.com/pmckee11/13b1dffbf1d271a782ed7f65480b978f
const GoogleSignInButton: FunctionComponent<GoogleButtonParams> = ({onCredentialResponse}) => {
  const [scriptLoaded, setScriptLoaded] = useState(
    typeof window !== 'undefined' && typeof (window as any).google !== 'undefined'
  );
  const buttonRef = createRef<HTMLDivElement>();

  // Helmet does not support the onLoad property of the script tag, so we have to manually add it like so
  const handleChangeClientState = (newState: any, addedTags: HelmetTags) => {
    if (addedTags && addedTags.scriptTags) {
      const foundScript = addedTags.scriptTags.find(
        ({src}) => src === googleUrl
      );
      if (foundScript) {
        foundScript.addEventListener('load', () => setScriptLoaded(true), {
          once: true,
        });
      }
    }
  };

  useEffect(() => {
    if (scriptLoaded && buttonRef.current) {
      (window as any).google.accounts.id.initialize({
        client_id: '1057836076662-ehncq8hs6n3jvaulecvvlejafgcfj04v.apps.googleusercontent.com',
        callback: onCredentialResponse,
      });
      (window as any).google.accounts.id.renderButton(buttonRef.current, {theme: 'outline', size: 'large'});
    }
  }, [scriptLoaded, buttonRef, onCredentialResponse]);
  return (
    <>
      <HelmetProvider>
        <Helmet onChangeClientState={handleChangeClientState}>
          <script src={googleUrl} async defer/>
        </Helmet>
      </HelmetProvider>
      <div ref={buttonRef}/>
    </>
  );
};

export default GoogleSignInButton;