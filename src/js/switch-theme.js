const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  
  const switchToggle = document.querySelector('#theme-switch-toggle');
  
  console.log(switchToggle);
  
  function classChange(addClass, removeClass) {
    document.body.classList.add(addClass),
      document.body.classList.remove(removeClass);
  }
  
  function defaultTheme() {
    if (localStorage.getItem('theme') === Theme.DARK) {
      switchToggle.checked = 'true';
      classChange(Theme.DARK, Theme.LIGHT);
      localStorage.setItem('theme', 'dark-theme');
    } else {
      switchToggle.checked = false;
      classChange(Theme.LIGHT, Theme.DARK);
      localStorage.setItem('theme', 'light-theme');
    }
  }
  defaultTheme();
  
  switchToggle.addEventListener('change', e => {
    if (e.target.checked) {
      classChange(Theme.DARK, Theme.LIGHT);
      localStorage.setItem('theme', 'dark-theme');
    } else {
      classChange(Theme.LIGHT, Theme.DARK);
      localStorage.setItem('theme', 'light-theme');
    }
  });
  