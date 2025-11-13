import { motion } from 'motion/react';
import { Briefcase, Code, Palette, TrendingUp, Users, Wrench } from 'lucide-react';
import { Card } from './ui/card';
import mascotImage from 'figma:asset/b01fa81ce7a959934e8f78fc6344081972afd0ae.png';

interface JobSelectionProps {
  onSelectJob: (job: string) => void;
}

const jobCategories = [
  {
    id: 'developer',
    name: '개발자',
    icon: Code,
    gradient: 'from-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    id: 'designer',
    name: '디자이너',
    icon: Palette,
    gradient: 'from-purple-500 to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
  {
    id: 'marketer',
    name: '마케터',
    icon: TrendingUp,
    gradient: 'from-green-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
  },
  {
    id: 'hr',
    name: '인사/HR',
    icon: Users,
    gradient: 'from-orange-500 to-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200',
  },
  {
    id: 'business',
    name: '기획/경영',
    icon: Briefcase,
    gradient: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
  },
  {
    id: 'engineer',
    name: '엔지니어',
    icon: Wrench,
    gradient: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
  },
];

export function JobSelection({ onSelectJob }: JobSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={mascotImage}
            alt="AI Coach"
            className="w-28 h-28 mx-auto mb-6 drop-shadow-xl"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <h1 className="mb-4 text-gray-900">어떤 직업군을 준비하고 계신가요?</h1>
          <p className="text-gray-600">
            선택하신 직업군에 맞는 맞춤형 면접 질문을 제공해드립니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {jobCategories.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className="p-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-0 shadow-lg bg-white/80 backdrop-blur-sm group"
                onClick={() => onSelectJob(job.name)}
              >
                <div className={`w-14 h-14 rounded-2xl ${job.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <job.icon className={`w-7 h-7 bg-gradient-to-br ${job.gradient} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-gray-900">{job.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}