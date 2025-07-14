import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/user';
import UserTable from '../components/UserTable';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <UserTable users={users} />
    </div>
  );
};

export default UserListPage;
