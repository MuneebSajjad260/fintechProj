import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import memberSelectionSlice from './slices/memberSelectionSlice';
import meetingHomeScreenBookingSlice from './slices/meetingHomeScreenBookingSlice';
import authSlice from './slices/authSlice';
import setPasswordSlice from './slices/setPasswordSlice';
import PublicResourceSlice from './slices/PublicResourceSlice';
import GetTeamSlice from './slices/GetTeamSlice';
import DateSlice from './slices/DateSlice';
import PlanRequestSlice from './slices/PlanRequestSlice';
import ResourcePlanSlice from './slices/ResourcePlanSlice';
import planResourceDataSlice from './slices/planResourceDataSlice';
import GetSinglePlanSlice from './slices/GetSinglePlanSlice';
import GetSinglePlanMemberSlice from './slices/GetSinglePlanMemberSlice';
import PrivateOfficeResourcesSlice from './slices/PrivateOfficeResourcesSlice';
import profileEditSlice from './slices/profileEditSlice';
import GetPricingDeskSlice from './slices/GetPricingDeskSlice';
import GetPricingMemberDeskSlice from './slices/GetPricingMemberDeskSlice';
import GetProfileSlice from './slices/GetProfileSlice';
import GetPendingPlanSlice from './slices/GetPendingPlanSlice';
import PendingStatusSlice from './slices/PendingStatusSlice';
import isadminSlice from './slices/isadminSlice';
import DayPassProductSlice from './slices/DayPassProductSlice';
import dayPassProductData from './slices/dayPassProductData';
import FeedsSlice from './slices/FeedsSlice';
import GetMeetingRoomSlice from './slices/GetMeetingRoomSlice';
import GetMeetingBookingSlice from './slices/GetMeetingBookingSlice';
import MeetingRoomPriceSlice from './slices/MeetingRoomPriceSlice';
import MeetingRoomRequestSlice from './slices/MeetingRoomRequestSlice';
import DayPassPriceSlice from './slices/DayPassPriceSlice';
import DayPassPaymentDetailSlice from './slices/DayPassPaymentDetailSlice';
import GetMembershipDetailSlice from './slices/GetMembershipDetailSlice';
import GetSingleInvoiceDetailSlice from './slices/GetSingleInvoiceDetailSlice';
import DayPassAvailibiltySlice from './slices/DayPassAvailibiltySlice';
import DayPassUploadSlice from './slices/DayPassUploadSlice';
import DayPassCommentSlice from './slices/DayPassCommentSlice';
import BookingSettingSlice from './slices/BookingSettingSlice';
import MeetingRoomCommentSlice from './slices/MeetingRoomCommentSlice';
import DayPassCheckSlice from './slices/DayPassCheckSlice';
import GetCustomerMeetingRoomsSlice from './slices/GetCustomerMeetingRoomsSlice';
import GetDayPassBookingsSlice from './slices/GetDayPassBookingsSlice';
import DayPassResheduleSlice from './slices/DayPassResheduleSlice';
import MeetingRoomRescheduleSlice from './slices/MeetingRoomRescheduleSlice';
import CancelMeetingRoomSlice from './slices/CancelMeetingRoomSlice';
import MemberTeamManagementSlice from './slices/MemberTeamManagementSlice';
import LeadTeamManagementSlice from './slices/LeadTeamManagementSlice';
import TeamSettingsSlice from './slices/TeamSettingsSlice';
import PoolTeamCreditSlice from './slices/PoolTeamCreditSlice';
import CreditPurchaseSlice from './slices/CreditPurchaseSlice';
import OtpGenerateSlice from './slices/OtpGenerateSlice';
import ChangeRoleSlice from './slices/ChangeRoleSlice';
import RemoveMemberSlice from './slices/RemoveMemberSlice';
import AddMemberSlice from './slices/AddMemberSlice';
import modeSlice from './slices/modeSlice';
import bookingResourceSlice from './slices/bookingResourceSlice';
//! Add all of you apis slices here as quick as possible
import GetMembersSlice from './slices/GetMembersSlice';
import UpdateProfileSlice from './slices/UpdateProfileSlice';
import DownloadPdfSlice from './slices/DownloadPdfSlice';
import CancelDayPassSlice from './slices/CancelDayPassSlice';
import GetNotificationsListSlice from './slices/GetNotificationsListSlice';
import ForgotPasswordSlice from './slices/ForgotPasswordSlice';
import RegisterFCMSlice from './slices/RegisterFCMSlice';
import ParticipantRescheduleSlice from './slices/ParticipantRescheduleSlice';
import ScheduleFilterSlice from './slices/ScheduleFilterSlice';
import DayPassFilterSlice from './slices/DayPassFilterSlice';
import GetChatListSlice from './slices/GetChatListSlice';
import SendMessageSlice from './slices/SendMessageSlice';
import QRCodeGeneratorSlice from './slices/QRCodeGeneratorSlice';
import GetQRCodeAccessStatusSlice from './slices/GetQRCodeAccessStatusSlice';
import CheckVisitorSlice from './slices/CheckVisitorSlice';
import qrDirectionSlice from './slices/qrDirectionSlice';
import BookedSlotsSlice from './slices/BookedSlotsSlice';
import CreditHistorySlice from './slices/CreditHistorySlice';
import GetFaqsSlice from './slices/GetFaqsSlice';
import GetMeetingNewTimeLine from './slices/GetMeetingNewTimeLineSlice'
import PatchNotificationSettingsSlice from './slices/PatchNotificationSettingsSlice';
import GetNotificationSettingsSlice from './slices/GetNotificationSettingsSlice';
import NexudusTimingSlice from './slices/NexudusTimingSlice';
import TaxSlice from './slices/TaxSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'administrator',
    'qrAsset'
  ],
};

const rootReducer = combineReducers({
  selectedItems: memberSelectionSlice,
  Booking: meetingHomeScreenBookingSlice,
  Date: DateSlice,
  profileEdit: profileEditSlice,
  administrator: isadminSlice,
  dayPassData: dayPassProductData,
  mode: modeSlice,
  qrAsset: qrDirectionSlice,
  bookingResource: bookingResourceSlice,

  //api
  auth: authSlice,
  newPassword: setPasswordSlice,
  publicResources: PublicResourceSlice,
  getTeam: GetTeamSlice,
  planRequest: PlanRequestSlice,
  resourcePlan: ResourcePlanSlice,
  resourceData: planResourceDataSlice,
  getSinglePlan: GetSinglePlanSlice,
  getSinglePlanMember: GetSinglePlanMemberSlice,
  getPricingDesk: GetPricingDeskSlice,
  getPricingMemberDesk: GetPricingMemberDeskSlice,
  privateOfficeResources: PrivateOfficeResourcesSlice,
  getProfile: GetProfileSlice,
  getPendingPlan: GetPendingPlanSlice,
  pendingStatus: PendingStatusSlice,
  dayPassProduct: DayPassProductSlice,
  feeds: FeedsSlice,
  getMeetingRoom: GetMeetingRoomSlice,
  getMeetingBooking: GetMeetingBookingSlice,
  meetingRoomPrice: MeetingRoomPriceSlice,
  meetingRoomRequest: MeetingRoomRequestSlice,
  dayPassPrice: DayPassPriceSlice,
  dayPassPaymentDetail: DayPassPaymentDetailSlice,
  getMembershipDetail: GetMembershipDetailSlice,
  getSingleInvoiceDetail: GetSingleInvoiceDetailSlice,
  dayPassAvailibilty: DayPassAvailibiltySlice,
  dayPassUpload: DayPassUploadSlice,
  dayPassComment: DayPassCommentSlice,
  bookingSetting: BookingSettingSlice,
  meetingRoomComment: MeetingRoomCommentSlice,
  dayPassCheck: DayPassCheckSlice,
  getCustomerMeetingRooms: GetCustomerMeetingRoomsSlice,
  getDayPassBookings: GetDayPassBookingsSlice,
  dayPassReschedule: DayPassResheduleSlice,
  meetingRoomReschedule: MeetingRoomRescheduleSlice,
  cancelMeetingRoom: CancelMeetingRoomSlice,
  memberTeamManagement: MemberTeamManagementSlice,
  leadTeamManagement: LeadTeamManagementSlice,
  teamSettings: TeamSettingsSlice,
  poolTeamCredit: PoolTeamCreditSlice,
  creditPurchase: CreditPurchaseSlice,
  otpGenerate: OtpGenerateSlice,
  changeRole: ChangeRoleSlice,
  removeMember: RemoveMemberSlice,
  addMember: AddMemberSlice,
  getMembers: GetMembersSlice,
  downloadPdf: DownloadPdfSlice,
  cancelDayPass: CancelDayPassSlice,
  notificationList: GetNotificationsListSlice,
  updateProfile: UpdateProfileSlice,
  forgotPassword: ForgotPasswordSlice,
  registerFCM: RegisterFCMSlice,
  participantReschedule: ParticipantRescheduleSlice,
  scheduleFilter: ScheduleFilterSlice,
  dayPassFilter: DayPassFilterSlice,
  chatList: GetChatListSlice,
  sendMessage: SendMessageSlice,
  qrCode: QRCodeGeneratorSlice,
  qrAccessStatus: GetQRCodeAccessStatusSlice,
  checkVisitor:CheckVisitorSlice,
  bookedSlots:BookedSlotsSlice,
  creditHistory:CreditHistorySlice,
  faqList: GetFaqsSlice,
  newBookingTimeline: GetMeetingNewTimeLine,
  noticationSetting: GetNotificationSettingsSlice,
  patchNotificationSetting: PatchNotificationSettingsSlice,
  nexudusTiming:NexudusTimingSlice,
  tax:TaxSlice
});

export default persistReducer(persistConfig, rootReducer);
