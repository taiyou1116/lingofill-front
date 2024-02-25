"use client"

import "../../globals.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import amplifyconfig from '../../amplifyconfiguration.json';

// Amplify.configure(amplifyconfig);
function Doc() {
  return (
    <div>
     <Authenticator socialProviders={['google']} />
    </div>
  )
}

export default Doc