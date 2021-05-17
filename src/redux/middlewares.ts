import { Middleware } from "@reduxjs/toolkit";
import aircallAPI from "../api/aircallAPI";
import type { RootState } from "./store";
import jwt_decode from 'jwt-decode';
import { update_token, reset as resetAuth } from "./auth";
import { reset as resetCalls } from './calls';

// this is a custom middleware to keep the authorization token updated
// for any action in the callStore, it will check the validity of the token
// if there's no token it will push you back to the login
// if the token is expired, it will try to fetch a new one
// if it fails to fetch a new one, you will be pushed back to login

export const refreshTokenMiddleWare: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  any   
> = storeApi => next => action => {
  if (action.type.split('/')[0] !== 'callStore') return next(action);
  const logOut = () => {
    window.location.href = '/login';
    storeApi.dispatch(resetAuth());
    return storeApi.dispatch(resetCalls());
  }
  const currentState: RootState = storeApi.getState();
  const currentToken = currentState.authStore.token;

  if (!currentToken) {
    // user not authenticated
    logOut();
  }
  
  const decodedJWT: KeyValueObject = jwt_decode(currentToken);
  const expiryDate = decodedJWT.exp as number;

  if ((expiryDate - new Date().getTime() / 1000) <= 10) {
    aircallAPI.refreshToken(currentToken).then(([token, error]) => {
      if (error) {
        logOut();
        return [null, error];
      } else {
        storeApi.dispatch(update_token(token.access_token));
        aircallAPI.setToken(currentToken);
        return next(action)
      }
    }).catch(() => {
      logOut();
    })
  } else {
    aircallAPI.setToken(currentToken);
    return next(action);
  }
}


type KeyValueObject = {
    [key: string]: unknown;
}