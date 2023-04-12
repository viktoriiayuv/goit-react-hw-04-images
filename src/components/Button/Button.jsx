import PropTypes from 'prop-types';
import { ButtonContainer } from './Button.styled';

const Button = ({ onClick }) => {
  return <ButtonContainer onClick={onClick}>Load more</ButtonContainer>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
