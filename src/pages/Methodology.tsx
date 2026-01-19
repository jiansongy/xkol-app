import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Lightbulb, Target } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, Button } from '../components/ui';
import { METHODOLOGY_STAGES } from '../data/mockData';

const CORE_PRINCIPLES = [
  {
    title: 'KOL的本质是行业信用',
    content: '加密行业的X ≠ 抖音/小红书。流量不是关键，转发关系 ≈ 行业社交图谱。KOL的本质 = 你是否被某一小圈子视为"自己人"。',
  },
  {
    title: '做学习记录者，不装专家',
    content: '学生不应该伪装成专家，而应该系统性地做"高质量学习记录者"。用"Today I learned..."开头，分享理解过程。',
  },
  {
    title: '持续输出是核心壁垒',
    content: '成为KOL的最大障碍不是"不想做"，而是"做不到持续输出"。X算法要求每天多条高质量内容，大多数人坚持不到3个月。',
  },
  {
    title: '信息桥梁策略',
    content: '将晦涩的英文技术文档/海外一手信息，转化为中文社区易读的"投资逻辑"或"行业洞察"。做"最勤奋的行业翻译官"。',
  },
];

const CONTENT_FORMULA = {
  title: '3-2-1 内容战术',
  items: [
    { percent: '30%', label: '每日热点速递', desc: '每天早晨抓取海外热点，200字中文总结 + 1句锐评' },
    { percent: '20%', label: '深度Thread', desc: '每周2篇，拆解项目白皮书或新赛道分析' },
    { percent: '10%', label: '高质量互动', desc: '每天10条，在大V推文下发表补充性或提问式评论' },
  ],
};

const WARNINGS = [
  '追热点不积累认知',
  '中文为主、英文为辅',
  '做数据党（价格预测）',
  '3周以上断更',
  '装专家、编造内幕、抄袭thread',
];

export function Methodology() {
  return (
    <PageContainer>
      <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft size={18} />
        返回首页
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">XKOL方法论</h1>
        <p className="mt-2 text-lg text-text-secondary">
          从零到一成为Crypto Twitter有影响力的声音
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Lightbulb size={24} className="text-accent" />
          核心原则
        </h2>
        <div className="space-y-4">
          {CORE_PRINCIPLES.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <h3 className="font-semibold text-text-primary mb-2">{principle.title}</h3>
                <p className="text-text-secondary">{principle.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Target size={24} className="text-accent" />
          四阶段增长路径
        </h2>
        <div className="space-y-6">
          {METHODOLOGY_STAGES.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <div className="pl-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                      {stage.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{stage.nameZh}</h3>
                      <p className="text-sm text-text-tertiary">{stage.duration}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-4">{stage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.goals.map((goal, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-bg-subtle rounded-full text-sm text-text-secondary"
                      >
                        <CheckCircle size={14} className="text-success" />
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Card className="bg-accent-soft border-accent/20">
          <h2 className="text-xl font-bold text-text-primary mb-4">{CONTENT_FORMULA.title}</h2>
          <div className="space-y-4">
            {CONTENT_FORMULA.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-bg-elevated flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">{item.percent}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{item.label}</h4>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <AlertCircle size={24} className="text-error" />
          失败预警
        </h2>
        <Card className="bg-error/5 border-error/20">
          <p className="text-text-secondary mb-4">避免以下常见错误，它们会严重阻碍你的成长：</p>
          <ul className="space-y-2">
            {WARNINGS.map((warning, index) => (
              <li key={index} className="flex items-center gap-2 text-text-primary">
                <span className="text-error">✕</span>
                {warning}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="text-center py-12">
        <h2 className="text-2xl font-bold text-text-primary mb-4">准备好开始了吗？</h2>
        <p className="text-text-secondary mb-8">
          使用XKOL的AI Agent工具，让方法论落地执行
        </p>
        <Link to="/discover">
          <Button size="lg">开始你的KOL之旅</Button>
        </Link>
      </section>
    </PageContainer>
  );
}
