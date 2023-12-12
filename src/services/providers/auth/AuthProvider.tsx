import React, { type ReactNode, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import AuthContextModel from "../../../models/auth/AuthContextModel";
import {removeCurrentUser, setCurrentUser} from "../../../redux/Users/Actions/UserActions";
import {auth} from "../../../firebase/core/Firebase";

const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> =>
  await signInWithEmailAndPassword(auth, email, password);

const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> =>
  await createUserWithEmailAndPassword(auth, email, password);

const signOut = async (): Promise<void> => {
  await auth.signOut();
};

export const AuthContext = React.createContext<AuthContextModel>({
  auth,
  signIn,
  signUp,
  signOut,
  isLoading: true
});

export interface AuthProviderProps {
  children?: ReactNode;
}

export const useAuth = (): AuthContextModel => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) {
        // @ts-ignore
        dispatch(removeCurrentUser());
      } else {
        // @ts-ignore
        dispatch(setCurrentUser(user.uid));
      }
      setIsLoading(false);
    });
  }, [auth.currentUser]);

  const values = {
    signIn,
    signUp,
    signOut,
    auth,
    isLoading
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
