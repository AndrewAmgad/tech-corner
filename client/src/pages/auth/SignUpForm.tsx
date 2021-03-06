import React, { useRef, useState, SyntheticEvent, useEffect } from 'react';
import {
  LinearProgress,
  CircularProgress,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router';
import Logo from '../../components/Logo';

import Copyright from '../../setup/Copyright';
import Input from '../../components/InputComponent';

// Component Styles
import SignUpStyles from './styles/styles';

interface Props extends RouteComponentProps {
  checkAuthLoading: boolean,
  citiesLoading: boolean,
  submitButton: boolean,
  authLoading: boolean,
  errors: any,
  cities: any,
  onSubmit: () => void,
  sendDataToParent: (inputData: any) => void,
}


function SignUp(props: Props) {
  const classes = SignUpStyles();

  // Input References initalization
  var emailInput = useRef<HTMLInputElement>(null),
    passwordInput =useRef<HTMLInputElement>(null),
    firstNameInput = useRef<HTMLInputElement>(null),
    lastNameInput = useRef<HTMLInputElement>(null),
    cityInput = useRef<HTMLInputElement>(null),
    [phoneInput, setPhoneInput] = useState<string>(),
    [city, setCity] = useState<any>();

  // Errors prop object
  const errors = props.errors;

  // Add input values to an object and send it to the parent component using props
  const onInputChange = () => {

    const inputData = {
      firstName: firstNameInput.current?.value,
      lastName: lastNameInput.current?.value,
      email: emailInput.current?.value,
      phone: phoneInput,
      city: city,
      password: passwordInput.current?.value,
    }

    console.log(inputData)

    props.sendDataToParent(inputData);
  }

  /**
   * Perform the onSubmit props function once the submit button is clicked
   */
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit();
  };

  useEffect(() => {
    onInputChange()
  }, [city])


  if (props.checkAuthLoading || props.citiesLoading) {
    return (
      <LinearProgress />
    )
  }


  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Logo className={classes.logo} />

        {/* Component Title */}
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>

        {/* Input Fields */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            {/* First Name Field */}
            <Grid item xs={12} sm={6}>
              <Input name="First Name" error={errors.firstName} inputRef={firstNameInput} onChange={onInputChange} maxLength={10} />
            </Grid>

            {/* Last Name Field */}
            <Grid item xs={12} sm={6}>
              <Input name="Last Name" error={errors.lastName} inputRef={lastNameInput} onChange={onInputChange} maxLength={10} />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <Input name="Email" error={errors.email} inputRef={emailInput} onChange={onInputChange} />
            </Grid>

            {/* City Field */}
            {props.cities && <Grid item xs={12}>
              <Input name="City" 
              selectOptions={props.cities.cities}
              error={errors.city} 
              inputRef={cityInput} 
              onChange={onInputChange}
              value={(value: any) => setCity(value)}
              type='select'
              title="Choose a city" />
            </Grid>}

            {/* Phone Number Field */}
            <Grid item xs={12}>
              <Input type="phone" name="Phone Number" error={errors.phone}
                onChange={(value: string) => {
                  setPhoneInput(value);
                  onInputChange();
                }} />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <Input name="Password" error={errors.password} inputRef={passwordInput} onChange={onInputChange} type="password" />
            </Grid>


            {/* Terms and Conditions check box */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to Tech Corner's Terms of Service and Privacy Policy"
              />
            </Grid>

          </Grid>

          {/* Submit Button */}
          <Button
            fullWidth
            disabled={!props.submitButton}
            variant="contained"
            color="primary"
            onClick={(e) => {onInputChange(); onSubmit(e)}}
            className={classes.submit}>
            {props.authLoading ? <CircularProgress size={26} /> : 'Sign Up'}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>

              <Link onClick={() => props.history.push('/signin')} variant="body2" className={classes.link} >
                Already have an account? Sign in
              </Link>

            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp)