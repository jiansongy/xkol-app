export interface TrendingTopic {
  id: string;
  title: string;
  titleZh: string;
  heatScore: number;
  fitScore: 'High' | 'Medium' | 'Low';
  category: 'DeFi' | 'NFT' | 'L1/L2' | 'Meme' | 'AI' | 'RWA';
  sampleTweets: string[];
  suggestedAngles: string[];
}

export interface ThreadTemplate {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  structure: string[];
}

export interface EngagementMission {
  id: string;
  type: 'reply' | 'quote' | 'dm';
  target: string;
  suggestion: string;
  completed: boolean;
}

export interface GrowthMetrics {
  posts: number;
  threads: number;
  impressions: number;
  engagementRate: number;
  industryScore: number;
  stage: number;
  weekNumber: number;
}

export const TRENDING_TOPICS: TrendingTopic[] = [
  {
    id: '1',
    title: 'Solana Memecoins Season',
    titleZh: 'Solana Meme币热潮',
    heatScore: 9.2,
    fitScore: 'High',
    category: 'Meme',
    sampleTweets: [
      'The Solana memecoin meta is evolving...',
      'Why $BONK flipped $SHIB in daily volume',
    ],
    suggestedAngles: [
      '对比分析：Solana vs ETH meme生态',
      '新手指南：如何安全参与meme币',
      '数据解读：链上活跃度变化',
    ],
  },
  {
    id: '2',
    title: 'ETH ETF Flow Analysis',
    titleZh: 'ETH ETF资金流向分析',
    heatScore: 8.5,
    fitScore: 'Medium',
    category: 'DeFi',
    sampleTweets: [
      'ETH ETF saw $XXM inflows yesterday...',
      'Institutional adoption is accelerating',
    ],
    suggestedAngles: [
      '每周ETF资金流向追踪',
      '机构入场对价格的影响分析',
      'BTC vs ETH ETF对比',
    ],
  },
  {
    id: '3',
    title: 'AI x Crypto Integration',
    titleZh: 'AI与Crypto融合趋势',
    heatScore: 8.8,
    fitScore: 'High',
    category: 'AI',
    sampleTweets: [
      'AI agents are coming to DeFi...',
      'The intersection of AI and blockchain',
    ],
    suggestedAngles: [
      'AI Agent在DeFi中的应用场景',
      '去中心化AI计算的机遇',
      'AI+Crypto项目全景图',
    ],
  },
  {
    id: '4',
    title: 'RWA Tokenization Wave',
    titleZh: 'RWA代币化浪潮',
    heatScore: 7.8,
    fitScore: 'Medium',
    category: 'RWA',
    sampleTweets: [
      'BlackRock tokenized fund hits $XXB...',
      'Traditional finance meets DeFi',
    ],
    suggestedAngles: [
      'RWA赛道项目深度解读',
      '传统金融机构入场动态',
      'RWA的监管合规挑战',
    ],
  },
  {
    id: '5',
    title: 'L2 Wars: Base vs Arbitrum',
    titleZh: 'L2大战：Base vs Arbitrum',
    heatScore: 7.5,
    fitScore: 'High',
    category: 'L1/L2',
    sampleTweets: [
      'Base TVL surpasses $XXB...',
      'The L2 landscape is shifting',
    ],
    suggestedAngles: [
      'L2技术方案对比分析',
      '生态发展数据追踪',
      '开发者体验测评',
    ],
  },
];

export const THREAD_TEMPLATES: ThreadTemplate[] = [
  {
    id: 'insight',
    name: 'Insight Thread',
    nameZh: '洞察型Thread',
    description: 'Share a unique insight or contrarian take',
    structure: [
      '🔥 Hook: Most people think X, but...',
      '1/ Background: Quick context',
      '2/ The insight: Your unique take',
      '3/ Evidence: Data or examples',
      '4/ Implications: Why this matters',
      '5/ CTA: Question for audience',
    ],
  },
  {
    id: 'breakdown',
    name: 'Project Breakdown',
    nameZh: '项目拆解Thread',
    description: 'Deep dive into a crypto project',
    structure: [
      '🧵 Hook: Just spent X hours researching [Project]...',
      '1/ What it is: One-sentence explanation',
      '2/ Problem solved: Pain point addressed',
      '3/ How it works: Core mechanism (use diagram)',
      '4/ Token economics: Key metrics',
      '5/ Risks: What could go wrong',
      '6/ My take: Bullish or bearish, and why',
    ],
  },
  {
    id: 'learning',
    name: 'Learning Journey',
    nameZh: '学习记录Thread',
    description: 'Document your learning process',
    structure: [
      '📚 Hook: Today I finally understood...',
      '1/ The confusion: What puzzled me',
      '2/ The aha moment: What clicked',
      '3/ Key concept 1: Explained simply',
      '4/ Key concept 2: With analogy',
      '5/ Resources: Where I learned this',
      '6/ Next: What I\'m learning next',
    ],
  },
  {
    id: 'comparison',
    name: 'A vs B Comparison',
    nameZh: '对比分析Thread',
    description: 'Compare two projects or concepts',
    structure: [
      '⚔️ Hook: [A] vs [B] - which is better?',
      '1/ Overview: Quick intro to both',
      '2/ Similarity: What they share',
      '3/ Difference 1: Technical approach',
      '4/ Difference 2: Token economics',
      '5/ Difference 3: Ecosystem & adoption',
      '6/ Verdict: My preference and why',
    ],
  },
  {
    id: 'tutorial',
    name: 'Step-by-Step Tutorial',
    nameZh: '教程型Thread',
    description: 'Guide users through a process',
    structure: [
      '🎯 Hook: How to [achieve X] in 5 minutes',
      '1/ Prerequisites: What you need',
      '2/ Step 1: First action (with screenshot)',
      '3/ Step 2: Second action',
      '4/ Step 3: Third action',
      '5/ Pro tips: Common mistakes to avoid',
      '6/ Result: What success looks like',
    ],
  },
];

export const ENGAGEMENT_MISSIONS: EngagementMission[] = [
  {
    id: '1',
    type: 'reply',
    target: '@cobie',
    suggestion: 'Great point about L2 scalability. The data shows that...',
    completed: false,
  },
  {
    id: '2',
    type: 'reply',
    target: '@DefiIgnas',
    suggestion: 'Adding to this - the risk most people miss is...',
    completed: false,
  },
  {
    id: '3',
    type: 'quote',
    target: 'Thread about ETH ETF',
    suggestion: 'Add your unique data perspective...',
    completed: false,
  },
  {
    id: '4',
    type: 'dm',
    target: 'New connection in your niche',
    suggestion: 'Introduce yourself and mention a shared interest...',
    completed: false,
  },
];

export const INITIAL_METRICS: GrowthMetrics = {
  posts: 12,
  threads: 3,
  impressions: 847,
  engagementRate: 2.1,
  industryScore: 72,
  stage: 3,
  weekNumber: 8,
};

export const METHODOLOGY_STAGES = [
  {
    id: 1,
    name: 'Track Anchoring',
    nameZh: '赛道锚定',
    duration: '0-2 weeks',
    description: 'Choose your niche and build your information sources',
    goals: ['Follow 50-100 key accounts', 'Define 3 topic tracks', 'Build RSS feeds'],
    primaryAgent: 'discover',
  },
  {
    id: 2,
    name: 'Content Positioning',
    nameZh: '内容定位',
    duration: '2-4 weeks',
    description: 'Define your voice and publish first threads',
    goals: ['Write your positioning statement', 'Publish 10 threads', 'Find your content style'],
    primaryAgent: 'create',
  },
  {
    id: 3,
    name: 'Systematic Output',
    nameZh: '系统输出',
    duration: '1-6 months',
    description: 'Build consistent content production habits',
    goals: ['50% Threads + 30% Posts + 20% Quotes', 'Weekly deep content', 'Content calendar'],
    primaryAgent: 'create',
  },
  {
    id: 4,
    name: 'Relationship Amplification',
    nameZh: '关系放大',
    duration: '3-12 months',
    description: 'Build industry connections and influence',
    goals: ['Connect with 20 KOLs', 'Get quoted by industry leaders', 'Industry credit score'],
    primaryAgent: 'engage',
  },
];
