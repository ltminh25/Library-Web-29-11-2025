import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Popover,
} from '@mui/material';
import logoImage from '../../assets/logo.png';
import {
  LibraryBooks,
  History,
  Person,
  ExitToApp,
  Notifications,
  Home,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import notificationApi from '../../api/notificationApi';
import { decodeToken, type JWTPayload } from '../../utils/jwtUtils';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #715BB9 0%, #6C5DA8 50%, #715BB9 100%)',
    color: 'white',
    borderRight: '0',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  paddingBottom: 0,
    boxShadow: '0 20px 40px rgba(113, 91, 185, 0.3)',
    // Stick sidebar and allow pushing user tab to bottom
    height: '100vh',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

const LogoContainer = styled(Box)({
  padding: '24px 20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  borderTopRightRadius: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)',
  },
});

const LogoImage = styled('img')({
  width: '50px',
  height: '50px',
  borderRadius: 0,
  boxShadow: 'none',
  border: 'none',
  objectFit: 'cover',
  objectPosition: 'center',
});

const LogoText = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.2rem',
  color: 'white',
  letterSpacing: 0.5,
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
});

const UserAvatar = styled(Box)({
  width: '100%',
  padding: '24px',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginTop: 'auto',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-3px)',
    boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
  },
  borderBottomRightRadius: 28,
});

const AvatarCircle = styled(Box)({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid rgba(255,255,255,0.4)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.25), inset 0 2px 8px rgba(255,255,255,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
});

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: '24px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
});

const ContentWrapper = styled(Box)({
  backgroundColor: 'white',
  borderRadius: 20,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  padding: 16,
  minHeight: 'calc(100vh - 120px)',
  border: '1px solid rgba(255,255,255,0.8)',
  position: 'relative',
});

const NotificationIcon = styled(IconButton)({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'transparent',
  border: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
});

const SidebarScroll = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export default function Reader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>('Người dùng');
  const [userRole, setUserRole] = useState<string>('Độc giả');

  const mapRoleLabel = (role?: string | null) => {
    switch (role) {
      case 'ADMIN':
        return 'Quản trị';
      case 'STAFF':
        return 'Nhân viên';
      case 'READER':
        return 'Độc giả';
      default:
        return 'Thành viên';
    }
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationApi.getMyNotifications();
      setNotifications(response || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: number) => {
    try {
      await notificationApi.markAsRead(id);
      // Update local state
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, status: 'READ' } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Fetch notifications on mount and when opening popup
  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load user name/role from token to mirror Admin style
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;
    const payload = decodeToken(token) as JWTPayload | null;
    if (payload) {
      const name = (payload as any).fullName || (payload as any).name || payload.username || payload.sub || 'Người dùng';
      setUserName(name);
      setUserRole(mapRoleLabel(payload.role));
    }
  }, []);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
    fetchNotifications(); // Refresh notifications when opening
  };
  const handleNotificationClose = () => setNotificationAnchor(null);

  const menuItems = [
    { text: 'Trang chủ', icon: <Home />, path: '/reader' },
    { text: 'Danh mục sách', icon: <LibraryBooks />, path: '/reader/books' },
    { text: 'Lịch sử mượn trả', icon: <History />, path: '/reader/transactions' },
  ];

  const userMenuItems = [
    { text: 'Thông tin cá nhân', icon: <Person />, action: () => navigate('/reader/profile') },
    { text: 'Đăng xuất', icon: <ExitToApp />, action: () => {
      sessionStorage.clear();
      navigate('/login');
    }},
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <StyledDrawer variant="permanent">
  <LogoContainer onClick={() => navigate('/reader')}>
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText variant="h6">PTIT Library</LogoText>
        </LogoContainer>

        <SidebarScroll>
          <List sx={{ padding: '16px 12px' }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 16,
                  mb: 1,
                  padding: '12px 16px',
                  transition: 'all 0.3s ease',
                  backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.3)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 44 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ '& .MuiListItemText-primary': { color: 'white', fontWeight: 600 } }} />
              </ListItem>
            ))}
          </List>
        </SidebarScroll>

        <UserAvatar onClick={handleUserMenuClick}>
          <AvatarCircle>
            <Person sx={{ color: 'white', fontSize: '1.5rem' }} />
          </AvatarCircle>
          <Box>
            <Typography sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'Roboto, sans-serif',
            }}>
              {userName}
            </Typography>
            <Typography sx={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.8rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              fontWeight: 500,
            }}>
              {userRole}
            </Typography>
          </Box>
        </UserAvatar>
      </StyledDrawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <MainContent>
          <ContentWrapper>
            <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 2, zIndex: 10 }}>
              <NotificationIcon onClick={handleNotificationClick}>
                <Badge 
                  badgeContent={notifications.filter((n: any) => n.status !== 'READ').length}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }
                  }}
                >
                  <Notifications sx={{ color: '#ff6b6b', fontSize: '1.5rem' }} />
                </Badge>
              </NotificationIcon>
            </Box>
            <Outlet /> {/* ⚡️ Hiển thị nội dung route con */}
          </ContentWrapper>
        </MainContent>
      </Box>

      {/* User menu */}
      <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
        {userMenuItems.map((item) => (
          <MenuItem key={item.text} onClick={() => { item.action(); handleUserMenuClose(); }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>

      {/* Notifications popover */}
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List sx={{ width: 350, maxHeight: 450, overflow: 'auto', padding: 0 }}>
          {loading ? (
            <ListItem>
              <ListItemText primary="Đang tải thông báo..." />
            </ListItem>
          ) : notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="Không có thông báo mới" />
            </ListItem>
          ) : (
            notifications.map((n) => (
              <ListItem 
                key={n.id}
                onMouseEnter={() => {
                  if (n.status !== 'READ') {
                    markAsRead(n.id);
                  }
                }}
                sx={{
                  backgroundColor: n.status === 'READ' ? 'transparent' : 'rgba(91, 110, 245, 0.08)',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(91, 110, 245, 0.12)',
                  }
                }}
              >
                <ListItemText 
                  primary={n.message}
                  secondary={new Date(n.createdAt).toLocaleString('vi-VN')}
                  primaryTypographyProps={{
                    fontWeight: n.status === 'READ' ? 400 : 600,
                    fontSize: '0.95rem',
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </Box>
  );
}
