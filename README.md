# API 요청 및 응답 구조
---

## 1. 엔드포인트 개요


### 회원가입 (Register)
- **엔드포인트:** `/user/register`
- **HTTP 메서드:** `POST`
- **설명:** 사용자 정보를 이용하여 회원가입을 진행합니다.

### 로그인 (Login)
- **엔드포인트:** `/auth/login`
- **HTTP 메서드:** `POST`
- **설명:** 사용자의 아이디와 비밀번호를 이용하여 로그인을 시도합니다.

---

## 2. 요청 (Request) 구조

### 회원가입 요청
- **URL:** `/user/register`
- **HTTP 메서드:** `POST`
- **요청 본문 예시:**
```JSON
{
  "id": "user123",
  "password": "password123",
  "passwordConfirm": "password123",
  "name": "홍길동",
  "email": "user@example.com"
}
```


### 로그인 요청
- **URL:** `/auth/login`
- **HTTP 메서드:** `POST`
- **요청 본문 예시:**
```json
{
  "id": "user123",
  "password": "password123"
}
```

## 3. 응답 (Response) 구조

### 회원가입 응답
- **성공**
```JSON
{
  "message": "회원가입이 완료되었습니다."
}
```

- **실패**
```JSON
{
  "status": 409,
  "message": "이미 존재하는 아이디입니다."
}
```

### 로그인 응답
- **성공**
```JSON
{
  "user": {
    "id": "user123",
    "name": "홍길동"
  },
  "message": "로그인 성공"
}
```

- **실패**
```JSON
{
  "status": 401,
  "message": "아이디 또는 비밀번호가 일치하지 않습니다."
}
```
