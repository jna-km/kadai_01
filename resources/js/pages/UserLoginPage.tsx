
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { FormWrapper, Input } from '@/components/form';
import React from 'react';

type FormValues = {
  email: string;
  password: string;
};

export default function UserLoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { email: '', password: '' }
  });
  const [apiError, setApiError] = React.useState('');

  const onSubmit = async (data: FormValues) => {
    setApiError('');
    try {
      const res = await axios.post('/api/login', data);
      alert('ログイン成功');
      // トークン保存や画面遷移などの処理
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'ログインに失敗しました');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">ユーザーログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
  return (
    <FormWrapper
      title="ユーザーログイン"
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
      {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
    </FormWrapper>
  );
