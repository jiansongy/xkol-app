import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui';
import { METHODOLOGY_STAGES } from '../data/mockData';

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-subtle to-background" />
        
        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-soft rounded-full mb-6">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered KOL Growth</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
              成为Crypto Twitter
              <br />
              <span className="gradient-text">有影响力的声音</span>
            </h1>
            
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              XKOL是一套完整的方法论和AI工具，帮助你从零开始建立行业信用，
              成为加密领域被认可的KOL。
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/discover">
                <Button size="lg" className="gap-2">
                  开始探索
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/methodology">
                <Button variant="secondary" size="lg">
                  了解方法论
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-text-primary">核心方法论</h2>
            <p className="mt-2 text-text-secondary">四阶段系统性增长路径</p>
          </motion.div>
          
          <div className="grid gap-6">
            {METHODOLOGY_STAGES.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-bg-elevated rounded-2xl border border-border"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-subtle flex items-center justify-center">
                  <span className="text-lg font-bold text-text-primary">{stage.id}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold text-text-primary">{stage.nameZh}</h3>
                    <span className="text-sm text-text-tertiary">{stage.duration}</span>
                  </div>
                  <p className="mt-1 text-text-secondary">{stage.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stage.goals.slice(0, 2).map((goal, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-bg-subtle rounded-full text-text-secondary">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-bg-subtle">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-text-primary">5个AI Agent，助你高效成长</h2>
            <p className="mt-2 text-text-secondary">模拟Claude Code的Agentic能力</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Target, name: 'Discover', nameZh: '发现Agent', desc: '追踪Crypto热点，找到你的赛道' },
              { icon: Sparkles, name: 'Learn', nameZh: '学习Agent', desc: '将学习内容转化为Thread大纲' },
              { icon: TrendingUp, name: 'Create', nameZh: '创作Agent', desc: '生成高质量Thread，风格一致' },
              { icon: Users, name: 'Engage', nameZh: '互动Agent', desc: '智能推荐互动对象和话术' },
            ].map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-bg-elevated rounded-xl border border-border hover:shadow-card transition-shadow"
              >
                <agent.icon size={24} className="text-accent mb-3" />
                <h3 className="font-semibold text-text-primary">{agent.nameZh}</h3>
                <p className="mt-1 text-sm text-text-secondary">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary">准备好开始了吗？</h2>
          <p className="mt-4 text-text-secondary">
            从发现你的赛道开始，用AI工具10倍提升你的内容产出效率
          </p>
          <Link to="/discover" className="inline-block mt-8">
            <Button size="lg" className="gap-2">
              立即开始
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center text-sm text-text-tertiary">
          <p>XKOL - Crypto Twitter KOL Growth Operating System</p>
          <p className="mt-1">Built with AI-powered methodology</p>
        </div>
      </footer>
    </div>
  );
}
