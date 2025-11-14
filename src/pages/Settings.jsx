import {motion} from 'framer-motion'
import {useState} from 'react'
import {useAppState} from '../context/AppStateContext'
import '../styles/pages/Settings.css'


export default function SettingsPage() {
    const {user, updateSettings, cadencePresets, notificationChannelPresets} = useAppState()
    const [form, setForm] = useState({
        goal: user?.goal ?? '',
        focusArea: user?.focusArea ?? focusAreas[0],
        questionCadence: user?.questionCadence ?? 'daily',
        notificationChannels: user?.notificationChannels?.filter((channel) => channel !== 'email') ?? [],
    })
    const [status, setStatus] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const cadenceMeta = cadencePresets.find((item) => item.id === form.questionCadence)
        updateSettings({
            goal: form.goal,
            focusArea: form.focusArea,
            questionCadence: form.questionCadence,
            questionCadenceLabel: cadenceMeta?.label,
            questionSchedule: cadenceMeta?.schedule,
            notificationChannels: ['email', ...form.notificationChannels],
        })
        setStatus('저장되었습니다!')
        setTimeout(() => setStatus(''), 2400)
    }

    const toggleChannel = (channelId) => {
        setForm((prev) => {
            if (prev.notificationChannels.includes(channelId)) {
                return {
                    ...prev,
                    notificationChannels: prev.notificationChannels.filter((id) => id !== channelId),
                }
            }
            return {...prev, notificationChannels: [...prev.notificationChannels, channelId]}
        })
    }

    return (
        <div className="settings">
            <header className="settings__header">
                <div>
                    <span className="tag">Personal Control Center</span>
                    <h1>개인 설정</h1>
                    <p>목표와 루틴을 조정하면 AI 코치가 난이도, 질문 스타일, 리워드 제안을 맞춰 드립니다.</p>
                </div>
                <motion.div className="settings__card" initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}}>
                    <span>현재 잔여 포인트</span>
                    <strong>{user?.points.toLocaleString()} pts</strong>
                </motion.div>
            </header>

            <form className="settings__form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>목표</legend>
                    <label className="form__field">
                        <textarea
                            value={form.goal}
                            onChange={(event) => setForm((prev) => ({...prev, goal: event.target.value}))}
                            placeholder="6개월 내 글로벌 스타트업 PM 포지션 합격"
                        />
                    </label>
                </fieldset>


                <fieldset>
                    <legend>질문 빈도</legend>
                    <div className="settings__cadence">
                        {cadencePresets.map((option) => {
                            const checked = form.questionCadence === option.id
                            return (
                                <label key={option.id} className={`cadence-card ${checked ? 'is-checked' : ''}`}>
                                    <input
                                        type="radio"
                                        name="question-cadence"
                                        value={option.id}
                                        checked={checked}
                                        onChange={() => setForm((prev) => ({...prev, questionCadence: option.id}))}
                                    />
                                    <div>
                                        <strong>{option.label}</strong>
                                        <br></br>
                                        <small>{option.description}</small>
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>

                <fieldset>
                    <legend>알림 채널</legend>
                    <div className="settings__channels">
                        {notificationChannelPresets.map((channel) => {
                            const isEmail = channel.id === 'email'
                            const checked = isEmail || form.notificationChannels.includes(channel.id)
                            return (
                                <label key={channel.id} className={`channel-pill ${isEmail ? 'is-default' : ''}`}>
                                    <input
                                        type="checkbox"
                                        disabled={isEmail}
                                        checked={checked}
                                        onChange={() => toggleChannel(channel.id)}
                                    />
                                    <span>
                      {channel.label}
                                        {isEmail && <small>(기본)</small>}
                    </span>
                                </label>
                            )
                        })}
                    </div>
                </fieldset>

                <button type="submit" className="cta-button cta-button--primary">
                    변경 사항 저장
                </button>
                {status && <p className="settings__status">{status}</p>}
            </form>
        </div>
    )
}
