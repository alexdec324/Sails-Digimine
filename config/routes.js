module.exports.routes = {

  // HTML Views
  '/': { view: 'homepage' },
  '/works': { view: 'works' },
  '/pricing': { view: 'pricing' },
  '/faq': { view: 'faq' },
  '/about': { view: 'about' },
  'get /contact': { view: 'contact' },
  'post /sendmessage': 'ContactUsController.sendmessage',
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup' },
  'get /verify/:token': { view: 'user/verify' },
  'post /verify/:token': 'UserController.verify',
  '/welcome': 'SummaryController.welcome',
  '/hashpower': "HashpowerController.hashpower",
  '/order': 'HashpowerController.orderSpec',
  '/payment': 'HashpowerController.payment',
  '/account': 'AccountController.account',
  'post /datasave': 'AccountController.datasave',
  '/myorder': 'MyorderController.myorder',
  '/allocation': 'AllocationController.allocation',

  // Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  'post /saveHashpower': 'HashpowerController.saveHashpower',
  'post /save_coin': 'AllocationController.save_coin',
  'post /save_percent': 'AllocationController.save_percent',
  '/logout': 'UserController.logout',
};
