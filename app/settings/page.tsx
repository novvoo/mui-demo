"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Slider,
} from '@mui/material';
import Layout from '../components/Layout';
import {
  DarkMode,
  Notifications,
  Security,
  Palette,
  Language,
  Accessibility,
  Storage,
  Backup,
  Sync,
  Email,
  Sms,
  PushPin,
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'zh-CN',
    fontSize: 14,
    denseLayout: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataCollection: true,
    analytics: true,
    locationTracking: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          系统设置
        </Typography>
        <Typography variant="body1" color="text.secondary">
          自定义应用外观、通知和隐私设置
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="设置标签页">
            <Tab label="外观" />
            <Tab label="通知" />
            <Tab label="隐私" />
            <Tab label="系统" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Palette sx={{ mr: 1 }} />
                    主题设置
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel>主题模式</InputLabel>
                      <Select
                        value={appearance.theme}
                        label="主题模式"
                        onChange={(e) => setAppearance({...appearance, theme: e.target.value})}
                      >
                        <MenuItem value="light">浅色模式</MenuItem>
                        <MenuItem value="dark">深色模式</MenuItem>
                        <MenuItem value="auto">跟随系统</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel>语言</InputLabel>
                      <Select
                        value={appearance.language}
                        label="语言"
                        onChange={(e) => setAppearance({...appearance, language: e.target.value})}
                      >
                        <MenuItem value="zh-CN">简体中文</MenuItem>
                        <MenuItem value="zh-TW">繁体中文</MenuItem>
                        <MenuItem value="en-US">English</MenuItem>
                        <MenuItem value="ja-JP">日本語</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>
                      字体大小: {appearance.fontSize}px
                    </Typography>
                    <Slider
                      value={appearance.fontSize}
                      onChange={(_, newValue) => setAppearance({...appearance, fontSize: newValue as number})}
                      min={12}
                      max={20}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={appearance.denseLayout}
                        onChange={(e) => setAppearance({...appearance, denseLayout: e.target.checked})}
                      />
                    }
                    label="紧凑布局"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    快捷操作
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="清除缓存"
                        secondary="删除临时文件和缓存数据"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined">
                          清除
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="重置设置"
                        secondary="恢复默认配置"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined" color="warning">
                          重置
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="导出设置"
                        secondary="保存当前配置为文件"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined">
                          导出
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Notifications sx={{ mr: 1 }} />
                    通知设置
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="邮件通知"
                        secondary="接收重要更新的邮件提醒"
                        sx={{ mr: 2 }}
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.email}
                              onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="短信通知"
                        secondary="接收紧急情况的短信提醒"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.sms}
                              onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="推送通知"
                        secondary="在浏览器中显示通知"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.push}
                              onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="营销通知"
                        secondary="接收产品更新和促销活动信息"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={notifications.marketing}
                              onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    通知偏好
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    您可以在任何时候更改通知偏好设置
                  </Alert>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    通知时间
                  </Typography>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="开始时间"
                        type="time"
                        defaultValue="09:00"
                        size="small"
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="结束时间"
                        type="time"
                        defaultValue="22:00"
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    通知频率
                  </Typography>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>频率</InputLabel>
                    <Select value="immediate" label="频率">
                      <MenuItem value="immediate">立即</MenuItem>
                      <MenuItem value="hourly">每小时</MenuItem>
                      <MenuItem value="daily">每天</MenuItem>
                      <MenuItem value="weekly">每周</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Security sx={{ mr: 1 }} />
                    隐私设置
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="数据收集"
                        secondary="允许收集使用数据以改进服务"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.dataCollection}
                              onChange={(e) => setPrivacy({...privacy, dataCollection: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="分析跟踪"
                        secondary="允许使用分析工具跟踪使用情况"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.analytics}
                              onChange={(e) => setPrivacy({...privacy, analytics: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="位置跟踪"
                        secondary="允许获取位置信息"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.locationTracking}
                              onChange={(e) => setPrivacy({...privacy, locationTracking: e.target.checked})}
                            />
                          }
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    账户隐私
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    个人资料可见性
                  </Typography>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>可见性</InputLabel>
                    <Select
                      value={privacy.profileVisibility}
                      label="可见性"
                      onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                    >
                      <MenuItem value="public">公开</MenuItem>
                      <MenuItem value="private">私人</MenuItem>
                      <MenuItem value="friends">仅好友</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    数据保留
                  </Typography>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>保留期</InputLabel>
                    <Select value="1year" label="保留期">
                      <MenuItem value="6months">6个月</MenuItem>
                      <MenuItem value="1year">1年</MenuItem>
                      <MenuItem value="2years">2年</MenuItem>
                      <MenuItem value="forever">永久</MenuItem>
                    </Select>
                  </FormControl>

                  <Button variant="outlined" color="error" fullWidth>
                    删除所有数据
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Storage sx={{ mr: 1 }} />
                    存储管理
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      存储使用情况
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <div style={{ background: '#e0e0e0', height: '8px', borderRadius: '4px' }}>
                          <div style={{ background: '#1976d2', width: '65%', height: '8px', borderRadius: '4px' }}></div>
                        </div>
                      </Box>
                      <Typography variant="body2">65%</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      已使用 6.5 GB / 10 GB
                    </Typography>
                  </Box>

                  <List>
                    <ListItem>
                      <ListItemText
                        primary="缓存数据"
                        secondary="1.2 GB"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined">
                          清理
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="下载文件"
                        secondary="2.1 GB"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined">
                          管理
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="临时文件"
                        secondary="0.3 GB"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" variant="outlined" color="warning">
                          清理
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Backup sx={{ mr: 1 }} />
                    备份与同步
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="自动备份"
                        secondary="每日凌晨2点自动备份"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="云同步"
                        secondary="同步到云端存储"
                      />
                      <ListItemSecondaryAction>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label=""
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                      立即备份
                    </Button>
                    <Button variant="outlined" fullWidth>
                      恢复备份
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                系统信息
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">v1.0.0</Typography>
                    <Typography variant="body2" color="text.secondary">应用版本</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">99.9%</Typography>
                    <Typography variant="body2" color="text.secondary">运行时间</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">2.3s</Typography>
                    <Typography variant="body2" color="text.secondary">平均响应</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">1.2GB</Typography>
                    <Typography variant="body2" color="text.secondary">内存使用</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>
    </Layout>
  );
}
