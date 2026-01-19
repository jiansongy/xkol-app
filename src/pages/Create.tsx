import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Sparkles, Copy, Check, ChevronDown } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { Card, Button, Input, Textarea, ThinkingIndicator } from '../components/ui';
import type { ThreadTemplate } from '../data/mockData';
import { THREAD_TEMPLATES } from '../data/mockData';

export function Create() {
  const [selectedTemplate, setSelectedTemplate] = useState<ThreadTemplate>(THREAD_TEMPLATES[0]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    setFormData((prev) => ({ ...prev, [index]: value }));
    setEnhanced(false);
  };

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhanced(true);
    }, 1800);
  };

  const generatePreview = () => {
    return selectedTemplate.structure.map((item, i) => {
      const userInput = formData[i] || '';
      if (enhanced && userInput) {
        return `${item.split(':')[0]}: ${userInput} 🔥`;
      }
      return userInput ? `${item.split(':')[0]}: ${userInput}` : item;
    }).join('\n\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePreview());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageContainer
      title="✍️ Create Agent"
      subtitle="用模板快速生成高质量Thread"
    >
      <Card className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center">
            <PenTool size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Thread工作室</h3>
            <p className="text-sm text-text-secondary">选择模板，填写内容，AI帮你优化</p>
          </div>
        </div>

        <div className="relative mb-6">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="w-full flex items-center justify-between px-4 py-3 bg-bg-subtle rounded-lg border border-border hover:border-border-strong transition-colors"
          >
            <div className="text-left">
              <div className="text-sm text-text-tertiary">当前模板</div>
              <div className="font-medium text-text-primary">{selectedTemplate.nameZh}</div>
            </div>
            <ChevronDown size={20} className={`text-text-tertiary transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
          </button>

          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-bg-elevated rounded-lg border border-border shadow-elevated z-10"
            >
              {THREAD_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowTemplates(false);
                    setFormData({});
                    setEnhanced(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-bg-subtle transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedTemplate.id === template.id ? 'bg-accent-soft' : ''
                  }`}
                >
                  <div className="font-medium text-text-primary">{template.nameZh}</div>
                  <div className="text-sm text-text-secondary">{template.description}</div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">内容编辑</h4>
            {selectedTemplate.structure.map((item, index) => {
              const [label] = item.split(':');
              return (
                <div key={index}>
                  <label className="block text-sm text-text-secondary mb-1.5">{label}</label>
                  {index === 0 ? (
                    <Input
                      value={formData[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={item.split(':')[1]?.trim() || '输入内容...'}
                    />
                  ) : (
                    <Textarea
                      value={formData[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={item.split(':')[1]?.trim() || '输入内容...'}
                      rows={2}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">预览</h4>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? '已复制' : '复制'}
              </Button>
            </div>
            <div className="bg-bg-subtle rounded-lg p-4 min-h-[300px]">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-primary" />
                <div>
                  <div className="text-sm font-medium text-text-primary">@your_handle</div>
                  <div className="text-xs text-text-tertiary">刚刚</div>
                </div>
              </div>
              <div className="text-sm text-text-primary whitespace-pre-wrap">
                {generatePreview()}
              </div>
              {enhanced && (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-success/10 text-success rounded">
                    <Sparkles size={12} />
                    AI已优化
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {isEnhancing && (
        <Card>
          <ThinkingIndicator label="AI正在优化你的Thread..." />
        </Card>
      )}

      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={handleEnhance}
          disabled={Object.keys(formData).length === 0 || isEnhancing}
          loading={isEnhancing}
          className="flex-1 gap-2"
        >
          <Sparkles size={18} />
          AI优化
        </Button>
        <Button className="flex-1 gap-2">
          <Copy size={18} />
          复制全部
        </Button>
      </div>

      <Card className="mt-6 bg-bg-subtle">
        <h4 className="font-medium text-text-primary mb-3">Thread黄金结构</h4>
        <div className="grid grid-cols-5 gap-2 text-center">
          {['Hook', '背景', '核心', '风险', 'CTA'].map((item, i) => (
            <div key={i} className="p-2 bg-bg-elevated rounded-lg">
              <div className="text-xs text-text-tertiary mb-1">{i + 1}</div>
              <div className="text-sm font-medium text-text-primary">{item}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-text-secondary">
          50% Thread + 30% 单条观点 + 20% Quote评论 = 最佳内容配比
        </p>
      </Card>
    </PageContainer>
  );
}
