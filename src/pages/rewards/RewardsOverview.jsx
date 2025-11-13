import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ContributionHeatmap from '../../components/ContributionHeatmap'
import { useAppState } from '../../context/AppStateContext'
import '../../styles/pages/Rewards.css'

export default function RewardsOverview() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    user,
    activity,
    scoreHistory,
    purchases,
    sentQuestions,
    notificationChannelPresets,
  } = useAppState()

  const latestDispatch = sentQuestions[0] ?? null
  const answered = scoreHistory.slice(0, 4)
  const avgScore =
    scoreHistory.length > 0
      ? Math.round(scoreHistory.reduce((sum, entry) => sum + entry.score, 0) / scoreHistory.length)
      : 0
  const recentPurchases = purchases.slice(0, 2)
  const channelLabels = buildChannelLabels(user?.notificationChannels, notificationChannelPresets)

  const redirectSource = location.state?.from

  useEffect(() => {
    if (redirectSource) {
      navigate(location.pathname, { replace: true })
    }
  }, [navigate, redirectSource, location.pathname])

  return (
    <div className="rewards">
      <header className="rewards__header">
        <div>
          <span className="tag">My Page · PrePair</span>
          <h1>{user?.name ?? 'PrePair 사용자'}님의 루틴 요약</h1>
          <p>
            질문 루틴, 답변 성과, 리워드를 한눈에 확인하고 관리하세요. 필요하다면 아래 카드에서 질문 주기를 바로 수정할 수
            있습니다.
          </p>
        </div>
        <div className="rewards__cta">
          <Link to="/rewards/shop" className="cta-button cta-button--primary">
            리워드샵 이동
          </Link>
          <Link to="/settings" className="cta-button cta-button--ghost">
            루틴 설정 변경
          </Link>
        </div>
      </header>

      {location.state?.from && latestDispatch && (
        <section className="rewards__banner">
          <strong>새로운 질문이 도착했어요.</strong>
          <p>아래 버튼을 눌러 바로 답변하러 가거나, AI 코치에서 자세히 작성해 보세요.</p>
          <Link to={`/answer/${latestDispatch.id}`} className="cta-button cta-button--primary">
            답변하러 가기
          </Link>
        </section>
      )}

      <section className="rewards__grid">
        <motion.article className="reward-card reward-card--points" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span>보유 포인트</span>
          <strong>{user?.points?.toLocaleString() ?? '0'} pts</strong>
          <p>꾸준히 답변하고 리워드샵에서 쿠폰을 교환해 보세요.</p>
        </motion.article>

        <motion.article className="reward-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <span>연속 참여 일수</span>
          <strong>{user?.streak ?? 0} 일</strong>
          <p>매일 오전 11시에 알림이 도착합니다. 지금 잔디를 더 촘촘히 채워봐요!</p>
        </motion.article>

        <motion.article className="reward-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <span>평균 점수</span>
          <strong>{avgScore} 점</strong>
          <p>최근 {scoreHistory.length}개의 답변 기준입니다.</p>
        </motion.article>

        <motion.article className="reward-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <span>질문 주기 / 채널</span>
          <strong>{user?.questionCadenceLabel ?? '주기 미설정'}</strong>
          <p>{user?.questionSchedule ?? '월~금 오전 11시'} · {channelLabels}</p>
        </motion.article>
      </section>

      {latestDispatch && (
        <section className="rewards__dispatch">
          <header>
            <h2>가장 최근에 받은 질문</h2>
            <p>이메일과 카카오톡으로 전달된 질문을 다시 확인해 보세요.</p>
          </header>
          <article className="dispatch-card">
            <div className="dispatch-card__meta">
              <span>{latestDispatch.jobTrackLabel}</span>
              <span>{latestDispatch.roleLabel}</span>
              <span>{latestDispatch.cadenceLabel}</span>
            </div>
            <h3>{latestDispatch.prompt}</h3>
            <p>{latestDispatch.subPrompt}</p>
            <div className="dispatch-card__tags">
              {latestDispatch.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="dispatch-card__actions">
              <Link to={`/answer/${latestDispatch.id}`} className="cta-button cta-button--primary">
                답변하러 가기
              </Link>
              <Link to="/coach" className="cta-button cta-button--ghost">
                AI 코치에서 연습
              </Link>
            </div>
          </article>
        </section>
      )}

      <section className="rewards__history">
        <header>
          <h2>최근 답변 기록</h2>
          <p>AI 피드백으로 받은 점수와 하이라이트를 확인하세요.</p>
        </header>
        {answered.length > 0 ? (
          <div className="history-list">
            {answered.map((entry) => (
              <article key={entry.id} className="history-item">
                <div>
                  <span>{new Date(entry.submittedAt).toLocaleDateString('ko-KR')}</span>
                  <strong>{entry.score} 점</strong>
                </div>
                <p>{entry.question}</p>
                {entry.focusTags?.length > 0 && (
                  <div className="history-item__tags">
                    {entry.focusTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="rewards__empty">아직 답변 기록이 없어요. 첫 질문을 답변하고 포인트를 적립해 보세요.</p>
        )}
      </section>

      <section className="rewards__heatmap">
        <header>
          <div>
            <h2>활동 잔디</h2>
            <p>최근 {activity.length}주간 인터뷰 세션 기록</p>
          </div>
        </header>
        <ContributionHeatmap data={activity} />
      </section>

      <section className="rewards__purchases">
        <header>
          <h2>최근 리워드</h2>
          <p>포인트를 사용한 최신 교환 내역입니다.</p>
        </header>
        <div className="purchase-grid">
          {recentPurchases.map((purchase) => (
            <article key={purchase.id} className="purchase-card">
              <span>{new Date(purchase.purchasedAt).toLocaleDateString('ko-KR')}</span>
              <strong>{purchase.name}</strong>
              <div className="purchase-card__meta">
                <span>-{purchase.cost} pts</span>
                <span>{purchase.deliveryStatus}</span>
              </div>
            </article>
          ))}
          {recentPurchases.length === 0 && (
            <p className="rewards__empty">아직 구매 내역이 없어요. 리워드샵에서 첫 리워드를 교환해보세요.</p>
          )}
        </div>
      </section>
    </div>
  )
}

function buildChannelLabels(channelIds = [], presets = []) {
  const map = presets.reduce((acc, item) => {
    acc[item.id] = item.label
    return acc
  }, {})

  if (!channelIds || channelIds.length === 0) {
    return map.email ?? '메일'
  }

  return channelIds
    .map((id) => map[id] || id)
    .filter(Boolean)
    .join(', ')
}
