"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import Layout from '../components/Layout';
import {
  TrendingUp,
  TrendingDown,
  People,
  Business,
  ShoppingCart,
  AttachMoney,
  CheckCircle,
  Warning,
  Schedule,
  Star,
} from '@mui/icons-material';

export default function Dashboard() {
  const stats = [
    { title: '总用户', value: '12,345', change: '+5.2%', trend: 'up', icon: <People />, color: 'primary' },
    { title: '收入', value: '¥98,765', change: '+12.5%', trend: 'up', icon: <AttachMoney />, color: 'success' },
    { title: '订单', value: '2,345', change: '-2.1%', trend: 'down', icon: <ShoppingCart />, color: 'info' },
    { title: '公司', value: '1,234', change: '+8.7%', trend: 'up', icon: <Business />, color: 'warning' },
  ];

  const activities = [
    { action: '新用户注册', time: '2分钟前', icon: <People /> },
    { action: '订单完成', time: '5分钟前', icon: <CheckCircle /> },
    { action: '系统维护', time: '1小时前', icon: <Schedule /> },
    { action: '收入增长', time: '2小时前', icon: <TrendingUp /> },
  ];

  const recentUsers = [
    { name: '张三', role: '管理员', status: '活跃' },
    { name: '李四', role: '用户', status: '在线' },
    { name: '王五', role: '会员', status: '离线' },
    { name: '赵六', role: '访客', status: '活跃' },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          仪表板概览
        </Typography>
        <Typography variant="body1" color="text.secondary">
          实时监控您的业务数据和系统状态
        </Typography>
      </Box>

      {/* 统计卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${stat.color}.main`, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {stat.trend === 'up' ? (
                    <TrendingUp color="success" sx={{ mr: 1 }} />
                  ) : (
                    <TrendingDown color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography
                    variant="body2"
                    color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                  >
                    {stat.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    比上月
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* 性能指标 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                系统性能指标
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">CPU 使用率</Typography>
                  <Typography variant="body2">65%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">内存使用率</Typography>
                  <Typography variant="body2">78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} color="warning" />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">磁盘使用率</Typography>
                  <Typography variant="body2">45%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} color="success" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">网络使用率</Typography>
                  <Typography variant="body2">23%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={23} color="info" />
              </Box>
            </CardContent>
          </Card>

          {/* 最近活动 */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                最近活动
              </Typography>
              <List>
                {activities.map((activity, index) => (
                  <ListItem key={index} divider={index < activities.length - 1}>
                    <ListItemIcon>
                      {activity.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 侧边栏信息 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                系统状态
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">服务器状态</Typography>
                  <Chip label="正常" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">数据库状态</Typography>
                  <Chip label="正常" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">API状态</Typography>
                  <Chip label="正常" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">备份状态</Typography>
                  <Chip label="进行中" color="info" size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                最近用户
              </Typography>
              <List>
                {recentUsers.map((user, index) => (
                  <ListItem key={index} divider={index < recentUsers.length - 1}>
                    <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={user.name}
                      secondary={`${user.role} • ${user.status}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                查看所有用户
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
