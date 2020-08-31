import React from 'react';
import styles from "./skill.module.scss"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {formInterface} from "../../utils/const";
import {experience} from "./const";


type SkillProps = {
    formValues: formInterface,
    onChange: (event: any) => void,
    techStackElement: {language?: string, lvl?: number}
}
const Skill: React.FC<SkillProps> = ({formValues, onChange, techStackElement}) => {
    let index:number;
    const techStack = formValues.techStack.filter((e, i) => {
        if (e.language === techStackElement.language) {
            index = i;
            return true;
        }
        return false;
    })[0];
    const expDesc = experience.filter(e => e.id === techStack.lvl)[0].desc;
    const getSkillLevelUpdate = (lvl:number) => {
        let updatedTechStack = formValues.techStack.map((e, i) => {
            if (i === index) {
                return {...techStack, lvl: lvl};
            } else {
                return e;
            };
        });
        return updatedTechStack;
    };

    const deleteSkill = formValues.techStack.filter(item => {
        if (item.language !== techStackElement.language){
            return item;
        }
            return false;
    })




    return (
        <div className={styles.skillContainer}>
            <div className={styles.flex}>
                {experience.map((lvl,index) => <span key={index} className={techStack.lvl && techStack.lvl >= lvl.id ? styles.dotClicked : styles.dot}
                                             onClick={() => onChange(getSkillLevelUpdate(lvl.id))}/>
                )}
                <HighlightOffIcon className={styles.close} onClick={() => {
                    onChange(deleteSkill)
                }}/>
            </div>

            <span className={styles.language}>{techStackElement.language}</span>
            <span className={styles.desc} onClick={() => {
                if (techStack.lvl && techStack.lvl <= 4) {
                    onChange(getSkillLevelUpdate(techStack.lvl && techStack.lvl + 1))
                } else {
                    onChange(getSkillLevelUpdate(1))
                }
            }}>{expDesc}</span>

        </div>
    )
}
export default Skill
