"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
} from '@mui/material';
import Layout from '../components/Layout';
import {
  Edit,
  Delete,
  MoreVert,
  Search,
  FilterList,
  Download,
  Add,
  Person,
  Email,
  Phone,
  Business,
} from '@mui/icons-material';
import { useState } from 'react';

export default function TablePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  // 模拟数据
  const [rows, setRows] = useState([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '138-0013-8000',
      company: '科技有限公司',
      role: '管理员',
      status: '活跃',
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
      avatar: 'L',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      phone: '138-0013-8002',
      company: '数字媒体',
      role: '会员',
      status: '活跃',
      avatar: 'W',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      phone: '138-0013-8003',
      company: '软件开发',
      role: '访客',
      status: '在线',
      avatar: 'Z',
    },
    {
      id: 5,
      name: '孙七',
      email: 'sunqi@example.com',
      phone: '138-0013-8004',
      company: '咨询服务',
      role: '用户',
      status: '活跃',
      avatar: 'S',
    },
    {
      id: 6,
      name: '周八',
      email: 'zhouba@example.com',
      phone: '138-0013-8005',
      company: '科技园',
      role: '会员',
      status: '离线',
      avatar: 'Z',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '活跃':
        return 'success';
      case '在线':
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

  // 过滤数据
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页数据
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleEdit = (event?: React.MouseEvent) => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedRow) {
      setRows(rows.filter(row => row.id !== selectedRow.id));
    }
    handleMenuClose();
  };

  const handleEditSave = () => {
    setEditDialogOpen(false);
    // 这里可以添加保存逻辑
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              数据表格
            </Typography>
            <Typography variant="body1" color="text.secondary">
              管理用户数据，支持搜索、排序和编辑功能
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button variant="outlined" startIcon={<Download />}>
                导出
              </Button>
              <Button variant="outlined" startIcon={<FilterList />}>
                筛选
              </Button>
              <Button variant="contained" startIcon={<Add />}>
                添加用户
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="搜索用户、邮箱或公司..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>用户</TableCell>
                  <TableCell>邮箱</TableCell>
                  <TableCell>电话</TableCell>
                  <TableCell>公司</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>状态</TableCell>
                  <TableCell align="right">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                          {row.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.company}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.role}
                        size="small"
                        color={getRoleColor(row.role) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={getStatusColor(row.status) as any}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="编辑">
                        <IconButton size="small" onClick={(e) => handleEdit(e)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="删除">
                        <IconButton size="small" onClick={handleDelete}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, row)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="每页显示:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} / ${count !== -1 ? count : `超过 ${to}`}`
            }
          />
        </CardContent>
      </Card>

      {/* 操作菜单 */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Person sx={{ mr: 1 }} />
          编辑用户
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Email sx={{ mr: 1 }} />
          发送邮件
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Phone sx={{ mr: 1 }} />
          拨打电话
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Business sx={{ mr: 1 }} />
          查看公司
        </MenuItem>
      </Menu>

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>编辑用户信息</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="姓名"
                    defaultValue={selectedRow.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="邮箱"
                    defaultValue={selectedRow.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="电话"
                    defaultValue={selectedRow.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="公司"
                    defaultValue={selectedRow.company}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="角色"
                    defaultValue={selectedRow.role}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="状态"
                    defaultValue={selectedRow.status}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
          <Button onClick={handleEditSave} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
