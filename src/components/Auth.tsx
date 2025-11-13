import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface AuthProps {
  onAuthComplete: (email: string, name: string) => void;
}

export function Auth({ onAuthComplete }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = mode === 'signup' ? name : email.split('@')[0];
    onAuthComplete(email, userName);
  };

  const isValid = mode === 'login' 
    ? email && password 
    : email && password && name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.img
            src={mascotImage}
            alt="AI Coach"
            className="w-20 h-20 mx-auto mb-4"
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <h1 className="text-gray-900 mb-2">AI 면접 코치</h1>
          <p className="text-gray-600">면접 준비의 새로운 기준</p>
        </div>

        {/* Auth Card */}
        <Card className="p-8 backdrop-blur-sm bg-white/80 shadow-xl border-0">
          <div className="flex gap-2 mb-6">
            <Button
              variant={mode === 'login' ? 'default' : 'ghost'}
              className={`flex-1 ${
                mode === 'login'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setMode('login')}
            >
              로그인
            </Button>
            <Button
              variant={mode === 'signup' ? 'default' : 'ghost'}
              className={`flex-1 ${
                mode === 'signup'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setMode('signup')}
            >
              회원가입
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-gray-700 mb-2">이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white mt-6 group"
            >
              <span>{mode === 'login' ? '로그인' : '시작하기'}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {mode === 'login' && (
            <div className="mt-6 text-center">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          )}
        </Card>

        <p className="text-center text-gray-500 mt-6">
          {mode === 'login' ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-blue-600 hover:underline"
          >
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
