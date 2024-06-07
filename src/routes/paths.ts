export const rootPaths = {
  homeRoot: '/',
  pagesRoot: 'pages',
  prediction: '/prediction',
  SinglePrediction: '/SinglePrediction',
  applicationsRoot: 'applications',
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
  SinglePrediction:`/${rootPaths.homeRoot}/SinglePrediction`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
