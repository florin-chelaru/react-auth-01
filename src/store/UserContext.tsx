import {Component, createContext} from "react";

class UserInfo {
  static readonly EMPTY: UserInfo = new UserInfo();

  readonly signedIn: boolean;
  readonly email: string | undefined;

  constructor(signedIn?: boolean, email?: string) {
    this.signedIn = signedIn || false;
    this.email = email;
  }
}

class UserContextInfo {
  userInfo: UserInfo = UserInfo.EMPTY;
  signIn: ((email: string) => void) = (() => {
  });
  signOut: (() => void) = () => {
  };
}

const UserContext = createContext(new UserContextInfo());

type UserContextProviderProps = {
  children: any
};

type UserContextProviderState = {
  userInfo: UserInfo
}

export class UserContextProvider extends Component<UserContextProviderProps, UserContextProviderState> {
  private static readonly USER_INFO_STORE_KEY = 'userInfo';

  constructor(props: UserContextProviderProps) {
    super(props);

    const userInfo: UserInfo = JSON.parse(
      localStorage.getItem(UserContextProvider.USER_INFO_STORE_KEY)
      || JSON.stringify(UserInfo.EMPTY));
    this.state = {
      userInfo: userInfo
    };
  }

  render() {
    const context: UserContextInfo = {
      userInfo: this.state.userInfo,
      signIn: (email: string) => {
        const userInfo = new UserInfo(true, email);
        this.setState({userInfo});
        localStorage.setItem(UserContextProvider.USER_INFO_STORE_KEY, JSON.stringify(userInfo));
      },
      signOut: () => {
        this.setState({userInfo: UserInfo.EMPTY});
        localStorage.removeItem(UserContextProvider.USER_INFO_STORE_KEY);
      }
    }

    return <UserContext.Provider value={context}>
      {this.props.children}
    </UserContext.Provider>;
  }
}

export default UserContext;
