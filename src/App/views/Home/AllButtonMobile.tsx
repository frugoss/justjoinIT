import React from "react";
import {Link} from "react-router-dom";
import styles from "./home.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";
import {makeStyles,createStyles} from "@material-ui/core/styles";
import {filtersInterface} from "../../utils/const";


const useStyles = makeStyles(createStyles({
    root: {
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        color: '#777777',
        height: 40,
        border: "1px solid rgb(186, 104, 200)",
        background: "white",
        padding: '0 12px',

    }
}));

type AllButtonMobileProps = {
    to: string,
    name: string,
    isActive: boolean,
    filters: filtersInterface,
    updateFilters: (key:string, values:string) => void,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AllButtonMobile: React.FC<AllButtonMobileProps> = ({to, name, isActive, filters, updateFilters, setOpen}) => {
    const classes = useStyles();
    return (
        <div className={styles.buttonContainer}>
            <Link to={`/${filters.city}/${to}/${filters.experience}`} className={styles.linkRouteAllBtn}>
                <ButtonBase onClick={() => {
                    updateFilters("language", to)
                    setOpen(false)
                }} disableRipple
                            className={isActive ? styles.activeButton : ""}
                            classes={{root: classes.root}}>
                    {name}
                </ButtonBase>
            </Link>
        </div>
    )
}


export default AllButtonMobile;
