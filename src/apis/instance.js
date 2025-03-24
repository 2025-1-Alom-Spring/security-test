import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

// Axios 인스턴스 생성
export const baseAPI = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // refresh token 등 쿠키 사용 시 필요
});

let jwtToken = '';

// JWT 토큰 저장 함수
export const setJwtToken = (token) => {
    jwtToken = token;
};

// JWT 토큰 조회 함수 (필요시)
export const getJwtToken = () => jwtToken;

// JWT 토큰 검증 함수 (백엔드에 검증 요청)
export const checkJwtToken = async () => {
    try {
        const response = await baseAPI.get(`/auth/verify-token`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log('JWT 유효:', response.status);
        return response.status === 200;
    } catch (error) {
        console.error('❌ JWT 토큰이 만료되었거나 유효하지 않음:', error);
        return false;
    }
};

// JWT 토큰 갱신 함수 (refresh token 사용 시)
export const refreshJwtToken = async () => {
    try {
        const response = await baseAPI.get('/auth/refresh-token');
        jwtToken = response.data.jwtToken;
        console.log('🔄 새로운 JWT 토큰 적용:', jwtToken);
        return jwtToken;
    } catch (error) {
        console.error('❌ JWT 토큰 갱신 실패:', error);
        throw error;
    }
};

// 로그아웃 함수 (필요 시)
export const logout = async () => {
    try {
        await baseAPI.post('/auth/logout');
        jwtToken = '';
        console.log('로그아웃 성공');
    } catch (error) {
        console.error('로그아웃 실패:', error);
    }
};

// 요청 인터셉터: 인증이 필요한 요청에 JWT 토큰을 추가
baseAPI.interceptors.request.use(
    async (config) => {
        const requiresAuth =
            config.requiresAuth !== undefined ? config.requiresAuth : false;

        if (requiresAuth) {
            if (jwtToken) {
                config.headers['Authorization'] = `Bearer ${jwtToken}`;
            } else {
                console.warn('JWT 토큰이 없습니다. 로그인이 필요합니다.');
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 발생 시 토큰 갱신 시도
baseAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            console.warn('⚠️ JWT 토큰 만료 → 새 토큰을 가져오는 중...');
            try {
                await refreshJwtToken();
                originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`;
                return baseAPI(originalRequest);
            } catch (refreshError) {
                console.error('❌ JWT 토큰 갱신 실패:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);