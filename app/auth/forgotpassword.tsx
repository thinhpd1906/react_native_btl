import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseButton from '../../components/auth/BaseButton';
import BaseInputEmail from '../../components/auth/BaseInputEmail';
import BaseForm from '../../components/auth/BaseForm';
import WraperAuthScreen from '../../components/auth/WrapperScreen';
import BaseInputPassword from '../../components/auth/BaseInputPassword';
import BaseInputNumber from '../../components/auth/BaseInputNumber';
import { color } from '../../components/profile/style/color';
import BaseModalError from '../../components/auth/BaseModalError';
import { getVerifyCodeApi, resetPasswordApi } from '../../api/auth/auth';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import BaseTextTitle from '../../components/auth/BaseTextTitle';
import { useRouter } from 'expo-router';

const emailFormSchema = yup.object({
    email: yup.string().email().required()
});

export interface IFogetPassworData {
  email: string;
  password?: string;
  otp?: string;
}

export const forgotPasswordFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  otp: yup.string().required()
});

function ForgetPassword() {
    const router = useRouter();
  const [textError, setTextError] = useState<string>('');
  const [isEmailExits, setIsEmailExits] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGetCode, setIsLoadingGetCode] = useState<boolean>(false);
  const [formSchema, setFormSchema] = useState(forgotPasswordFormSchema);

  useEffect(() => {
    if (isEmailExits) {
      setFormSchema(forgotPasswordFormSchema);
    } else {
      setFormSchema(emailFormSchema as typeof forgotPasswordFormSchema);
    }
  }, [isEmailExits]);

  const methods = useForm({ resolver: yupResolver(formSchema) });
  const { handleSubmit, setValue } = methods;

  const onResetPassword = async (data: IFogetPassworData) => {
    try {
      setIsLoading(true);
      await resetPasswordApi({
        email: data.email,
        password: data.password as string,
        code: data.otp as string
      })
      .then((res) => {
        setIsLoading(false);
        router.back()
      })
      .catch((err) => {
        return setTextError(err.message);
      })
      
    } catch (err) {
      setTextError('Có lỗi xảy ra.Vui lòng thực hiện lại');
    }
  };

  const onGetVerifyCode = async (data: IFogetPassworData) => {
    try {
      setIsLoadingGetCode(true);
     await getVerifyCodeApi({ email: data.email })
     .then((res) => {
        setValue('otp', res.data.verify_code);
        setIsLoadingGetCode(false);
        setIsEmailExits(true);
     })
     .catch((err) => {
        return setTextError(err.message);
     })
    
    } catch (err) {
      setTextError('Có lỗi xảy ra.Vui lòng thực hiện lại');
    }
  };

  const onBackdropPress = () => {
    setTextError('');
    setIsLoading(false);
    setIsLoadingGetCode(false);
  };

  return (
    <WraperAuthScreen linnerGradient>
      <Text variant='titleMedium' style={{ fontSize: 16, fontWeight: 'bold' }}>
        Quên mật khẩu
      </Text>
      <BaseForm methods={methods}>
        <BaseInputEmail mode='outlined' label='Email' name='email' disabled={isEmailExits} />
        {isEmailExits ? (
          <>
            <BaseInputPassword mode='outlined' label='Mật khẩu mới' name='password' />
            <BaseInputNumber mode='outlined' label='Mã OTP' name='otp' />
          </>
        ) : (
          <></>
        )}
      </BaseForm>
      <BaseButton
        onPress={isEmailExits ? handleSubmit(onResetPassword) : handleSubmit(onGetVerifyCode)}
        loading={isLoading || (!isEmailExits && isLoadingGetCode)}
      >
        {isEmailExits ? 'Đổi mật khẩu' : 'Tìm tài khoản'}
      </BaseButton>
      {isEmailExits && (
        <>
          <BaseButton
            mode='outlined'
            isUseTextOutlineColor
            textColor={color.textColor}
            borderColor={color.outlineColor}
            loading={isLoadingGetCode}
            onPress={handleSubmit(onGetVerifyCode)}
          >
            Gửi lại OTP
          </BaseButton>
          <BaseTextTitle onPress={() => setIsEmailExits(false)}>
            Bạn muốn dùng email khác?
          </BaseTextTitle>
        </>
      )}
      <BaseModalError title={textError} isVisible={!!textError} onBackdropPress={onBackdropPress} />
    </WraperAuthScreen>
  );
}

export default ForgetPassword;
