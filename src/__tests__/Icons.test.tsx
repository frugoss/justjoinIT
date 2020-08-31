import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import Icons, {IconsProps} from "../App/views/PostJob/Icons";
import { render, screen} from '@testing-library/react';

function renderIcons(props: Partial<IconsProps> = {}) {
    const defaultProps: IconsProps = {
        onChange() {
            return;
        },
        name: "test",

        img: "img",
        color: "color",
        background: "background",
        to: "test"

    };
    return render(<Icons {...defaultProps} {...props} />);
}
describe("<Icons />", () => {
    test("check the button", async () => {
        renderIcons();
        const buttonIcon = screen.getByRole("button");
        expect(buttonIcon).toBeInTheDocument()
    })
})
