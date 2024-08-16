import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

function componentSetup(component: ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(component)
    }
}

export default componentSetup