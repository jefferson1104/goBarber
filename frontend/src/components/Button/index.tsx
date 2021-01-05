import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Forma de criar tipagens de objetos, utilizamos desta maneira envez de criar uma interface vazia
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
