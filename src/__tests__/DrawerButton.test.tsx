import DrawerButton, {DrawerButtonProps} from "../App/components/Header/Drawer/DrawerButton";
import {screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import React from 'react';
import {renderWithRouter} from "../App/utils/tests";


function renderDrawerButton(props: Partial<DrawerButtonProps> = {}) {
    const defaultProps: DrawerButtonProps = {
        to: "to",
        img: "img",
        text: "text",
        setOpen(){
        return},
        logout(){
        }
    }

    return renderWithRouter(<DrawerButton {...defaultProps} {...props}/>);
};

describe("<DrawerButton />", () => {
    test("check the link", () => {
        renderDrawerButton();
        const buttonDrawer = screen.getByRole("link")
        screen.debug(buttonDrawer)
        expect(buttonDrawer).toBeInTheDocument();
        }
    )
})
