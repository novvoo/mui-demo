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
  Divider,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  useTheme,
  alpha,
} from '@mui/material';
import {
  History as HistoryIcon,
  Search,
  FilterList,
  Download,
  Clear,
  Visibility,
  PlayArrow,
  Pause,
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Schedule,
} from '@mui/icons-material';
import { useState } from 'react';
import Layout from '../components/Layout';

interface HistoryRecord {
  id: string;
  title: string;
  description: string;
  type: 'view' | 'download' | 'search' | 'update' | 'delete';
  status: 'success' | 'error' | 'pending' | 'warning';
  timestamp: Date;
  user: string;
  details?: string;
}

const mockHistory: HistoryRecord[] = [
  {
    id: '1',
    title: '查看用户数据',
    description: '访问了用户管理页面，浏览了用户列表',
    type: 'view',
    status: 'success',
    timestamp: new Date('2025-11-10T11:15:00'),
    user: 'admin',
    details: '查看了 150 个用户记录',
  },
  {
    id: '2',
    title: '搜索功能',
    description: '在数据表格中搜索"张三"',
    type: 'search',
    status: 'success',
    timestamp: new Date('2025-11-10T10:45:00'),
    user: 'admin',
    details: '找到 3 条匹配记录',
  },
  {
    id: '3',
    title: '下载报告',
    description: '下载了月度数据报告',
    type: 'download',
    status: 'success',
    timestamp: new Date('2025-11-10T10:30:00'),
    user: 'admin',
    details: '文件名: monthly_report_2025-11.pdf',
  },
  {
    id: '4',
    title: '系统更新',
    description: '执行了应用配置更新',
    type: 'update',
    status: 'pending',
    timestamp: new Date('2025-11-10T09:20:00'),
    user: 'system',
    details: '更新了通知设置',
  },
  {
    id: '5',
    title: '删除操作',
    description: '删除了测试用户',
    type: 'delete',
    status: 'warning',
    timestamp: new Date('2025-11-10T08:50:00'),
    user: 'admin',
    details: '用户ID: 12345',
  },
  {
    id: '6',
    title: '数据同步',
    description: '与外部系统同步数据',
    type: 'update',
    status: 'error',
    timestamp: new Date('2025-11-09T16:30:00'),
    user: 'system',
    details: '连接超时，请重试',
  },
  {
    id: '7',
    title: '查看统计',
    description: '访问了仪表板页面',
    type: 'view',
    status: 'success',
    timestamp: new Date('2025-11-09T14:15:00'),
    user: 'admin',
    details: '浏览了各种图表和指标',
  },
  {
    id: '8',
    title: '导出数据',
    description: '导出了用户数据到Excel',
    type: 'download',
    status: 'success',
    timestamp: new Date('2025-11-09T11:00:00'),
    user: 'admin',
    details: '导出了 150 条记录',
  },
];

const typeLabels = {
  view: '查看',
  download: '下载',
  search: '搜索',
  update: '更新',
  delete: '删除',
};

const statusLabels = {
  success: '成功',
  error: '错误',
  pending: '进行中',
  warning: '警告',
};

const statusColors = {
  success: 'success',
  error: 'error',
  pending: 'warning',
  warning: 'warning',
};

const typeIcons = {
  view: <Visibility />,
  download: <Download />,
  search: <Search />,
  update: <CheckCircle />,
  delete: <ErrorIcon />,
};

export default function HistoryPage() {
  const theme = useTheme();
  const [history, setHistory] = useState<HistoryRecord[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filteredHistory = history.filter(record => {
    if (searchTerm && !record.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !record.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (typeFilter !== 'all' && record.type !== typeFilter) return false;
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    
    if (dateFilter !== 'all') {
      const now = new Date();
      const recordDate = new Date(record.timestamp);
      const diffInHours = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60));
      
      switch (dateFilter) {
        case 'today':
          if (recordDate.toDateString() !== now.toDateString()) return false;
          break;
        case 'week':
          if (diffInHours > 24 * 7) return false;
          break;
        case 'month':
          if (diffInHours > 24 * 30) return false;
          break;
      }
    }
    
    return true;
  });

  const clearAllHistory = () => {
    setHistory([]);
  };

  const exportHistory = () => {
    const csvContent = [
      ['时间', '标题', '类型', '状态', '用户', '描述'],
      ...filteredHistory.map(record => [
        record.timestamp.toLocaleString('zh-CN'),
        record.title,
        typeLabels[record.type],
        statusLabels[record.status],
        record.user,
        record.description,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '刚刚';
    if (diffInHours < 24) return `${diffInHours}小时前`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}天前`;
    
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 页面标题和控制 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            操作历史
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              共 {filteredHistory.length} 条记录
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              startIcon={<Download />}
              onClick={exportHistory}
              size="small"
              disabled={filteredHistory.length === 0}
            >
              导出记录
            </Button>
            <Button
              startIcon={<Clear />}
              onClick={clearAllHistory}
              size="small"
              color="error"
              disabled={history.length === 0}
            >
              清空历史
            </Button>
          </Box>
        </Box>

        {/* 搜索和筛选 */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="搜索操作记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>操作类型</InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="操作类型"
              >
                <MenuItem value="all">全部类型</MenuItem>
                {Object.entries(typeLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>状态</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="状态"
              >
                <MenuItem value="all">全部状态</MenuItem>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>时间范围</InputLabel>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                label="时间范围"
              >
                <MenuItem value="all">全部时间</MenuItem>
                <MenuItem value="today">今天</MenuItem>
                <MenuItem value="week">最近7天</MenuItem>
                <MenuItem value="month">最近30天</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* 历史记录表格 */}
        {filteredHistory.length === 0 ? (
          <Alert severity="info">
            <AlertTitle>暂无记录</AlertTitle>
            {history.length === 0 
              ? '您还没有任何操作记录' 
              : '当前筛选条件下没有找到记录'
            }
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>时间</TableCell>
                  <TableCell>操作</TableCell>
                  <TableCell>类型</TableCell>
                  <TableCell>状态</TableCell>
                  <TableCell>用户</TableCell>
                  <TableCell>描述</TableCell>
                  <TableCell>详情</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow 
                    key={record.id}
                    sx={{ 
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.action.hover, 0.04),
                      }
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {formatTimestamp(record.timestamp)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {record.timestamp.toLocaleString('zh-CN')}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          {typeIcons[record.type]}
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {record.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={typeLabels[record.type]} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={statusLabels[record.status]} 
                        size="small" 
                        color={statusColors[record.status] as any}
                        icon={
                          record.status === 'pending' ? <Schedule /> : 
                          record.status === 'success' ? <CheckCircle /> :
                          record.status === 'error' ? <ErrorIcon /> : <Info />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {record.user}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {record.details && (
                        <Tooltip title={record.details}>
                          <IconButton size="small">
                            <Info />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* 统计信息 */}
        {history.length > 0 && (
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              活动统计
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="primary">
                    {history.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    总操作次数
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="success.main">
                    {history.filter(r => r.status === 'success').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    成功操作
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="error.main">
                    {history.filter(r => r.status === 'error').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    失败操作
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="warning.main">
                    {history.filter(r => r.status === 'pending').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    进行中
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        )}
      </Container>
    </Layout>
  );
}
