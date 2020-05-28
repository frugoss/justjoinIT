import React, {useEffect} from 'react'
import {TextField} from 'mui-rff'
import {makeStyles} from "@material-ui/core/styles";
import * as opencage from "opencage-api-client";
import {useForm} from 'react-final-form';
import styles from './addoffer.module.scss'


const Address = ({ values, required}) => {
    const {change} = useForm();
    const useStylesField = makeStyles({
        textField: {
            backgroundColor: "transparent",
            border: "none",
            borderBottom: "0px solid #9e9e9e",
            borderRadius: 0,
            outline: "none",
            height: "3rem",
            width: "100%",
            margin: "0 0 20px 0",
            padding: 0,
            boxShadow: "none",
            boxSizing: "content-box",
            transition: "all 0.3s",
            color: "inherit",
            font: "inherit",
            fontSize: "inherit",
        },
    });
    const classesField = useStylesField();

    let fullAddress = "Marszałkowska 10, Warszawa"
    if ((values && values.street) || (values && values.city)){
        fullAddress = `${values.street} ${values.city}`
    }
    useEffect(() => {
        if (fullAddress !== " ") {
            opencage.geocode({
                key: "7e19a11fe0654ef8ba6c34d56cb9b83d",
                q: fullAddress,
                limit: 1,
                language: "pl",
                pretty: 1
            })
                .then(response => {
                    if (response.results[0] === undefined) {
                    } else {
                        change('coordinates', response.results[0].geometry);
                    }
                })
        }
    }, [fullAddress])

    return (
        <>
            <div className={styles.addressContainer}>
                <TextField className={classesField.textField}
                           name="city"
                           fieldProps={{validate: required}}
                           required={true}
                           InputLabelProps={{
                               shrink: true
                           }} placeholder="Warszawa" label="Office City"/>
            </div>
            <div className={styles.addressContainer}>
                <TextField name="street" className={classesField.textField}
                           InputLabelProps={{
                    shrink: true
                }} placeholder="Grunwaldzka 34" label="Office street/Business Center"
                           fieldProps={{validate: required}}
                           required={true}/>
            </div>
        </>
    )
}

export default Address
