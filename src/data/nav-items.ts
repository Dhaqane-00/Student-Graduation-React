interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    sublist: [
      {
        title: 'Dashboard',
        path: '/',
        active: false,
        collapsible: false,
      },
      {
        title: 'Sales',
        path: '/',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Prediction',
    path: '/prediction',
    icon: 'ion:analytics',
    active: false,
    collapsible: false,
  },
  {
    title: ' Single Prediction',
    path: '/SinglePrediction',
    icon: 'ion:analytics',
    active: false,
    collapsible: false,
  },
  {
    title: 'Authentication',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,
    sublist: [
      {
        title: 'Sign In',
        path: 'login',
        active: true,
        collapsible: false,
      },
      {
        title: 'Sign Up',
        path: 'sign-up',
        active: true,
        collapsible: false,
      },
      {
        title: 'Reset password',
        path: 'reset-password',
        active: true,
        collapsible: false,
      },
    ],
  },
];

export default navItems;
