
import React, { useContext, useState } from "react";
import Sidebar from "../../components/operator/Sidebar";
import Header from "../../components/operator/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { Service } from "../../types/service";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/form/Input';

const OperatorServicesPage: React.FC = () => {
  const { operator } = useContext(AuthContext);
  const [services, setServices] = useState<Service[]>(operator?.services || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  type FormValues = {
    name: string;
    description: string;
    duration: number | '';
    price: number | '';
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      duration: 30,
      price: 0,
    }
  });
  const [apiError, setApiError] = useState('');

  if (!operator) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <h2 className="text-2xl font-bold mb-4">サービス管理</h2>
            <p>データを読み込み中です...</p>
          </main>
        </div>
      </div>
    );
  }

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      reset({
        name: service.name,
        description: service.description || "",
        duration: service.duration,
        price: service.price || 0
      });
    } else {
      setEditingService(null);
      reset({ name: "", description: "", duration: 30, price: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const onSubmit = async (data: FormValues) => {
    setApiError('');
    try {
      const payload = {
        ...data,
        operator_id: operator.id,
      };
      if (editingService) {
        const response = await axios.put(`/api/services/${editingService.id}`, payload);
        setServices(services.map(s => (s.id === editingService.id ? response.data.data : s)));
      } else {
        const response = await axios.post("/api/services", payload);
        setServices([...services, response.data.data]);
      }
      handleCloseModal();
    } catch (error: any) {
      setApiError(error.response?.data?.message || "サービスの保存に失敗しました");
      console.error("サービスの保存に失敗しました", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("このサービスを削除してもよろしいですか？")) return;
    try {
      await axios.delete(`/api/services/${id}`);
      setServices(services.filter(s => s.id !== id));
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("このサービスは予約で使用されているため削除できません。");
      } else {
        console.error("サービスの削除に失敗しました", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">サービス管理</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleOpenModal()}
            >
              新規追加
            </button>
          </div>
          {services.length === 0 ? (
            <p>登録されているサービスはありません。</p>
          ) : (
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">サービス名</th>
                  <th className="border px-4 py-2">説明</th>
                  <th className="border px-4 py-2">所要時間(分)</th>
                  <th className="border px-4 py-2">価格（円）</th>
                  <th className="border px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="border px-4 py-2">{service.id}</td>
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.description}</td>
                    <td className="border px-4 py-2">{service.duration}</td>
                    <td className="border px-4 py-2">{service.price}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* モーダル */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded p-6 w-96">
                <h3 className="text-xl font-bold mb-4">
                  {editingService ? "サービス編集" : "新規サービス追加"}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'サービス名は必須です' }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        id="name"
                        name="name"
                        label="サービス名"
                        placeholder="サービス名"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        id="description"
                        name="description"
                        label="説明"
                        as="textarea"
                        placeholder="説明"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="duration"
                    control={control}
                    rules={{ required: '所要時間は必須です' }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        id="duration"
                        name="duration"
                        label="所要時間(分)"
                        type="number"
                        placeholder="所要時間(分)"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    name="price"
                    control={control}
                    rules={{ required: '価格は必須です' }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        id="price"
                        name="price"
                        label="価格（円）"
                        type="number"
                        placeholder="価格（円）"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      保存
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OperatorServicesPage;
