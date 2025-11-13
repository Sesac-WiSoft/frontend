import { motion } from "framer-motion";
import { CheckCircle, Mail, Copy, ArrowRight, List } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Purchase } from '../App';
import { toast } from 'sonner';
// import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface PurchaseSuccessProps {
  purchase: Purchase;
  onBackToDashboard: () => void;
  onViewHistory: () => void;
}

export function PurchaseSuccess({
  purchase,
  onBackToDashboard,
  onViewHistory,
}: PurchaseSuccessProps) {
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(purchase.couponCode);
    toast.success('쿠폰 코드가 복사되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="p-10 text-center bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
          </motion.div>

          <motion.img
            src={mascotImage}
            alt="Success"
            className="w-20 h-20 mx-auto mb-4"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: 3,
            }}
          />

          <h2 className="text-gray-900 mb-3">구매가 완료되었습니다!</h2>
          <p className="text-gray-600 mb-8">
            쿠폰이 이메일로 발송되었습니다
          </p>

          {/* Purchase Details */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-1">구매 상품</p>
                <p className="text-gray-900">{purchase.rewardName}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">사용 포인트</p>
                <p className="text-gray-900">{purchase.cost}점</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">구매 일시</p>
                <p className="text-gray-900">
                  {new Date(purchase.purchaseDate).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-blue-300 mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Mail className="w-4 h-4" />
              <span>쿠폰 코드</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-gray-900 bg-gray-100 px-4 py-3 rounded-lg">
                {purchase.couponCode}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCoupon}
                className="h-11 w-11 hover:bg-blue-50 hover:border-blue-300"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onBackToDashboard}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 group"
            >
              대시보드로 돌아가기
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={onViewHistory}
              className="w-full h-12 hover:bg-gray-50"
            >
              <List className="w-5 h-5 mr-2" />
              구매 내역 보기
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
