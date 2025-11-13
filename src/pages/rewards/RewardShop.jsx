import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppStateContext'
import '../../styles/pages/RewardShop.css'

const catalog = [
  {
    id: 'convenience-coupon',
    name: '편의점 모바일 쿠폰',
    cost: 300,
    description: '간단한 간식과 음료로 루틴을 보상하세요.',
    badge: '매일 리워드',
    gradient: 'linear-gradient(135deg, rgba(242, 228, 236, 0.75), rgba(201, 219, 242, 0.75))',
  },
  {
    id: 'baekdabang',
    name: '빽다방 2만원 이용권',
    cost: 2000,
    description: '답변 후 달콤한 커피 한 잔으로 휴식을!',
    badge: '인기',
    gradient: 'linear-gradient(135deg, rgba(174, 197, 242, 0.75), rgba(64, 81, 115, 0.55))',
  },
  {
    id: 'lotteria-meal',
    name: '롯데리아 세트 교환권',
    cost: 5000,
    description: '팀 회의 전 에너지 충전을 위한 버거 세트.',
    badge: '추천',
    gradient: 'linear-gradient(135deg, rgba(255, 214, 164, 0.75), rgba(255, 153, 153, 0.65))',
  },
  {
    id: 'book-giftcard',
    name: '도서 문화 상품권 1만원',
    cost: 10000,
    description: '전문 서적으로 인사이트를 확장해 보세요.',
    badge: '학습 강화',
    gradient: 'linear-gradient(135deg, rgba(174, 242, 212, 0.75), rgba(169, 187, 222, 0.7))',
  },
]

export default function RewardShop() {
  const { user, redeemReward } = useAppState()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRedeem = (item) => {
    const response = redeemReward(item)
    if (!response.success) {
      setError(response.reason)
      setTimeout(() => setError(''), 2400)
      return
    }
    navigate('/rewards/complete', { state: { purchase: response.record, item } })
  }

  return (
    <div className="reward-shop">
      <header className="reward-shop__header">
        <div>
          <span className="tag">Reward Shop</span>
          <h1>포인트로 루틴을 보상하세요</h1>
          <p>AI 면접 코칭으로 적립한 포인트로 커피, 러닝 크레딧, 노트 등 다양한 리워드를 교환할 수 있어요.</p>
        </div>
        <div className="reward-shop__balance">
          <span>보유 포인트</span>
          <strong>{user?.points.toLocaleString()} pts</strong>
        </div>
      </header>

      {error && <p className="reward-shop__error">{error}</p>}

      <section className="reward-shop__grid">
        {catalog.map((item) => {
          const disabled = (user?.points ?? 0) < item.cost
          return (
            <article key={item.id} className={`reward-item ${disabled ? 'is-disabled' : ''}`}>
              {item.badge && <span className="reward-item__badge">{item.badge}</span>}
              <div className="reward-item__visual" style={{ backgroundImage: item.gradient }} aria-hidden="true" />
              <div className="reward-item__body">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <div className="reward-item__footer">
                  <span>{item.cost} pts</span>
                  <button type="button" onClick={() => handleRedeem(item)} disabled={disabled}>
                    교환하기
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
