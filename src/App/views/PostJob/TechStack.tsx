import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Skill from "./Skill";
import LanguageList from "../../assets/LanguageList.json"
import styles from './skill.module.scss'
import {formInterface} from "../../utils/const";
import {FieldRenderProps} from "react-final-form";
import {makeStyles, createStyles} from "@material-ui/styles";

const useStyles = makeStyles(createStyles({
   autocomplete: {width: 264}
}))
const languages = LanguageList;

type TechStackProps = {
    onChange: (event: any) => void
    formValues: formInterface,
    fieldRenderProps:  FieldRenderProps<[], HTMLElement>
}
const TechStack: React.FC<TechStackProps> = ({onChange, formValues, fieldRenderProps}) => {
    const [inputValue, setInputValue] = useState("");
    const classes = useStyles()
    return (
        <>
            <Autocomplete
                disableClearable
                freeSolo
                inputValue={inputValue}
                onInputChange={((_event, value) => setInputValue(value ? value : ""))}
                onChange={(_event, newValue) => {
                    if (typeof newValue === "string") {
                        onChange([...formValues.techStack, {language: newValue, lvl: 1}])
                    } else if (newValue) {
                        onChange([...formValues.techStack, {...newValue, lvl: 1}])
                    }
                    setInputValue("");
                }}
                filterOptions={(options, state) => {
                    let filteredOptions = createFilterOptions({stringify: (option:{language:string}) => option.language})(options, state)
                    const isAdded = (needle:string, haystack:{language?:string, lvl?:number}[]) => {
                        let exist = false;
                        haystack.forEach((element:{language?:string, lvl?:number}) => {
                            if (needle === element.language) {
                                exist = true;
                            };
                        });
                        return exist;
                    };
                    if (state.inputValue !== "" && !isAdded(state.inputValue, formValues.techStack)) {
                        filteredOptions.push({
                            language: `${state.inputValue}`
                        });
                    };
                    filteredOptions = filteredOptions.filter((item) => {
                            let exist = true;
                            formValues.techStack.forEach(element => {
                                    if (item.language === element.language) {
                                        exist = false;
                                    }
                                }
                            );
                            return exist;
                        }
                    );
                    return filteredOptions;
                }}
                id="tech-stack"
                options={languages}
                getOptionLabel={option => {
                    if (typeof option === "string") {
                        return option;
                    } else {
                        return option ? option.language : ""
                    }
                }}
                className={classes.autocomplete}
                renderInput={params => (
                    <TextField
                        error={fieldRenderProps.meta.error && fieldRenderProps.meta.touched}
                        {...params}
                        placeholder="Select technology or write a new one"
                        label=""
                        variant="standard"
                    />
                )}
            />

            <div/>
            <div className={styles.techStackList}>
                {formValues.techStack !== undefined
                    ? formValues.techStack.map((techStackElement) => (
                        <Skill onChange={onChange} formValues={formValues} key={techStackElement.language}
                               techStackElement={techStackElement}/>
                    ))
                    : ""}
            </div>
        </>
    );
};

export default TechStack;
