import React from 'react';
import ButtonBase from "@material-ui/core/ButtonBase";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import styles from "./home.module.scss";
import {filtersInterface} from "../../utils/const";


const useStyles = makeStyles(createStyles({
    root: {
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        borderColor: 'rgb(186, 104, 200)',
        height: 35,
        background: "white",
        padding: '10px 12px',
        marginRight: 12,
        marginBottom: 12,
        color: '#777777',
        border: "1px solid"

    },

}));

type ExperienceButtonMobileProps = {
    name: string,
    isActive: boolean,
    filters: filtersInterface,
    updateFilters: (key: string, value:string) => void
}
const ExperienceButtonMobile: React.FC<ExperienceButtonMobileProps> = ({name, isActive, filters, updateFilters}) => {

    const classes = useStyles();
    return (
        <>
            <Link to={`/${filters.city}/${filters.language}/${name.toLowerCase()}/${filters.salarymin}/${filters.salarymax}`} className={styles.linkRoute}>
                <ButtonBase onClick={() => {
                    updateFilters("experience",name.toLowerCase())
                }} className={isActive ? styles.activeButton : ''}
                            classes={{root: classes.root}}>{name}</ButtonBase>
            </Link>
        </>
    )
};


export default ExperienceButtonMobile;


