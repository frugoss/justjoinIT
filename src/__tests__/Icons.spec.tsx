import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import Icons, {IconsProps} from "../App/views/PostJob/Icons";
import { render} from '@testing-library/react';

function renderIcons(props: Partial<IconsProps> = {}) {
    const defaultProps: IconsProps = {
        onChange: () => {},
        name: "test",
        img: "img",
        color: "color",
        background: "background",
        to: "test"

    };
    return render(<Icons {...defaultProps} {...props} />);
}
describe("<Icons />", () => {
    it("snapshot",  () => {
        const {container} = renderIcons();
        expect(container).toMatchSnapshot();

    })
})
