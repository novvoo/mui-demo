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
  Switch,
  FormControlLabel,
  Alert,
  AlertTitle,
  Grid,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MarkEmailRead,
  MarkEmailUnread,
  Delete,
  Settings,
  CheckCircle,
  Warning,
  Info,
  Error as ErrorIcon,
  FilterList,
  Clear,
} from '@mui/icons-material';
import { useState } from 'react';
import Layout from '../components/Layout';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  category: 'system' | 'user' | 'security' | 'update';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '系统更新完成',
    message: '您的应用已成功更新到最新版本，所有功能正常运行。',
    type: 'success',
    timestamp: new Date('2025-11-10T10:30:00'),
    read: false,
    category: 'update',
  },
  {
    id: '2',
    title: '新功能发布',
    message: '我们推出了全新的数据可视化功能，帮助您更好地分析数据。',
    type: 'info',
    timestamp: new Date('2025-11-10T09:15:00'),
    read: false,
    category: 'system',
  },
  {
    id: '3',
    title: '安全提醒',
    message: '建议您定期更新密码以保护账户安全。',
    type: 'warning',
    timestamp: new Date('2025-11-10T08:45:00'),
    read: true,
    category: 'security',
  },
  {
    id: '4',
    title: '服务异常',
    message: '数据库连接出现短暂中断，现已恢复正常。',
    type: 'error',
    timestamp: new Date('2025-11-09T16:20:00'),
    read: true,
    category: 'system',
  },
  {
    id: '5',
    title: '备份完成',
    message: '您的数据已自动备份至云端，安全可靠。',
    type: 'success',
    timestamp: new Date('2025-11-09T14:00:00'),
    read: true,
    category: 'system',
  },
];

const categoryLabels = {
  system: '系统',
  user: '用户',
  security: '安全',
  update: '更新',
};

const typeLabels = {
  info: '信息',
  success: '成功',
  warning: '警告',
  error: '错误',
};

const typeColors = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export default function NotificationsPage() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: false } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <Info color="info" />;
    }
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
            通知中心
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              共 {notifications.length} 条通知，{unreadCount} 条未读
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              startIcon={<Settings />}
              onClick={() => {}}
              size="small"
            >
              通知设置
            </Button>
            <Button
              startIcon={<MarkEmailRead />}
              onClick={markAllAsRead}
              size="small"
              disabled={unreadCount === 0}
            >
              全部标为已读
            </Button>
            <Button
              startIcon={<Clear />}
              onClick={clearAll}
              size="small"
              color="error"
              disabled={notifications.length === 0}
            >
              清空所有
            </Button>
          </Box>
        </Box>

        {/* 筛选器 */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FilterList />
                <Typography variant="h6">筛选条件</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="全部"
                  onClick={() => setFilter('all')}
                  color={filter === 'all' ? 'primary' : 'default'}
                  variant={filter === 'all' ? 'filled' : 'outlined'}
                />
                <Chip
                  label="仅未读"
                  onClick={() => setFilter('unread')}
                  color={filter === 'unread' ? 'primary' : 'default'}
                  variant={filter === 'unread' ? 'filled' : 'outlined'}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="全部类型"
                  onClick={() => setCategoryFilter('all')}
                  color={categoryFilter === 'all' ? 'primary' : 'default'}
                  variant={categoryFilter === 'all' ? 'filled' : 'outlined'}
                />
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <Chip
                    key={key}
                    label={label}
                    onClick={() => setCategoryFilter(key)}
                    color={categoryFilter === key ? 'primary' : 'default'}
                    variant={categoryFilter === key ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* 通知列表 */}
        {filteredNotifications.length === 0 ? (
          <Alert severity="info">
            <AlertTitle>暂无通知</AlertTitle>
            {notifications.length === 0 
              ? '您还没有任何通知' 
              : '当前筛选条件下没有找到通知'
            }
          </Alert>
        ) : (
          <List>
            {filteredNotifications.map((notification, index) => (
              <Card 
                key={notification.id} 
                sx={{ 
                  mb: 2,
                  border: notification.read ? 'none' : `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  backgroundColor: notification.read 
                    ? 'background.paper' 
                    : alpha(theme.palette.primary.main, 0.02),
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: notification.read ? 400 : 600,
                            textDecoration: notification.read ? 'none' : 'underline',
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Chip 
                          label={typeLabels[notification.type]} 
                          size="small" 
                          color={typeColors[notification.type] as any}
                        />
                        <Chip 
                          label={categoryLabels[notification.category]} 
                          size="small" 
                          variant="outlined"
                        />
                        {!notification.read && (
                          <Chip 
                            label="未读" 
                            size="small" 
                            color="primary"
                            sx={{ ml: 'auto' }}
                          />
                        )}
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2 }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(notification.timestamp)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Tooltip title={notification.read ? '标为未读' : '标为已读'}>
                        <IconButton
                          size="small"
                          onClick={() => 
                            notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)
                          }
                        >
                          {notification.read ? <MarkEmailUnread /> : <MarkEmailRead />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="删除">
                        <IconButton
                          size="small"
                          onClick={() => deleteNotification(notification.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        )}

        {/* 通知设置 */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            通知设置
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="桌面通知"
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="邮件通知"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControlLabel
                control={<Switch />}
                label="声音提醒"
              />
              <br />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="显示预览"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
}
