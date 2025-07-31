import React, { useState, useRef, useEffect } from "react";
import OperatorLayout from "../../components/OperatorLayout";
import { useAuthStore } from '../../stores/authStore';
import { Service } from "../../types/service";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import Input from '../../components/ui/Input';
import { toast } from 'sonner';
import { ApiResponse } from '../../types/api';

const OperatorServicesPage: React.FC = () => {
  const operator = useAuthStore.getState().operator;
  const [services, setServices] = useState<Service[]>(operator?.services || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isModalOpen) {
      firstInputRef.current?.focus();
    }
  }, [isModalOpen]);

  if (!operator) {
    return (
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">サービス管理</h2>
        <p>データを読み込み中です...</p>
      </main>
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
    try {
      const payload = { ...data, operator_id: operator.id };
      if (editingService) {
        const response = await axios.put<ApiResponse<Service>>(`/api/services/${editingService.id}`, payload);
        setServices(services.map(s => (s.id === editingService.id ? response.data.data : s)));
        toast.success("サービスを更新しました");
      } else {
        const response = await axios.post<ApiResponse<Service>>("/api/services", payload);
        setServices([...services, response.data.data]);
        toast.success("サービスを追加しました");
      }
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "サービスの保存に失敗しました");
      console.error("サービスの保存に失敗しました", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("このサービスを削除してもよろしいですか？")) return;
    try {
      await axios.delete(`/api/services/${id}`);
      setServices(services.filter(s => s.id !== id));
      toast.success("サービスを削除しました");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("このサービスは予約で使用されているため削除できません。");
      } else {
        console.error("サービスの削除に失敗しました", error);
      }
    }
  };

  return (
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
            <div
              className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-50 flex justify-center items-center
    ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  handleCloseModal();
                }
              }}
            >
              <div
                className="bg-white rounded p-6 w-96"
                ref={modalRef}
              >
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
                        ref={firstInputRef}
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
  );
};

export default OperatorServicesPage;
