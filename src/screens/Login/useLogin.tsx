import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../commonHooks";
import { loginLoading, login } from "../../redux/auth";

export const useLogin = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const loading = useAppSelector(loginLoading);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onChangeInput = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
      if (event.currentTarget.id === "password") {
          setPassword(event.currentTarget.value)
      } else if (event.currentTarget.id === "username") {
          setUsername(event.currentTarget.value);
      }
  }, [])

  const doLogin = React.useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      return setErrorMessage("Fields are required")
    }
    dispatch(login({username, password, history}))
  }, [username, password, history, dispatch])

  return {
      username,
      password,
      loading,
      errorMessage,
      onChangeInput,
      doLogin
  }
}