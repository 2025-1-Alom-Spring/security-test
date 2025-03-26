import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import {
    Container,
    FormContainer,
    ResultContainer,
    LogoSection,
    Logo,
    Title,
    FormCard,
    FormGroup,
    FormLabel,
    InputWrapper,
    IconWrapper,
    Input,
    Button,
    ToggleText,
    ToggleButton,
    ResultCard,
    ResultTitle,
    ResultContent,
    ResultIconWrapper
} from './components/StyledComponents.jsx';
import logo from './assets/images/Alom_3D_logo_bright.png';
import { login, register } from './apis/authService';

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [resultMessage, setResultMessage] = useState({
        message: '이곳에 로그인 및 회원가입 결과가 표시됩니다.',
        type: 'info'
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: ''
    });

    const toggleForms = () => {
        setShowLogin(!showLogin);
        setResultMessage({ message: '', type: 'info' });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handleLogin = async () => {
        const { username, password } = loginData;
        if (!username || !password) {
            setResultMessage({ message: '아이디와 비밀번호를 모두 입력해주세요.', type: 'error' });
            return;
        }
        try {
            const response = await login(loginData);
            if (response.user) {
                setUser(response.user);
                setResultMessage({ message: `로그인 성공: ${response.user.name} (${response.user.username})`, type: 'success' });
            } else {
                setResultMessage({ message: '로그인 성공했지만, 유저 정보를 확인할 수 없습니다.', type: 'error' });
            }
        } catch (error) {
            if (error.response) {
                setResultMessage({
                    message: `로그인 실패: ${error.response.status} - ${error.response.data.message || '에러 발생'}`,
                    type: 'error'
                });
            } else {
                setResultMessage({ message: `로그인 실패: ${error.message}`, type: 'error' });
            }
        }
    };

    const handleSignup = async () => {
        const { username, password, passwordConfirm, name, email } = signupData;
        if (!username || !password || !passwordConfirm || !name || !email) {
            setResultMessage({ message: '모든 필드를 입력해주세요.', type: 'error' });
            return;
        }

        if (password !== passwordConfirm) {
            setResultMessage({ message: '비밀번호가 일치하지 않습니다.', type: 'error' });
            return;
        }

        if (!email.includes('@')) {
            setResultMessage({ message: '유효한 이메일 주소를 입력해주세요.', type: 'error' });
            return;
        }

        try {
            const response = await register(signupData);
            if (response.status === 200){
              setResultMessage({
                message: `회원가입 성공: ${response.message || '회원가입이 완료되었습니다.'}`,
                type: 'success'
              });
              // 2초 후 로그인 폼으로 전환
              setTimeout(() => {
                toggleForms();
              }, 2000);
            }
            else if (response.status === 409) {
              setResultMessage({
                message: `회원가입 실패: ${response.status} - ${response.message || '에러 발생'}`,
                type: 'error'
              });
            }
        } catch (error) {
            if (error.response) {
                setResultMessage({
                    message: `회원가입 실패: ${error.response.status} - ${error.response.data.message || '에러 발생'}`,
                    type: 'error'
                });
            } else {
                setResultMessage({ message: `회원가입 실패: ${error.message}`, type: 'error' });
            }
        }
    };

    return (
        <Container>
            <FormContainer>
                <LogoSection>
                    <Logo src={logo} alt="로고" />
                    <Title>환영합니다</Title>
                </LogoSection>

                {showLogin ? (
                    <FormCard>
                        <FormGroup>
                            <FormLabel htmlFor="loginId">아이디</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaUser />
                                </IconWrapper>
                                <Input
                                    id="loginId"
                                    name="username"
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="loginPassword">비밀번호</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaLock />
                                </IconWrapper>
                                <Input
                                    id="loginPassword"
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <Button onClick={handleLogin}>로그인</Button>

                        <ToggleText>
                            <ToggleButton onClick={toggleForms}>
                                회원가입하기
                            </ToggleButton>
                        </ToggleText>
                    </FormCard>
                ) : (
                    <FormCard>
                        <FormGroup>
                            <FormLabel htmlFor="signupId">아이디</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaUser />
                                </IconWrapper>
                                <Input
                                    id="signupId"
                                    name="username"
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    value={signupData.username}
                                    onChange={handleSignupChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="signupPassword">비밀번호</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaLock />
                                </IconWrapper>
                                <Input
                                    id="signupPassword"
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="signupPasswordConfirm">비밀번호 확인</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaLock />
                                </IconWrapper>
                                <Input
                                    id="signupPasswordConfirm"
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    value={signupData.passwordConfirm}
                                    onChange={handleSignupChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="signupName">이름</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaUser />
                                </IconWrapper>
                                <Input
                                    id="signupName"
                                    name="name"
                                    type="text"
                                    placeholder="이름을 입력하세요"
                                    value={signupData.name}
                                    onChange={handleSignupChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel htmlFor="signupEmail">이메일</FormLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <FaEnvelope />
                                </IconWrapper>
                                <Input
                                    id="signupEmail"
                                    name="email"
                                    type="email"
                                    placeholder="이메일을 입력하세요"
                                    value={signupData.email}
                                    onChange={handleSignupChange}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <Button onClick={handleSignup}>회원가입</Button>

                        <ToggleText>
                            <ToggleButton onClick={toggleForms}>
                                로그인으로 돌아가기
                            </ToggleButton>
                        </ToggleText>
                    </FormCard>
                )}
            </FormContainer>

            <ResultContainer>
                <ResultCard>
                    <ResultTitle>알림 메시지</ResultTitle>
                    <ResultContent type={resultMessage.type}>
                        {resultMessage.type === 'success' ? (
                            <ResultIconWrapper>
                                <FaCheckCircle />
                                <div>{resultMessage.message}</div>
                            </ResultIconWrapper>
                        ) : resultMessage.type === 'error' ? (
                            <ResultIconWrapper>
                                <FaExclamationCircle />
                                <div>{resultMessage.message}</div>
                            </ResultIconWrapper>
                        ) : (
                            <div>{resultMessage.message}</div>
                        )}
                    </ResultContent>
                </ResultCard>
            </ResultContainer>
        </Container>
    );
}

export default App;