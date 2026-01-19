import { motion } from 'framer-motion';
import { Target, BarChart3, Users, Zap } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, ProgressBar } from '../components/ui';
import { useStore } from '../store/useStore';
import { METHODOLOGY_STAGES } from '../data/mockData';

export function Grow() {
  const { metrics, progress } = useStore();
  const currentStage = METHODOLOGY_STAGES[progress.currentStage - 1];

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: 'Industry Voice', labelZh: '行业声音', color: 'text-success' };
    if (score >= 60) return { label: 'Emerging Voice', labelZh: '新兴声音', color: 'text-accent' };
    if (score >= 40) return { label: 'Growing', labelZh: '成长中', color: 'text-warning' };
    return { label: 'Starting', labelZh: '起步期', color: 'text-text-secondary' };
  };

  const scoreLevel = getScoreLevel(metrics.industryScore);

  const contentMix = {
    threads: 45,
    posts: 35,
    quotes: 20,
    target: { threads: 50, posts: 30, quotes: 20 },
  };

  return (
    <PageContainer
      title="📊 Grow Agent"
      subtitle="追踪成长指标，提升行业信用"
    >
      <Card className="mb-6">
        <div className="text-center py-6">
          <div className="text-sm text-text-tertiary mb-2">行业信用指数</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-bg-subtle mb-4"
          >
            <div>
              <div className="text-4xl font-bold text-text-primary">{metrics.industryScore}</div>
              <div className="text-sm text-text-tertiary">/100</div>
            </div>
          </motion.div>
          <div className={`text-lg font-medium ${scoreLevel.color}`}>
            {scoreLevel.labelZh}
          </div>
          <p className="text-sm text-text-secondary mt-1">
            {scoreLevel.label}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{metrics.posts}</div>
            <div className="text-xs text-text-tertiary">本周发帖</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{metrics.threads}</div>
            <div className="text-xs text-text-tertiary">深度Thread</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{metrics.impressions.toLocaleString()}</div>
            <div className="text-xs text-text-tertiary">曝光量</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{metrics.engagementRate}%</div>
            <div className="text-xs text-text-tertiary">互动率</div>
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 size={20} className="text-accent" />
          <h3 className="font-semibold text-text-primary">内容配比</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Threads</span>
              <span className="text-text-primary">{contentMix.threads}% / 目标{contentMix.target.threads}%</span>
            </div>
            <ProgressBar
              value={contentMix.threads}
              showValue={false}
              color={contentMix.threads >= contentMix.target.threads ? 'success' : 'primary'}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">单条观点</span>
              <span className="text-text-primary">{contentMix.posts}% / 目标{contentMix.target.posts}%</span>
            </div>
            <ProgressBar
              value={contentMix.posts}
              showValue={false}
              color={contentMix.posts <= contentMix.target.posts + 10 ? 'success' : 'warning'}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Quote评论</span>
              <span className="text-text-primary">{contentMix.quotes}% / 目标{contentMix.target.quotes}%</span>
            </div>
            <ProgressBar
              value={contentMix.quotes}
              showValue={false}
              color="success"
            />
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Target size={20} className="text-accent" />
          <h3 className="font-semibold text-text-primary">阶段进度</h3>
        </div>

        <div className="flex items-center justify-between mb-6">
          {METHODOLOGY_STAGES.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 < progress.currentStage
                    ? 'bg-success text-white'
                    : index + 1 === progress.currentStage
                    ? 'bg-accent text-white'
                    : 'bg-bg-subtle text-text-tertiary'
                }`}
              >
                {index + 1}
              </div>
              {index < METHODOLOGY_STAGES.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-0.5 ${
                    index + 1 < progress.currentStage ? 'bg-success' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-bg-subtle rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-accent" />
            <span className="font-medium text-text-primary">当前阶段: {currentStage?.nameZh}</span>
          </div>
          <p className="text-sm text-text-secondary mb-3">{currentStage?.description}</p>
          <div className="text-sm text-text-tertiary">
            第 {metrics.weekNumber} 周 / {currentStage?.duration}
          </div>
        </div>
      </Card>

      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Users size={20} className="text-accent" />
          <h3 className="font-semibold text-text-primary">信用构成</h3>
        </div>

        <div className="space-y-3">
          {[
            { label: '内容质量', value: 85, weight: '30%' },
            { label: '互动率', value: 72, weight: '25%' },
            { label: '关系网络', value: 65, weight: '25%' },
            { label: '持续性', value: 68, weight: '20%' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">{item.label}</span>
                <span className="text-text-tertiary">权重 {item.weight}</span>
              </div>
              <ProgressBar
                value={item.value}
                showValue
                size="sm"
                color={item.value >= 80 ? 'success' : item.value >= 60 ? 'primary' : 'warning'}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-accent-soft border-accent/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <h4 className="font-medium text-text-primary">成功指标不是粉丝数</h4>
            <p className="mt-1 text-sm text-text-secondary">
              真正的KOL指标是：被谁转发、高质量互动次数、行业核心账号覆盖率。
              粉丝数只是结果，不是目标。
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
