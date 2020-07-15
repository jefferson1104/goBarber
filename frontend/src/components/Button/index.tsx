import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Forma de criar tipagens de objetos, utilizamos desta maneira envez de criar uma interface vazia
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
