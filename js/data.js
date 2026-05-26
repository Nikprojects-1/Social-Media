/* SocialPulse - Extensive Demo Data */
const SocialPulseData = (function () {
  const platforms = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'TikTok', 'Pinterest'];
  const platformIcons = { Instagram: '📸', Facebook: '📘', Twitter: '🐦', LinkedIn: '💼', YouTube: '▶️', TikTok: '🎵', Pinterest: '📌' };
  const contentTypes = ['Image', 'Video', 'Carousel', 'Story', 'Reel', 'Article', 'Poll'];
  const statuses = ['Published', 'Scheduled', 'Draft', 'Failed', 'Pending'];
  const campaignStatuses = ['Active', 'Paused', 'Completed', 'Draft', 'Scheduled'];
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Blake', 'Drew', 'Skyler', 'Reese', 'Jamie', 'Parker', 'Hayden', 'Emery', 'Finley', 'Rowan', 'Sage', 'River'];
  const lastInitials = ['K', 'M', 'L', 'P', 'S', 'R', 'T', 'W', 'H', 'B', 'C', 'D', 'F', 'G', 'N'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'London', 'Toronto', 'Sydney', 'Berlin', 'Tokyo', 'Mumbai', 'São Paulo', 'Dubai', 'Singapore', 'Amsterdam', 'Paris', 'Seoul', 'Mexico City', 'Madrid', 'Stockholm'];
  const interests = ['Technology', 'Fashion', 'Fitness', 'Travel', 'Food', 'Gaming', 'Music', 'Art', 'Business', 'Education', 'Sports', 'Photography', 'Wellness', 'Finance', 'Entertainment'];
  const hashtagBases = ['socialmedia', 'marketing', 'digital', 'content', 'brand', 'growth', 'engagement', 'viral', 'trending', 'strategy', 'analytics', 'creative', 'influencer', 'startup', 'saas', 'tech', 'design', 'video', 'reels', 'story', 'launch', 'community', 'tips', 'tutorial', 'insights', 'data', 'roi', 'campaign', 'ads', 'organic'];

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[rand(0, arr.length - 1)]; }
  function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }
  function dateOffset(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }
  function timeStr(h, m) { return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }

  const stats = {
    totalFollowers: 2847593,
    engagementRate: 4.87,
    totalReach: 12847562,
    scheduledPosts: 847,
    impressions: 45218934,
    clicks: 892456,
    shares: 234567,
    saves: 456789,
    comments: 189234,
    likes: 3456789
  };

  const weeklyGrowth = [2.3, 3.1, 2.8, 4.2, 3.9, 5.1, 4.7, 6.2, 5.8, 7.1, 6.4, 8.2];
  const monthlyReach = [890000, 920000, 1050000, 1180000, 1240000, 1380000, 1520000, 1680000, 1750000, 1890000, 2100000, 2340000];
  const engagementByDay = [4.2, 5.1, 4.8, 6.2, 7.1, 5.9, 4.3];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const platformStats = platforms.map((name, i) => ({
    id: i + 1,
    name,
    icon: platformIcons[name],
    followers: rand(120000, 890000),
    growth: (rand(10, 250) / 10).toFixed(1),
    connected: rand(0, 10) > 1,
    posts: rand(450, 3200),
    engagement: (rand(20, 85) / 10).toFixed(1),
    reach: rand(500000, 5000000),
    class: `platform-${name.toLowerCase()}`
  }));

  function generatePosts(count) {
    const posts = [];
    for (let i = 0; i < count; i++) {
      const platform = pick(platforms);
      posts.push({
        id: i + 1,
        title: `Content piece #${1000 + i} - ${pick(['Product launch', 'Behind the scenes', 'Tips thread', 'User spotlight', 'Weekly roundup', 'Event recap', 'Tutorial', 'Q&A session', 'Poll results', 'Milestone celebration'])}`,
        platform,
        type: pick(contentTypes),
        status: pick(statuses),
        date: dateOffset(rand(-60, 30)),
        time: timeStr(rand(6, 22), pick([0, 15, 30, 45])),
        likes: rand(120, 45000),
        comments: rand(5, 2800),
        shares: rand(2, 1200),
        saves: rand(10, 3500),
        reach: rand(5000, 250000),
        engagement: (rand(15, 120) / 10).toFixed(1),
        caption: `Discover how our latest ${pick(['feature', 'update', 'campaign', 'collaboration'])} is transforming the way teams manage social content. #${pick(hashtagBases)} #${pick(hashtagBases)}`,
        hashtags: Array.from({ length: rand(3, 8) }, () => pick(hashtagBases))
      });
    }
    return posts;
  }

  function generateCampaigns(count) {
    const campaigns = [];
    const names = ['Spring Launch', 'Brand Awareness Q2', 'Holiday Promo', 'Product Teaser', 'Influencer Collab', 'Retargeting Wave', 'UGC Contest', 'Webinar Series', 'Flash Sale', 'Community Growth', 'App Install Drive', 'Newsletter Boost', 'Event Registration', 'Lead Gen Funnel', 'Loyalty Rewards'];
    for (let i = 0; i < count; i++) {
      const budget = rand(500, 50000);
      const spent = rand(Math.floor(budget * 0.3), budget);
      campaigns.push({
        id: i + 1,
        name: `${pick(names)} ${2024 + (i % 2)} - #${i + 1}`,
        status: pick(campaignStatuses),
        platform: pick(platforms),
        budget,
        spent,
        impressions: rand(10000, 2000000),
        clicks: rand(500, 85000),
        conversions: rand(20, 4500),
        roi: (rand(-20, 450) / 10).toFixed(1),
        startDate: dateOffset(rand(-90, -10)),
        endDate: dateOffset(rand(5, 60)),
        goal: pick(['Awareness', 'Traffic', 'Conversions', 'Engagement', 'Leads']),
        progress: rand(15, 100)
      });
    }
    return campaigns;
  }

  function generateNotifications(count) {
    const types = [
      { type: 'follower', icon: '👤', msg: 'gained {n} new followers on' },
      { type: 'engagement', icon: '📈', msg: 'Engagement spike detected on' },
      { type: 'post', icon: '📅', msg: 'Scheduled post published on' },
      { type: 'campaign', icon: '🎯', msg: 'Campaign milestone reached on' },
      { type: 'team', icon: '👥', msg: 'Team member updated content on' },
      { type: 'comment', icon: '💬', msg: 'New comment thread on' },
      { type: 'mention', icon: '@', msg: 'Brand mention detected on' },
      { type: 'alert', icon: '⚠️', msg: 'Performance alert for' }
    ];
    const notifs = [];
    for (let i = 0; i < count; i++) {
      const t = pick(types);
      const platform = pick(platforms);
      notifs.push({
        id: i + 1,
        type: t.type,
        icon: t.icon,
        message: t.msg.replace('{n}', rand(5, 500)) + ' ' + platform,
        platform,
        time: `${rand(1, 59)}m ago`,
        read: rand(0, 10) > 3,
        priority: pick(['low', 'medium', 'high'])
      });
    }
    return notifs;
  }

  function generateComments(count) {
    const comments = [];
    for (let i = 0; i < count; i++) {
      const fn = pick(firstNames);
      comments.push({
        id: i + 1,
        user: `${fn} ${pick(lastInitials)}.`,
        avatar: fn[0] + pick(lastInitials),
        platform: pick(platforms),
        post: `Post #${rand(100, 999)}`,
        text: pick([
          'This is exactly what I needed! Great content.',
          'Love the visuals on this one. Keep it up!',
          'When is the next update coming?',
          'Shared with my team - very helpful.',
          'Could you do a deep dive on this topic?',
          'The analytics breakdown was super insightful.',
          'How do I get started with this feature?',
          'Best post I have seen this week!',
          'Tagging my colleagues - must read.',
          'Question: does this work for small teams too?'
        ]),
        likes: rand(0, 450),
        replies: rand(0, 28),
        sentiment: pick(['positive', 'neutral', 'negative']),
        time: `${rand(1, 72)}h ago`,
        spam: rand(0, 20) === 0
      });
    }
    return comments;
  }

  function generateMessages(count) {
    const messages = [];
    for (let i = 0; i < count; i++) {
      const fn = pick(firstNames);
      messages.push({
        id: i + 1,
        user: `${fn} ${pick(lastInitials)}.`,
        avatar: fn[0],
        platform: pick(platforms),
        preview: pick([
          'Hi! I saw your latest campaign and wanted to collaborate...',
          'Thanks for the quick response! Looking forward to...',
          'Can we schedule a call to discuss partnership options?',
          'Your content strategy is impressive. Would love to connect.',
          'Following up on our previous conversation about...',
          'We are interested in featuring your platform in our...',
          'Just sent over the brief - let me know your thoughts.',
          'The demo was great! Our team is ready to move forward.'
        ]),
        unread: rand(0, 5),
        time: `${rand(1, 48)}h ago`,
        online: rand(0, 10) > 6
      });
    }
    return messages;
  }

  function generateHashtags(count) {
    const tags = [];
    for (let i = 0; i < count; i++) {
      const base = pick(hashtagBases);
      const tag = i % 3 === 0 ? base + rand(1, 99) : base + pick(['tips', 'pro', 'daily', 'hub', 'life', 'world', 'now', '2024', '2025']);
      tags.push({
        id: i + 1,
        tag: '#' + tag,
        posts: rand(1000, 5000000),
        reach: rand(50000, 10000000),
        engagement: (rand(10, 150) / 10).toFixed(1),
        trend: pick(['rising', 'stable', 'falling']),
        growth: (rand(-30, 80) / 10).toFixed(1)
      });
    }
    return tags.sort((a, b) => b.posts - a.posts);
  }

  function generateTeam(count) {
    const roles = ['Admin', 'Editor', 'Analyst', 'Viewer', 'Manager', 'Content Creator'];
    const team = [];
    for (let i = 0; i < count; i++) {
      const fn = pick(firstNames);
      team.push({
        id: i + 1,
        name: `${fn} ${pick(lastInitials)}.`,
        email: `${fn.toLowerCase()}${rand(1, 99)}@workspace.demo`,
        role: pick(roles),
        avatar: fn[0] + pick(lastInitials),
        status: pick(['online', 'away', 'offline']),
        posts: rand(5, 200),
        lastActive: `${rand(1, 120)}m ago`
      });
    }
    return team;
  }

  function generateMedia(count) {
    const media = [];
    const types = ['image', 'video', 'gif'];
    for (let i = 0; i < count; i++) {
      media.push({
        id: i + 1,
        name: `asset_${String(i + 1).padStart(4, '0')}.${pick(['jpg', 'png', 'mp4', 'gif'])}`,
        type: pick(types),
        size: `${rand(100, 4500)}KB`,
        dimensions: pick(['1080x1080', '1920x1080', '1080x1920', '1200x628']),
        uploaded: dateOffset(rand(-120, 0)),
        used: rand(0, 45),
        tags: Array.from({ length: rand(2, 5) }, () => pick(hashtagBases))
      });
    }
    return media;
  }

  function generateCompetitors(count) {
    const names = ['Nova Digital', 'Pulse Media', 'Vertex Social', 'Apex Brands', 'Zenith Marketing', 'Catalyst Co', 'Momentum Labs', 'Prism Agency', 'Echo Studios', 'Fusion Media', 'Nexus Creative', 'Orbit Digital'];
    return names.slice(0, count).map((name, i) => ({
      id: i + 1,
      name,
      followers: rand(50000, 2000000),
      growth: (rand(-50, 120) / 10).toFixed(1),
      engagement: (rand(10, 90) / 10).toFixed(1),
      posts: rand(100, 5000),
      reach: rand(200000, 8000000),
      overlap: rand(5, 45)
    }));
  }

  function generateActivity(count) {
    const activities = [];
    const actions = [
      'New post published', 'Campaign started', 'Follower milestone', 'Comment replied',
      'Report generated', 'Post scheduled', 'Hashtag trending', 'Engagement record',
      'Team member joined', 'Account connected', 'Budget alert', 'Content approved'
    ];
    for (let i = 0; i < count; i++) {
      activities.push({
        id: i + 1,
        action: pick(actions),
        platform: pick(platforms),
        type: pick(['engagement', 'follower', 'post', 'campaign']),
        time: `${rand(1, 180)}m ago`,
        detail: `Activity log entry #${10000 + i}`
      });
    }
    return activities;
  }

  const audience = {
    demographics: {
      age: [
        { label: '18-24', percent: 22.4 },
        { label: '25-34', percent: 38.7 },
        { label: '35-44', percent: 21.3 },
        { label: '45-54', percent: 11.2 },
        { label: '55+', percent: 6.4 }
      ],
      gender: [
        { label: 'Female', percent: 52.3 },
        { label: 'Male', percent: 44.1 },
        { label: 'Other', percent: 3.6 }
      ]
    },
    locations: cities.map((city, i) => ({
      city,
      country: pick(['US', 'UK', 'CA', 'AU', 'DE', 'JP', 'IN', 'BR']),
      users: rand(5000, 180000),
      percent: (rand(10, 250) / 10).toFixed(1)
    })),
    devices: [
      { label: 'Mobile', percent: 68.4 },
      { label: 'Desktop', percent: 24.2 },
      { label: 'Tablet', percent: 7.4 }
    ],
    activeHours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      activity: rand(20, 100)
    })),
    interests: interests.map(int => ({
      name: int,
      percent: (rand(50, 350) / 10).toFixed(1),
      growth: (rand(-20, 50) / 10).toFixed(1)
    }))
  };

  const engagementMetrics = {
    likes: 3456789,
    comments: 189234,
    shares: 234567,
    saves: 456789,
    clicks: 892456,
    ctr: 3.24,
    byPlatform: platforms.map(p => ({
      platform: p,
      likes: rand(100000, 800000),
      comments: rand(10000, 80000),
      shares: rand(5000, 50000),
      saves: rand(8000, 90000)
    })),
    monthly: Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      likes: rand(200000, 400000),
      comments: rand(12000, 25000),
      shares: rand(15000, 30000)
    }))
  };

  const reports = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `${pick(['Weekly', 'Monthly', 'Quarterly', 'Campaign', 'Platform', 'Engagement', 'Audience', 'ROI'])} Report - ${dateOffset(-rand(1, 90))}`,
    type: pick(['PDF', 'CSV', 'XLSX']),
    size: `${rand(200, 8500)}KB`,
    generated: dateOffset(-rand(0, 30)),
    status: pick(['Ready', 'Processing', 'Scheduled'])
  }));

  const aiSuggestions = [
    { type: 'caption', text: 'Unlock your brand potential with data-driven social strategies. Start your journey today! 🚀', score: 94 },
    { type: 'caption', text: 'Behind every great campaign is great analytics. Here is what we learned this week 📊', score: 91 },
    { type: 'caption', text: 'Your audience is waiting. Post at 2:30 PM EST for maximum engagement based on your data.', score: 88 },
    { type: 'idea', text: 'Create a carousel comparing before/after metrics from your latest campaign', score: 92 },
    { type: 'idea', text: 'Film a 30-second Reel showing your top 3 performing posts this month', score: 89 },
    { type: 'idea', text: 'Run a poll asking followers their favorite content format', score: 85 },
    { type: 'time', text: 'Best posting window: Tuesday & Thursday, 1:00 PM - 3:00 PM', score: 96 },
    { type: 'time', text: 'Instagram Stories peak: Weekdays 7:00 AM - 9:00 AM', score: 87 },
    { type: 'hashtag', text: '#ContentStrategy #SocialAnalytics #GrowthHacking #DigitalMarketing', score: 90 }
  ];

  const securityLogs = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    event: pick(['Login', 'Logout', 'API Key Created', 'Password Changed', '2FA Enabled', 'Failed Login', 'Device Added', 'Permission Updated']),
    device: pick(['Chrome on Windows', 'Safari on macOS', 'Firefox on Linux', 'Mobile App iOS', 'Mobile App Android']),
    location: pick(cities),
    ip: `${rand(10, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`,
    time: dateOffset(-rand(0, 14)) + ' ' + timeStr(rand(0, 23), rand(0, 59)),
    status: pick(['Success', 'Success', 'Success', 'Blocked'])
  }));

  const influencers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `${pick(firstNames)} ${pick(lastInitials)}.`,
    handle: `@creator${rand(100, 999)}`,
    platform: pick(platforms),
    followers: rand(10000, 2500000),
    engagement: (rand(20, 120) / 10).toFixed(1),
    niche: pick(interests),
    cost: `$${rand(500, 25000)}`,
    score: rand(65, 99)
  }));

  const trends = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    topic: pick(['AI Tools', 'Short-form Video', 'Authentic Content', 'Social Commerce', 'Live Shopping', 'Micro-influencers', 'UGC', 'Sustainability', 'Audio Content', 'Community Building']),
    volume: rand(10000, 5000000),
    growth: (rand(10, 200) / 10).toFixed(1),
    sentiment: pick(['positive', 'neutral', 'mixed']),
    platforms: platforms.slice(0, rand(2, 5))
  }));

  const subscriptions = [
    { name: 'Starter', price: 29, features: ['3 Social Accounts', '30 Scheduled Posts', 'Basic Analytics', 'Email Support'], popular: false },
    { name: 'Professional', price: 79, features: ['10 Social Accounts', 'Unlimited Scheduling', 'Advanced Analytics', 'AI Suggestions', 'Team (3 users)', 'Priority Support'], popular: true },
    { name: 'Business', price: 199, features: ['25 Social Accounts', 'Unlimited Everything', 'Custom Reports', 'API Access', 'Team (15 users)', 'Dedicated Manager'], popular: false },
    { name: 'Enterprise', price: 499, features: ['Unlimited Accounts', 'White-label Reports', 'SSO & Security', 'Custom Integrations', 'Unlimited Team', 'SLA Guarantee'], popular: false }
  ];

  const posts = generatePosts(150);
  const scheduledPosts = posts.filter(p => p.status === 'Scheduled' || p.status === 'Pending').concat(generatePosts(80).map(p => ({ ...p, status: 'Scheduled' })));
  const campaigns = generateCampaigns(45);
  const notifications = generateNotifications(120);
  const comments = generateComments(100);
  const messages = generateMessages(50);
  const hashtags = generateHashtags(200);
  const team = generateTeam(25);
  const media = generateMedia(80);
  const competitors = generateCompetitors(12);
  const activity = generateActivity(80);

  return {
    stats,
    weeklyGrowth,
    monthlyReach,
    engagementByDay,
    dayLabels,
    platformStats,
    platforms,
    platformIcons,
    posts,
    scheduledPosts,
    campaigns,
    notifications,
    comments,
    messages,
    hashtags,
    team,
    media,
    competitors,
    activity,
    audience,
    engagementMetrics,
    reports,
    aiSuggestions,
    securityLogs,
    influencers,
    trends,
    subscriptions,
    formatNum,
    rand,
    pick
  };
})();
