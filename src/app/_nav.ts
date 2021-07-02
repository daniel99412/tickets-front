import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    attributes: {
      'minAccess': 'usuario'
    }
  },
  {
    name: 'Tickets',
    url: '/tickets/list',
    icon: 'icon-note',
    attributes: {
      'minAccess': 'usuario'
    }
  },
  {
    name: 'Usuarios',
    url: '/users',
    icon: 'icon-user',
    attributes: {
      'minAccess': 'jefe'
    }
  },
  {
    name: 'Roles',
    url: '/roles',
    icon: 'icon-book-open',
    attributes: {
      'minAccess': 'jefe'
    }
  },
  {
    name: 'Sucursales',
    url: '/branchOffices',
    icon: 'icon-home',
    attributes: {
      'minAccess': 'gerente'
    }
  },
  {
    name: 'Categorias',
    url: '/categories',
    icon: 'icon-list',
    attributes: {
      'minAccess': 'gerente'
    }
  },
  {
    name: 'Subcategorias',
    url: '/subcategories',
    icon: 'icon-organization',
    attributes: {
      'minAccess': 'gerente'
    }
  }
];
