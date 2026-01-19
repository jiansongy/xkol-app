import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, Copy, RefreshCw, Users, Quote, Mail } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, Button, ProgressBar } from '../components/ui';
import { useStore } from '../store/useStore';

const SUGGESTED_REPLIES = [
  {
    id: '1',
    author: '@cobie',
    tweet: 'L2s are finally hitting their stride. TVL up 200% this quarter.',
    suggestions: [
      'Great observation! The data also shows that...',
      'Adding context: most of this growth is concentrated in...',
      'Interesting to note that despite TVL growth, active addresses...',
    ],
  },
  {
    id: '2',
    author: '@DefiIgnas',
    tweet: 'ETH staking yields are compressing. Here\'s why that\'s actually bullish.',
    suggestions: [
      'This aligns with the maturation thesis. Similar pattern in...',
      'The compression actually signals healthy market structure because...',
      'One risk not mentioned: the concentration in...',
    ],
  },
];

const QUOTE_OPPORTUNITIES = [
  {
    id: '1',
    topic: 'Solana Meme生态Thread',
    angle: '从数据角度补充：链上活跃度变化',
  },
  {
    id: '2',
    topic: 'ETH ETF资金流向分析',
    angle: '对比BTC ETF同期表现，提出独特见解',
  },
];

export function Engage() {
  const { missions, completeMission, progress } = useStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const completedCount = missions.filter((m) => m.completed || progress.completedMissions.includes(m.id)).length;
  const totalMissions = missions.length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleComplete = (id: string) => {
    completeMission(id);
  };

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'reply': return MessageCircle;
      case 'quote': return Quote;
      case 'dm': return Mail;
      default: return MessageCircle;
    }
  };

  return (
    <PageContainer
      title="💬 Engage Agent"
      subtitle="智能互动推荐，建立行业关系"
    >
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center">
              <Users size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">今日任务</h3>
              <p className="text-sm text-text-secondary">完成互动任务，提升行业信用</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text-primary">{completedCount}/{totalMissions}</div>
            <div className="text-xs text-text-tertiary">已完成</div>
          </div>
        </div>
        
        <ProgressBar
          value={completedCount}
          max={totalMissions}
          showValue={false}
          color="success"
        />

        <div className="mt-4 space-y-3">
          {missions.map((mission) => {
            const Icon = getMissionIcon(mission.type);
            const isCompleted = mission.completed || progress.completedMissions.includes(mission.id);
            
            return (
              <div
                key={mission.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isCompleted ? 'bg-success/5' : 'bg-bg-subtle'
                }`}
              >
                <button
                  onClick={() => handleComplete(mission.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-success border-success text-white'
                      : 'border-border hover:border-text-tertiary'
                  }`}
                >
                  {isCompleted && <Check size={14} />}
                </button>
                <Icon size={18} className="text-text-tertiary" />
                <div className="flex-1">
                  <div className={`text-sm ${isCompleted ? 'text-text-tertiary line-through' : 'text-text-primary'}`}>
                    {mission.type === 'reply' && `回复 ${mission.target} 的推文`}
                    {mission.type === 'quote' && `Quote: ${mission.target}`}
                    {mission.type === 'dm' && `私信 ${mission.target}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">推荐回复</h2>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <RefreshCw size={16} />
            刷新
          </Button>
        </div>

        <div className="space-y-4">
          {SUGGESTED_REPLIES.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary" />
                <span className="font-medium text-text-primary">{item.author}</span>
              </div>
              <p className="text-sm text-text-secondary mb-4 pb-4 border-b border-border">
                "{item.tweet}"
              </p>
              <div className="space-y-2">
                <div className="text-xs text-text-tertiary mb-2">AI建议回复</div>
                {item.suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 p-3 bg-bg-subtle rounded-lg group"
                  >
                    <span className="text-accent text-sm">→</span>
                    <p className="flex-1 text-sm text-text-primary">{suggestion}</p>
                    <button
                      onClick={() => handleCopy(suggestion, `${item.id}-${i}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-bg-elevated rounded"
                    >
                      {copiedId === `${item.id}-${i}` ? (
                        <Check size={14} className="text-success" />
                      ) : (
                        <Copy size={14} className="text-text-tertiary" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quote机会</h2>
        <div className="space-y-3">
          {QUOTE_OPPORTUNITIES.map((opp) => (
            <Card key={opp.id} hoverable className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">{opp.topic}</div>
                <div className="text-sm text-text-secondary mt-1">切入角度: {opp.angle}</div>
              </div>
              <Button variant="secondary" size="sm">
                去Quote
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-6 bg-accent-soft border-accent/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <h4 className="font-medium text-text-primary">互动策略</h4>
            <p className="mt-1 text-sm text-text-secondary">
              关注行业Top 50大佬，开启小铃铛。在他们发推后5分钟内，发表"补充性"或"提问式"评论。
              拒绝"支持"、"牛逼"等无效回复。
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
