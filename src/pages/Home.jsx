import React, { useEffect, useState } from 'react';
import { getAccountInfo, getMarketInfo, getUsers } from '../Api/upbitAPI';

function Home() {
  const [users, setUsers] = useState([]);
  const [markets, setMarkets] = useState([]); // 초기값 빈 배열
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [userFavorites, setUserFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('userFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  useEffect(() => {
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  }, [userFavorites]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, marketRes] = await Promise.all([
          getUsers(),
          getMarketInfo(),
        ]);
        setUsers(userRes || []);
        setMarkets(Array.isArray(marketRes) ? marketRes : []); // 배열 확인 후 설정
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
      }
    };
    fetchData();
  }, []);

  const handleUserChange = (userId) => {
    const user = users.find((user) => user.id.toString() === userId);
    setSelectedUser(user);

    if (user && !userFavorites[user.id]) {
      setUserFavorites((prev) => ({ ...prev, [user.id]: [] }));
    }
  };

  const handleAddFavorite = (market) => {
    if (!selectedUser) return;

    const userId = selectedUser.id;
    if (!userFavorites[userId]?.find((coin) => coin.market === market.market)) {
      setUserFavorites((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] || []), market],
      }));
    }
  };

  const handleRemoveFavorite = (market) => {
    if (!selectedUser) return;

    const userId = selectedUser.id;
    setUserFavorites((prev) => ({
      ...prev,
      [userId]: prev[userId].filter((coin) => coin.market !== market),
    }));
  };

  return (
    <div className="min-h-screen p-8 mt-14 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">📊 개인 대시보드</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1">
          <h2 className="text-2xl font-semibold mb-4">👤 유저 정보</h2>
          <select
            className="w-full p-3 border rounded-md bg-gray-900 text-white mb-4"
            onChange={(e) => handleUserChange(e.target.value)}
          >
            <option value="">유저 선택</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUser && (
            <div className="space-y-2">
              <p><strong>이름:</strong> {selectedUser.name}</p>
              <p><strong>이메일:</strong> {selectedUser.email}</p>
              <p><strong>닉네임:</strong> {selectedUser.nick}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-2">
          <h2 className="text-2xl font-semibold mb-4">📈 마켓 선택</h2>
          <select
            className="w-full p-3 border rounded-md bg-gray-900 text-white mb-4"
            onChange={(e) =>
              setSelectedMarket(
                markets.find((market) => market.market === e.target.value)
              )
            }
          >
            <option value="">마켓 선택</option>
            {markets.map((market) => (
              <option key={market.market} value={market.market}>
                {market.korean_name} ({market.market})
              </option>
            ))}
          </select>

          {selectedMarket && (
            <div className="space-y-2">
              <p><strong>마켓:</strong> {selectedMarket.market}</p>
              <p><strong>이름:</strong> {selectedMarket.korean_name}</p>
              <button
                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                onClick={() => handleAddFavorite(selectedMarket)}
              >
                관심 코인 추가
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
