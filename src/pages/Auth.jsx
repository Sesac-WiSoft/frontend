import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import { useAppState } from '../context/AppStateContext' // 데모를 위해 주석 처리
// import '../styles/pages/Auth.css' // CSS 파일 경로 오류로 인해 주석 처리

// --- 데모를 위한 Mock 데이터 ---
// 실제 앱에서는 AppStateContext에서 가져옵니다.
const useAppState = () => ({
    user: null,
    login: (email, pw) => console.log('Login:', email, pw),
    signup: (form) => console.log('Signup:', form),
    jobTracks: jobData, // jobData는 파일 하단에 정의되어 있습니다.
    cadencePresets: [
        { id: 'daily', label: '매일 (주 5일)' },
        { id: 'biweekly', label: '주 2회 (화, 목)' },
        { id: 'weekly', label: '주 1회 (월)' },
    ],
    notificationChannelPresets: [
        { id: 'email', label: '이메일 (필수)' },
        { id: 'kakao', label: '카카오톡 (선택)' },
    ]
});
// --- 데모 Mock 끝 ---


const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const steps = [
    { id: 'account', label: '기본 정보' },
    { id: 'job', label: '직업/관심 선택' },
    { id: 'cadence', label: '질문 주기 & 알림' },
]

const jobData = [
    {
        id: 'it',
        label: 'IT / 개발',
        roles: [
            { id: 'frontend', label: '프론트엔드' },
            { id: 'backend', label: '백엔드' },
            { id: 'ai_data', label: 'AI / 데이터' },
            { id: 'devops', label: 'DevOps / 인프라' },
            { id: 'pm', label: 'PM / PO' },
        ]
    },
    {
        id: 'design_marketing',
        label: '디자인 / 마케팅',
        roles: [
            { id: 'ux_ui', label: 'UX/UI 디자인' },
            { id: 'marketing_planning', label: '마케팅 / 기획' },
            { id: 'graphic_video', label: '그래픽 / 영상' },
        ]
    },
    {
        id: 'service',
        label: '서비스',
        roles: [
            { id: 'cs', label: 'CS / 고객응대' },
            { id: 'airline', label: '승무원' },
            { id: 'food', label: '요식업 / F&B' },
        ]
    },
    {
        id: 'public',
        label: '공무원 / 공공기관',
        roles: [
            { id: 'gov_admin', label: '일반행정' },
            { id: 'police_fire', label: '경찰 / 소방' },
            { id: 'public_corp', label: '공기업' },
        ]
    },
    {
        id: 'education',
        label: '교육',
        roles: [
            { id: 'teacher', label: '강사 / 교사' },
            { id: 'academy', label: '학원 / 교육운영' },
        ]
    },
    {
        id: 'other',
        label: '기타 (직접 입력)',
        roles: []
    }
];

// === 1. 비밀번호 규칙: 특수문자를 *찾는* 정규식 ===
// (주의: 기존과 정규식은 같지만, 사용하는 논리가 반대가 됨)
const passwordRule = /[^A-Za-z0-9]/

export default function AuthPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const { user, login, signup, jobTracks, cadencePresets, notificationChannelPresets } = useAppState()
    const redirectFrom = location.state?.from

    const defaultCadence = cadencePresets[0]

    const [mode, setMode] = useState('signup')
    const [activeStep, setActiveStep] = useState(0)
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })

    // === 2. signupForm 상태 변경 (notificationChannel -> notificationChannels) ===
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        jobMainCategory: jobData[0].id,
        jobSubCategory: jobData[0].roles[0].id,
        jobOtherText: '',
        cadence: defaultCadence,
        notificationChannels: { email: true, kakao: false }, // '이메일(필수)' + '카카오(선택)'
    })

    const availableSubCategories = jobData.find(
        (cat) => cat.id === signupForm.jobMainCategory
    )?.roles || []

    useEffect(() => {
        const paramMode = searchParams.get('mode')
        if (paramMode && (paramMode === 'login' || paramMode === 'signup')) {
            setMode(paramMode)
        } else {
            setMode('signup')
        }
    }, [searchParams])

    const loginDisabled = !loginForm.email || !loginForm.password

    // === 3. 비밀번호 유효성 검사 수정 (길이 6자 이상 추가) ===
    const isPasswordLengthValid = signupForm.password.length >= 6;
    const isPasswordSpecialCharValid = passwordRule.test(signupForm.password);

    const signupStep1Disabled =
        !signupForm.name ||
        !signupForm.email ||
        !signupForm.password ||
        !signupForm.passwordConfirm ||
        signupForm.password !== signupForm.passwordConfirm ||
        !isPasswordLengthValid || // 6자 미만이면 비활성화
        !isPasswordSpecialCharValid // 특수문자가 *없으면* (false) 비활성화

    const handleLogin = (event) => {
        event.preventDefault()
        if (loginDisabled) return
        login(loginForm.email, loginForm.password)
        // navigate(redirectFrom || '/rewards', { replace: true }) // 데모에서는 주석 처리
        console.log("로그인 성공, 리디렉션...");
    }

    const handleSignup = (event) => {
        event.preventDefault()

        if (signupForm.jobMainCategory === 'other' && !signupForm.jobOtherText) {
            alert('기타 직군을 입력해주세요.');
            setActiveStep(1);
            return;
        }

        signup(signupForm)
        // navigate(redirectFrom || '/rewards', { replace: true }) // 데모에서는 주석 처리
        console.log("회원가입 성공, 리디렉션...");
    }

    const handleStep1Next = () => {
        if (signupForm.jobMainCategory === 'other' && !signupForm.jobOtherText) {
            alert('기타 직군을 입력해주세요.');
            return;
        }
        setActiveStep(2);
    }

    const getJobLabel = () => {
        if (signupForm.jobMainCategory === 'other') {
            return signupForm.jobOtherText;
        }
        const subCat = availableSubCategories.find(r => r.id === signupForm.jobSubCategory);
        return subCat ? subCat.label : '선택된 직무';
    };

    // === 4. 알림 채널 라벨 생성 헬퍼 함수 ===
    const getNotificationLabel = () => {
        const labels = [];
        if (signupForm.notificationChannels.email) {
            labels.push('이메일');
        }
        if (signupForm.notificationChannels.kakao) {
            labels.push('카카오톡');
        }
        return labels.join(' 및 '); // "이메일" 또는 "이메일 및 카카오톡"
    };

    return (
        <div className="auth">
            <motion.section
                className="auth__form"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <header>
                    <h2>{mode === 'signup' ? '회원가입' : '로그인'}</h2>
                </header>

                {mode === 'signup' ? (
                    <form onSubmit={handleSignup}>
                        <div className="form__stepper">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`stepper__item ${index === activeStep ? 'is-active' : ''}`}
                                >
                                    <strong>{step.label}</strong>
                                    <span />
                                </div>
                            ))}
                        </div>

                        {activeStep === 0 && (
                            <>
                                <div className="form__grid">
                                    <label className="form__field">
                                        <span>이름</span>
                                        <input
                                            type="text"
                                            placeholder="홍길동"
                                            value={signupForm.name}
                                            onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
                                            required
                                        />
                                    </label>
                                    <label className="form__field">
                                        <span>이메일</span>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={signupForm.email}
                                            onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="form__grid">
                                    <label className="form__field">
                                        <span>비밀번호</span>
                                        <input
                                            type="password"
                                            placeholder="비밀번호 (6자 이상, 특수문자 1개 필수)"
                                            value={signupForm.password}
                                            onChange={(event) => setSignupForm((prev) => ({ ...prev, password: event.target.value }))}
                                            required
                                        />
                                    </label>
                                    <label className="form__field">
                                        <span>비밀번호 확인</span>
                                        <input
                                            type="password"
                                            placeholder="비밀번호 확인"
                                            value={signupForm.passwordConfirm}
                                            onChange={(event) => setSignupForm((prev) => ({ ...prev, passwordConfirm: event.target.value }))}
                                            required
                                        />
                                    </label>
                                </div>

                                {/* === 5. 비밀번호 힌트 로직/텍스트 수정 (길이 힌트 추가) === */}
                                {signupForm.password.length > 0 && !isPasswordLengthValid && (
                                    <p className="auth__hint">
                                        비밀번호는 6자 이상이어야 합니다.
                                    </p>
                                )}
                                {signupForm.password.length > 0 && !isPasswordSpecialCharValid && (
                                    <p className="auth__hint">
                                        비밀번호에는 특수문자가 1개 이상 포함되어야 합니다.
                                    </p>
                                )}
                                {/* === 힌트 수정 끝 === */}


                                <div className="auth__actions">
                                    <button type="button" className="cta-button cta-button--primary"
                                            onClick={() => setActiveStep(1)} disabled={signupStep1Disabled}>
                                        다음
                                    </button>
                                </div>
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <label className="form__field">
                                    <span>직군 (대분류)</span>
                                    <select
                                        value={signupForm.jobMainCategory}
                                        onChange={(e) => {
                                            const newMainCatId = e.target.value;
                                            const newMainCat = jobData.find(cat => cat.id === newMainCatId);
                                            const newSubCatId = (newMainCat && newMainCat.roles.length > 0) ? newMainCat.roles[0].id : '';

                                            setSignupForm((prev) => ({
                                                ...prev,
                                                jobMainCategory: newMainCatId,
                                                jobSubCategory: newSubCatId,
                                                jobOtherText: ''
                                            }));
                                        }}
                                    >
                                        {jobData.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </label>

                                {signupForm.jobMainCategory !== 'other' && (
                                    <label className="form__field">
                                        <span>세부 직무</span>
                                        <select
                                            value={signupForm.jobSubCategory}
                                            onChange={(e) => setSignupForm((prev) => ({
                                                ...prev,
                                                jobSubCategory: e.target.value
                                            }))}
                                        >
                                            {availableSubCategories.map((role) => (
                                                <option key={role.id} value={role.id}>{role.label}</option>
                                            ))}
                                        </select>
                                    </label>
                                )}

                                {signupForm.jobMainCategory === 'other' && (
                                    <label className="form__field">
                                        <span>기타 직군 (직접 입력)</span>
                                        <input
                                            type="text"
                                            placeholder="직군을 입력하세요"
                                            value={signupForm.jobOtherText}
                                            onChange={(event) => setSignupForm((prev) => ({ ...prev, jobOtherText: event.target.value }))}
                                            required
                                        />
                                    </label>
                                )}

                                <div className="auth__actions">
                                    <button type="button" className="cta-button cta-button--ghost"
                                            onClick={() => setActiveStep(0)}>
                                        이전
                                    </button>
                                    <button
                                        type="button"
                                        className="cta-button cta-button--primary"
                                        onClick={handleStep1Next}
                                    >
                                        다음
                                    </button>
                                </div>
                            </>
                        )}

                        {activeStep === 2 && (
                            <>
                                <label className="form__field">
                                    <span>질문 주기</span>
                                    <select
                                        value={signupForm.cadence?.id}
                                        onChange={(event) => setSignupForm((prev) => ({
                                            ...prev,
                                            cadence: cadencePresets.find(c => c.id === event.target.value)
                                        }))}
                                    >
                                        {cadencePresets.map((preset) => (
                                            <option key={preset.id} value={preset.id}>{preset.label}</option>
                                        ))}
                                    </select>
                                </label>

                                {/* === 6. 알림 채널 UI 변경 (Select -> Checkbox) === */}
                                <div className="form__field">
                                    <span>알림 채널</span>
                                    <div className="form__checkbox-group">
                                        <label className="form__checkbox">
                                            <input
                                                type="checkbox"
                                                checked={signupForm.notificationChannels.email}
                                                disabled // 이메일은 항상 true이고 비활성화
                                            />
                                            이메일 (필수)
                                        </label>
                                        <label className="form__checkbox">
                                            <input
                                                type="checkbox"
                                                checked={signupForm.notificationChannels.kakao}
                                                onChange={(e) => setSignupForm(prev => ({
                                                    ...prev,
                                                    notificationChannels: {
                                                        ...prev.notificationChannels,
                                                        kakao: e.target.checked
                                                    }
                                                }))}
                                            />
                                            카카오톡 (선택)
                                        </label>
                                    </div>
                                </div>
                                {/* === UI 변경 끝 === */}


                                <div className="auth__summary-card">
                                    <p>
                                        {/* === 7. 요약 카드 라벨 헬퍼 함수 사용 === */}
                                        <strong>{signupForm.cadence?.label}</strong>, <strong>{getNotificationLabel()}</strong>(으)로
                                        <strong> {getJobLabel()}</strong> 역할에 대한
                                        AI 면접 질문을 보내드립니다.
                                    </p>
                                </div>

                                <div className="auth__actions">
                                    <button type="button" className="cta-button cta-button--ghost"
                                            onClick={() => setActiveStep(1)}>
                                        이전
                                    </button>
                                    <button type="submit" className="cta-button cta-button--primary">
                                        회원가입 완료
                                    </button>
                                </div>
                            </>
                        )}

                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <label className="form__field">
                            <span>이메일</span>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={loginForm.email}
                                onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                                required
                            />
                        </label>

                        <label className="form__field">
                            <span>비밀번호</span>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={loginForm.password}
                                onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                                required
                            />
                            <a className="auth__link" href="mailto:hello@prepair.ai">
                                비밀번호를 잊으셨나요?
                            </a>
                        </label>

                        <button type="submit" className="cta-button cta-button--primary" disabled={loginDisabled}>
                            로그인 후 마이 페이지로 이동
                        </button>
                    </form>
                )}
            </motion.section>
        </div>
    )
}