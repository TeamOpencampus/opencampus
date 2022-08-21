import { Route, Routes } from 'react-router-dom';
import { LoginPage, ResetPage, SignupPage } from './pages/authentication';
import { CompaniesPage } from './pages/dashboard/collage/CompaniesPage';
import PostDetails from './pages/dashboard/collage/PostDetails';
import { PostsPage } from './pages/dashboard/collage/PostsPage';
import { ReportsPage } from './pages/dashboard/collage/ReportsPage';
import { StudentsPage } from './pages/dashboard/collage/StudentsPage';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/dashboard/HomePage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import JobDetails from './pages/dashboard/student/JobDetails';
import JobsFeed from './pages/dashboard/student/JobsFeed';
import MyAssessments from './pages/dashboard/student/MyAssessments';
import MyInterviews from './pages/dashboard/student/MyInterviews';
import MyProfile from './pages/dashboard/student/MyProfile';
import { NoMatchPage } from './pages/NoMatchPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}>
        <Route index element={<Dashboard />} />
        <Route path='settings' element={<SettingsPage />} />
        {/* students */}
        <Route path='jobsfeed' element={<JobsFeed />} />
        <Route path='job/:jobId' element={<JobDetails />} />
        <Route path='assessments' element={<MyAssessments />} />
        <Route path='interviews' element={<MyInterviews />} />
        <Route path='profile' element={<MyProfile />} />
        {/* collage */}
        <Route path='students' element={<StudentsPage />} />
        <Route path='companies' element={<CompaniesPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path='posts/:postId' element={<PostDetails />} />
        <Route path='reports' element={<ReportsPage />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='reset' element={<ResetPage />} />
      <Route path='*' element={<NoMatchPage />} />
    </Routes>
  );
}

export default App;
