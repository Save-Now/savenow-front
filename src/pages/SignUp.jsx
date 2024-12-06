import styles from '../styles/signup.module.css';
import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'
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
        console.log(formData);
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
            if (!checkRequired(target)) {
                return;
            };
        }
        switch (target) {
            case 'email':
            case 'username':
                if (!checkPattern(target)) {
                    return;
                } else {
                    const isUnique = await(checkDuplication(target));
                    if (!isUnique) {
                        updateWarnMsg(draft => {
                            draft[target] = MSG.noWarn;
                        })  // 폼 제출 위해 임시삽입
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
                            return;
                }
                break;
            }
            updateWarnMsg(draft => {
                draft[target] = MSG.noWarn;
            })
    }

    // 필수 입력 여부 확인
    const checkRequired = (name) => {
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
                updateWarnMsg(draft => {
                    draft[name] = MSG.usernamePattern;
                });
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
            let params = {}
            if (name === 'email') params.email = formData.email;
            if (name === 'username') params.username = formData.username;
            const response = await axios.get(`${BASE_URL}/api/join/?${name}="${params[name]}"`);  //Todo: axios params 따옴표 인코딩
            const message = response.data.message;
            console.log('중복확인중...')
            if (message) {
                if (message === 'duplication') {
                    updateWarnMsg(draft => {
                        draft[name] = name === 'email' ? MSG.emailDupli : MSG.usernameDupli;
                    })
                    return false;
                } else if (message === 'not duplication') {
                    console.log('중복 통과');
                    return true;
                }
            } else {
                console.log(`no message: ${message}`);
                return false;
            }
        } catch (error) {
            console.error('Error checking duplication: ', error.message);
            return false;
        }
    }

    // 성별 checked 바꾸기
    const handleGenderChecked = (e) => {
        if (e.target.value === '남자') {
            updateGender(draft => {
                draft.man = !draft.man;
                draft.woman = !draft.woman;
            })
            updateFormData(draft => {
                draft.gender = '남자'
            })
        } else if (e.target.value === '여자') {
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
            const { message, data } = response.data;

            if (message === "회원가입 성공") {
                console.log(`signup success: ${data}`);
                alert(`signup success: ${data}`);
            } else {
                console.log(`signup message error: ${message}`);
            }
        } catch (error) {
            console.error(`Error submitting signup data: ${error.message}`);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoBox}>
                <div className={styles.logo}>LOGO</div>
                <p className={styles.logoText}>소비습관을 기록하고, 개선하기 위한 서비스</p>
            </div>
            <h1>SIGN UP</h1>
            <form>
                <label>
                    아이디<br />
                    <input
                        className={styles.input}
                        type='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={handleValue}
                        placeholder='아이디를 입력해주세요.'
                    />
                </label><br />
                {warnMsg.email === MSG.required && <span className={styles.warnMsg}>{MSG.required}</span>}
                {warnMsg.email === MSG.emailPattern && <span className={styles.warnMsg}>{MSG.emailPattern}</span>}
                {warnMsg.email === MSG.emailDupli && <span className={styles.warnMsg}>{MSG.emailDupli}</span>}
                <br />
                <label>
                    비밀번호<br />
                    <input
                        className={styles.input}
                        type='password'
                        name='password'
                        required
                        value={formData.password}
                        onChange={handleValue}
                        placeholder='비밀번호를 입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.password === MSG.required && <span className={styles.warnMsg}>{MSG.required}</span>}
                {warnMsg.password === MSG.pwdPattern && <span className={styles.warnMsg}>{MSG.pwdPattern}</span>}
                <br />
                <label>
                    비밀번호 재확인<br />
                    <input
                        className={styles.input}
                        type='password'
                        name='passwordConfirm'
                        required
                        value={formData.passwordConfirm}
                        onChange={handleValue}
                        placeholder='비밀번호를 재입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.passwordConfirm === MSG.required && <span className={styles.warnMsg}>{MSG.required}</span>}
                {warnMsg.passwordConfirm === MSG.pwdConfirm && <span className={styles.warnMsg}>{MSG.pwdConfirm}</span>}
                <br />
                <label>
                    닉네임<br />
                    <input
                        className={styles.input}
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleValue}
                        placeholder='닉네임을 입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.username === MSG.required && <span className={styles.warnMsg}>{MSG.required}</span>}
                {warnMsg.username === MSG.usernameDupli && <span className={styles.warnMsg}>{MSG.usernameDupli}</span>}
                {warnMsg.username === MSG.usernamePattern && <span className={styles.warnMsg}>{MSG.usernamePattern}</span>}
                <br />
                <label>
                    생일<br />
                    <input
                        className={styles.input}
                        type='date'
                        name='birth'
                        min='1940-01-01'
                        max='2023-12-31'
                        onChange={handleValue}
                    />
                </label>
                <br />
                {warnMsg.username === MSG.required && <span className={styles.warnMsg}>{MSG.required}</span>}
                <br />
                <label className={styles.gender}>
                    성별<br />
                    <ul>
                        <li>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='MALE'
                                    checked={gender.man}
                                    onChange={handleValue}
                                    onClick={handleGenderChecked}
                                />
                                남성
                            </label>
                            <label>
                                <input
                                    className={styles.gender}
                                    type='radio'
                                    name='gender'
                                    value='FEMALE'
                                    checked={gender.woman}
                                    onChange={handleValue}
                                    onClick={handleGenderChecked}
                                />
                                여성
                            </label>
                        </li>
                    </ul>
                </label><br />
                <label className={styles.fileBox}> 프로필 이미지<br />
                    <div className={styles.input}>
                        <input
                            className={styles.uploadName}
                            value='첨부파일'
                            placeholder='첨부파일'
                            readOnly
                        />
                        <label htmlFor='file'>파일찾기</label>
                        <input
                            type='file'
                            id='file'
                            accept='.jpg, .jpeg, .png'
                            name='profileImg'
                            value={formData.profileImg}
                            onChange={handleValue}
                        />
                    </div>
                </label><br />
                {warnMsg.profileImg === MSG.required && <span className={styles.warnMsg}>{MSG.emptyMsg}</span>}<br />
                <input
                    className={isActivated ? `${styles.submit} ${styles.active}` : `${styles.submit}`}
                    type='submit'
                    value='회원가입'
                    readOnly
                    onClick={handleSubmit}
                    ref={submitRef}
                />
            </form>
        </div>
    )

}
