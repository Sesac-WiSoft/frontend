import { motion } from 'motion/react';
import { Sparkles, Mail, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={mascotImage} alt="AI Coach" className="w-12 h-12" />
            <span className="text-blue-600">AI 면접 코치</span>
          </div>
          <Button variant="ghost" onClick={onGetStarted} className="text-gray-700 hover:text-blue-600">
            시작하기
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={mascotImage}
              alt="AI Interview Coach"
              className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 drop-shadow-2xl"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          <motion.h1
            className="mb-6 text-gray-900 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI가 함께하는
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              맞춤형 면접 준비
            </span>
          </motion.h1>

          <motion.p
            className="mb-10 text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            매일 또는 매주 당신의 직업군에 맞춘 면접 질문을 받아보세요.
            <br />
            AI가 실시간으로 답변을 분석하고 피드백을 제공합니다.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-7 shadow-xl hover:shadow-2xl transition-all group"
              onClick={onGetStarted}
            >
              무료로 시작하기
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-3 text-gray-900">정기적인 질문 제공</h3>
              <p className="text-gray-600">
                이메일이나 카카오톡으로 정기적으로 면접 질문을 받아보세요
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-3 text-gray-900">AI 피드백</h3>
              <p className="text-gray-600">
                답변을 분석하고 구체적인 개선 방안을 제시합니다
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-3 text-gray-900">점수 & 리워드</h3>
              <p className="text-gray-600">
                점수를 모아 커피나 다양한 상품으로 교환하세요
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="mb-4">지금 바로 시작하세요</h2>
          <p className="mb-8 opacity-90 max-w-2xl mx-auto">
            AI 면접 코치와 함께 성공적인 면접을 준비하세요
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-7 shadow-xl group"
            onClick={onGetStarted}
          >
            무료로 시작하기
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 border-t border-gray-200">
        <p>© 2025 AI 면접 코치. All rights reserved.</p>
      </footer>
    </div>
  );
}