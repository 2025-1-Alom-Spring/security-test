import { baseAPI, setJwtToken } from './instance.js'; // baseAPI, setJwtToken 함수가 정의된 파일을 불러옵니다.

// 로그인 함수: 사용자 인증 정보를 보내고, 성공 시 JWT 토큰을 저장합니다.
export const login = async (credentials) => {
    try {
        const response = await baseAPI.post('/auth/login', credentials);
        // 응답에 JWT 토큰이 포함되어 있다면 저장
        if (response.data && response.data.jwtToken) {
            setJwtToken(response.data.jwtToken);
        }
        return response.data;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw error;
    }
};

// 회원가입 함수: 사용자 데이터를 보내어 등록 요청을 수행합니다.
export const register = async (userData) => {
    try {
        const response = await baseAPI.post('/user/register', userData);
        return response.data;
    } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
    }
};