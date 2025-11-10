"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Paper,
  TextField,
  InputAdornment,
  Avatar,
  Grid,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Help as HelpIcon,
  Search,
  ExpandMore,
  ContactSupport,
  VideoLibrary,
  Description,
  Settings,
  Dashboard,
  TableChart,
  Person,
  Notifications,
  History,
  Chat,
  Phone,
  Email,
  School,
  Lightbulb,
  CheckCircle,
  Star,
} from '@mui/icons-material';
import { useState } from 'react';
import Layout from '../components/Layout';

interface HelpCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const mockHelpData: HelpCategory[] = [
  {
    id: 'getting-started',
    title: '快速开始',
    icon: <School />,
    description: '新用户入门指南',
    articles: [
      {
        id: 'welcome',
        title: '欢迎使用MUI演示应用',
        content: '这是一个功能完善的MUI演示应用，包含仪表板、表格、用户管理、通知、历史记录和帮助等功能。',
        tags: ['入门', '介绍'],
        difficulty: 'beginner',
      },
      {
        id: 'navigation',
        title: '导航与界面',
        content: '使用左侧导航栏可以快速访问各个功能模块，顶部有搜索和用户菜单。',
        tags: ['导航', '界面'],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'dashboard',
    title: '仪表板',
    icon: <Dashboard />,
    description: '数据可视化与统计分析',
    articles: [
      {
        id: 'dashboard-overview',
        title: '仪表板概览',
        content: '仪表板提供数据可视化功能，包括图表、指标卡片和实时数据展示。',
        tags: ['仪表板', '数据'],
        difficulty: 'intermediate',
      },
      {
        id: 'widgets',
        title: '自定义小组件',
        content: '可以根据需要添加、删除和重新排列仪表板上的各种小组件。',
        tags: ['自定义', '小组件'],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'data-table',
    title: '数据表格',
    icon: <TableChart />,
    description: '数据管理与操作指南',
    articles: [
      {
        id: 'table-features',
        title: '表格功能介绍',
        content: '数据表格支持排序、筛选、分页、导出等功能，帮助您高效管理数据。',
        tags: ['表格', '数据管理'],
        difficulty: 'intermediate',
      },
      {
        id: 'data-operations',
        title: '数据操作',
        content: '可以添加、编辑、删除数据记录，支持批量操作和快速搜索。',
        tags: ['CRUD', '操作'],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'user-management',
    title: '用户管理',
    icon: <Person />,
    description: '用户账户与权限管理',
    articles: [
      {
        id: 'user-roles',
        title: '用户角色与权限',
        content: '系统支持不同用户角色，每个角色拥有不同的功能权限。',
        tags: ['用户', '权限'],
        difficulty: 'advanced',
      },
      {
        id: 'user-profiles',
        title: '用户资料管理',
        content: '可以查看和编辑用户个人信息，查看用户活动历史。',
        tags: ['资料', '管理'],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'notifications',
    title: '通知系统',
    icon: <Notifications />,
    description: '通知设置与管理',
    articles: [
      {
        id: 'notification-types',
        title: '通知类型说明',
        content: '系统提供多种通知类型：信息、成功、警告、错误，每种类型有不同的处理方式。',
        tags: ['通知', '类型'],
        difficulty: 'beginner',
      },
      {
        id: 'notification-settings',
        title: '通知设置配置',
        content: '可以自定义通知偏好，包括桌面通知、邮件通知、声音提醒等。',
        tags: ['设置', '配置'],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'history',
    title: '操作历史',
    icon: <History />,
    description: '操作记录与审计',
    articles: [
      {
        id: 'activity-tracking',
        title: '活动追踪',
        content: '系统自动记录所有用户操作，包括查看、下载、搜索、更新、删除等行为。',
        tags: ['历史', '追踪'],
        difficulty: 'intermediate',
      },
      {
        id: 'audit-logs',
        title: '审计日志',
        content: '可以通过审计日志了解系统使用情况，支持筛选和导出功能。',
        tags: ['审计', '日志'],
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'settings',
    title: '系统设置',
    icon: <Settings />,
    description: '应用配置与首选项',
    articles: [
      {
        id: 'general-settings',
        title: '通用设置',
        content: '配置应用的基本设置，包括主题、语言、时区等选项。',
        tags: ['设置', '配置'],
        difficulty: 'beginner',
      },
      {
        id: 'advanced-settings',
        title: '高级设置',
        content: '高级配置选项，包括数据存储、API设置、集成配置等。',
        tags: ['高级', '配置'],
        difficulty: 'advanced',
      },
    ],
  },
];

const faqData = [
  {
    question: '如何开始使用这个应用？',
    answer: '首先查看"快速开始"部分，了解基本导航和界面使用方法。',
  },
  {
    question: '如何自定义仪表板？',
    answer: '在仪表板页面，您可以添加、删除和重新排列各种数据可视化小组件。',
  },
  {
    question: '如何管理用户权限？',
    answer: '在用户管理页面，可以设置不同用户角色和对应的功能权限。',
  },
  {
    question: '通知无法正常显示怎么办？',
    answer: '检查浏览器是否允许通知权限，并查看通知设置是否正确配置。',
  },
  {
    question: '如何导出操作历史？',
    answer: '在历史记录页面，点击"导出记录"按钮可以导出CSV格式的历史数据。',
  },
];

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

export default function HelpPage() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | false>('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

  const filteredHelpData = mockHelpData.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const handleCategoryChange = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? false : categoryId);
  };

  const handleFaqChange = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? false : faqId);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 页面标题和搜索 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            帮助中心
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            获取帮助、学习使用技巧，或联系我们的支持团队
          </Typography>
          
          <TextField
            placeholder="搜索帮助内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* 标签页 */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="使用指南" />
            <Tab label="常见问题" />
            <Tab label="联系支持" />
          </Tabs>
        </Paper>

        {/* 使用指南 */}
        {activeTab === 0 && (
          <Box>
            {filteredHelpData.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  没有找到相关帮助内容
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  尝试使用其他关键词搜索
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredHelpData.map((category) => (
                  <Grid size={{ xs: 12, md: 6 }} key={category.id}>
                    <Accordion
                      expanded={expandedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {category.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">
                              {category.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {category.description}
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {category.articles.map((article) => (
                            <ListItem key={article.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {article.title}
                                </Typography>
                                <Chip
                                  label={difficultyLabels[article.difficulty]}
                                  size="small"
                                  color={difficultyColors[article.difficulty] as any}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {article.content}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {article.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem' }}
                                  />
                                ))}
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* 常见问题 */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              常见问题解答
            </Typography>
            <Box sx={{ mt: 3 }}>
              {faqData.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expandedFaq === `faq-${index}`}
                  onChange={() => handleFaqChange(`faq-${index}`)}
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        )}

        {/* 联系支持 */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              联系我们
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Chat />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          在线聊天
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          即时获得帮助
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      我们的支持团队在线时间为工作日 9:00-18:00
                    </Typography>
                    <Button variant="contained" fullWidth>
                      开始聊天
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <Email />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          邮件支持
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          详细问题描述
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      发送邮件到 support@example.com
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      发送邮件
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <Phone />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          电话支持
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          紧急问题处理
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      400-123-4567 (工作日 9:00-18:00)
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      拨打电话
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'info.main' }}>
                        <VideoLibrary />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          视频教程
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          详细操作指南
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      观看我们的视频教程
                    </Typography>
                    <Button variant="outlined" fullWidth>
                      观看教程
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* 反馈和建议 */}
            <Paper sx={{ p: 3, mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                反馈和建议
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                您的反馈对我们非常重要，帮助我们不断改进产品
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" startIcon={<Star />}>
                  评价体验
                </Button>
                <Button variant="outlined" startIcon={<Lightbulb />}>
                  提出建议
                </Button>
                <Button variant="outlined" startIcon={<Description />}>
                  提交bug报告
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Layout>
  );
}
