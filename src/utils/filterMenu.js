const menuList = {
  coustomer: [
    { path: '/goods' },
    { path: 'list' },
    { path: 'add' },
    { path: 'edit/:id' },
  ],
  admin: [
    { path: '/goods' },
    { path: 'list' },
    { path: 'add' },
    { path: 'edit/:id' },
    { path: 'category' },
  ],
};

function filterMenu(role, routerMenu) {
  const allowMenuList = menuList[role].map((item) => item.path);
  const resultMenu = routerMenu.filter((i) => {
    const item = i;
    if (allowMenuList.includes(item.path)) {
      if (item.children) {
        item.children = filterMenu(role, item.children);
      }
      return item;
    }
    return false;
  });
  return resultMenu;
}

export function filterHideMenu(menuLists) {
  return menuLists.filter((i) => {
    const item = i;
    if (item.meta.show) {
      if (item.children) {
        item.children = filterHideMenu(item.children);
      }
      return item;
    }
    return false;
  });
}

export default filterMenu;
