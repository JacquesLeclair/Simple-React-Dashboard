# Simple Dashboard React
https://github.com/shadofficial/Simple-React-Dashboard?form=MG0AV3

Four 100 scores and PWA ready. Just connect your data.

🚀 [See it live]( )

This is a simple template.

Accessibility is a priority in my projects and I think it should be in yours too, so this was developed listening to real screen readers, focus traps and keyboard navigation are available everywhere.

## 📦 Features

- 🦮 Throughly accessible (developed using screen readers)
- 🌗 Dark theme enabled (load even different images based on theme)
- ⚡ Code splitting
- Tailwind CSS
- React Router
- Heroicons
- PWA delivering offline-first and app-like experience

## 📚 Docs

### General components

Dashboard React is built on top of [Windmill React UI](https://windmillui.com/react-ui). You will find the documentation for every small component there.

### Routing

Routes in the Dashboard are separated into two categories, sidebar ([routes/sidebar.js](src/routes/sidebar.js)) and general ([routes/index.js](src/routes/index.js)).

#### Sidebar routes

These are the routes that will show in the sidebar. They expect three properties:

- `path`: the destination;
- `name`: the name to be shown;
- `icon`: an icon to illustrate the item

Item that are used as dropdowns, like the Pages option, don't need a `path`, but expect a `routes` array of objects with `path` and `name`:

```js
// sidebar.js
{
  path: '/app/tables',
  icon: 'TablesIcon',
  name: 'Tables',
},
{
  icon: 'PagesIcon', // <-- this is used as a submenu, so no path
  name: 'Pages',

  }
