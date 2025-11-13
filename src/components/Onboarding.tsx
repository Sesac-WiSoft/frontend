import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface OnboardingProps {
  onComplete: (goal: string, frequency: 'daily' | 'weekly') => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleNext = () => {
    if (step === 1 && goal) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    onComplete(goal, frequency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>
          <p className="text-center text-gray-600">
            Step {step} / 2
          </p>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-10 backdrop-blur-sm bg-white/80 shadow-xl border-0">
              <div className="text-center mb-8">
                <motion.img
                  src={mascotImage}
                  alt="AI Coach"
                  className="w-24 h-24 mx-auto mb-6"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-gray-900 mb-3">면접 준비 목표를 알려주세요</h2>
                <p className="text-gray-600">
                  목표를 설정하면 더 효과적인 면접 준비가 가능합니다
                </p>
              </div>

              <Textarea
                placeholder="예: 3개월 내에 네이버 프론트엔드 개발자로 이직하기"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="min-h-[120px] mb-6 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />

              <Button
                onClick={handleNext}
                disabled={!goal.trim()}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 group"
              >
                다음
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Frequency */}
        {step === 2 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-10 backdrop-blur-sm bg-white/80 shadow-xl border-0">
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-purple-600" />
                </div>
                <h2 className="text-gray-900 mb-3">얼마나 자주 연습하시겠어요?</h2>
                <p className="text-gray-600">
                  선택한 빈도로 면접 질문을 이메일로 받아보실 수 있습니다
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <Card
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    frequency === 'daily'
                      ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setFrequency('daily')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-1">매일</h3>
                      <p className="text-gray-600">
                        하루에 한 번씩 새로운 질문을 받아요
                      </p>
                    </div>
                    {frequency === 'daily' && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </Card>

                <Card
                  className={`p-6 cursor-pointer transition-all border-2 ${
                    frequency === 'weekly'
                      ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setFrequency('weekly')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-1">주 1회</h3>
                      <p className="text-gray-600">
                        일주일에 한 번씩 새로운 질문을 받아요
                      </p>
                    </div>
                    {frequency === 'weekly' && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12"
                >
                  이전
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 group"
                >
                  완료
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
