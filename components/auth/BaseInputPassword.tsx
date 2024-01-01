import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { FC, PropsWithChildren, useState } from 'react';
import styled from 'styled-components/native';
import { color } from '../profile/style/color';
import { BaseInputProps, LableProps } from './BaseInputText';
import { useController } from 'react-hook-form';

const defaultProps: Omit<BaseInputProps, 'name'> = {
  hideLabel: false,
  required: false,
  activeOutlineColor: color.activeOutlineColor,
  outlineColor: color.outlineColor
};
function BaseInputPassword(props: BaseInputProps) {
  const [hidden, setHidden] = useState(true);
  const [hiddenEyeIcon, setHiddenEyeIcon] = useState(true);
  const { name, rules, defaultValue, label, required, hideLabel, control, ...inputProps } = props;
  const { field, fieldState } = useController({
    name: name as string,
    rules,
    control,
    defaultValue
  });
  const onPressEyeIcon = () => setHidden(!hidden);
  return (
    <View>
      {hideLabel && label && (
        <Label error={fieldState.invalid}>
          {label}
          {required && hideLabel && <RequiredIcon> *</RequiredIcon>}
        </Label>
      )}
      <TextInput
        {...inputProps}
        {...field}
        right={
          !hiddenEyeIcon &&
          (hidden ? (
            <TextInput.Icon
              icon='eye-off'
              onPress={onPressEyeIcon}
              color={(fieldState.invalid && color.error) as string}
            />
          ) : (
            <TextInput.Icon
              icon='eye'
              onPress={onPressEyeIcon}
              color={(fieldState.invalid && color.error) as string}
            />
          ))
        }
        label={!hideLabel ? label : ''}
        onChangeText={field.onChange}
        error={fieldState.invalid}
        outlineStyle={{ borderWidth: 1.5, borderRadius: 8 }}
        style={[props.style, { height: 54 }]}
        secureTextEntry={hidden}
        onFocus={() => setHiddenEyeIcon(false)}
        onBlur={() => setHiddenEyeIcon(true)}
      />
      {fieldState.invalid && <TextError>{fieldState.error?.message}</TextError>}
    </View>
  );
}
BaseInputPassword.defaultProps = defaultProps;

const TextError = styled.Text`
  color: ${color.error};
  padding-top: 4px;
  font-size: 14px;
  padding-left: 8px;
`;
const Label: FC<PropsWithChildren<LableProps>> = styled.Text`
  color: ${props => (props.error ? color.error : color.primary)};
  padding-bottom: 8px;
  font-size: 16px;
  padding-left: 12px;
  font-weight: bold;
`;
const RequiredIcon = styled.Text`
  color: ${color.error};
  padding-left: 4px;
`;
export default BaseInputPassword;
