
// Icons.tsx

// MUI Icons
import DashboardIconMui from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExploreIconMui from "@mui/icons-material/Explore";
import BarChartIcon from "@mui/icons-material/BarChart";
import EventIconMui from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIconMui from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIconMui from "@mui/icons-material/Logout";
import SearchIconMui from "@mui/icons-material/Search";
import EditIconMui from "@mui/icons-material/Edit";
import PersonRemoveIconMui from "@mui/icons-material/PersonRemove";
import WarningIconMui from "@mui/icons-material/Warning";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import TrendingUpIconMui from "@mui/icons-material/TrendingUp";
import ShieldIconMui from "@mui/icons-material/Security";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import ActivityIconMui from "@mui/icons-material/QueryStats";
import ScheduleIconMui from "@mui/icons-material/Schedule";
import ArrowForwardIconMui from "@mui/icons-material/ArrowForward";
import InventoryIconMui from "@mui/icons-material/Inventory2";
import ChevronLeftIconMui from "@mui/icons-material/ChevronLeft";
import ChevronRightIconMui from "@mui/icons-material/ChevronRight";
import CalendarMonthIconMui from "@mui/icons-material/CalendarMonth";
import AddCircleIconMui from "@mui/icons-material/AddCircle";
import PublicIconMui from "@mui/icons-material/Public";
import FilterListIconMui from "@mui/icons-material/FilterList";
import EmojiEventsIconMui from "@mui/icons-material/EmojiEvents";
import TimerIconMui from "@mui/icons-material/Timer";
import WorkspacePremiumIconMui from "@mui/icons-material/WorkspacePremium";
import FlagIconMui from "@mui/icons-material/Flag";
import CheckCircleIconMui from "@mui/icons-material/CheckCircle";
import PersonIconMui from "@mui/icons-material/Person";
import Person2IconMui from "@mui/icons-material/Person2";
import DeleteIconMui from "@mui/icons-material/Delete";
import StarsIconMui from "@mui/icons-material/Stars";
import PersonAddIconMui from "@mui/icons-material/PersonAdd";
import MenuIconMui from "@mui/icons-material/Menu";
import CloseIconMui from "@mui/icons-material/Close";
import ChatIconMui from "@mui/icons-material/Chat";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import InsightsIcon from "@mui/icons-material/Insights";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";



// ===== EXPORT WITH SAME NAMES AS BEFORE =====

export const DashboardIcon = DashboardIconMui;
export const UsersIcon = PeopleIcon;
export const ExploreIcon = ExploreIconMui;
export const RankingsIcon = BarChartIcon;
export const EventIcon = EventIconMui;
export const BellIcon = NotificationsIcon;
export const SettingsIcon = SettingsIconMui;
export const ActivityIcon = ActivityIconMui;
export const ScheduleIcon = ScheduleIconMui;
export const ArrowForwardIcon = ArrowForwardIconMui;
export const ArchiveIcon = InventoryIconMui;
export const ChevronLeftIcon = ChevronLeftIconMui;
export const ChevronRightIcon = ChevronRightIconMui;
export const CalendarMonthIcon = CalendarMonthIconMui;
export const GroupsIconComp = GroupsIcon;
export const AddCircleIcon = AddCircleIconMui;
export const PublicIcon = PublicIconMui;
export const FilterListIcon = FilterListIconMui;
export const EmojiEventsIcon = EmojiEventsIconMui;
export const TimerIcon = TimerIconMui;
export const WorkspacePremiumIcon = WorkspacePremiumIconMui;
export const FlagIcon = FlagIconMui;
export const CheckCircleIcon = CheckCircleIconMui;
export const PersonIcon = PersonIconMui;
export const Person2Icon = Person2IconMui;
export const DeleteIcon = DeleteIconMui;
export const StarsIcon = StarsIconMui;
export const PersonAddIcon = PersonAddIconMui;
export const MenuIcon = MenuIconMui;
export const CloseIcon = CloseIconMui;
export const MessageIcon = ChatIconMui;


export const GroupSettingsIcon = SettingsIconMui;
export const MemberCountIcon = GroupsIcon;
export const LeaveGroupIcon = LogoutIconMui;

export const UserIcon = PeopleIcon;
export const UserGroupIcon = GroupsIcon;
export const ShieldIcon = ShieldIconMui;
export const CalendarIcon = CalendarTodayIcon;
export const WarningIcon = WarningIconMui;
export const ClockIcon = AccessTimeIcon;
export const DatabaseIcon = StorageIcon;
export const ServerIcon = DnsIcon;
export const TrendingUpIcon = TrendingUpIconMui;
export const LogoutIcon = LogoutIconMui;
export const SearchIcon = SearchIconMui;
export const EditIcon = EditIconMui;
export const PersonRemoveIcon = PersonRemoveIconMui;

// Fix: Restore LogoIcon used in Layout and Login
export const LogoIcon = ({ size = 24 }: { size?: number }) => (
  <SchoolIcon sx={{ fontSize: size }} />
);

// Role icons
export const CaptainIcon = StarsIconMui;
export const ViceCaptainIcon = MilitaryTechIcon;
export const StrategistIcon = InsightsIcon;
export const ManagerIcon = AssignmentIndIcon;

export const StudentRoleIcon = () => <span className="text-3xl">🎓</span>;
export const FacultyRoleIcon = () => <span className="text-3xl">🏫</span>;
export const AdminRoleIcon = () => <span className="text-3xl">⚡</span>;
