import { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import logoImage from '../../assets/logo.png';
import {
  LibraryBooks,
  History,
  Person,
  Settings,
  ExitToApp,
  Notifications,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import notificationApi from '../../api/notificationApi';

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #715BB9 0%, #6C5DA8 50%, #715BB9 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: 'white',
    borderRight: '0',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 80,
    boxShadow: '0 24px 48px rgba(113, 91, 185, 0.25), 0 0 80px rgba(108, 93, 168, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: -1,
    },
  },
});

const LogoContainer = styled(Box)({
  padding: '28px 24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  cursor: 'pointer',
  borderTopRightRadius: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-2px)',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      animation: 'shimmer 2s infinite',
    },
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
});

const LogoImage = styled('img')({
  width: '56px',
  height: '56px',
  borderRadius: 0,
  boxShadow: 'none',
  border: 'none',
  transition: 'all 0.3s ease',
  objectFit: 'cover',
  objectPosition: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const LogoText = styled(Typography)({
  fontWeight: 800,
  fontSize: '1.35rem',
  color: 'white',
  letterSpacing: 0.5,
  textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2)',
  fontFamily: 'Roboto, sans-serif',
});

const UserAvatar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: '24px',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
  padding: '28px',
  background: '#F7F9FC',
  minHeight: '100vh',
});

const ContentWrapper = styled(Box)({
  backgroundColor: 'white',
  borderRadius: 24,
  boxShadow: '0 24px 48px rgba(91, 110, 245, 0.08)',
  padding: 20,
  minHeight: 'calc(100vh - 140px)',
  border: '1px solid rgba(91, 110, 245, 0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
});

const NotificationIcon = styled(IconButton)({
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05))',
  border: '2px solid rgba(255, 107, 107, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1))',
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 8px 20px rgba(255, 107, 107, 0.25)',
    border: '2px solid rgba(255, 107, 107, 0.5)',
  },
  '& svg': {
    filter: 'drop-shadow(0 2px 4px rgba(255, 107, 107, 0.3))',
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNoti, setLoadingNoti] = useState(false);

  const fetchNotifications = async () => {
    try{
      setLoadingNoti(true);
      const res = await notificationApi.getMyNotifications();
      setNotifications(res || []);
    } catch (err){
      console.error("Lỗi khi tải thông báo:", err);
    } finally {
      setLoadingNoti(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [])

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const menuItems = [
    { text: 'Danh mục sách', icon: <LibraryBooks />, path: '/books' },
    { text: 'Lịch sử mượn sách', icon: <History />, path: '/history' },
  ];

  const userMenuItems = [
    { text: 'Thông tin cá nhân', icon: <Person />, action: () => navigate('/profile') },
    { text: 'Đổi mật khẩu', icon: <Settings />, action: () => navigate('/change-password') },
    { text: 'Đăng xuất', icon: <ExitToApp />, action: () => {
      sessionStorage.clear();
      navigate('/login') 
    }},
  ];

  // Get page title based on current route
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer variant="permanent">
        <LogoContainer onClick={() => navigate('/')}>
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText variant="h6">PTIT Library</LogoText>
        </LogoContainer>
        <List sx={{ padding: '20px 16px' }}>
          {menuItems.map((item) => (
            <ListItem
              component="div"
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                cursor: 'pointer',
                borderRadius: 3,
                mb: 1.5,
                padding: '14px 18px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'translateX(10px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  '&::before': {
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'white',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  borderRadius: '0 4px 4px 0',
                },
                '&.active': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: 'white', 
                minWidth: 48, 
                fontSize: '1.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.15) rotate(5deg)',
                  filter: 'drop-shadow(0 4px 8px rgba(255,255,255,0.3))',
                },
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: '0.02em',
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
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
              Người dùng
            </Typography>
            <Typography sx={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.8rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              fontWeight: 500,
            }}>
              Thành viên
            </Typography>
          </Box>
        </UserAvatar>
      </StyledDrawer>

      <Box sx={{ flexGrow: 1 }}>
        <MainContent>
          <ContentWrapper>
            <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 2 }}>
              <NotificationIcon onClick={handleNotificationClick}>
                <Badge
                  badgeContent={notifications?.filter((n: any) => n.status !== "READ").length ?? 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    },
                  }}
                >
                  <Notifications sx={{ color: "#ff6b6b", fontSize: "1.2rem" }} />
                </Badge>
              </NotificationIcon>
            </Box>
            {children}
          </ContentWrapper>
        </MainContent>
      </Box>

      {/* === User menu === */}
      <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={handleUserMenuClose}>
        {userMenuItems.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              item.action();
              handleUserMenuClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>

      {/* === Notification popover === */}
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List sx={{ width: 320, maxHeight: 400, overflowY: "auto", p: 1 }}>
          {loadingNoti ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : notifications?.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: "center", color: "gray" }}>
              Không có thông báo
            </Typography>
          ) : (
            notifications?.map((noti: any) => (
              <ListItem
                key={noti.id}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: noti.status === "READ" ? "#fff" : "rgba(255,107,107,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,107,107,0.2)" },
                }}
                onClick={() => {
                  // tuỳ chọn: đánh dấu đã đọc
                  notificationApi.markAsRead?.(noti.id);
                  console.log("Đã đọc thông báo", noti.title);
                  fetchNotifications();
                }}
              >
                <ListItemText
                  primary={noti.title}
                  secondary={noti.body}
                  sx={{
                    "& .MuiListItemText-primary": { fontWeight: noti.isRead ? 400 : 600 },
                    "& .MuiListItemText-secondary": { color: "#555" },
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </Box>
  );
};

export default Layout;