import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import { FormWrapper, Input } from '@/components/form';

type FormValues = {
  email: string;
  password: string;
};

const OperatorLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setUserAndRole } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
      const response = await axios.post('/api/operator/login', data, { withCredentials: true });
      const operatorData = response.data?.data?.user;
      if (operatorData) {
        setUserAndRole(operatorData, 'operator');
        navigate('/operator/dashboard');
      } else {
        setApiError('ログイン情報を確認できませんでした');
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'ログインに失敗しました');
    }
  };

  return (
    <FormWrapper
      title="オペレーター ログイン"
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={apiError || undefined}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: 'メールアドレスは必須です' }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            id="email"
            name="email"
            label="メールアドレス"
            type="email"
            placeholder="メールアドレス"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'パスワードは必須です' }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            id="password"
            name="password"
            label="パスワード"
            type="password"
            placeholder="パスワード"
            error={fieldState.error?.message}
          />
        )}
      />
    </FormWrapper>
  );
};

export default OperatorLogin;
