import { atom } from 'recoil';

// localStorage에서 상태를 로드
const loadFromLocalStorage = () => {
  const storedUser = localStorage.getItem('userState');
  return storedUser ? JSON.parse(storedUser) : { isLoggedIn: false, email: null };
};

export const userState = atom({
  key: 'userState',
  default: loadFromLocalStorage(), // 초기값을 localStorage에서 로드
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('userState', JSON.stringify(newValue)); // 상태 변경 시 localStorage에 저장
      });
    },
  ],
});
