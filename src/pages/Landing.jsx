import '../styles/pages/Landing.css'

// === 1. 서비스 설명에 맞게 피처 타일 내용 수정 ===
const featureTiles = [
    {
        badge: '🎯 맞춤 직군 설정',
        title: '내 커리어에 맞춘 첫 단계',
        description: '개발, 기획, 마케팅, 디자인 등 내 직무에 딱 맞는 면접 시뮬레이션을 설정하세요.',
    },
    {
        badge: '🤖 AI 맞춤 질문',
        title: '매일 만나는 면접관',
        description: '선택한 직군에 맞춰 AI가 생성한 핵심 질문을 매일 카톡이나 이메일로 보내드려요.',
    },
    {
        badge: '💡 실시간 AI 피드백',
        title: '가장 스마트한 코칭',
        description: '내 답변을 등록하면, AI 코치가 즉각적으로 상세한 피드백과 개선점을 제안해 줍니다.',
    },
    {
        badge: '💯 점수 & 리워드',
        title: '실력이 되는 보상',
        description: 'AI가 매긴 0~100점 점수로 실력을 확인하고, 쌓인 포인트로 커피/상품권도 교환해요!',
    },
]


export default function LandingPage() {

    return (
        <div className="landing landing--refresh">
            <section className="landing-features">
                <header>
                    {/*<p className="tag"></p>*/}
                    <h2>완벽한 면접 준비를 위한 AI 파트너, PrePair</h2>

                    {/* === 2. 헤더 설명 문구 수정 === */}
                    <p>
                        AI가 당신의 직무에 맞춰 면접 질문을 생성하고, 답변에 대한 실시간 피드백과 점수를 드려요.
                        꾸준히 준비하고 리워드도 받아가세요! 🚀
                    </p>
                </header>

                {/* === 3. 수정된 피처 타일이 자동 적용 === */}
                <div className="landing-feature-grid">
                    {featureTiles.map((tile) => (
                        <article key={tile.title}>
                            <span>{tile.badge}</span>
                            <strong>{tile.title}</strong>
                            <p>{tile.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* 기존 배너 섹션 (변경 없음) */}
            <section className="landing-ticker">
                <div className="landing-ticker__wrap">
                    <span>✨ <strong>삼성전자</strong>에서 신입 AI 엔지니어 공고를 올렸어요!</span>
                    <span>✨ <strong>Kakao</strong>에서 UX/UI 디자이너를 채용합니다.</span>
                    <span>✨ <strong>(주)PrePair</strong>에서 프론트엔드 개발자를 찾습니다.</span>
                    {/* Ticker 애니메이션을 위한 복제본 */}
                    <span>✨ <strong>삼성전자</strong>에서 신입 AI 엔지니어 공고를 올렸어요!</span>
                    <span>✨ <strong>Kakao</strong>에서 UX/UI 디자이너를 채용합니다.</span>
                    <span>✨ <strong>(주)PrePair</strong>에서 프론트엔드 개발자를 찾습니다.</span>
                </div>
            </section>

        </div>
    )
}