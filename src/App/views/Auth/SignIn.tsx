import React, {useState} from 'react';
import styles from './auth.module.scss';
import logo from '../../assets/images/signUp.svg';
import Button from '@material-ui/core/Button';
import facebook from '../../assets/images/facebookLogo.png';
import github from '../../assets/images/gitLogo.png';
import google from '../../assets/images/googleLogo.png';
import linked from '../../assets/images/linkedinLogo.png';
import SocialButton from './SocialButton';
import Inputs from './Inputs'
import {Link} from 'react-router-dom';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Hidden from "@material-ui/core/Hidden";
import {userInterface} from "../../utils/const";
import {TransitionProps} from "@material-ui/core/transitions";
import {API_HOST} from 'App/utils/api'



export interface SignInProps extends RouteComponentProps {
    user: userInterface,
    setUser: React.Dispatch<React.SetStateAction<userInterface>>
}
const useStyles = makeStyles(createStyles({
    root: {
        width: 396,
        marginBottom: 15
    }
}))

const SignIn: React.FC<SignInProps> = ({setUser, user, history}) => {
    function SlideTransition (props:TransitionProps) {
        return <Slide {...props} direction="down" />;
    }
    const [values, setValues] = useState({
        email: "",
        password: '',
    })
    const [formError, setFormError] = useState("");
    const handleClose = () => {
        setUser({...user, createPopup:false })
    }
        const login = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        try {
            const response = await fetch(`${API_HOST}/devs`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })
            if (response.ok) {
                response.text().then().then(text => {
                    setUser({...user, name: values.email, auth: true, userID: text, loggedPopup:true})
                    history.push("/dashboard")
                })

            } else {
                response.text().then().then(text => {
                      setFormError(text)

                    });
            }
        } catch (err) {
        }

    };
    const classAlert = useStyles()
    return (
        <div className={styles.row}>
            <Snackbar open={user.createPopup} TransitionComponent={SlideTransition} anchorOrigin={{vertical:'top', horizontal:'center'}} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Account successfully created!
                </Alert>
            </Snackbar>
            <div className={styles.column}>
                <h1>Get started for free</h1>
                <div className={styles.center}>
                <div className={styles.socials}>
                    <SocialButton icon={google}>Sign in with Google </SocialButton>
                    <SocialButton icon={github}>Sign in with Github </SocialButton>
                </div>
                <div className={styles.socials}>
                    <SocialButton icon={linked}>Sign in with LinkedIn </SocialButton>
                    <SocialButton icon={facebook}>Sign in with Facebook </SocialButton>
                </div>
                </div>
                <div className={styles.row}>
                    <hr className={styles.double}/>
                    <span className={styles.spanWeight} >Or</span>
                    <hr className={styles.double}/>
                </div>
                <form onSubmit={login}>
                    <Inputs error={formError} values={values} setValues={setValues}/>
                    {formError ? <Alert className={classAlert.root} variant="filled" severity="error">
                        {formError}
                    </Alert> : ""}
                    <div className={styles.bottomSign}>
                        <Button type="submit" className={styles.btn} variant="contained" color="secondary" >Sign
                            in</Button>
                        <span>New Account? <Link to="/devs/signup" className={styles.register}>Register</Link></span>
                        <hr className={styles.one}/>
                        <span><a className={styles.register} href="www.google.com">Forgot Password?</a></span>
                    </div>
                </form>
            </div>
            <Hidden smDown>
                <div className={styles.imgContainer}>
            <img alt="sign up" className={styles.img} src={logo}/>
                </div>
            </Hidden>
        </div>
    );
}


export default withRouter(SignIn);
