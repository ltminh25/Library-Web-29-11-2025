import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './route/privateRoute'
import RoleBasedRedirect from './route/RoleBasedRedirect'
import Register from './components/Register'
import StaffLayout from './components/layout/StaffLayout'
import './App.css'
import BookManagement from './components/BookManagement'
import { BookProvider } from './components/context/BookContext'
import { TransactionProvider } from './components/context/TransactionContext'
import { ReaderTransactionProvider } from './components/context/ReaderTransactionContext'
import { UserProvider } from './components/context/UserContext'
import { SocialProvider } from './components/context/SocialContext'
import { FineProvider } from './components/context/FineContext'
import StaffTransaction from './components/StaffPages/StaffTransactions'
import OverdueList from './components/StaffPages/StaffOverduelist'
import StaffUsers from './components/StaffPages/StaffUsers'
import StaffSocial from './components/StaffPages/StaffSocial'
import UserProfile from './components/Profile/UserProfile'
import StaffNotifications from './components/StaffPages/StaffNotifications'
import FineManagement from './components/StaffPages/FineManagement'
import StaffDashboard from './components/StaffPages/StaffDashboard'
// Reader components
import Reader from './components/reader/Reader'
import ReaderLanding from './components/reader/Landing'
import ReaderBooks from './components/reader/Books'
import ReaderTransactions from './components/reader/Transactions'
import BookDetail from './components/reader/BookDetail'
// import ReaderProfile from './components/reader/Profile'
import ReaderNotifications from './components/reader/Notifications'
import { NotificationProvider } from './components/context/NotificationContext'
import { ProfileProvider } from './components/context/ProfileContext'
import { Suspense } from 'react'
import { SystemAlertProvider } from './components/common/SystemAlertProvider'

function App() {
  return (
    <SystemAlertProvider>
      <Router>
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '24px',
            color: '#667eea'
          }}>
            <div>�?3 �?ang t���i...</div>
          </div>
        }>
          <BookProvider>
          <NotificationProvider>
            <ProfileProvider>
              <TransactionProvider>
              <ReaderTransactionProvider>
                <UserProvider>
                  <SocialProvider>
                    <FineProvider>
                      <div className="app">
                        <Routes>
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />

                          {/* Role-based redirect for root path */}
                          <Route
                            path="/"
                            element={
                              <PrivateRoute>
                                <RoleBasedRedirect />
                              </PrivateRoute>
                            }
                          />
                          
                          {/* Legacy routes - keeping for backward compatibility */}

                          {/* Staff Routes */}
                          <Route path="/staff" element={
                            <PrivateRoute>
                              <StaffLayout> <StaffDashboard /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/books" element={
                            <PrivateRoute>
                              <StaffLayout> <BookManagement /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/transactions" element={
                            <PrivateRoute>
                              <StaffLayout> <StaffTransaction /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/transactions/overdue" element={
                            <PrivateRoute>
                              <StaffLayout> <OverdueList /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/users" element={
                            <PrivateRoute>
                              <StaffLayout> <StaffUsers /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/social" element={
                            <PrivateRoute>
                              <StaffLayout> <StaffSocial /> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/profile" element={
                            <PrivateRoute>
                              <StaffLayout> <UserProfile/> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/notifications" element={
                            <PrivateRoute>
                              <StaffLayout> <StaffNotifications/> </StaffLayout>
                            </PrivateRoute>
                          } />
                          <Route path="/staff/fines" element={
                            <PrivateRoute>
                              <StaffLayout> <FineManagement/> </StaffLayout>
                            </PrivateRoute>
                          } />

                        {/* Reader Routes - Protected */}
                        <Route path="/reader" element={
                          <PrivateRoute>
                            <Reader />
                          </PrivateRoute>
                        }>
                          <Route index element={<ReaderLanding />} />
                          <Route path="books" element={<ReaderBooks />} />
                          <Route path="transactions" element={<ReaderTransactions />} />
                          <Route path="books/:id" element={<BookDetail />} />
                          <Route path="profile" element={<UserProfile />} />
                          <Route path="notifications" element={<ReaderNotifications />} />
                        </Route>
                          
                          {/* Wildcard route - redirect to role-based page */}
                          <Route path="*" element={
                            <PrivateRoute>
                              <RoleBasedRedirect />
                            </PrivateRoute>
                          } />
                        </Routes>
                      </div>
                    </FineProvider>
                  </SocialProvider>
                </UserProvider>
              </ReaderTransactionProvider>
              </TransactionProvider>
            </ProfileProvider>
          </NotificationProvider>
        </BookProvider>
        </Suspense>
      </Router>
    </SystemAlertProvider>
  );
}

export default App;
