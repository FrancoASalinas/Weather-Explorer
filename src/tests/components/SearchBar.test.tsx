import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchBar from 'src/components/Searchbar';
import { input, button } from 'src/constants/Searchbar';
import typeOnInput from 'src/tests/utils/typeOnInput';
import '@testing-library/jest-dom';

function setup() {
  return {
    user: userEvent.setup(),
    //cannot be rendered as a plain component because of the useNavigate hook
    ...render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<SearchBar />} />
        </Routes>
      </MemoryRouter>
    ),
  };
}

function getSearchButton() {
  return screen.getByText(button.text);
}

it(`Should render an input with placeholder ${input.placeholder}`, () => {
  setup();
  screen.getByPlaceholderText(input.placeholder);
});

it(`Should render a button with text ${button.text}`, () => {
  setup();
  getSearchButton();
});

describe('Search button', () => {
  it('Should be disabled if input is empty', async () => {
    setup();
    expect(getSearchButton()).toBeDisabled();
  });

  it('Should be disabled if input has whitespaces only', async () => {
    const { user } = setup();
    await typeOnInput(
      user,
      screen.getByPlaceholderText(input.placeholder),
      '    \n  '
    );
    expect(getSearchButton()).toBeDisabled();
  });
});
