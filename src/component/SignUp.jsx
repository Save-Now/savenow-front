import styles from '../styles/signup.module.css';
import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';

const BASE_URL = "https://71c13204-cc41-4566-a89f-cf9b87467725.mock.pstmn.io" //mock서버

const msg = {
    required: '*필수입력 항목입니다.',
    emailDupli: '*중복된 이메일입니다.',
    nameDupli: '*중복된 닉네임입니다.',
    emailPattern: '*잘못된 이메일 형식입니다.',
    pwdPattern: '*비밀번호는 8자리 이상, 숫자와 영문자를 포함해야 합니다.',
    pwdConfirm: '*비밀번호가 일치하지 않습니다.',
};

const EMAIL_REG = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PWD_REG = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

export default function SignUp() {
    const [formData, updateFormData] = useImmer({
        email: '',
        password: '',
        name: '',
        profileImg: '',
        gender: ''
    });
    const [warnMsg, updateWarnMsg] = useImmer({
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        profileImg: '',
        gender: 'noWarn'
    });
    const [gender, updateGender] = useImmer({ man: true, woman: false })
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        if (Object.values(warnMsg).every(value => value === 'noWarn')) {
            setIsActivated(true);
        }
    }, [warnMsg])



    // 비밀번호 재확인
    useEffect(() => {
        confirmPassword();
    }, [passwordConfirm]);

    // 이메일, 닉네임 패턴 확인
    useEffect(() => {
        if (formData.email !== prevEmail.current) {
            checkPattern('email')
        }
        if (formData.password !== prevPwd.current) {
            checkPattern('password');
        }
    }, [formData.email, formData.password])

    // 이메일, 닉네임의 이전값
    const prevEmail = useRef(formData.email);
    const prevPwd = useRef(formData.password);

    // 상태값 변경
    const handleValue = e => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'passwordConfirm') {
            setPasswordConfirm(value.trim());
        } else {
            updateFormData(draft => {
                draft[name] = value.trim();
            })
        };
    };

    // 확인용
    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        console.log(warnMsg);
    }, [warnMsg])

    // 필수필드 입력 유무 확인(onBlur? onChange?)
    // Todo: onChange로 바꾸기
    const checkRequired = e => {
        let name = e.target.name;
        if (name === 'passwordConfirm' && passwordConfirm === '') {
            updateWarnMsg(draft => {
                draft[name] = msg.required;
            })
            return;
        } else if (name !== passwordConfirm && formData[name] === '') {
            updateWarnMsg(draft => {
                draft[name] = msg.required;
            })
            return;
        } else {
            console.log('dsf');
            console.log(name);
            updateWarnMsg(draft => {
                draft[name] = 'noWarn';
            })
        }
    };
    // 패턴 검사(onChange)
    const checkPattern = (name) => {
        // Todo: checkRequired 호출 후 checkPattern 할 수 있도록 수정
        let result;
        if (name === 'email') {
            result = EMAIL_REG.test(formData.email);
            updateWarnMsg(draft => {
                draft.email = result ? 'noWarn' : msg.emailPattern;
            });
        } else if (name === 'password') {
            result = PWD_REG.test(formData.password);
            updateWarnMsg(draft => {
                draft.password = result ? 'noWarn' : msg.pwdPattern;
            });
        } else {
            console.log('checkPatternError: target이 잘못됨');
        }
    };
    // 비밀번호 재확인(onChange)
    const confirmPassword = () => {
        if (passwordConfirm && formData.password !== passwordConfirm) {
            updateWarnMsg(draft => {
                draft.passwordConfirm = msg.pwdConfirm;
            });
        } else if (passwordConfirm && formData.password === passwordConfirm) {
            updateWarnMsg(draft => {
                draft.passwordConfirm = 'noWarn';
            })
        } else {
            console.log(passwordConfirm);
        }
    };
    // 성별 checked 바꾸기
    const handleGenderChecked = (e) => {
        if (e.target.value === 'man') {
            updateGender(draft => {
                draft.man = !draft.man;
                draft.woman = !draft.woman;
            })
            updateFormData(draft => {
                draft.gender = 'man'
            })
        } else if (e.target.value === 'woman') {
            updateGender(draft => {
                draft.man = !draft.man;
                draft.woman = !draft.woman;
            })
            updateFormData(draft => {
                draft.gender = 'woman'
            })
        } else {
            console.log(e.target.value);
        }
    }

    // 중복 검사(onBlur)
    // mock서버로 임시 구현
    const checkDuplication = async (e) => {
        try {
            checkRequired(e);    // 입력 여부 체크
            const name = e.target.name;
            let params = {};
            if (name === 'email') params.email = formData.email;
            if (name === 'name') params.name = encodeURIComponent(formData.name);
            const response = await axios.get(`${BASE_URL}/api/auth/users/?${name}="${params.email}"`);  //Todo: axios params 따옴표 인코딩
            let message = response.data.message;
            if (message) {
                if (message === 'duplication') {
                    updateWarnMsg(draft => {
                        draft[name] = name === 'email' ? msg.emailDupli : msg.nameDupli;
                    })
                } else if (message === 'not duplication') {
                    updateWarnMsg(draft => {
                        draft[name] = 'noWarn';
                    })
                } else {
                    console.log(`message: ${message}`);
                }
            } else {
                console.log(`no message: ${message}`);
            }
        } catch (error) {
            console.error('Error checking duplication: ', error.message);
            return { suceess: false, message: 'failed to check duplication' };
        };
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
                        onBlur={checkDuplication}
                        placeholder='아이디를 입력해주세요.'
                    />
                </label><br />
                {warnMsg.email === msg.required && <span className={styles.warnMsg}>{msg.required}</span>}
                {warnMsg.email === msg.emailPattern && <span className={styles.warnMsg}>{msg.emailPattern}</span>}
                {warnMsg.email === msg.emailDupli && <span className={styles.warnMsg}>{msg.emailDupli}</span>}
                {warnMsg.email === 'noWarn' && <span className={styles.warnMsg}>{''}</span>}
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
                        onBlur={checkRequired}
                        placeholder='비밀번호를 입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.password === msg.required && <span className={styles.warnMsg}>{msg.required}</span>}
                {warnMsg.password === msg.pwdPattern && <span className={styles.warnMsg}>{msg.pwdPattern}</span>}
                <span>{warnMsg === `pwdMsg` ? msg.pwdMsg : ''}</span><br />
                <label>
                    비밀번호 재확인<br />
                    <input
                        className={styles.input}
                        type='password'
                        name='passwordConfirm'
                        required
                        value={passwordConfirm}
                        onChange={handleValue}
                        onBlur={checkRequired}
                        placeholder='비밀번호를 재입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.passwordConfirm === msg.required && <span className={styles.warnMsg}>{msg.required}</span>}
                {warnMsg.passwordConfirm === msg.pwdConfirm && <span className={styles.warnMsg}>{msg.pwdConfirm}</span>}
                <br />
                <label>
                    닉네임<br />
                    <input
                        className={styles.input}
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleValue}
                        onBlur={checkDuplication}
                        placeholder='닉네임을 입력해주세요.'
                    />
                </label>
                <br />
                {warnMsg.name === msg.required && <span className={styles.warnMsg}>{msg.required}</span>}
                {warnMsg.name === msg.nameDupli && <span className={styles.warnMsg}>{msg.nameDupli}</span>}
                <br />
                <label className={styles.gender}>
                    성별<br />
                    <ul>
                        <li>
                            <input
                                type='radio'
                                name='man'
                                value='man'
                                checked={gender.man}
                                onChange={handleValue}
                                onClick={handleGenderChecked}
                            />
                            <label className={styles.genderLabel} htmlFor='man'>남성</label>
                            <input
                                className={styles.gender}
                                type='radio'
                                name='woman'
                                value='woman'
                                checked={gender.woman}
                                onChange={handleValue}
                                onClick={handleGenderChecked}
                            />
                            <label className={styles.genderLabel} htmlFor='woman'>여성</label>
                        </li>
                    </ul>
                </label><br />
                {/* {warnMsg.gender === msg.required && <span className={styles.warnMsg}>{msg.required}</span>}<br /> */}
                <label className={styles.fileBox}> 프로필 이미지<br />
                    <div className={styles.input}>
                        <input
                            className={styles.uploadName}
                            value='첨부파일'
                            placeholder='첨부파일'

                        />
                        <label htmlFor='file'>파일찾기</label>
                        <input
                            type='file'
                            id='file'
                            accept='.jpg, .jpeg, .png'
                            name='profileImg'
                            value={formData.profileImg}
                            onChange={handleValue}
                            onBlur={checkRequired}
                        />
                    </div>
                </label><br />
                {warnMsg.profileImg === msg.required && <span className={styles.warnMsg}>{msg.emptyMsg}</span>}<br />
                <input
                    className={isActivated ? `${styles.submit} ${styles.active}` : `${styles.submit}`}
                    type='submit'
                    value='회원가입'
                    readOnly
                />
            </form>
        </div>
    )

}
