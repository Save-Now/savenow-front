import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';

const BASE_URL = 'http://localhost:8010'
// const BASE_URL = "https://71c13204-cc41-4566-a89f-cf9b87467725.mock.pstmn.io" //mock서버

const MSG = {
    noWarn: 'noWarn',
    required: '*필수입력 항목입니다.',
    emailDupli: '*중복된 이메일입니다.',
    usernameDupli: '*중복된 닉네임입니다.',
    emailPattern: '*잘못된 이메일 형식입니다.',
    pwdPattern: '*비밀번호는 8자리 이상, 숫자와 영문자를 포함해야 합니다.',
    usernamePattern: '*닉네임은 25자리 이하여야 합니다.',
    pwdConfirm: '*비밀번호가 일치하지 않습니다.',
};

const EMAIL_REG = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PWD_REG = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

const Container = styled.div`
    background: white;
    display: inline-block;
    padding: 40px;
    border-radius: 10px;
    position: relative;
    top: 40px;
    left: 40px;
`

const Logo = styled.div`
    width: 265px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #555555;
    color: #FFFFFF;
    margin-bottom: 20px;
`

const LogoText = styled.p`
    color: ${({ theme }) => theme.color.text};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    margin-bottom: 40px;
`

const Title = styled.p`
    font-weight: ${({theme}) => theme.fontWeight.bold};
    font-size: 30px;
`

const InputDiv = styled.div`
    margin-top:20px;
`

const Input = styled.input`
    position: relative;
    margin-top: 10px;
    border-radius: ${({ theme }) => theme.border.radius};
    width: 484px;
    height: 60px;
    padding-left: 16px;
    border: 1px solid #999999;
    &:hover {
        border-color: ${({ theme }) => theme.border.hoverColor};
    };
    &:focus {
        border-color: ${({ theme }) => theme.border.focusColor};
        outline: none;
    };
`
const DateInput = styled(Input)`
    &::-webkit-clear-button,
    &::-webkit-inner-spin-button {
        display: none;
    };

    &::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        color: transparent;
    };
`

const FileBoxDiv = styled.div`
    margin-top: 10px;
    border: none;
    display: flex;
    align-items: center;
`
const FileBoxLabel = styled.label`
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    color: #FFFFF;
    background-color: #999999;
    cursor: pointer;
    height: 40px;
    width: 70px;
    border-radius: ${({ theme }) => theme.border.radius};
    &:hover {
        background-color: ${({ theme }) => theme.color.hoverColor}; 
    };
    &:focus {
        background-color: ${({ theme }) => theme.color.focusColor};
    };
`

const UploadName = styled.input`
    display: inline-block;
    border: 1px solid #999999;
    outline: none;
    color: #999999;
    height: 40px;
    width: 200px;
    border-radius: 10px;
    padding-left: 10px;
    margin-right: 10px;
`

const FileInputHidden = styled(Input)`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
`
const WarnMsg = styled.span`
    display: inline-block;
    height: 20px;
    font-size: 12px;
    color: red;
    padding-left: 16px;
`

const GenderUl = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const GenderLi = styled.li`
    margin-top: 10px;
    padding-left: 16px;
    width: calc(500px - 16px);
    height: 60px;
    display: flex;
    align-items: center;
`

const GenderLabel = styled.label`
    margin-right: 16px;
`

const GenderInput = styled.input`
    margin-right: 8px;
`

const Submit = styled.input`
    margin-top: 46px;
    width: 500px;
    height: 60px;
    border-radius: ${({ theme }) => theme.border.radius};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #999999;
    color: #FFFFFF;
    &:hover {
    background-color: ${props => props.$isActivated ? props.theme.color.hoverColor : '#999999'} 
    };
    &:focus {
    background-color: ${props => props.$isActivated ? props.theme.color.focusColor : '#999999'}
};
`



export default function SignUp() {
    // Todo: birth 필요
    const [formData, updateFormData] = useImmer({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        birth: '',
        gender: 'MALE',  // default 남자
        profileImg: '',
    });
    const [warnMsg, updateWarnMsg] = useImmer({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        birth: '',
        profileImg: '',
        // gender는 default 값때메 제거
    });
    const [gender, updateGender] = useImmer({ man: true, woman: false })
    const [isActivated, setIsActivated] = useState(false);

    const focusRef = useRef(null);
    const submitRef = useRef(null);

    // 회원가입 제출 버튼 활성화
    useEffect(() => {
        console.log(warnMsg);
        if (Object.values(warnMsg).every(value => value === MSG.noWarn)) {
            console.log('warnMsg 업뎃');
            setIsActivated(true);
        }
    }, [warnMsg])

    const handleValue = (e) => {
        focusRef.current = e.target;
        const name = e.target.name;
        const value = e.target.value;
        updateFormData(draft => {
            draft[name] = value.trim();
        }); // 비동기 작업
    };

    // 유효성 검사
    useEffect(() => {
        validate();
    }, [formData])

    const validate = async () => {
        let target;
        let value;
        if (focusRef.current) {
            target = focusRef.current.name;
            value = formData[target];
        } else {
            target = '';
            value = '';
        }
        if (target !== 'gender') {
            const isRequired = await (checkRequired(target))
            if (!isRequired) {
                return;
            }
        }
        switch (target) {
            case 'email':
            case 'username':
                if (!checkPattern(target)) {
                    return;
                } else {
                    const isUnique = await (checkDuplication(target));
                    if (!isUnique) {
                        return;
                    }
                }
                break;
            case 'password':
                if (!checkPattern(target)) {
                    return;
                }
                break;
            case 'passwordConfirm':
                if (!confirmPassword(value)) {
                    updateWarnMsg(draft => {
                        draft[target] = MSG.usernamePattern;
                    });
                    return;
                }
                break;
        }
        if (value !== '') {
            updateWarnMsg(draft => {
                draft[target] = MSG.noWarn;
            })
        }
    }

    // 필수 입력 여부 확인
    const checkRequired = async (name) => {
        if (formData[name] === '') {
            updateWarnMsg(draft => {
                draft[name] = MSG.required;
            })
            return false;
        } else {
            return true;
        }
    };

    // 패턴 확인
    const checkPattern = (name) => {
        let result;
        if (name === 'email') {
            result = EMAIL_REG.test(formData.email);
            if (!result) {
                updateWarnMsg(draft => {
                    draft[name] = MSG.emailPattern;
                });
                return false;
            } else {
                console.log('패턴확인 통과');
                return true;
            }
        }
        if (name === 'password') {
            result = PWD_REG.test(formData.password);
            if (!result) {
                updateWarnMsg(draft => {
                    draft[name] = MSG.pwdPattern;
                });
                return false;
            } else {
                console.log('패턴확인 통과')
                return true;
            }
        }
        if (name === 'username') {
            result = formData.username.length <= 25;
            if (!result) {
                return false;
            } else {
                console.log('패턴확인 통과')
                return true;
            }
        }
    };

    // 비번 재확인
    const confirmPassword = (value) => {
        if (value !== formData.password) {
            updateWarnMsg(draft => {
                draft.passwordConfirm = MSG.pwdConfirm;
            })
            return false;
        } else {
            console.log('패스워드 재확인 통과')
            return true;
        }
    }

    // 중복 체크(mock서버 임시코드)
    // Todo: api 설계후 수정 예정
    const checkDuplication = async (name) => {
        try {
            let url;
            let params = {}
            if (name === 'email') {
                params.email = formData.email;
                url = 'emailCheck';
            }
            if (name === 'username') {
                params.username = formData.username;
                url = 'usernameCheck';
            }
            const response = await axios.get(`${BASE_URL}/api/join/${url}`, { params });  //Todo: axios params 따옴표 인코딩
            const message = response.data.msg;
            // console.log(String(message));
            if (message) {
                if (message === "닉네임 중복 검사 실패" || message === "이메일 중복 검사 실패") {
                    updateWarnMsg(draft => {
                        draft[name] = (name === 'email') ? MSG.emailDupli : MSG.usernameDupli;
                    })
                    return false;
                } else if (message === "닉네임 중복 검사 성공" || message === "이메일 중복 검사 성공") {
                    console.log('중복 통과');
                    return true;
                }
            } else {
                console.log(`no message: ${message} `);
                return false;
            }
        } catch (error) {
            console.error('Error checking duplication: ', error.message);
            return false;
        }
    }

    // 성별 checked 바꾸기
    const handleGenderChecked = (e) => {
        if (e.target.value === 'MALE') {
            updateGender(draft => {
                draft.man = !draft.man;
                draft.woman = !draft.woman;
            })
            updateFormData(draft => {
                draft.gender = '남자'
            })
        } else if (e.target.value === 'FEMALE') {
            updateGender(draft => {
                draft.man = !draft.man;
                draft.woman = !draft.woman;
            })
            updateFormData(draft => {
                draft.gender = '여자'
            })
        } else {
            console.log(e.target.value);
        }
    }

    // Todo: 회원가입 데이터 post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sendData = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                birth: formData.birth,
                gender: formData.gender,
            };
            const response = await axios.post(`${BASE_URL}/api/join`, sendData);
            const { msg } = response.data;

            console.log(response.data)
            if (msg === "회원가입 성공") {
                console.log(`signup success: ${msg} `);
                setIsActivated(false);
                updateFormData((draft) => {
                    draft = {
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        username: '',
                        birth: '',
                        gender: 'MALE',  // default 남자
                        profileImg: '',
                    }
                })
                updateWarnMsg((draft) => {
                    draft = {
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        username: '',
                        birth: '',
                        profileImg: '',
                        // gender는 default 값때메 제거
                    }
                })
                alert(`signup success: ${msg} `);
            } else {
                console.log(`signup message error: ${msg} `);
            }
        } catch (error) {
            console.error(`Error submitting signup data: ${error} `);
        }
    }


    return (
        <Container>
            <div>
                <Logo>LOGO</Logo>
                <LogoText>소비습관을 기록하고, 개선하기 위한 서비스</LogoText>
            </div>
            <Title>SIGN UP</Title>
            <form>
                <InputDiv>
                <label>
                    아이디<br />
                    <Input
                        type='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={handleValue}
                        placeholder='아이디를 입력해주세요.'
                    />
                </label>
                </InputDiv>
                {warnMsg.email === MSG.required && <WarnMsg>{MSG.required}</WarnMsg>}
                {warnMsg.email === MSG.emailDupli && <WarnMsg>{MSG.emailDupli}</WarnMsg>}
                {warnMsg.email === MSG.emailPattern && <WarnMsg>{MSG.emailPattern}</WarnMsg>}
                <InputDiv>
                <label>
                    비밀번호<br />
                    <Input
                        type='password'
                        name='password'
                        required
                        value={formData.password}
                        onChange={handleValue}
                        placeholder='비밀번호를 입력해주세요.'
                    />
                </label>
                </InputDiv>
                {warnMsg.password === MSG.required && <WarnMsg>{MSG.required}</WarnMsg>}
                {warnMsg.password === MSG.pwdPattern && <WarnMsg>{MSG.pwdPattern}</WarnMsg>}
                <InputDiv>
                    <label>
                        비밀번호 재확인<br />
                        <Input
                            type='password'
                            name='passwordConfirm'
                            required
                            value={formData.passwordConfirm}
                            onChange={handleValue}
                            placeholder='비밀번호를 재입력해주세요.'
                        />
                    </label>
                </InputDiv>
                {warnMsg.passwordConfirm === MSG.required && <WarnMsg>{MSG.required}</WarnMsg>}
                {warnMsg.passwordConfirm === MSG.pwdConfirm && <WarnMsg>{MSG.pwdConfirm}</WarnMsg>}
                <InputDiv>
                    <label>
                        닉네임<br />
                        <Input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleValue}
                            placeholder='닉네임을 입력해주세요.'
                        />
                    </label>
                </InputDiv>
                {warnMsg.username === MSG.required && <WarnMsg>{MSG.required}</WarnMsg>}
                {warnMsg.username === MSG.usernameDupli && <WarnMsg>{MSG.usernameDupli}</WarnMsg>}
                {warnMsg.username === MSG.usernamePattern && <WarnMsg>{MSG.usernamePattern}</WarnMsg>}
                <InputDiv>
                    <label>
                        생일<br />
                        <DateInput
                            type='date'
                            name='birth'
                            min='1940-01-01'
                            max='2023-12-31'
                            onChange={handleValue}
                        />
                    </label>
                </InputDiv>
                {warnMsg.birth === MSG.required && <WarnMsg>{MSG.required}</WarnMsg>}
                <InputDiv>
                    <label>
                        성별<br />
                        <GenderUl>
                            <GenderLi>
                                <GenderLabel>
                                    <GenderInput
                                        type='radio'
                                        name='gender'
                                        value='MALE'
                                        checked={gender.man}
                                        onChange={handleValue}
                                        onClick={handleGenderChecked}
                                    />
                                    남성
                                </GenderLabel>
                                <GenderLabel>
                                    <GenderInput
                                        type='radio'
                                        name='gender'
                                        value='FEMALE'
                                        checked={gender.woman}
                                        onChange={handleValue}
                                        onClick={handleGenderChecked}
                                    />
                                    여성
                                </GenderLabel>
                            </GenderLi>
                        </GenderUl>
                    </label>
                </InputDiv>
                <InputDiv>
                    <label> 프로필 이미지<br />
                        <FileBoxDiv>
                            <UploadName
                                value={formData.profileImg}
                                placeholder='첨부파일'
                                readOnly
                            />
                            <FileBoxLabel htmlFor='file'>파일찾기</FileBoxLabel>
                            <FileInputHidden
                                type='file'
                                id='file'
                                accept='.jpg, .jpeg, .png'
                                name='profileImg'
                                value={formData.profileImg}
                                onChange={handleValue}
                            />
                        </FileBoxDiv>
                    </label>
                </InputDiv>
                {warnMsg.profileImg === MSG.required && <WarnMsg>{MSG.emptyMsg}</WarnMsg>}
                <InputDiv>
                    <Submit
                        $isActivated={isActivated}
                        type='submit'
                        value='회원가입'
                        readOnly
                        onClick={handleSubmit}
                        ref={submitRef}
                        disabled={!isActivated}
                    />
                </InputDiv>
            </form>
        </Container>
    )

}
