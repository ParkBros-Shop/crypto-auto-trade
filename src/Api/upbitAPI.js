import axios from 'axios';

const BASE_URL = 'http://localhost:19011'; // 백엔드 서버 URL

// axios.defaults.withCredentials = true;
// 계정 정보 조회
export const getAccountInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/upbit/account`);
    return response.data || []; // 데이터 구조에 따라 수정
  } catch (error) {
    console.error('Error fetching account info:', error);
    throw error;
  }
};

// 모든 마켓 정보 조회
export const getMarketInfo = async (userId, warningYn = 'N') => {
  try {
    const response = await axios.get(`${BASE_URL}/upbit/markets/all`, {
      params: { userId, warningYn },
    });
    return Array.isArray(response.data) ? response.data : []; // 항상 배열 반환
  } catch (error) {
    console.error('Error fetching market info:', error);
    return []; // 오류 시 빈 배열 반환
  }
};

// 캔들 데이터 조회
export const getCandlesData = async (type, units, market, count = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/upbit/candles/${type}/${units}`, {
      params: { market, count },
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching candles data:', error);
    throw error;
  }
};

// 사용자 정보 조회
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.data || []; // 응답 데이터 구조에 맞게 수정
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 로그인 OTP 요청
export const requestLoginOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, { email });
    return response.data; // 성공 응답 반환
  } catch (error) {
    console.error('Error requesting login OTP:', error);
    throw error;
  }
};

// 로그인 OTP 확인
export const verifyLoginOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login/confirm`, { email, otp });
    return response.data; // 성공 응답 반환
  } catch (error) {
    console.error('Error verifying login OTP:', error);
    throw error;
  }
};
