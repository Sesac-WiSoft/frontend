import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Copy, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Purchase } from '../App';
import { toast } from 'sonner';

interface PurchaseHistoryProps {
  purchases: Purchase[];
  onBack: () => void;
}

export function PurchaseHistory({ purchases, onBack }: PurchaseHistoryProps) {
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('쿠폰 코드가 복사되었습니다!');
  };

  const totalSpent = purchases.reduce((sum, p) => sum + p.cost, 0);

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
              <h2 className="text-gray-900">구매 내역</h2>
              <p className="text-gray-500">지금까지의 구매 기록</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 mb-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="opacity-90 mb-2">총 구매 횟수</p>
                <h2 className="mb-1">{purchases.length}회</h2>
              </div>
              <div className="text-right">
                <p className="opacity-90 mb-2">총 사용 포인트</p>
                <h2 className="mb-1">{totalSpent}점</h2>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Purchase List */}
        <div>
          {purchases.length === 0 ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">구매 내역이 없습니다</h3>
                <p className="text-gray-600">
                  포인트를 모아 리워드 샵에서 상품을 구매해보세요!
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase, index) => (
                <motion.div
                  key={purchase.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">{purchase.rewardName}</h3>
                          <Badge className="bg-blue-100 text-blue-700">
                            {purchase.cost}점
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(purchase.purchaseDate).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-gray-600 mb-2">쿠폰 코드</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">
                          {purchase.couponCode}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyCoupon(purchase.couponCode)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          복사
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
