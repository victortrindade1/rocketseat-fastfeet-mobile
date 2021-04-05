import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import { Container, TInput, InputIcon, ErrorMessage } from './styles';

const Input = ({
  control,
  errors,
  placeholder,
  name,
  // rules
  style,
  icon,
  ...rest
}) => (
  <>
    <Container style={style}>
      {icon && <InputIcon name={icon} size={20} />}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        // rules={rules}
        render={({ onChange, onBlur, value }) => (
          <TInput
            // style={style}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={item => onChange(item)}
            value={value}
            {...rest}
          />
        )}
      />
    </Container>
    {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
  </>
);

export default Input;

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};
