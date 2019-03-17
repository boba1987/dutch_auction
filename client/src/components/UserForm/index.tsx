import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { WithStyles, createStyles, FormHelperText } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Constants from '../../constants/userConstants';

const styles = (theme: Theme) => createStyles({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

interface SignInFormProps extends WithStyles<typeof styles>{
  classes: {
    main: string,
    paper:  string,
    avatar: string,
    form: string,
    submit: string
  },
  title: string,
  onsubmit(event: React.SyntheticEvent): void,
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void,
  error?: string
}

const SignInForm = (props: SignInFormProps) => {
  const { classes, title } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          { title }
        </Typography>
        <form className={classes.form} onSubmit={props.onsubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="userName">User Name</InputLabel>
            <Input id="userName" name={Constants.userName} autoComplete="userName" autoFocus onChange={props.handleInputChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" name={Constants.password} autoComplete="current-password" onChange={props.handleInputChange}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            { title }
          </Button>
          <FormHelperText id="component-error-text">{props.error}</FormHelperText>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(SignInForm);