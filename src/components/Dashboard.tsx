import { motion } from 'motion/react';
import { Calendar, Trophy, Award, ChevronRight, Sparkles, TrendingUp, Settings as SettingsIcon, History, Flame } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ActivityHeatmap } from './ActivityHeatmap';
import type { UserProfile } from '../App';
import type { Purchase } from '../App';
import mascotImage from '../assets/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface DashboardProps {
  userProfile: UserProfile;
  purchases: Purchase[];
  onStartCoaching: (questionId: number) => void;
  onNavigateToRewards: () => void;
  onNavigateToSettings: () => void;
  onNavigateToPurchaseHistory: () => void;
}

const todayQuestion = {
  id: 1,
  question: '자기소개를 해주세요.',
  category: '기본',
  timeLeft: '23시간 45분',
};

const upcomingQuestions = [
  {
    id: 2,
    question: '우리 회사에 지원한 이유가 무엇인가요?',
    category: '지원동기',
    status: 'upcoming' as const,
  },
  {
    id: 3,
    question: '당신의 가장 큰 강점은 무엇인가요?',
    category: '역량',
    status: 'upcoming' as const,
  },
];

export function Dashboard({ 
  userProfile, 
  purchases,
  onStartCoaching, 
  onNavigateToRewards, 
  onNavigateToSettings,
  onNavigateToPurchaseHistory 
}: DashboardProps) {
  const progress = Math.min((userProfile.completedInterviews / 10) * 100, 100);
  const streak = calculateStreak(userProfile.activityData);
  const recentPurchases = purchases.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={mascotImage} alt="AI Coach" className="w-12 h-12 drop-shadow-lg" />
              <div>
                <h2 className="text-gray-900">{userProfile.name}님</h2>
                <p className="text-gray-500">{userProfile.job}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNavigateToPurchaseHistory}
                className="hover:bg-gray-100"
              >
                <History className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNavigateToSettings}
                className="hover:bg-gray-100"
              >
                <SettingsIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 hover:shadow-md"
                onClick={onNavigateToRewards}
              >
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-900">{userProfile.totalPoints}점</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Top Section - Today's Question (Hero) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl cursor-pointer hover:shadow-3xl transition-all hover:scale-[1.01]"
            onClick={() => onStartCoaching(todayQuestion.id)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm opacity-90">오늘의 면접 질문</span>
                </div>
                <h2 className="mb-3">{todayQuestion.question}</h2>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-0">
                    {todayQuestion.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span>{todayQuestion.timeLeft} 남음</span>
                  </div>
                </div>
              </div>
              <motion.img
                src={mascotImage}
                alt="AI Coach"
                className="w-24 h-24 drop-shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 h-12">
              지금 바로 답변하기
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Streak Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-md">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600">연속 학습</p>
                  <h3 className="text-gray-900">{streak}일</h3>
                </div>
              </div>
              <p className="text-gray-600">계속해서 성장하고 있어요! 🔥</p>
            </Card>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">주간 진행률</p>
                    <h3 className="text-gray-900">{userProfile.completedInterviews}/10</h3>
                  </div>
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-gray-600">{10 - userProfile.completedInterviews}개 남음</p>
            </Card>
          </motion.div>

          {/* Points Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={onNavigateToRewards}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-md">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600">내 포인트</p>
                  <h3 className="text-gray-900">{userProfile.totalPoints}점</h3>
                </div>
              </div>
              <p className="text-gray-600">
                {userProfile.totalPoints >= 100
                  ? '상품 구매 가능! 🎁'
                  : `${100 - userProfile.totalPoints}점 더 필요`}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Activity & Goal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Heatmap */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  나의 학습 활동
                </h3>
                <ActivityHeatmap data={userProfile.activityData} />
              </Card>
            </motion.div>

            {/* Goal Card */}
            {userProfile.goal && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                          <Award className="w-4 h-4 text-purple-600" />
                        </div>
                        <h3 className="text-gray-900">내 목표</h3>
                      </div>
                      <p className="text-gray-700">{userProfile.goal}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Upcoming Questions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h3 className="mb-4 text-gray-900">다가오는 질문</h3>
              <div className="space-y-3">
                {upcomingQuestions.map((question, index) => (
                  <Card
                    key={question.id}
                    className="p-5 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-[1.01] group"
                    onClick={() => onStartCoaching(question.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="border-gray-300 mb-2">
                          {question.category}
                        </Badge>
                        <p className="text-gray-900">{question.question}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recent Rewards */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">최근 리워드</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNavigateToPurchaseHistory}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    전체보기
                  </Button>
                </div>
                
                {recentPurchases.length > 0 ? (
                  <div className="space-y-3">
                    {recentPurchases.map((purchase, index) => (
                      <motion.div
                        key={purchase.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 text-sm">{purchase.rewardName}</p>
                            <p className="text-gray-600 text-xs">{purchase.cost}점 사용</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(purchase.purchaseDate).toLocaleDateString('ko-KR')}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="mb-1">아직 구매한 리워드가 없어요</p>
                    <Button
                      variant="link"
                      onClick={onNavigateToRewards}
                      className="text-blue-600 mt-2"
                    >
                      리워드 구매하기
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateStreak(activityData: { date: Date; count: number }[]): number {
  if (activityData.length === 0) return 0;

  const sortedData = [...activityData].sort((a, b) => b.date.getTime() - a.date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  for (const activity of sortedData) {
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0, 0);

    if (activityDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (activityDate.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
}