import {
    Flex,
    Form,
    Grid,
    FormItem,
    TextFieldInput,
    Button,
    Typography,
    Icon,
    SpinnerOutlined
  } from "@aircall/tractor";
import styled from 'styled-components';
import { useLogin } from './useLogin';


const Container  = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 5%;
  padding: 20px;
`
const Login = () => {
    const {
        onChangeInput,
        doLogin,
        errorMessage,
        loading,
    } = useLogin();

    return (
      <Container>

      <Flex size="500px" border="1px solid #eee" alignSelf="center" alignItems="center" justifyContent="center">
       
      <Form data-testid="login-form" onSubmit={doLogin}>
        <Grid gridRowGap={5}>
          <FormItem label="Username" name="username">
            <TextFieldInput
              data-testid='username-input'
              onChange={onChangeInput}
            />
          </FormItem>
          <FormItem label="Password" name="password">
            <TextFieldInput
              data-testid='password-input'
              type="password"
              onChange={onChangeInput}
            />
          </FormItem>
          <FormItem>
            <Button type="submit" block>
              {loading ? <Icon data-testid="loading-icon" component={SpinnerOutlined} spin /> : null}
              Login
            </Button>
          </FormItem>
          {errorMessage && <Typography data-testid="error-message" color="red.base" textAlign="center">
            {errorMessage}
          </Typography>}
        </Grid>
      </Form>
      </Flex>
      </Container>


    )
}

export default Login;