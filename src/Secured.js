import React, { Component } from "react";
import Keycloak from "keycloak-js";
import UserInfo from "./UserInfo";
import Logout from "./Logout";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak({
      realm: "vraio-client",
      "auth-server-url": "http://192.168.29.72:8180/auth/",
      "ssl-required": "external",
      resource: "client-2",
      "public-client": true,
      "confidential-port": 0,
      clientId: "client-2",
    });
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <div>
            <p>
              This is a Keycloak-secured component of your application. You
              shouldn't be able to see this unless you've authenticated with
              Keycloak.
            </p>
            <UserInfo keycloak={this.state.keycloak} />
            <Logout keycloak={this.state.keycloak} />
          </div>
        );
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default Secured;
