import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, TInput } from './styles';

const Input = ({
  control,
  errors,
  placeholder,
  name,
  style,
  icon,
  ...rest
}) => (
  <>
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255, 0.6)" />}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={style}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={item => onChange(item)}
            value={value}
            {...rest}
          />
        )}
        name={name}
        defaultValue=""
      />
    </Container>
    {errors[name] && <Text>{errors[name].message}</Text>}
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
