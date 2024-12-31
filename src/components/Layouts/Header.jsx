import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userState } from '../../state/userState';

function Header() {
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState); // Recoil 상태 초기화

  const handleLogout = () => {
    // Recoil 상태 초기화
    resetUser();

    // 로컬 스토리지나 세션에서 인증 정보 삭제
    localStorage.removeItem('userstate'); // authToken 저장 여부 확인 후 삭제
    localStorage.removeItem('otp'); // OTP가 저장된 경우 삭제

    // 로그인 페이지로 리다이렉트
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full align-middle bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto align-middle flex justify-between items-center">
        {/* 왼쪽 로고 및 메뉴 */}
        <div className="flex items-center space-x-8">
          <img className="w-28 bg-transparent" src="/AutoBit_white.png" alt="AutoBit Logo" />
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-blue-500">거래소</a>
            <a href="#" className="hover:text-blue-500">입출금</a>
            <a href="#" className="hover:text-blue-500">투자현황</a>
            <a href="#" className="hover:text-blue-500">업비트</a>
          </nav>
        </div>

        {/* 오른쪽 로그아웃 버튼 */}
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="hover:text-blue-500"
          >
            로그아웃
          </button>
          <a href="/signup" className="hover:text-blue-500">회원가입</a>
        </div>
      </div>
    </header>
  );
}

export default Header;