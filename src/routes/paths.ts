export const rootPaths = {
  homeRoot: '/',
  pagesRoot: 'pages',
  prediction: '/prediction',
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
  sales: `/${rootPaths.homeRoot}/sales`,
  Predictions:`/${rootPaths.homeRoot}/prediction`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
