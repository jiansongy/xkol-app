import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, Button, Textarea, ThinkingIndicator } from '../components/ui';
import { useTypewriter } from '../hooks/useTypewriter';

const SAMPLE_INPUTS = [
  {
    label: 'ETH ETF资金流向分析',
    content: `Yesterday, Ethereum ETFs saw significant inflows of $150M, marking the third consecutive day of positive flows. BlackRock's ETHA led with $80M, followed by Fidelity's FETH with $45M. This trend suggests growing institutional interest in ETH as a diversified crypto asset beyond Bitcoin.`,
  },
  {
    label: 'Solana生态发展',
    content: `Solana's DeFi TVL has grown 300% in Q1, driven by Jito's liquid staking and Jupiter's DEX aggregation. The network processed over 50M daily transactions, surpassing Ethereum L1. Key catalysts: Firedancer client launch and mobile-first strategy with Saga phone.`,
  },
];

const GENERATED_OUTLINE = `🧵 Thread大纲：ETH ETF资金流向深度解读

**Hook**: ETH ETF连续3天资金流入，机构正在悄悄布局...

**1/ 数据概览**
- 昨日流入$150M
- BlackRock ETHA领跑：$80M
- Fidelity FETH跟进：$45M

**2/ 背后含义**
- 机构从BTC向ETH分散配置
- ETH作为"科技股"的叙事正在形成
- 合规通道打开后的自然流动

**3/ 对比分析**
- vs BTC ETF同期表现
- ETH/BTC ratio变化

**4/ 我的判断**
- 短期：资金流入趋势可能延续
- 中期：关注$4000心理关口
- 风险：宏观环境变化

**CTA**: 你怎么看机构对ETH的态度转变？👇`;

export function Learn() {
  const [input, setInput] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayedText, isComplete } = useTypewriter(
    showOutput ? GENERATED_OUTLINE : '',
    { speed: 15 }
  );

  const handleTransform = () => {
    if (!input.trim()) return;
    setIsTransforming(true);
    setShowOutput(false);
    
    setTimeout(() => {
      setIsTransforming(false);
      setShowOutput(true);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(GENERATED_OUTLINE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSampleClick = (content: string) => {
    setInput(content);
    setShowOutput(false);
  };

  return (
    <PageContainer
      title="📚 Learn Agent"
      subtitle="将学习内容转化为Thread大纲"
    >
      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center">
            <BookOpen size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">内容转化器</h3>
            <p className="text-sm text-text-secondary">粘贴文章、Thread或笔记，AI帮你提炼结构</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-text-tertiary mb-2">示例素材</div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_INPUTS.map((sample, i) => (
              <button
                key={i}
                onClick={() => handleSampleClick(sample.content)}
                className="px-3 py-1.5 text-sm bg-bg-subtle hover:bg-border/50 rounded-lg transition-colors text-text-secondary"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴你今天学到的内容...（英文文章、研究报告、其他KOL的Thread等）"
          rows={6}
        />

        <Button
          onClick={handleTransform}
          disabled={!input.trim() || isTransforming}
          loading={isTransforming}
          className="w-full mt-4 gap-2"
        >
          <Sparkles size={18} />
          AI转化为Thread大纲
        </Button>
      </Card>

      <AnimatePresence>
        {isTransforming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <ThinkingIndicator label="AI正在分析内容结构..." />
            </Card>
          </motion.div>
        )}

        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-accent" />
                  <h3 className="font-semibold text-text-primary">生成的Thread大纲</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? '已复制' : '复制'}
                </Button>
              </div>

              <div className="bg-bg-subtle rounded-lg p-4 font-mono text-sm whitespace-pre-wrap text-text-primary">
                {displayedText}
                {!isComplete && <span className="cursor-blink">|</span>}
              </div>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <Button className="w-full gap-2">
                    发送到创作Agent
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="mt-6 bg-accent-soft border-accent/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-medium text-text-primary">学习记录者心法</h4>
            <p className="mt-1 text-sm text-text-secondary">
              不要装专家，做"高质量学习记录者"。用"Today I learned..."开头，
              分享你的理解过程，而不是假装什么都懂。
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
