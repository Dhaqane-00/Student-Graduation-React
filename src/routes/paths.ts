export const rootPaths = {
  homeRoot: '/',
  pagesRoot: 'pages',
  prediction: '/prediction',
  SinglePrediction: '/Single-Prediction',
  applicationsRoot: 'applications',
  profile: 'profile',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  dashboard: `/${rootPaths.homeRoot}/dashboard`,
  Home: `/${rootPaths.homeRoot}/Home`,
  Predictions:`/${rootPaths.homeRoot}/prediction`,
  SinglePrediction:`/${rootPaths.homeRoot}/Single-Prediction`,
  profile: `/${rootPaths.homeRoot}/profile`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  confirmPassword: `/${rootPaths.authRoot}/confirm-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
