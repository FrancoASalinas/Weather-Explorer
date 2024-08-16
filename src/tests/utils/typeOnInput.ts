import { UserEvent } from "@testing-library/user-event";

async function typeOnInput(user: UserEvent, element: HTMLElement, input: string) {
    await user.type(element, input);
  }

  export default typeOnInput