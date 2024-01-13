import React from 'react';

export default function Portfolio() {
  const sites = [
    {name: 'Статичный сайт', link: 'link' },
    {name: 'Адаптивный сайт', link: 'link' },
    {name: 'Одностраничное приложение', link: 'link' },
  ]
  return (
    <div>
      <h3>Портфолио</h3>
      <ul>
        {sites.map((site, i) => (
          <li key={i}>
            <a href={site.link}>{site.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
