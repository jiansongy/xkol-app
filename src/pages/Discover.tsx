import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, Plus, Check, ChevronDown, ChevronUp, Flame } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, Button, ProgressBar, ThinkingIndicator } from '../components/ui';
import type { TrendingTopic } from '../data/mockData';
import { TRENDING_TOPICS } from '../data/mockData';
import { useStore } from '../store/useStore';
import { useStagedReveal } from '../hooks/useTypewriter';

export function Discover() {
  const [isScanning, setIsScanning] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { progress, addTrack, removeTrack } = useStore();
  
  const visibleTopics = useStagedReveal(TRENDING_TOPICS, 400);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const isTrackSelected = (id: string) => progress.selectedTracks.includes(id);

  const toggleTrack = (id: string) => {
    if (isTrackSelected(id)) {
      removeTrack(id);
    } else {
      addTrack(id);
    }
  };

  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      default: return 'text-text-tertiary';
    }
  };

  return (
    <PageContainer
      title="🔍 Discover Agent"
      subtitle="追踪Crypto热点，找到你的内容赛道"
    >
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center ${isScanning ? 'radar-scan' : ''}`}>
              <Radar size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">话题雷达</h3>
              <p className="text-sm text-text-secondary">
                {isScanning ? '正在扫描Crypto Twitter...' : '已更新至最新'}
              </p>
            </div>
          </div>
          {!isScanning && (
            <span className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
              实时
            </span>
          )}
        </div>
        
        {isScanning && (
          <div className="mt-4">
            <ProgressBar value={75} label="扫描进度" showValue={false} color="accent" />
          </div>
        )}
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">热门话题</h2>
          <span className="text-sm text-text-tertiary">
            已选 {progress.selectedTracks.length} 个赛道
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isScanning && visibleTopics.length === 0 && (
          <ThinkingIndicator label="AI正在分析热点话题..." />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {visibleTopics.map((topic: TrendingTopic, index: number) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hoverable
              className={isTrackSelected(topic.id) ? 'ring-2 ring-accent' : ''}
            >
              <div
                className="cursor-pointer"
                onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame size={16} className="text-warning" />
                      <span className="text-xs font-medium px-2 py-0.5 bg-bg-subtle rounded text-text-secondary">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-text-primary">{topic.titleZh}</h3>
                    <p className="text-sm text-text-tertiary mt-0.5">{topic.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedId === topic.id ? (
                      <ChevronUp size={20} className="text-text-tertiary" />
                    ) : (
                      <ChevronDown size={20} className="text-text-tertiary" />
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">热度指数</div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <ProgressBar
                          value={topic.heatScore}
                          max={10}
                          showValue={false}
                          size="sm"
                          color={topic.heatScore > 8 ? 'warning' : 'primary'}
                        />
                      </div>
                      <span className="text-sm font-medium">{topic.heatScore}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">适合度</div>
                    <span className={`text-sm font-medium ${getFitColor(topic.fitScore)}`}>
                      {topic.fitScore === 'High' ? '高' : topic.fitScore === 'Medium' ? '中' : '低'}
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === topic.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-text-primary mb-2">建议切入角度</h4>
                        <ul className="space-y-2">
                          {topic.suggestedAngles.map((angle, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                              <span className="text-accent">→</span>
                              {angle}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button
                        variant={isTrackSelected(topic.id) ? 'secondary' : 'primary'}
                        size="sm"
                        className="w-full gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTrack(topic.id);
                        }}
                      >
                        {isTrackSelected(topic.id) ? (
                          <>
                            <Check size={16} />
                            已添加到我的赛道
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            添加到我的赛道
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}
