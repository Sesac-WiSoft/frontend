import { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, Target, Calendar, User, Mail, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import type { UserProfile } from '../App';
import { toast } from 'sonner';

interface SettingsProps {
  userProfile: UserProfile;
  onBack: () => void;
  onUpdateSettings: (goal: string, frequency: 'daily' | 'weekly') => void;
}

export function Settings({ userProfile, onBack, onUpdateSettings }: SettingsProps) {
  const [goal, setGoal] = useState(userProfile.goal);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>(userProfile.frequency);

  const handleSave = () => {
    onUpdateSettings(goal, frequency);
    toast.success('설정이 저장되었습니다', {
      description: '변경된 설정이 적용되었습니다.',
    });
  };

  const hasChanges = goal !== userProfile.goal || frequency !== userProfile.frequency;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-gray-900">설정</h2>
              <p className="text-gray-500">개인 정보 및 목표 관리</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Profile Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 mb-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <h3 className="text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              계정 정보
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">이름</label>
                <Input
                  type="text"
                  value={userProfile.name}
                  disabled
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">직업군</label>
                <Input
                  type="text"
                  value={userProfile.job}
                  disabled
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Goal Setting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 mb-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <h3 className="text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              면접 준비 목표
            </h3>
            <Textarea
              placeholder="면접 준비 목표를 입력하세요"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </Card>
        </motion.div>

        {/* Frequency Setting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 mb-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <h3 className="text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              질문 받는 빈도
            </h3>
            <div className="space-y-3">
              <Card
                className={`p-5 cursor-pointer transition-all border-2 ${
                  frequency === 'daily'
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setFrequency('daily')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    frequency === 'daily' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {frequency === 'daily' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-gray-900">매일</h4>
                    <p className="text-gray-600">하루에 한 번씩 새로운 질문</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-5 cursor-pointer transition-all border-2 ${
                  frequency === 'weekly'
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setFrequency('weekly')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    frequency === 'weekly' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {frequency === 'weekly' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-gray-900">주 1회</h4>
                    <p className="text-gray-600">일주일에 한 번씩 새로운 질문</p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        {hasChanges && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleSave}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              변경사항 저장
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
