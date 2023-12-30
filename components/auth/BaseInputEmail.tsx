import BaseInputText from './BaseInputText';
import { BaseInputProps } from './BaseInputText';
function BaseInputEmail(props: BaseInputProps) {
  return <BaseInputText {...props} keyboardType='email-address' multiline={false} />;
}

export default BaseInputEmail;
