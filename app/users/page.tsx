"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Divider,
  Paper,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Alert,
} from '@mui/material';
import Layout from '../components/Layout';
import {
  Add,
  Edit,
  Delete,
  Person,
  Security,
  Settings,
  Email,
  Phone,
  Business,
  Badge as BadgeIcon,
  Block,
  CheckCircle,
  AccessTime,
  Star,
  Notifications,
  Visibility,
} from '@mui/icons-material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UsersPage() {
  const [tabValue, setTabValue] = useState(0);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 用户数据
  const [users, setUsers] = useState([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138-0013-8000',
      company: '科技有限公司',
      role: '管理员',
      status: '活跃',
      lastActive: '2分钟前',
      notifications: true,
      avatar: 'Z',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      phone: '138-0013-8001',
      company: '创新企业',
      role: '用户',
      status: '离线',
      lastActive: '1小时前',
      notifications: false,
      avatar: 'L',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      phone: '138-0013-8002',
      company: '数字媒体',
      role: '会员',
      status: '在线',
      lastActive: '5分钟前',
      notifications: true,
      avatar: 'W',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '138-0013-8003',
      company: '软件开发',
      role: '访客',
      status: '活跃',
      lastActive: '30分钟前',
      notifications: false,
      avatar: 'Z',
    },
  ]);

  // 角色数据
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: '管理员',
      description: '拥有所有权限',
      userCount: 2,
      permissions: ['用户管理', '系统设置', '数据查看', '报告生成'],
    },
    {
      id: 2,
      name: '会员',
      description: '有限的管理权限',
      userCount: 8,
      permissions: ['数据查看', '报告生成'],
    },
    {
      id: 3,
      name: '用户',
      description: '基本用户权限',
      userCount: 25,
      permissions: ['数据查看'],
    },
    {
      id: 4,
      name: '访客',
      description: '只读权限',
      userCount: 12,
      permissions: ['数据查看'],
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUserDialogOpen = (user?: any) => {
    setSelectedUser(user);
    setUserDialogOpen(true);
  };

  const handleUserDialogClose = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleRoleDialogOpen = () => {
    setRoleDialogOpen(true);
  };

  const handleRoleDialogClose = () => {
    setRoleDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '在线':
        return 'success';
      case '活跃':
        return 'info';
      case '离线':
        return 'default';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case '管理员':
        return 'error';
      case '会员':
        return 'primary';
      case '用户':
        return 'success';
      case '访客':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          用户管理
        </Typography>
        <Typography variant="body1" color="text.secondary">
          管理用户账户、角色和权限设置
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="用户管理标签页">
            <Tab label="用户列表" />
            <Tab 
              label={
                <Badge badgeContent={roles.length} color="primary">
                  角色管理
                </Badge>
              } 
            />
            <Tab label="权限设置" />
            <Tab label="活动日志" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="搜索用户..."
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>状态</InputLabel>
                    <Select value="" label="状态">
                      <MenuItem value="">全部</MenuItem>
                      <MenuItem value="active">活跃</MenuItem>
                      <MenuItem value="inactive">离线</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>角色</InputLabel>
                    <Select value="" label="角色">
                      <MenuItem value="">全部</MenuItem>
                      <MenuItem value="admin">管理员</MenuItem>
                      <MenuItem value="member">会员</MenuItem>
                      <MenuItem value="user">用户</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleUserDialogOpen()}
                  >
                    添加用户
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2, width: 48, height: 48 }}>
                        {user.avatar}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                      <Tooltip title={`状态: ${user.status}`}>
                        <Badge
                          variant="dot"
                          color={user.status === '在线' ? 'success' : 'default'}
                        >
                          <Chip
                            size="small"
                            label={user.status}
                            color={getStatusColor(user.status) as any}
                          />
                        </Badge>
                      </Tooltip>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        角色
                      </Typography>
                      <Chip
                        label={user.role}
                        size="small"
                        color={getRoleColor(user.role) as any}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        公司
                      </Typography>
                      <Typography variant="body2">{user.company}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        最后活跃
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ mr: 0.5, fontSize: '16px' }} />
                        {user.lastActive}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.notifications}
                            size="small"
                            onChange={(e) => {
                              setUsers(users.map(u => 
                                u.id === user.id ? { ...u, notifications: e.target.checked } : u
                              ));
                            }}
                          />
                        }
                        label="通知"
                        labelPlacement="start"
                        sx={{ m: 0 }}
                      />
                      <Box>
                        <Tooltip title="查看详情">
                          <IconButton size="small" onClick={() => handleUserDialogOpen(user)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="编辑用户">
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="删除用户">
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleRoleDialogOpen}
            >
              创建角色
            </Button>
          </Box>

          <Grid container spacing={3}>
            {roles.map((role) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={role.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <BadgeIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {role.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {role.userCount} 用户
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      描述
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {role.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      权限
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {role.permissions.map((permission, index) => (
                        <Chip
                          key={index}
                          label={permission}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={handleRoleDialogOpen}
                      >
                        编辑
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                      >
                        删除
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Alert severity="info" sx={{ mb: 3 }}>
            权限设置允许您控制用户对不同功能模块的访问权限。
          </Alert>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    功能模块
                  </Typography>
                  <List>
                    {[
                      { name: '用户管理', description: '添加、编辑、删除用户账户' },
                      { name: '数据管理', description: '查看和管理数据' },
                      { name: '报告生成', description: '生成和导出报告' },
                      { name: '系统设置', description: '修改系统配置' },
                      { name: '文件管理', description: '上传和管理文件' },
                    ].map((module, index) => (
                      <ListItem key={index} divider={index < 4}>
                        <ListItemText
                          primary={module.name}
                          secondary={module.description}
                        />
                        <ListItemSecondaryAction>
                          <FormControlLabel
                            control={<Switch defaultChecked={index < 3} />}
                            label=""
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    数据权限
                  </Typography>
                  <List>
                    {[
                      { name: '查看所有数据', level: '全局' },
                      { name: '查看部门数据', level: '部门' },
                      { name: '查看个人数据', level: '个人' },
                      { name: '编辑数据', level: '受控' },
                      { name: '删除数据', level: '限制' },
                    ].map((permission, index) => (
                      <ListItem key={index} divider={index < 4}>
                        <ListItemText
                          primary={permission.name}
                          secondary={permission.level}
                        />
                        <ListItemSecondaryAction>
                          <FormControlLabel
                            control={<Switch defaultChecked={index < 2} />}
                            label=""
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            用户活动日志
          </Typography>
          
          <List>
            {[
              {
                action: '用户登录',
                user: '张三',
                details: '从 192.168.1.100 登录系统',
                time: '2分钟前',
                icon: <Person />,
              },
              {
                action: '权限变更',
                user: '管理员',
                details: '为李四分配了会员角色',
                time: '15分钟前',
                icon: <Security />,
              },
              {
                action: '用户创建',
                user: '管理员',
                details: '创建了新用户账户：王五',
                time: '1小时前',
                icon: <Add />,
              },
              {
                action: '设置更改',
                user: '系统',
                details: '更新了系统通知设置',
                time: '2小时前',
                icon: <Settings />,
              },
            ].map((log, index) => (
              <ListItem key={index} divider={index < 3}>
                <ListItemIcon>
                  {log.icon}
                </ListItemIcon>
                <ListItemText
                  primary={log.action}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {log.user} - {log.details}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {log.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>

      {/* 用户详情对话框 */}
      <Dialog open={userDialogOpen} onClose={handleUserDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          用户详情 - {selectedUser?.name || '新用户'}
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}>
                    {selectedUser.avatar}
                  </Avatar>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.email}
                  </Typography>
                  <Chip
                    label={selectedUser.role}
                    size="small"
                    color={getRoleColor(selectedUser.role) as any}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h6" gutterBottom>
                  基本信息
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="姓名"
                      defaultValue={selectedUser.name}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="邮箱"
                      defaultValue={selectedUser.email}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="电话"
                      defaultValue={selectedUser.phone}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="公司"
                      defaultValue={selectedUser.company}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>角色</InputLabel>
                      <Select defaultValue={selectedUser.role} label="角色">
                        <MenuItem value="管理员">管理员</MenuItem>
                        <MenuItem value="会员">会员</MenuItem>
                        <MenuItem value="用户">用户</MenuItem>
                        <MenuItem value="访客">访客</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>状态</InputLabel>
                      <Select defaultValue={selectedUser.status} label="状态">
                        <MenuItem value="活跃">活跃</MenuItem>
                        <MenuItem value="在线">在线</MenuItem>
                        <MenuItem value="离线">离线</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserDialogClose}>取消</Button>
          <Button variant="contained" onClick={handleUserDialogClose}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 角色管理对话框 */}
      <Dialog open={roleDialogOpen} onClose={handleRoleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>创建/编辑角色</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="角色名称"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="描述"
                multiline
                rows={3}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleDialogClose}>取消</Button>
          <Button variant="contained" onClick={handleRoleDialogClose}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
