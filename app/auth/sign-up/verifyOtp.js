import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import WraperAuthScreen from '../../../components/auth/WrapperScreen';
import BaseInputNumber from '../../../components/auth/BaseInputNumber';
import BaseButton from '../../../components/auth/BaseButton';
import { color } from '../../../components/profile/style/color';
import BaseForm from '../../../components/auth/BaseForm';
// import { otpFormSchema } from 'src/validation/signUp.validate';
import { IVerifyOtpSceenForm } from '../../../components/auth/auth.interface';
import { useEffect, useState } from 'react';
import { checkVerifyCodeApi, getVerifyCodeApi } from '../../../api/auth/auth';
import BaseModalError from '../../../components/auth/BaseModalError';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';

const otpFormSchema = yup.object({
    otpCode: yup.string().min(6, 'Vui lòng nhập đủ mã OTP').required('Vui lòng nhập mã OTP')
});

function VerifyOTPScreen() {
  const [textError, setTextError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetCode, setIsLoadingGetCode] = useState(false);
  const signUpInfor = useSelector((state) => state.auth.userInforSignIn)
  let email = signUpInfor.email
  const methods = useForm({ resolver: yupResolver(otpFormSchema) });
  const { handleSubmit, setValue } = methods;
  const params = useLocalSearchParams();
  // const code = params.code;
  useEffect(() => {
    setValue('otpCode', params.code);
  }, [setValue, params]);

  const onPressButton = async (data) => {
    try {
      setIsLoading(true);
    await checkVerifyCodeApi({ code_verify: data.otpCode, email: email })
    .then((res) => {
        console.log("check code success", res)
        Alert.alert(
        "Success", // Tiêu đề của cửa sổ thông báo
        "register success", // Nội dung của cửa sổ thông báo
        [{
          text: 'OK',
          onPress: () => router.push('/auth/login'), // Hàm này sẽ được gọi khi người dùng nhấn "OK"
        }, ],
      );
      })
      .catch((err) => {
        console.log("err", err)
        return setTextError(err.message);
      })
      // if (!res.success) {
      //   return setTextError(res.message);
      // }
      // navigation.navigate('SaveInfoAccountScreen');
      setIsLoading(false);
    } catch (err) {
      setTextError('Dịch vụ chưa sẵn sàng');
    }
  };

  const onGetVerifyCode = async () => {
    try {
      setIsLoadingGetCode(true);
      await getVerifyCodeApi({ email })
      .then((res) => {
        setValue('otpCode', res.data.verify_code);
        setIsLoadingGetCode(false);
      })
      .catch((err) => {
        return setTextError(err.message);
      })
      
    
    } catch (err) {
      setTextError('server availability');
    }
  };

  const onBackdropPress = () => {
    setTextError('');
    setIsLoading(false);
    setIsLoadingGetCode(false);
  };
  return (
    <WraperAuthScreen linnerGradient>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Nhập mã xác nhận
      </Text>
      <Text variant='bodyMedium'>
        Để xác nhận tài khoản, hãy nhập mã số gồm 6 chứ số mà chúng tôi đã gửi đến số
      </Text>
      <BaseForm methods={methods}>
        <BaseInputNumber mode='outlined' label='Mã xác nhận' name='otpCode' />
      </BaseForm>
      <BaseButton onPress={handleSubmit(onPressButton)} loading={isLoading}>
        Tiếp
      </BaseButton>
      <BaseButton
        mode='outlined'
        isUseTextOutlineColor
        textColor={color.textColor}
        borderColor={color.outlineColor}
        loading={isLoadingGetCode}
        onPress={onGetVerifyCode}
      >
        Tôi không nhận được mã
      </BaseButton>
      <BaseModalError title={textError} isVisible={!!textError} onBackdropPress={onBackdropPress} />
    </WraperAuthScreen>
  );
}

export default VerifyOTPScreen;
