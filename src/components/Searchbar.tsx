import { button, input } from "../contents/App";

export default function SearchBar({
    onClick,
    onChange,
    value,
  }: {
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
  }) {
    return (
      <div className='header__searchbar'>
        <input
          className='header__searchbar__input'
          type='text'
          placeholder={input.placeholder}
          onChange={onChange}
          value={value}
        />
        <button
          disabled={value.trim() === ''}
          onClick={onClick}
          className='header__searchbar__button'
        >
          {button.text}
        </button>
      </div>
    );
  }