import React, {useState} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LangButtonMobile from "./LangButtonMobile";
import AllButtonMobile from "./AllButtonMobile";
import styles from "./home.module.scss";
import {filtersInterface, languageInterface} from "../../utils/const";
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles(createStyles({
    root: {
        display:"flex",
        width:"100%",
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        textTransform: "none",
        color: '#777777',
        height: 35,
        background: "white",
        borderColor: "rgb(228, 232, 240)",
        '&:hover': {
            borderColor: "rgb(186, 104, 200)",
            backgroundColor: "white"
        }
    },
    close: {
        position: "fixed",
        left:20,
        marginDown: 10
    },

    divider: {
        marginTop:45
    }
}));
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide {...props} ref={ref} direction="down"   />;
});

type LangFilterMobileProps = {
    filters: filtersInterface,
    language: languageInterface[],
    updateFilters: (key:string, value:string) => void
}
const LangFilterMobile: React.FC<LangFilterMobileProps> = ({filters, language, updateFilters}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const isActive = (link:string, filter:string):boolean => {
        return filter === link
    };

    const imgFiltered = language.filter(item => item.to === filters.language)
    return (
        <>
            <Button className={imgFiltered[0] && isActive(imgFiltered[0].to, filters.language) && imgFiltered[0].to !== "all" ? `${styles.activeButton} ${classes.root}` : classes.root} variant="outlined" onClick={handleClickOpen}>
                {imgFiltered[0] ? <div className={styles.langButtonMobile}><img alt="logo" className={styles.logoLang} src={imgFiltered[0].img}/> {imgFiltered[0].name}</div> : "Technology"}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div onClick={handleClose}>
                    <IconButton className={classes.close} edge="start" color="inherit"
                                onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <h2 className={styles.textTitleMobile}>Language</h2>
                </div>
                <Divider className={classes.divider} />
                <div className={styles.languagePositionMobile}>
                    <AllButtonMobile setOpen={setOpen} filters={filters} name="All" to="all" key="all"
                                     updateFilters={updateFilters}
                                     isActive={isActive("all", filters.language)}/>
                    {language && language.map(({name, to, img}) => (

                            <LangButtonMobile setOpen={setOpen}  filters={filters} name={name} img={img}
                                              to={to} key={to} updateFilters={updateFilters}
                                              isActive={isActive(to, filters.language) || isActive("all", filters.language)}>

                            </LangButtonMobile>

                        )
                    )}
                </div>

            </Dialog>
        </>
    );
}

export default LangFilterMobile;
