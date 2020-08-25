export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Home',
          root: true,
          page: '/home'
        },
        {
          title: 'Scoreboard',
          root: true,
          page: '/dashboard'
        },
        {
          title: 'Trackers',
          root: true,
          disbaled:true,
          page: ''
        },
        {
          title: 'Prognostics',
          root: true,
          disbaled: true,
          page: ''
        },
        {
          title: 'Reports',
          root: true,
          disbaled: true,
          page: ''
        },
        {
          title: 'Explainers',
          root: true,
          disbaled: true,
          page: ''
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Profile',
          root: true,
            icon: 'flaticon2-user',
            submenu: [
                {
                title: 'Personal',
                page: '/profile',
                    bullet: 'dot',
        
              },
              {
                title: 'Health',
                page: '/health-profile',
                bullet: 'dot',

              },
                {
                    title: 'My Transactions',
                    bullet: 'dot',

                }

            ],
          page: '/builder'
        },
       
          {
              title: 'Setting',
              root: true,
              icon: 'flaticon2-settings',

              bullet: 'dot',
          },
          {
              title: 'Goals',
              root: true,
              icon: 'flaticon2-architecture-and-city',
              bullet: 'dot',
        },
        {
          title: 'App Connect',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          bullet: 'dot',
        },

          {
              title: 'FAQ',
            root: true,
            page: '/cms/faq',
              icon: 'flaticon-questions-circular-button',
              bullet: 'dot',
        },

        {
          title: 'Information',
          root: true,
          icon: 'flaticon2-paper',
          submenu: [
            {
              title: 'Policy',
              page: '/cms/privacy',
              bullet: 'dot',

            },
            {
              title: 'Terms of Service',
              page: '/cms/terms',
              bullet: 'dot',

            }

          ],
          page: '/cms'
        },

          {
              title: 'Logout',
              root: true,
              icon: 'flaticon-logout',

              bullet: 'dot',
          },
        //{section: 'Applications'},
        //{
        //  title: 'eCommerce',
        //  bullet: 'dot',
        //  icon: 'flaticon2-list-2',
        //  root: true,
        //  permission: 'accessToECommerceModule',
        //  submenu: [
        //    {
        //      title: 'Customers',
        //      page: '/ecommerce/customers'
        //    },
        //    {
        //      title: 'Products',
        //      page: '/ecommerce/products'
        //    },
        //  ]
        //},
        //{
        //  title: 'User Management',
        //  root: true,
        //  bullet: 'dot',
        //  icon: 'flaticon2-user-outline-symbol',
        //  submenu: [
        //    {
        //      title: 'Users',
        //      page: '/user-management/users'
        //    },
        //    {
        //      title: 'Roles',
        //      page: '/user-management/roles'
        //    }
        //  ]
        //},
        //{section: 'Custom'},
        //{
        //  title: 'Error Pages',
        //  root: true,
        //  bullet: 'dot',
        //  icon: 'flaticon2-list-2',
        //  submenu: [
        //    {
        //      title: 'Error 1',
        //      page: '/error/error-1'
        //    },
        //    {
        //      title: 'Error 2',
        //      page: '/error/error-2'
        //    },
        //    {
        //      title: 'Error 3',
        //      page: '/error/error-3'
        //    },
        //    {
        //      title: 'Error 4',
        //      page: '/error/error-4'
        //    },
        //    {
        //      title: 'Error 5',
        //      page: '/error/error-5'
        //    },
        //    {
        //      title: 'Error 6',
        //      page: '/error/error-6'
        //    },
        //  ]
        //},
        //{
        //  title: 'Wizard',
        //  root: true,
        //  bullet: 'dot',
        //  icon: 'flaticon2-mail-1',
        //  submenu: [
        //    {
        //      title: 'Wizard 1',
        //      page: '/wizard/wizard-1'
        //    },
        //    {
        //      title: 'Wizard 2',
        //      page: '/wizard/wizard-2'
        //    },
        //    {
        //      title: 'Wizard 3',
        //      page: '/wizard/wizard-3'
        //    },
        //    {
        //      title: 'Wizard 4',
        //      page: '/wizard/wizard-4'
        //    },
        //  ]
        //},
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
