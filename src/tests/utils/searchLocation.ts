import { UserEvent } from '@testing-library/user-event';
import typeOnInput from './typeOnInput';
import { screen } from '@testing-library/dom';
import { button, input } from 'src/constants/Searchbar';

async function searchLocation(user: UserEvent, field: string) {
  await typeOnInput(
    user,
    screen.getByPlaceholderText(input.placeholder),
    field
  );

  await user.click(screen.getByText(button.text));
}

export default searchLocation;
