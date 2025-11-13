import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface InterviewCoachingProps {
  questionId: number;
  jobType: string;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const questions: Record<number, { question: string; category: string }> = {
  1: {
    question: '자기소개를 해주세요.',
    category: '기본',
  },
  2: {
    question: '우리 회사에 지원한 이유가 무엇인가요?',
    category: '지원동기',
  },
  3: {
    question: '당신의 가장 큰 강점은 무엇인가요?',
    category: '역량',
  },
};

interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  overallComment: string;
}

export function InterviewCoaching({
  questionId,
  jobType,
  onComplete,
  onBack,
}: InterviewCoachingProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentQuestion = questions[questionId];

  const handleSubmit = () => {
    if (!answer.trim()) return;

    setIsAnalyzing(true);

    // Mock AI feedback generation
    setTimeout(() => {
      const mockFeedback: Feedback = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100 random score
        strengths: [
          '명확하고 구조적인 답변 구성',
          '구체적인 경험과 예시 제시',
          '자신감 있는 표현 사용',
        ],
        improvements: [
          '답변의 길이를 좀 더 간결하게 조정하면 좋겠습니다',
          '수치나 성과를 더 구체적으로 언급하면 설득력이 높아집니다',
          '회사와 연결되는 부분을 더 강조해보세요',
        ],
        overallComment:
          '전반적으로 우수한 답변입니다. 자신의 경험을 잘 설명했으며, 구조적으로 답변을 구성했습니다. 다만 구체적인 수치나 성과를 추가하면 더욱 설득력 있는 답변이 될 것입니다.',
      };

      setFeedback(mockFeedback);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleComplete = () => {
    if (feedback) {
      onComplete(feedback.score);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-gray-900">면접 코칭</h2>
              <p className="text-gray-500">{jobType}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Question Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 mb-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white border-0 shadow-2xl">
            <div className="flex items-start gap-4">
              <motion.img
                src={mascotImage}
                alt="AI Coach"
                className="w-16 h-16 flex-shrink-0 drop-shadow-xl"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="flex-1">
                <Badge className="bg-white/20 text-white mb-3 border-0">
                  {currentQuestion.category}
                </Badge>
                <h2 className="mb-2">{currentQuestion.question}</h2>
                <p className="opacity-90">답변을 작성하고 AI 피드백을 받아보세요</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Answer Input */}
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div
              key="input"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="mb-4 text-gray-900">나의 답변</h3>
                <Textarea
                  placeholder="답변을 입력해주세요..."
                  className="min-h-[200px] mb-4 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isAnalyzing}
                />
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">{answer.length}자</p>
                  <Button
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        AI 분석 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        제출하기
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score Card */}
              <Card className="p-10 mb-6 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="inline-block"
                >
                  <div className="w-36 h-36 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-2xl">
                    <div>
                      <div className="text-5xl">{feedback.score}</div>
                      <div className="text-sm opacity-90">점</div>
                    </div>
                  </div>
                </motion.div>
                <h2 className="mb-2 text-gray-900">
                  {feedback.score >= 90
                    ? '훌륭합니다!'
                    : feedback.score >= 80
                    ? '잘하셨어요!'
                    : '좋은 시도입니다!'}
                </h2>
                <p className="text-gray-600">{feedback.overallComment}</p>
              </Card>

              {/* Strengths */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 mb-6 border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-gray-900">잘한 점</h3>
                  </div>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* Improvements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6 mb-6 border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900">개선 제안</h3>
                  </div>
                  <ul className="space-y-2">
                    {feedback.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{improvement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* Complete Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 shadow-xl"
                  onClick={handleComplete}
                >
                  완료하고 돌아가기
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}