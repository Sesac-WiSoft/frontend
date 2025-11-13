import { motion as Motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import '../styles/pages/Answer.css'

export default function AnswerPage() {
  const { dispatchId } = useParams()
  const navigate = useNavigate()
  const { sentQuestions, currentQuestion, notificationChannelPresets, user } = useAppState()

  const packet = useMemo(() => {
    if (!sentQuestions || sentQuestions.length === 0) return null
    if (dispatchId) {
      const match = sentQuestions.find((item) => item.id === dispatchId)
      if (match) return match
    }
    return sentQuestions[0]
  }, [dispatchId, sentQuestions])

  const activeQuestion = packet ?? (currentQuestion ? buildPacketFromCurrent(currentQuestion) : null)

  const handleStartPractice = () => {
    navigate('/coach', { state: { focusQuestionId: activeQuestion?.questionId } })
  }

  if (!activeQuestion) {
    return (
      <div className="answer answer--empty">
        <div className="answer__empty-card">
          <strong>발송된 질문을 찾을 수 없어요.</strong>
          <p>새로운 질문을 받으려면 설정에서 루틴을 확인하거나 AI 코치 페이지로 이동하세요.</p>
          <div className="answer__cta">
            <Link to="/rewards" className="cta-button cta-button--ghost">
              마이 페이지로
            </Link>
            <Link to="/coach" className="cta-button cta-button--primary">
              AI 코치 이동
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const deliveredDate = new Date(activeQuestion.deliveredAt)
  const deliveredLabel = deliveredDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="answer">
      <Motion.section className="answer__card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
        <header className="answer__header">
          <span className="tag">Interview Dispatch</span>
          <h1>
            {activeQuestion.jobTrackLabel || user?.jobTrackLabel || 'PrePair 질문'} ·{' '}
            {activeQuestion.roleLabel || user?.jobRoleLabel || user?.desiredField}
          </h1>
          <p>
            {deliveredLabel}에 발송된 질문입니다. 준비가 되었다면 아래의 버튼으로 바로 답변을 작성하거나 AI 코치에서 더 깊이 연습해 보세요.
          </p>
        </header>

        <article className="answer__question">
          <div className="answer__meta">
            <span>{activeQuestion.cadenceLabel}</span>
            <span>{activeQuestion.schedule}</span>
            <span>{formatChannels(activeQuestion.channels, notificationChannelPresets)}</span>
          </div>
          <h2>{activeQuestion.prompt}</h2>
          <p>{activeQuestion.subPrompt}</p>
          {activeQuestion.tags && (
            <div className="answer__tags">
              {activeQuestion.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </article>

        <footer className="answer__footer">
          <div className="answer__cta">
            <button type="button" className="cta-button cta-button--primary" onClick={handleStartPractice}>
              답변 작성하러 가기
            </button>
            <Link to="/rewards" className="cta-button cta-button--ghost">
              마이 페이지로 돌아가기
            </Link>
          </div>
          <p className="answer__hint">
            메일 또는 카카오톡에서 “답변하러 가기” 버튼을 눌러도 동일한 화면으로 돌아옵니다. 답변을 제출하면 AI가 즉시 피드백을 제공하고 포인트를 적립해드려요.
          </p>
        </footer>
      </Motion.section>
    </div>
  )
}

function buildPacketFromCurrent(question) {
  return {
    id: 'current-question',
    questionId: question.id,
    prompt: question.prompt,
    subPrompt: question.subPrompt,
    tags: question.tags,
    jobTrackLabel: '',
    roleLabel: '',
    cadenceLabel: '',
    schedule: '',
    channels: ['email'],
    deliveredAt: new Date().toISOString(),
  }
}

function formatChannels(channelIds = [], presets = []) {
  if (!channelIds || channelIds.length === 0) return '메일'
  const map = presets.reduce((acc, item) => {
    acc[item.id] = item.label
    return acc
  }, {})
  return channelIds
    .map((id) => map[id] || id)
    .join(' · ')
}
