import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/userState';
import { requestLoginOtp, verifyLoginOtp } from '../Api/upbitAPI';

function Login() {
  const setUser = useSetRecoilState(userState); // 사용자 상태 업데이트
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      await requestLoginOtp(email);
      setStep(2);
      setMessage('인증번호가 발송되었습니다. 인증번호를 입력해주세요.');
    } catch (error) {
      setMessage('이메일 발송 실패. 다시 시도해주세요.');
      console.error('OTP 요청 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const result = await verifyLoginOtp(email, otp);
      setUser({
        isLoggedIn: true,
        email: result.email, // 인증된 사용자 정보 저장
        id: result.id,
      });
      setMessage('로그인 성공!');
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      setMessage('인증 실패. 다시 시도해주세요.');
      console.error('OTP 확인 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <div className="w-1/2 flex items-center justify-center p-16">
        {/* 왼쪽 안내 섹션 */}
        <div>
          <h2 className="text-5xl font-bold mb-10">환영합니다!</h2>
          <p>지금 바로 로그인하여 개인 대시보드를 확인하세요.</p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center p-16">
        {/* 오른쪽 로그인 섹션 */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">
            {step === 1 ? '로그인' : '인증번호 확인'}
          </h2>
          {message && <p className="text-sm text-red-400 mb-4">{message}</p>}
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label>이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                {isLoading ? '로딩 중...' : '인증번호 받기'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label>인증번호</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="인증번호 입력"
                  className="w-full px-4 py-2 border rounded-md text-black"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                {isLoading ? '로딩 중...' : '로그인'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
