import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddOffer from "./AddOffer";
import Verify from "./Verify"
import Question from '../../assets/images/QuestionMark.png'
import styles from './addoffer.module.scss'


function getSteps() {
    return ['Create', 'Verify & Publish'];
}

export default function JustStepper({user, setUser, fetchOffers}) {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        technology: {img: Question},
        techStack: [],
        userID: user.userID,
        agreements : `Informujemy, że administratorem danych jest ______________ z siedzibą w ___________, ul. _______________ (dalej jako "administrator"). Masz prawo do żądania dostępu do swoich danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu wobec przetwarzania, a także prawo do przenoszenia danych oraz wniesienia skargi do organu nadzorczego. Dane osobowe przetwarzane będą w celu realizacji procesu rekrutacji. Podanie danych w zakresie wynikającym z ustawy z dnia 26 czerwca 1974 r. Kodeks pracy jest obowiązkowe. W pozostałym zakresie podanie danych jest dobrowolne. Odmowa podania danych obowiązkowych może skutkować brakiem możliwości przeprowadzenia procesu rekrutacji. Administrator przetwarza dane obowiązkowe na podstawie ciążącego na nim obowiązku prawnego, zaś w zakresie danych dodatkowych podstawą przetwarzania jest zgoda. Dane osobowe będą przetwarzane do czasu zakończenia postępowania rekrutacyjnego i przez okres możliwości dochodzenia ewentualnych roszczeń, a w przypadku wyrażenia zgody na udział w przyszłych postępowaniach rekrutacyjnych - do czasu wycofania tej zgody. Zgoda na przetwarzanie danych osobowych może zostać wycofana w dowolnym momencie. Odbiorcą danych jest serwis Just Join IT oraz inne podmioty, którym powierzyliśmy przetwarzanie danych w związku z rekrutacją.`

    })
    const steps = getSteps();




    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };



    return (
            <div className={styles.stepperContainer}>
            <Stepper style={{background: "rgb(243, 246, 248)"}} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                        <div>
                            {activeStep === 0 ? <AddOffer handleNext={handleNext} setFormValues={setFormValues} formValues={formValues}/> : ""}
                            {activeStep === 1 ? <Verify fetchOffers={fetchOffers} setActiveStep={setActiveStep} user={user} setUser={setUser} formValues={formValues} /> :""}


                        </div>
            </div>
            </div>

    );
}
