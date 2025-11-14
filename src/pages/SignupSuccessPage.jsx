import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/SignupSuccess.css'

// --- 인라인 SVG 아이콘 ---

// 발송 중 (종이 비행기)
const PaperPlaneIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#0d6efd' }} // 기본 테마 색상 (파란색)
    >
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z"/>
    </svg>
);

// 발송 완료 (체크 써클)
const CheckCircleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#198754' }} // 성공 색상 (초록색)
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

// --- 애니메이션 Variants ---

// 아이콘이 나타나고 사라지는 효과
const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', damping: 15, stiffness: 300, duration: 0.5 }
    },
    exit: { opacity: 0, scale: 0.2, transition: { duration: 0.3 } }
};

// 종이 비행기 비행 모션
const sendingVariants = {
    hidden: { opacity: 0, x: '-60%', rotate: -15 },
    visible: {
        opacity: [0, 1, 1, 1, 0], // 깜빡이며 나타났다가 사라짐
        x: ['-60%', '60%', '60%', '60%', '60%'], // 컨테이너 안에서만 비행
        rotate: -15,
        transition: {
            duration: 2.0, // 2초 동안
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 0.9, 1] // 애니메이션 타이밍 조절
        }
    },
};

export default function SignupSuccessPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('sending'); // 'sending', 'sent'

    useEffect(() => {
        // '발송 중' 애니메이션이 끝날 때쯤 '발송 완료'로 상태 변경
        const timer = setTimeout(() => {
            setStatus('sent');
        }, 2200); // 2.2초 시뮬레이션
        return () => clearTimeout(timer);
    }, []);

    const goToMyPage = () => {
        navigate('/rewards');
    };

    // AuthPage의 레이아웃 클래스를 재사용하여 일관성 유지
    return (
        <div className="auth signup-success">
            <motion.section
                className="auth__form signup-success__card" // AuthPage와 동일한 카드 스타일 재사용
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* AnimatePresence를 사용하여 'sending'과 'sent' 상태가
                  부드럽게 전환되도록 합니다.
                */}
                <AnimatePresence mode="wait">
                        {status === 'sending' ? (
                        <motion.div
                            key="sending"
                                className="signup-success__stage"
                            variants={sendingVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden" // 'visible'과 동일한 트랜지션을 사용하되, 자연스럽게 사라지도록
                        >
                            <PaperPlaneIcon />
                            <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', color: '#333' }}>
                                오늘의 질문을 발송 중입니다...
                            </h2>
                        </motion.div>
                    ) : (
                            <motion.div
                            key="sent"
                                className="signup-success__stage"
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <CheckCircleIcon />
                            <h2 style={{ marginTop: '1.5rem', fontSize: '1.4rem', color: '#198754' }}>
                                발송되었습니다!
                            </h2>
                            <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '0.95rem', color: '#555' }}>
                                가입하신 이메일(및 카카오톡)을 확인해주세요.
                            </p>
                            <button
                                type="button"
                                onClick={goToMyPage}
                                className="cta-button cta-button--primary" // AuthPage와 동일한 버튼 스타일 재사용
                            >
                                마이페이지로 가기
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>
        </div>
    );
}