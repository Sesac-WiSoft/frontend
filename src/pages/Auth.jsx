import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import '../styles/pages/Auth.css'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const steps = [
  { id: 'account', label: '기본 정보' },
  { id: 'job', label: '직업/관심 선택' },
  { id: 'cadence', label: '질문 주기 & 알림' },
]

const passwordRule = /[^A-Za-z0-9]/

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { user, login, signup, jobTracks, cadencePresets, notificationChannelPresets } = useAppState()
  const redirectFrom = location.state?.from
  const redirectState = redirectFrom ? { from: redirectFrom } : undefined

  const defaultTrack = jobTracks[0]
  const defaultRole = defaultTrack?.roles?.[0]
  const defaultCadence = cadencePresets[0]

  const [mode, setMode] = useState('signup')
  const [activeStep, setActiveStep] = useState(0)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    jobTrackId: defaultTrack?.id ?? '',
    jobRoleId: defaultRole?.id ?? '',
    customJobLabel: '',
    goal: '',
    focusArea: '',
    questionCadence: defaultCadence?.id ?? 'daily',
    notificationChannels: [],
  })

  useEffect(() => {
    const paramMode = searchParams.get('mode')
    if (paramMode === 'login' || paramMode === 'signup') {
      setMode(paramMode)
      setActiveStep(0)
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      navigate('/rewards', { replace: true, state: redirectState })
    }
  }, [navigate, redirectState, user])

  useEffect(() => {
    if (!signupForm.jobTrackId && defaultTrack) {
      setSignupForm((prev) => ({
        ...prev,
        jobTrackId: defaultTrack.id,
        jobRoleId: defaultTrack.roles?.[0]?.id ?? '',
      }))
    }
  }, [defaultTrack, signupForm.jobTrackId])

  const selectedTrack = useMemo(
    () => jobTracks.find((track) => track.id === signupForm.jobTrackId) ?? jobTracks[0],
    [jobTracks, signupForm.jobTrackId],
  )

  const selectedRole = useMemo(() => {
    if (!selectedTrack) return null
    return selectedTrack.roles?.find((role) => role.id === signupForm.jobRoleId) ?? null
  }, [selectedTrack, signupForm.jobRoleId])

  const signupEmailValid = /\S+@\S+\.\S+/.test(signupForm.email)
  const signupPasswordValid =
    signupForm.password.trim().length >= 6 && passwordRule.test(signupForm.password)
  const signupNameValid = signupForm.name.trim().length >= 2
  const signupGoalValid = signupForm.goal.trim().length >= 10
  const jobSelectionValid =
    signupForm.jobTrackId &&
    ((signupForm.jobRoleId && signupForm.jobRoleId !== 'custom') ||
      signupForm.customJobLabel.trim().length > 1)

  const stepValidity = [
    signupEmailValid && signupPasswordValid && signupNameValid,
    jobSelectionValid && signupGoalValid,
    Boolean(signupForm.questionCadence),
  ]

  const isLoginEmailValid = /\S+@\S+\.\S+/.test(loginForm.email)
  const isLoginPasswordValid = loginForm.password.trim().length >= 6
  const loginDisabled = !(isLoginEmailValid && isLoginPasswordValid)

  const handleModeChange = (nextMode) => {
    setMode(nextMode)
    setActiveStep(0)
  }

  const handleNextStep = () => {
    if (!stepValidity[activeStep]) return
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (loginDisabled) return
    login({ email: loginForm.email })
    navigate('/rewards', { replace: true, state: redirectState })
  }

  const handleSignup = (event) => {
    event.preventDefault()
    if (!stepValidity.every(Boolean)) return

    const cadenceMeta =
      cadencePresets.find((item) => item.id === signupForm.questionCadence) ?? cadencePresets[0]

    const jobRoleLabel =
      signupForm.customJobLabel.trim() ||
      selectedRole?.label ||
      selectedTrack?.label ||
      signupForm.jobRoleId

    signup({
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
      jobTrackId: selectedTrack?.id,
      jobTrackLabel: selectedTrack?.label,
      jobRoleId: signupForm.customJobLabel.trim() ? 'custom' : selectedRole?.id,
      jobRoleLabel,
      customJobLabel: signupForm.customJobLabel.trim(),
      goal: signupForm.goal,
      focusArea: signupForm.focusArea,
      questionCadence: cadenceMeta.id,
      questionCadenceLabel: cadenceMeta.label,
      notificationChannels: signupForm.notificationChannels,
    })

    navigate('/rewards', { replace: true, state: redirectState })
  }

  const toggleChannel = (channelId) => {
    setSignupForm((prev) => {
      if (prev.notificationChannels.includes(channelId)) {
        return {
          ...prev,
          notificationChannels: prev.notificationChannels.filter((id) => id !== channelId),
        }
      }
      return { ...prev, notificationChannels: [...prev.notificationChannels, channelId] }
    })
  }

  const activeModeIsSignup = mode === 'signup'

  return (
    <div className="auth">
      <motion.section className="auth__intro" variants={cardVariants} initial="hidden" animate="visible">
        <span className="tag">Onboard with PrePair</span>
        <h1>
          목표, 직업, 루틴을 알려주면
          <br />
          AI가 첫 질문을 바로 보내드려요.
        </h1>
        <p>
          회원가입이 완료되는 즉시, 선택한 직업군에 맞는 면접 질문이 메일로 발송됩니다. 루틴과 피드백, 리워드까지 한 번에
          연결되는 경험을 시작하세요.
        </p>
        <dl className="auth__summary">
          <div>
            <dt>맞춤 질문</dt>
            <dd>직업군 · 세부 직무 기반 큐레이션</dd>
          </div>
          <div>
            <dt>알림</dt>
            <dd>메일 기본, 카카오톡 선택</dd>
          </div>
          <div>
            <dt>리워드</dt>
            <dd>점수로 쿠폰 교환 & 잔디 기록</dd>
          </div>
        </dl>
      </motion.section>

      <motion.section
        className="auth__form-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.12 }}
      >
        <div className="auth__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeModeIsSignup}
            className={`auth__tab ${activeModeIsSignup ? 'is-active' : ''}`}
            onClick={() => handleModeChange('signup')}
          >
            회원가입
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!activeModeIsSignup}
            className={`auth__tab ${!activeModeIsSignup ? 'is-active' : ''}`}
            onClick={() => handleModeChange('login')}
          >
            로그인
          </button>
        </div>

        {activeModeIsSignup ? (
          <>
            <div className="auth__stepper" aria-label="회원가입 단계">
              {steps.map((step, index) => {
                const isActive = index === activeStep
                const isCompleted = index < activeStep
                return (
                  <div key={step.id} className={`auth__step ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-done' : ''}`}>
                    <span>{index + 1}</span>
                    <strong>{step.label}</strong>
                  </div>
                )
              })}
            </div>

            <form className="auth__signup-form" onSubmit={handleSignup}>
              {activeStep === 0 && (
                <div className="auth__step-panel">
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

                  <label className="form__field">
                    <span>비밀번호</span>
                    <input
                      type="password"
                      placeholder="최소 6자 · 특수문자 1개 포함"
                      value={signupForm.password}
                      onChange={(event) => setSignupForm((prev) => ({ ...prev, password: event.target.value }))}
                      required
                    />
                    <small className={`auth__hint ${signupPasswordValid ? 'is-valid' : ''}`}>
                      {!signupPasswordValid
                        ? '특수문자 1개 이상을 포함한 6자 이상의 비밀번호를 설정해주세요.'
                        : '안전한 비밀번호를 사용 중입니다.'}
                    </small>
                  </label>
                </div>
              )}

              {activeStep === 1 && (
                <div className="auth__step-panel">
                  <div className="auth__tracks">
                    {jobTracks.map((track) => {
                      const isSelected = track.id === selectedTrack?.id
                      return (
                        <button
                          key={track.id}
                          type="button"
                          className={`auth__track ${isSelected ? 'is-selected' : ''}`}
                          onClick={() =>
                            setSignupForm((prev) => ({
                              ...prev,
                              jobTrackId: track.id,
                              jobRoleId: track.roles?.[0]?.id ?? '',
                              customJobLabel: '',
                            }))
                          }
                        >
                          <strong>{track.label}</strong>
                          <span>{track.description}</span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="auth__roles">
                    <span>세부 직무 선택</span>
                    <div className="auth__role-grid">
                      {selectedTrack?.roles?.map((role) => {
                        const isActive = role.id === signupForm.jobRoleId && !signupForm.customJobLabel
                        return (
                          <button
                            key={role.id}
                            type="button"
                            className={`auth__role ${isActive ? 'is-active' : ''}`}
                            onClick={() =>
                              setSignupForm((prev) => ({ ...prev, jobRoleId: role.id, customJobLabel: '' }))
                            }
                          >
                            <strong>{role.label}</strong>
                            <small>{role.reason}</small>
                          </button>
                        )
                      })}
                    </div>
                    <label className="form__field auth__custom-role">
                      <span>기타 (직접 입력)</span>
                      <input
                        type="text"
                        placeholder="예) 글로벌 이커머스 고객 성공 매니저"
                        value={signupForm.customJobLabel}
                        onChange={(event) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            customJobLabel: event.target.value,
                            jobRoleId: 'custom',
                          }))
                        }
                      />
                    </label>
                  </div>

                  <label className="form__field">
                    <span>면접 목표</span>
                    <textarea
                      placeholder="예) 6개월 내 항공사 객실승무원 최종 합격"
                      value={signupForm.goal}
                      onChange={(event) => setSignupForm((prev) => ({ ...prev, goal: event.target.value }))}
                      required
                    />
                  </label>

                  <label className="form__field">
                    <span>집중하고 싶은 영역 (선택)</span>
                    <input
                      type="text"
                      placeholder="예) 고객 응대 톤 & 태도 개선"
                      value={signupForm.focusArea}
                      onChange={(event) => setSignupForm((prev) => ({ ...prev, focusArea: event.target.value }))}
                    />
                  </label>
                </div>
              )}

              {activeStep === 2 && (
                <div className="auth__step-panel">
                  <fieldset className="form__fieldset">
                    <legend>질문 받을 주기를 선택하세요</legend>
                    <div className="auth__cadence-grid">
                      {cadencePresets.map((option) => {
                        const checked = signupForm.questionCadence === option.id
                        return (
                          <label key={option.id} className={`auth__cadence ${checked ? 'is-checked' : ''}`}>
                            <input
                              type="radio"
                              name="signup-cadence"
                              value={option.id}
                              checked={checked}
                              onChange={() => setSignupForm((prev) => ({ ...prev, questionCadence: option.id }))}
                            />
                            <div>
                              <strong>{option.label}</strong>
                              <span>{option.schedule}</span>
                              <small>{option.detail}</small>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                    <p className="auth__notice">
                      질문 발송 시간은 고정되어 있습니다. 메일은 항상 보내드리고, 카카오톡 알림은 선택 사항이에요.
                    </p>
                  </fieldset>

                  <fieldset className="form__fieldset">
                    <legend>알림 채널</legend>
                    <div className="auth__channel-list">
                      {notificationChannelPresets.map((channel) => {
                        const isEmail = channel.id === 'email'
                        const isChecked = isEmail || signupForm.notificationChannels.includes(channel.id)
                        return (
                          <label key={channel.id} className={`auth__channel ${isEmail ? 'is-default' : ''}`}>
                            <input
                              type="checkbox"
                              name="notification-channel"
                              value={channel.id}
                              checked={isChecked}
                              disabled={isEmail}
                              onChange={() => toggleChannel(channel.id)}
                            />
                            <div>
                              <strong>
                                {channel.label}
                                {isEmail && <span className="auth__chip">기본</span>}
                              </strong>
                              <span>{channel.description}</span>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="auth__summary-card">
                    <strong>가입 완료 시 즉시 발송됩니다.</strong>
                    <p>
                      선택한 직업군에 맞춘 면접 질문이 메일로 도착하고, <em>“답변하러 가기”</em> 버튼을 통해 PrePair 웹으로
                      돌아와 답변을 작성할 수 있습니다.
                    </p>
                  </div>
                </div>
              )}

              <div className="auth__actions">
                {activeStep > 0 && (
                  <button type="button" className="cta-button cta-button--ghost" onClick={handlePrevStep}>
                    이전 단계
                  </button>
                )}
                {activeStep < steps.length - 1 && (
                  <button
                    type="button"
                    className="cta-button cta-button--primary"
                    onClick={handleNextStep}
                    disabled={!stepValidity[activeStep]}
                  >
                    다음으로
                  </button>
                )}
                {activeStep === steps.length - 1 && (
                  <button type="submit" className="cta-button cta-button--primary" disabled={!stepValidity.every(Boolean)}>
                    가입하고 첫 질문 받기
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <form className="auth__login-form" onSubmit={handleLogin}>
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
