import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { JobSelection } from './components/JobSelection';
import { Dashboard } from './components/Dashboard';
import { InterviewCoaching } from './components/InterviewCoaching';
import { RewardShop } from './components/RewardShop';
import { PurchaseSuccess } from './components/PurchaseSuccess';
import { PurchaseHistory } from './components/PurchaseHistory';
import { Settings } from './components/Settings';

export type Page = 
  | 'landing' 
  | 'auth' 
  | 'onboarding' 
  | 'job-selection' 
  | 'dashboard' 
  | 'coaching' 
  | 'rewards' 
  | 'purchase-success'
  | 'purchase-history'
  | 'settings';

export interface UserProfile {
  email: string;
  name: string;
  job: string;
  goal: string;
  frequency: 'daily' | 'weekly';
  totalPoints: number;
  completedInterviews: number;
  activityData: { date: Date; count: number }[];
}

export interface Purchase {
  id: number;
  rewardName: string;
  cost: number;
  purchaseDate: Date;
  couponCode: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);

  const handleAuthComplete = (email: string, name: string) => {
    setCurrentPage('onboarding');
    setUserProfile({
      email,
      name,
      job: '',
      goal: '',
      frequency: 'daily',
      totalPoints: 0,
      completedInterviews: 0,
      activityData: [],
    });
  };

  const handleOnboardingComplete = (goal: string, frequency: 'daily' | 'weekly') => {
    if (userProfile) {
      setUserProfile({ ...userProfile, goal, frequency });
      setCurrentPage('job-selection');
    }
  };

  const handleJobSelect = (job: string) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, job });
      setCurrentPage('dashboard');
    }
  };

  const handleStartCoaching = (questionId: number) => {
    setCurrentQuestionId(questionId);
    setCurrentPage('coaching');
  };

  const handleCompleteCoaching = (score: number) => {
    if (userProfile) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const existingActivity = userProfile.activityData.find(
        (a) => a.date.toDateString() === today.toDateString()
      );

      let newActivityData;
      if (existingActivity) {
        newActivityData = userProfile.activityData.map((a) =>
          a.date.toDateString() === today.toDateString()
            ? { ...a, count: a.count + 1 }
            : a
        );
      } else {
        newActivityData = [...userProfile.activityData, { date: today, count: 1 }];
      }

      setUserProfile({
        ...userProfile,
        totalPoints: userProfile.totalPoints + score,
        completedInterviews: userProfile.completedInterviews + 1,
        activityData: newActivityData,
      });
    }
    setCurrentPage('dashboard');
  };

  const handlePurchase = (rewardName: string, cost: number) => {
    if (userProfile && userProfile.totalPoints >= cost) {
      const purchase: Purchase = {
        id: purchases.length + 1,
        rewardName,
        cost,
        purchaseDate: new Date(),
        couponCode: `COUP-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      };
      
      setPurchases([purchase, ...purchases]);
      setLastPurchase(purchase);
      setUserProfile({
        ...userProfile,
        totalPoints: userProfile.totalPoints - cost,
      });
      setCurrentPage('purchase-success');
    }
  };

  const handleUpdateSettings = (goal: string, frequency: 'daily' | 'weekly') => {
    if (userProfile) {
      setUserProfile({ ...userProfile, goal, frequency });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentPage('auth')} />
      )}
      {currentPage === 'auth' && (
        <Auth onAuthComplete={handleAuthComplete} />
      )}
      {currentPage === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentPage === 'job-selection' && (
        <JobSelection onSelectJob={handleJobSelect} />
      )}
      {currentPage === 'dashboard' && userProfile && (
        <Dashboard
          userProfile={userProfile}
          purchases={purchases}
          onStartCoaching={handleStartCoaching}
          onNavigateToRewards={() => setCurrentPage('rewards')}
          onNavigateToSettings={() => setCurrentPage('settings')}
          onNavigateToPurchaseHistory={() => setCurrentPage('purchase-history')}
        />
      )}
      {currentPage === 'coaching' && currentQuestionId !== null && userProfile && (
        <InterviewCoaching
          questionId={currentQuestionId}
          jobType={userProfile.job}
          onComplete={handleCompleteCoaching}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      {currentPage === 'rewards' && userProfile && (
        <RewardShop
          userProfile={userProfile}
          onBack={() => setCurrentPage('dashboard')}
          onPurchase={handlePurchase}
        />
      )}
      {currentPage === 'purchase-success' && userProfile && lastPurchase && (
        <PurchaseSuccess
          purchase={lastPurchase}
          onBackToDashboard={() => setCurrentPage('dashboard')}
          onViewHistory={() => setCurrentPage('purchase-history')}
        />
      )}
      {currentPage === 'purchase-history' && userProfile && (
        <PurchaseHistory
          purchases={purchases}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      {currentPage === 'settings' && userProfile && (
        <Settings
          userProfile={userProfile}
          onBack={() => setCurrentPage('dashboard')}
          onUpdateSettings={handleUpdateSettings}
        />
      )}
    </div>
  );
}