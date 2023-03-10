
// 브라우저가 현재 클라이언트 호스트 이름 얻어오기
const hostname = window.location.hostname;

let backendHost; // 백엔드 호스트 이름

if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else if (hostname === 'practice-s3-hsg-bucket001.s3-website.ap-northeast-2.amazonaws.com') {
    backendHost = 'http://13.125.7.113';
}

export const BASE_URL = backendHost;
export const TODO = '/api/todos';
export const USER = '/api/auth';
//export const LOG = '/api/logs';