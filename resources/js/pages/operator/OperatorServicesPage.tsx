import React, { useContext, useState } from "react";
import Sidebar from "../../components/operator/Sidebar";
import Header from "../../components/operator/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { Service } from "../../types/service";
import axios from "axios";

const OperatorServicesPage: React.FC = () => {
  const { operator } = useContext(AuthContext);
  const [services, setServices] = useState<Service[]>(operator?.services || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    price: 0
  });

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
      setFormData({
        name: service.name,
        description: service.description || "",
        duration: service.duration,
        price: service.price || 0
      });
    } else {
      setEditingService(null);
      setFormData({ name: "", description: "", duration: 30, price: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "duration" || name === "price" ? Number(value) : value
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        operator_id: operator.id, // オペレーターIDを追加
      };

      if (editingService) {
        // Update existing service
        const response = await axios.put(`/api/services/${editingService.id}`, payload);
        setServices(services.map(s => (s.id === editingService.id ? response.data.data : s)));
      } else {
        console.log(payload)
        // Create new service
        const response = await axios.post("/api/services", payload);
        setServices([...services, response.data.data]);
      }
      handleCloseModal();
    } catch (error) {
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
                <input
                  type="text"
                  name="name"
                  placeholder="サービス名"
                  value={formData.name}
                  onChange={handleChange}
                  className="border w-full p-2 mb-2"
                />
                <textarea
                  name="description"
                  placeholder="説明"
                  value={formData.description}
                  onChange={handleChange}
                  className="border w-full p-2 mb-2"
                />
                <input
                  type="number"
                  name="duration"
                  placeholder="所要時間(分)"
                  value={formData.duration}
                  onChange={handleChange}
                  className="border w-full p-2 mb-4"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="価格（円）"
                  value={formData.price}
                  onChange={handleChange}
                  className="border w-full p-2 mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OperatorServicesPage;
