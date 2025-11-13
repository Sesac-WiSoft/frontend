import { motion } from "framer-motion";
import { ArrowLeft, Coffee, Gift, ShoppingBag, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { UserProfile } from '../App';
// import mascotImage from '../assets/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';
import { toast } from 'sonner';

interface RewardShopProps {
  userProfile: UserProfile;
  onBack: () => void;
  onPurchase: (rewardName: string, cost: number) => void;
}

const rewards = [
  {
    id: 1,
    name: '스타벅스 아메리카노',
    icon: Coffee,
    cost: 100,
    description: 'Tall 아메리카노',
    gradient: 'from-green-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
  },
  {
    id: 2,
    name: '던킨도너츠 쿠폰',
    icon: Gift,
    cost: 150,
    description: '음료 쿠폰',
    gradient: 'from-pink-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
  },
  {
    id: 3,
    name: 'GS25 편의점 상품권',
    icon: ShoppingBag,
    cost: 200,
    description: '5,000원 모바일 상품권',
    gradient: 'from-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    id: 4,
    name: '투썸플레이스 케이크',
    icon: Star,
    cost: 250,
    description: '케이크 쿠폰',
    gradient: 'from-red-500 to-red-600',
    bgColor: 'bg-gradient-to-br from-red-100 to-red-200',
  },
];

export function RewardShop({ userProfile, onBack, onPurchase }: RewardShopProps) {
  const handlePurchase = (reward: typeof rewards[0]) => {
    if (userProfile.totalPoints >= reward.cost) {
      onPurchase(reward.name, reward.cost);
    } else {
      toast.error('포인트가 부족합니다', {
        description: `${reward.cost - userProfile.totalPoints}점이 더 필요합니다.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-gray-900">리워드 샵</h2>
              <p className="text-gray-500">포인트로 상품을 구매하세요</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Points Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 mb-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.img
                  src={mascotImage}
                  alt="AI Coach"
                  className="w-16 h-16 drop-shadow-xl"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div>
                  <p className="opacity-90 mb-1">보유 포인트</p>
                  <h2>{userProfile.totalPoints}점</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="opacity-90 mb-1">완료한 면접</p>
                <h3>{userProfile.completedInterviews}회</h3>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Rewards Grid */}
        <div className="mb-6">
          <h3 className="mb-5 text-gray-900">교환 가능한 상품</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {rewards.map((reward, index) => {
              const canAfford = userProfile.totalPoints >= reward.cost;
              return (
                <motion.div
                  key={reward.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-6 transition-all border-0 shadow-lg bg-white/80 backdrop-blur-sm ${
                      canAfford
                        ? 'hover:shadow-2xl hover:scale-105 cursor-pointer'
                        : 'opacity-60'
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${reward.bgColor} flex items-center justify-center mb-4`}
                    >
                      <reward.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="mb-1 text-gray-900">{reward.name}</h3>
                    <p className="text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${
                          canAfford
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0'
                            : 'bg-gray-200 text-gray-600 border-0'
                        }`}
                      >
                        {reward.cost}점
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handlePurchase(reward)}
                        disabled={!canAfford}
                        className={
                          canAfford
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md'
                            : 'bg-gray-300 text-gray-500'
                        }
                      >
                        구매하기
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
            <h3 className="mb-3 text-gray-900">포인트 안내</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>면접 질문에 답변하고 AI 피드백을 받으면 점수를 획득합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>점수는 AI의 평가에 따라 0~100점이 부여됩니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>모은 점수로 다양한 상품을 구매할 수 있습니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>구매한 쿠폰은 등록된 이메일로 발송됩니다</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}