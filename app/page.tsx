"use client";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Chip,
  Stack,
  Alert,
  LinearProgress,
} from '@mui/material';
import Layout from './components/Layout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function Home() {
  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          欢迎使用 Next.js + Material-UI
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          这是一个增强的演示项目，包含更多功能和组件
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 3 }}>
          <Chip label="新功能" color="primary" />
          <Chip label="响应式设计" color="success" />
          <Chip label="Material-UI" color="info" />
          <Chip label="Next.js" color="secondary" />
        </Stack>
      </Box>

      <Alert severity="success" sx={{ mb: 3 }}>
        欢迎体验我们的新界面！现在包含了导航栏、侧边栏和更多交互式组件。
      </Alert>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                响应式导航
              </Typography>
              <Typography variant="body2" color="text.secondary">
                新的顶部导航栏和侧边栏提供了更好的用户体验和导航功能。
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">完成度</Typography>
                <LinearProgress variant="determinate" value={80} />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" startIcon={<FavoriteIcon />}>
                喜欢
              </Button>
              <Button size="small" endIcon={<ShareIcon />}>
                分享
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                丰富的组件
              </Typography>
              <Typography variant="body2" color="text.secondary">
                MUI 提供了丰富的组件库，帮助你快速构建美观的用户界面。
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Chip label="组件" size="small" color="primary" />
                <Chip label="美观" size="small" color="success" />
                <Chip label="灵活" size="small" color="info" />
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">了解更多</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                现代技术
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next.js 提供了出色的性能和开发体验，支持服务端渲染和静态生成。
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">性能评分</Typography>
                <LinearProgress variant="determinate" value={95} color="success" />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">查看详情</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                增强的联系表单
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="姓名"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="邮箱"
                      type="email"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="公司"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="电话"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="消息"
                      multiline
                      rows={4}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button variant="contained" size="large">
                      提交表单
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                快速统计
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  95%
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  用户满意度
                </Typography>
                
                <Typography variant="h3" color="success.main" gutterBottom>
                  50+
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  可用组件
                </Typography>
                
                <Typography variant="h3" color="info.main" gutterBottom>
                  24/7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  技术支持
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
